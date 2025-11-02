import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.po.js';
import { InventoryPage } from '../pages/inventory.po.js';

// Define the types for your fixtures
type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
};

// Extend the base test object with your custom fixtures
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    // Instantiate Page Object classes using Playwright fixtures
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    // Instantiate Page Object classes using Playwright fixtures
    await use(new InventoryPage(page));
  },
});