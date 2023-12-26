/// <reference types="cypress" />

import loginPage from "../pages/loginPage";
import loggedInPage from "../pages/loggedInPage";
import forgotPasswordPage from "../pages/forgotPasswordPage";
import testData from "../../../fixtures/testData.json";

const PAGE_URL = testData.loginPageUrl;
const URERNAME = testData.userName;
const PASSWORD = testData.password;

let newTestData;
before("Get test data from JSON file", () => {
  cy.fixture("testData.json").then((dd) => {
    newTestData = dd;
  });
});

beforeEach("Navigating to the testing page", () => {
  cy.visit(PAGE_URL);
});

describe("Login page tests", () => {
  it("Verifying user login", () => {
    loginPage.act_login(URERNAME, PASSWORD);
    cy.isElementHasCorrectSignature(loggedInPage.pageHeading(), "My account");
    cy.isElementHasCorrectSignature(
      loggedInPage.userNameInfoLnk(),
      "Brad Pitt"
    );
    cy.isElementHasCorrectSignature(loggedInPage.logOutLnk(), "Sign out");
    cy.isPageTitleCorrect("My account - My Shop");
    cy.isPageUrlIncludeTargetPath("controller=my-account");
  });

  it("Verifying user log-out", () => {
    loginPage.act_login(URERNAME, PASSWORD);
    cy.isElementHasCorrectSignature(
      loggedInPage.userNameInfoLnk(),
      "Brad Pitt"
    );
    loggedInPage.act_logOut();
    cy.url().should("include", "uthentication&back");
    cy.title().and("eq", "Login - My Shop");
    cy.isElementHasCorrectSignature(loginPage.signInBtn(), "Sign in");
  });

  it("Verifying alert message for the login field", () => {
    loginPage.act_login(" ", PASSWORD);
    cy.isElementHasCorrectSignature(
      loginPage.errorMsg(),
      newTestData.loginFldErrorMessage
    );
  });

  it("Verifying alert message for the password field", () => {
    loginPage.act_login(URERNAME, " ");
    cy.isElementHasCorrectSignature(
      loginPage.errorMsg(),
      newTestData.passwordFldErrorMessage
    );
  });

  it("Verify alert messages using data-driven testing", () => {
    cy.fixture("loginData.json").then((data) => {
      data.forEach((userData) => {
        loginPage.act_login(userData.userName, userData.password);
        cy.isElementHasCorrectSignature(
          loginPage.errorMsg(),
          userData.targetErrorMessage
        );
        loginPage.act_clearLoginForm();
      });
    });
  });

  it("Verifying forgot your password link", () => {
    loginPage.act_clickForgotPasswordLnk();
    cy.isPageTitleCorrect("Forgot your password - My Shop");
    cy.isPageUrlIncludeTargetPath("controller=password");
    forgotPasswordPage.emailAddressFld().should("be.visible");
    forgotPasswordPage.retrievePasswordBtn().should("be.visible");
  });
});
