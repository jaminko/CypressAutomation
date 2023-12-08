const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false, // for Google drop-down tests
  reporter: 'cypress-mochawesome-reporter', // for generating HTML report
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on); // for generating HTML report
      // implement node event listeners here
    },
  },
});