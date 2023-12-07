/// <reference types="cypress" />

import loginPage from '../pages/loginPage';
import loggedInPage from '../pages/loggedInPage';
import testData from '../../../fixtures/testData.json';

const PAGE_URL = testData.loginPageUrl;
const URER_NAME = testData.userName;
const PASSWORD = testData.password;

let tD;
before('Get test data from JSON file', () => {
    cy.fixture("testData.json").then((dd) => {
        tD = dd;
    })
})

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
        cy.should('have.text')
    });

    it('Verify user log-out', () => {

        loginPage.act_login(URER_NAME, PASSWORD);
        loggedInPage.ass_hasCorrectUserInfo("Brad Pitt");
        loggedInPage.act_logOut();
        cy.url().should('include', 'authentication&back');
        cy.title().and('eq', 'Login - My Shop');
        cy.isElementHasCorrectSignature(loginPage.signInButton(), 'Sign in');
    });

    it('Verify alert message for the login field', () => {
        loginPage.act_login(" ", PASSWORD);
        cy.isElementHasCorrectSignature(loginPage.errorMessage(), tD.loginFldErrorMessage)
    });

    it('Verify alert message for the password field', () => {
        loginPage.act_login(URER_NAME, " ");
        cy.isElementHasCorrectSignature(loginPage.errorMessage(), tD.passwordFldErrorMessage)
    });

    it('Verify alert messages with different test data', () => {
        cy.fixture("loginData.json").then((data) => {
            data.forEach((userData) => {
                loginPage.act_login(userData.userName, userData.password);
                cy.isElementHasCorrectSignature(loginPage.errorMessage(), userData.targetErrorMessage);
                loginPage.act_clearLoginForm();
            })
        })
    });
});