/// <reference types="cypress" />

import loginPage from '../pages/loginPage';
import loggedInPage from '../pages/loggedInPage';
import testData from '../../../fixtures/testData.json';

const PAGE_URL = testData.loginPageUrl;
const URER_NAME = testData.userName;
const PASSWORD = testData.password;

beforeEach('Navigate to the testing page', () => {
    cy.visit(PAGE_URL);
})

describe('Login feature tests', () => {
    it('Verify user login', () => {

        loginPage.act_login(URER_NAME, PASSWORD);
        loggedInPage.ass_hasCorrectUserInfo("Brad Pitt");
        loggedInPage.ass_logOutLinkText('Sign out');
        cy.isPageTitleCorrect('My account - My Shop');
        cy.isPageUrlIncludeTargetPath('controller=my-account');
    });

    it('Verify user log-out', () => {

        loginPage.act_login(URER_NAME, PASSWORD);
        loggedInPage.ass_hasCorrectUserInfo("Brad Pitt");
        loggedInPage.act_logOut();
        cy.url().should('include', 'authentication&back');
        cy.title().and('eq', 'Login - My Shop');
        cy.isElementHasCorrectSignature(loginPage.signInButton(), 'Sign in');
    });
});