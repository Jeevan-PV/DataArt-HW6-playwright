import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly pageHeader: Locator;
    readonly productItems: Locator;
    readonly cartCounter: Locator;

    // Functions must specify an explicit return type
    constructor(page: Page) {
        this.page = page;
        this.pageHeader = page.locator('.title');
        this.productItems = page.locator('.inventory_item');
        this.cartCounter = page.locator('.shopping_cart_badge');
    }

    public async verifyHomePageIsVisible(): Promise<void> {
        await expect(this.pageHeader).toHaveText('Products');
        await expect(this.pageHeader).toBeVisible();
    }

    public async addProductToCart(index: number): Promise<void> {
        const product = this.productItems.nth(index);
        const addButton = product.locator('button:has-text("Add to cart")');

        await expect(addButton).toBeVisible(); 
        await addButton.click();
    }
    
    public async removeProductFromCart(index: number): Promise<void> {
        const product = this.productItems.nth(index);
        await product.locator('button:has-text("Remove")').click();
    }

    public async getCartCounterValue(): Promise<string | null> {
        return this.cartCounter.innerText();
    }

    public async getProductNames(): Promise<string[]> {
        const names: string[] = [];
        const productNamesLocators = this.productItems.locator('.inventory_item_name');
        
        // Loop through all product names
        const count = await productNamesLocators.count();
        for (let i = 0; i < count; i++) {
            names.push(await productNamesLocators.nth(i).innerText());
        }
        return names;
    }
    
    public async getProductCount(): Promise<number> {
        return this.productItems.count();
    }
    
    public async getProductDetails(index: number): Promise<{ name: string, price: string }> {
        const product = this.productItems.nth(index);
        const name = await product.locator('.inventory_item_name').innerText();
        // Remove the '$' sign from the price string before returning
        const price = (await product.locator('.inventory_item_price').innerText()).replace('$', '');
        return { name, price };
    }
}