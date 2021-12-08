const cucumber = require('cypress-cucumber-preprocessor').default;

// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  on('file:preprocessor', cucumber());
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
};
