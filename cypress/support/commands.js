// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// type definitions for Cypress object "cy"
/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
import 'cypress-file-upload';


Cypress.Commands.add('getIframe', (iframeLocator) => {
    return cy.get(iframeLocator)
        .its('0.contentDocument.body')
        .should('be.visible')
        .then(cy.wrap);
})

Cypress.Commands.add('isPageTitleCorrect', (expectedTitle) => {
    return cy.title().and('eq', expectedTitle).then(cy.wrap);
})

Cypress.Commands.add('isPageUrlIncludeTargetPath', (targetPath) => {
    return cy.url().should('include', targetPath).then(cy.wrap);
})

Cypress.Commands.add('isElementHasCorrectSignature', (element, targetSignature) => {
    return element.should('contain', targetSignature).then(cy.wrap);
})