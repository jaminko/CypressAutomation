import loginPage from '../pages/loginPage';
import loggedInPage from '../pages/loggedInPage';
import testData from '../../../fixtures/testData.json'

const PAGE_URL = testData.loginPageUrl;
const URER_NAME = testData.userName;
const PASSWORD = testData.password;

describe('Login Test', () => {
    it('User should login successfully', () => {
        cy.visit(PAGE_URL);
        cy.fixture('testData.json').as('usersData');

        loginPage.login(URER_NAME, PASSWORD);

        cy.url().should('include', 'controller=my-account');
        cy.title().and('eq', 'My account - My Shop');

        loggedInPage.getLogOutLinkText().should('contain', 'Sign out');
    });
});