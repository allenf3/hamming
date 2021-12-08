import {
  Given, Then,
} from 'cypress-cucumber-preprocessor/steps';

Given('I am on the app', () => {
  cy.visit('/');
});

Given('I am on the {page} Page', (page) => {
  cy.visit(`/${page}`);
});

Then('I see {string}', (label) => {
  cy.get('body')
    .contains(label)
    .should('exist');
});
