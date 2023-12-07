/// <reference types="cypress" />

import loginPage from '../pages/loginPage';
import loggedInPage from '../pages/loggedInPage';
import forgotPasswordPage from '../pages/forgotPasswordPage';
import testData from '../../../fixtures/testData.json';

const PAGE_URL = testData.loginPageUrl;
const URERNAME = testData.userName;
const PASSWORD = testData.password;

let newTestData;
before('Get test data from JSON file', () => {
    cy.fixture("testData.json").then((dd) => {
        newTestData = dd;
    })
})

beforeEach('Navigating to the testing page', () => {
    cy.visit(PAGE_URL);
})

describe('Login page tests', () => {
    it('Verifying user login', () => {
        loginPage.act_login(URERNAME, PASSWORD);
        loggedInPage.ass_hasCorrectUserInfo("Brad Pitt");
        loggedInPage.ass_logOutLinkText('Sign out');
        cy.isPageTitleCorrect('My account - My Shop');
        cy.isPageUrlIncludeTargetPath('controller=my-account');
        cy.isElementHasCorrectSignature(loggedInPage.userNameInfo(), "Sign out")
    });

    it('Verifying user log-out', () => {

        loginPage.act_login(URERNAME, PASSWORD);
        loggedInPage.ass_hasCorrectUserInfo("Brad Pitt");
        loggedInPage.act_logOut();
        cy.url().should('include', 'authentication&back');
        cy.title().and('eq', 'Login - My Shop');
        cy.isElementHasCorrectSignature(loginPage.signInButton(), 'Sign in');
    });

    it('Verifying alert message for the login field', () => {
        loginPage.act_login(" ", PASSWORD);
        cy.isElementHasCorrectSignature(loginPage.errorMessage(), newTestData.loginFldErrorMessage)
    });

    it('Verifying alert message for the password field', () => {
        loginPage.act_login(URERNAME, " ");
        cy.isElementHasCorrectSignature(loginPage.errorMessage(), newTestData.passwordFldErrorMessage)
    });

    it('Verify alert messages using data-driven testing', () => {
        cy.fixture("loginData.json").then((data) => {
            data.forEach((userData) => {
                loginPage.act_login(userData.userName, userData.password);
                cy.isElementHasCorrectSignature(loginPage.errorMessage(), userData.targetErrorMessage);
                loginPage.act_clearLoginForm();
            })
        })
    });

    it('Verifying forgot your password link', () => {
        loginPage.act_clickForgotPasswordLnk();
        cy.isPageTitleCorrect('Forgot your password - My Shop');
        cy.isPageUrlIncludeTargetPath('controller=password');
        forgotPasswordPage.emailAddressFld().should('be.visible');
        forgotPasswordPage.retrievePasswordBtn().should('be.visible');
    });
});