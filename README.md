# cy_saucedemo
## Introduction

This is a Cypress-based automation framework for testing the [Sauce Demo](https://www.saucedemo.com/) web application. 

### Characteristics:
- It uses a combination of PageObject and App Actions design patterns.
  - PageObjects stored in cypress/e2e/pages allow access to pages, web elements, custom functions related only to a specific page. There are two approaches to pages, depending on the user status:
    - Pages available only for users which are not logged in, extend GeneralPage
    - Pages available only for logged in users, extend LoggedPage for access to Header and Menu items
  - App Actions are store in cypress/support/commands.js. This actions have the purpose of hiding and reusing Cypress assertion commands, store a combinations of steps to be reused across all framework (e.g login) and  perform activities on web elements. Actions do not have free access to PageObject (except LoginPage) and can be performed only on web elements received as parameters.
- Most input data is randomly generated with help of fakerJs or received from cypress/fixtures
- Upon test execution through command, reports with screenshots for failed tests are generated

### Possible issues and limitations
- Additional changes might be needed for APIs if a new environment is introduced
- Does not support parallel execution
- Cases of false negative results, due to performance issues, especially when navigating to external urls (Menu -> About) or when using performance_glitch_user. Might need additional logic or increase timeout.
- Following tests failing due to missing implementation or bugs:
  - user cannot checkout without products in cart - checkout button enabled when no products present
  - user cannot checkout after session reset - user remains on the checkout page after reset
  - user can reset session - 'Remove' button on products is not cleared, though products are removed from cart

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (>=12.x)
- npm (>=6.x) or yarn (>=1.x)

## Installation

To install the Cypress automation framework, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/agherasimov/cy_saucedemo.git
    ```

2. Navigate to the project directory:
    ```bash
    cd cy_saucedemo
    ```

3. Install dependencies:
    ```bash
    npm install cypress --save-dev
    npm install @faker-js/faker --save-dev
    npm install --save-dev mocha
    npm install --save-dev mochawesome
    npm install --save-dev cypress-mochawesome-reporter
    npm install -g mochawesome-report-generator
    npm install mocha-multi-reporters --save-dev
    ```

## Running Tests

To run tests locally, use the following commands:

- Open Cypress Test Runner:
    ```bash
    npx cypress open
    ```
    OR
    ```bash
    npm run cypress
    ```

- Run Cypress tests in headless mode:
    ```bash
    npx cypress run
    ```
- Run Cypress tests in headless mode on specified (`test`) environment:
    ```bash
    npm run test --env environmentName="test'
    ```
    
## Generating Reports
With the latest cypress version, a .json and .html report are generated for a single spec file. In case of multiple spec files, there is a need to combine them, which can be acheived following the steps:

- Execute a command to clean the `cypress/reports/` folder of any unwanted files:
    ```bash
    npm run pretest
    ```
    
- Execute a command to run all spec files:
    ```bash
    npm run test
    ```
    
- Merge all reports togheter and generate a single report in `cypress/reports/final_report` folder:
    ```bash
    npm run posttest
    ```
> [!NOTE]
> Example of a report is present on the current main branch and can be viewed on [Mochawesome Report](https://html-preview.github.io/?url=https://github.com/agherasimov/cy_saucedemo/blob/main/cypress/reports/final_report/report.html)

## Folder Structure
The structure of the project is following:
```
cy_saucedemo/  
├── cypress  
│ ├── e2e  
│ │ ├── common  
│ │ ├── pages  
│ │ ├── specs  
│ ├── fixtures   
│ ├── plugins  
│ ├── reports  
│ ├── support  
├── envs_config  
├── .gitignore  
├── cypress.config.js  
├── package.json  
├── README.md
```

markdown
- `cypress/e2e`: Test cases, page objects, commonly used entities and constants
- `cypress/e2e/specs`: Test cases splitted by functionality
- `cypress/fixtures`: Test data
- `cypress/plugins`: Custom plugins
- `cypress/reports`: Generated reports, screenshots and  report styles
- `cypress/support`: Custom commands and configurations
- `envs_config`: Environment configurations
- `.gitignore`: Configuration of ignored extensions and folders for version control
- `cypress.config.js`: Cypress configurations, e.g. environment, reporters
- `package.json`: project information and custom scripts
