import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // Configuration Requirements: testDir must point to './src/spec'
  testDir: './src/spec',
  
  // Configuration Requirements: fullyParallel must be set to true
  fullyParallel: true,
  
  // Configuration Requirements: retries must be set to 1
  retries: 1,
  
  // Reporter to use: 'html' for the report
  reporter: 'html',

  /* Shared settings for all the projects below. */
  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: 'https://www.saucedemo.com',
    
    // Collect trace when retrying the failed test.
    trace: 'on-first-retry',

    // Configuration Requirements: record video and screenshots only for failed tests
    video: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for different browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Optional: add more browsers like 'firefox', 'webkit'
  ],
});