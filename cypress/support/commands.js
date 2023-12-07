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

// -- The custom command for interacting with iFrame --
Cypress.Commands.add('getIframe', (iframeLocator) => {
    return cy.get(iframeLocator)
        .its('0.contentDocument.body')
        .should('be.visible')
        .then(cy.wrap);
})

// -- The custom command for validating if the page title is correct --
Cypress.Commands.add('isPageTitleCorrect', (expectedTitle) => {
    return cy.title().and('eq', expectedTitle).then(cy.wrap);
})

// -- The custom command for validating if the page URL contains the expected path --
Cypress.Commands.add('isPageUrlIncludeTargetPath', (expectedPath) => {
    return cy.url().should('include', expectedPath).then(cy.wrap);
})

// -- The custom command for validating if the target element has the correct text signature --
Cypress.Commands.add('isElementHasCorrectSignature', (element, expectedSignature) => {
    return element.should('contain', expectedSignature).then(cy.wrap);
})

// -- The custom command for clicking on link using label --
Cypress.Commands.add('clickLink', (label) => {
    cy.get("a").contains(label).click();
})

// -- The custom command for overwriting contains() method --
/* Cypress.Commands.overwrite("contains", function (contains, filter, text, userOptions = {}) {
    if (Cypress._.isRegExp(text)) {
        // .contains(filter, text)
        // Do nothing
    } else if (Cypress._.isObject(text)) {
        // .contains(text, userOptions)
        userOptions = text
        text = filter
        filter = ''
    } else if (Cypress._.isUndefined(text)) {
        // .contains(text)
        text = filter
        filter = ''
    }
    userOptions.matchCase = false;
    let contains0 = contains.bind(this)
    return contains0(filter, text, userOptions)
}
) */