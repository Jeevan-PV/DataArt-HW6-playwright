import { expect } from '@playwright/test';
import { test } from '../fixtures/test.fixture';
import { USER_CREDENTIALS } from '../data/credentials.data';

test.describe('Sauce Demo E2E Tests', () => {

    // --- Scenario 1: Standard User - Add one product ---
    test('Scenario 1: Add one product to the cart as standard_user', async ({ page, loginPage, inventoryPage }) => {
        // 1. Navigate to the login page
        await loginPage.navigateToLogin();
        
        // 2. Sign in as standart_user
        await loginPage.logIn(USER_CREDENTIALS.standardUser);
        
        // → Verify home page is visible
        await inventoryPage.verifyHomePageIsVisible();
        
        // 3. Add one product to the cart (product at index 0)
        await inventoryPage.addProductToCart(0);
        
        // → Verify the cart counter shows 1
        await expect(inventoryPage.cartCounter).toHaveText('1');
    });
    
    // --- Scenario 2: Standard User - Add and Remove products ---
    test('Scenario 2: Add two, remove one product as standard_user', async ({ loginPage, inventoryPage }) => {
        // 1. Navigate to the login page
        await loginPage.navigateToLogin();
        // → Verify login page is visible
        await loginPage.verifyLoginPageIsVisible();
        
        // 2. Sign in as standart_user
        await loginPage.logIn(USER_CREDENTIALS.standardUser);
        // → Verify home page is visible
        await inventoryPage.verifyHomePageIsVisible();
        
        // 3. Add two products to the cart (products at index 0 and 1)
        await inventoryPage.addProductToCart(0);
        await inventoryPage.addProductToCart(1);
        
        // → Verify the counter shows 2
        await expect(inventoryPage.cartCounter).toHaveText('2');
        
        // 4. Remove one product from the cart (product at index 0)
        await inventoryPage.removeProductFromCart(0);
        
        // → Verify the counter returns to 1
        await expect(inventoryPage.cartCounter).toHaveText('1');
    });

    // --- Scenario 3: Visual User - Print product names and verify count ---
    test('Scenario 3: Print product names and verify count as visual_user', async ({ loginPage, inventoryPage }) => {
        // 1. Navigate to the login page
        await loginPage.navigateToLogin();
        // → Verify login page is visible
        await loginPage.verifyLoginPageIsVisible();
        
        // 2. Sign in as visual_user
        await loginPage.logIn(USER_CREDENTIALS.visualUser);
        // → Verify home page is visible
        await inventoryPage.verifyHomePageIsVisible();
        
        // 3. Print all product names to the console
        const productNames = await inventoryPage.getProductNames();
        console.log('\n--- Scenario 3 Product Names ---');
        productNames.forEach(name => console.log(name));
        console.log('--------------------------------');

        // → Verify that quantity of products is 6
        const productCount = await inventoryPage.getProductCount();
        await expect(productCount).toBe(6);
    });
    
    // --- Scenario 4: Visual User - Print product name and price in specified format ---
    test('Scenario 4: Print product details in custom format as visual_user', async ({ loginPage, inventoryPage }) => {
        // 1. Navigate to the login page
        await loginPage.navigateToLogin();
        
        // 2. Sign in as visual user
        await loginPage.logIn(USER_CREDENTIALS.visualUser);
        // → Verify home page is visible
        await inventoryPage.verifyHomePageIsVisible();
        
        // 3. Print to the console products in following format
        //    Sauce Labs Backpack costs 29.99$ (The dollar sign must appear after the price)
        const backpackDetails = await inventoryPage.getProductDetails(0); // Assuming the backpack is the first item
        
        const output = `${backpackDetails.name} costs ${backpackDetails.price}$`;
        
        console.log('\n--- Scenario 4 Product Output ---');
        console.log(output);
        console.log('--------------------------------');
        
        // Optional: simple check to ensure the data was retrieved
        await expect(backpackDetails.name).toContain('Sauce Labs Backpack');
    });

    // --- Scenario 5: Unauthenticated user redirection check ---
    test('Scenario 5: Unauthenticated access to /inventory.html', async ({ page, loginPage }) => {
        // 1. Navigate As unauthenticated user directly to /inventory.html
        await page.goto('/inventory.html');
        
        // → Verify redirection to login page (URL should be back to base URL with no path)
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        
        // → Verify an error message is shown
        // The site redirects and displays the login error: "Epic sadface: You can only access '/inventory.html' when you are logged in."
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: You can only access \'/inventory.html\' when you are logged in.');
    });
});