const { defineConfig } = require("cypress");
const cypressSplit = require('cypress-split');

module.exports = defineConfig({
  chromeWebSecurity: false, // for Google drop-down tests
  reporter: 'cypress-mochawesome-reporter', // for generating HTML report
  video: false, // disable video recording
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on); // for generating HTML report
      // implement node event listeners here
      cypressSplit(on, config)
      return config
    },
  },
});