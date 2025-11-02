import { Page, Locator, expect } from '@playwright/test';
import { TCredentials } from '../types/credentials.type';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    // Functions must specify an explicit return type
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    // Required method: logIn(creds: TCredentials)
    public async logIn(creds: TCredentials): Promise<void> {
        await this.usernameInput.fill(creds.username);
        await this.passwordInput.fill(creds.password);
        await this.loginButton.click();

        await this.page.waitForURL('**/inventory.html');
    }

    public async navigateToLogin(): Promise<void> {
        await this.page.goto('/');
    }

    public async verifyLoginPageIsVisible(): Promise<void> {
        await expect(this.loginButton).toBeVisible();
    }
    
    public async getErrorMessageText(): Promise<string> {
        return this.errorMessage.innerText();
    }

}