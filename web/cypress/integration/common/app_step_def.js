import {
  Given, Then, When,
} from 'cypress-cucumber-preprocessor/steps';

Given('I am on the home page', () => {
  cy.visit('/');
});

Given('I am on the {string} page', (page) => {
  cy.visit(`/${page}`);
});

Then('I see {string}', (label) => {
  cy.get('body')
    .contains(label)
    .should('exist');
});

When('I click on {string}', (label) => {
  cy.get('body').contains(label).click();
});
