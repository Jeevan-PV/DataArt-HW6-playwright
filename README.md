### 

\# 🧪 Playwright TypeScript E2E Automation Framework

    
    ## Overview
    
    This is a minimal yet robust UI test automation framework built using **Playwright** and **TypeScript**. The goal is to provide a scalable, maintainable structure following best practices, including the **Page Object Model (POM)**, custom fixtures, and clear configuration.
    
    The framework targets the **Sauce Demo** application for practical demonstration of key E2E testing scenarios.
    
    ---
    
    ## 🚀 Getting Started
    
    ### Prerequisites
    
    You need [Node.js](https://nodejs.org/) (which includes npm) installed on your system.
    
    ### Installation
    
    1.  **Clone the Repository (or setup your files):**
        ```bash
        git clone <your-repo-link>
        cd playwright-automation-framework
        ```
    
    2.  **Install Dependencies:**
        This command installs Playwright and all required development dependencies defined in `package.json`.
        ```bash
        npm install
        ```
    
    3.  **Install Browser Binaries:**
        Playwright needs the browser executables (Chromium, Firefox, WebKit). Run this command to download them:
        ```bash
        npx playwright install
        ```
    
    ---
    
    ## ⚙️ Project Structure
    
    The framework follows a clear, layered architecture to separate concerns, making it scalable and easy to maintain.

project-root/

├── src/

│ ├── spec/ # Test files (e.g., inventory.spec.ts)

│ ├── pages/ # Page Object Model (POM) files (\*.po.ts)

│ ├── data/ # Test data and user credentials (credentials.data.ts)

│ ├── types/ # Type definitions (e.g., TCredentials)

│ └── fixtures/ # Custom Playwright fixtures (test.fixture.ts)

├── playwright.config.ts # Playwright configuration

└── package.json

### Key Architectural Decisions
    
    * **Page Object Model (POM):** All element locators and page interactions are encapsulated in the `./src/pages` directory.
    * **Custom Fixtures:** Page Object instances are injected into tests via **`test.fixture.ts`**, adhering to the rule of not instantiating page objects directly within test files.
    * **Test Isolation:** Tests use a fresh `page` context and log in via the UI using the reusable `logIn(creds: TCredentials)` method, ensuring no reliance on persistent cookies or session state.
    
    ---
    
    ## 🏃 Running Tests
    
    The framework includes a mandatory npm script for running the tests.
    
    ### Test Command
    
    Use the following command to run all tests defined in the `./src/spec` directory:
    
    ```bash
    npm test

### Configuration Details

### 

The `playwright.config.ts` file is configured for reliability and efficiency:

| **Setting** | **Value** | **Purpose** |
| --- | --- | --- |
| **`testDir`** | `./src/spec` | Ensures only test files in the `src` directory are run. |
| **`fullyParallel`** | `true` | Enables maximum parallel execution for speed. |
| **`retries`** | `1` | Retries flaky tests once to increase stability (as demonstrated during setup). |
| **`video` & `screenshot`** | `on-first-retry` & `only-on-failure` | Records video and captures screenshots only for failed tests to save disk space. |

### Viewing Results

### 

After running the tests, an HTML report is automatically generated. To open it in your browser:

Bash

    npx playwright show-report

* * *

## ✅ Implemented Scenarios

### 

The test suite covers five end-to-end scenarios demonstrating login, interaction, assertion, and unauthenticated access checks.

| **Scenario** | **Goal** | **Key Actions & Verifications** |
| --- | --- | --- |
| **Scenario 1** | Standard User Inventory | Login, Add 1 Product, Verify Cart Counter is **1**. |
| **Scenario 2** | Add/Remove Cart Logic | Login, Add 2 Products, Verify Counter is **2**, Remove 1 Product, Verify Counter returns to **1**. |
| **Scenario 3** | Visual User Data Extraction | Login, Get all product names, Verify total product count is **6**. |
| **Scenario 4** | Visual User Custom Output | Login, Print product details in the required format: `Product Name costs 9.99$`. |
| **Scenario 5** | Unauthenticated Access | Navigate directly to `/inventory.html`, Verify redirection to Login, Verify appropriate error message is shown. |
