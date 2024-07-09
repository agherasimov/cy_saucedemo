const { defineConfig } = require("cypress");

module.exports = defineConfig({
    //reporting setup
    reporter: "cypress-multi-reporters",
        reporterOptions: {
            reporterEnabled: "cypress-mochawesome-reporter",
            cypressMochawesomeReporterReporterOptions: {
                  reportDir: "cypress/reports/mocha",
                  reportFilename: "[status]_[datetime]-[name]-report",
                  charts: true,
                  reportPageTitle: 'SauceDemo Testing Results',
                  reportDir: "cypress/reports/mocha",
                  html: false,
                  saveJson: true,
                  embeddedScreenshots: true,
                  inlineAssets: true,
            },
        },

    e2e: {
        //Bypass security issues
        experimentalStudio: true,
        chromeWebSecurity: false,

        setupNodeEvents(on, config) {
            //environment setup
            const environmentName = config.env.environmentName || 'test';
            const envFileName = `./envs_config/${environmentName}.env.json`;
            console.log('Environment settings loaded from: %s', envFileName);
            const envConfig = require(envFileName);

            //overwriting the baseUrl from settings file to config
            if (envConfig.baseUrl) {
                config.baseUrl = envConfig.baseUrl
            }

            if (envConfig.env) {
                config.env = {
                  ...config.env,
                  ...envConfig.env,
                }
            }
            console.log('Environment is set up', environmentName);

            require('cypress-mochawesome-reporter/plugin')(on)

            return config;
        }
    },
});
