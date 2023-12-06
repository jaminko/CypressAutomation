describe('ASSERTIONS', () => {
    const PAGE_URL = "http://www.automationpractice.pl/index.php?controller=authentication&back=my-account";
    const URER_NAME = "yaugoitrepece-1938@yopmail.com";
    const PASSWORD = "Qwerty12345!";

    it('EXPLICIT ASSERTIONS - BDD and TDD asserts styles', () => {
        let expectedBtnLogoutText = "\n\t\t\tSign out\n\t\t";
        cy.visit(PAGE_URL);

        cy.get('#login_form').should('be.visible');
        cy.xpath("//input[@id='email']").type(URER_NAME);
        cy.xpath("//input[@id='passwd']").type(PASSWORD);
        cy.xpath("//button[@id='SubmitLogin']").click();

        cy.xpath("//h1[@class='page-heading']")
            .should('be.visible')
            .and('exist');

        cy.get(".logout").then((x) => {
            let btnLogoutText = x.text();

            // BDD STYLE
            expect(expectedBtnLogoutText).to.equal(btnLogoutText);
            expect(expectedBtnLogoutText).to.not.equal('Sign in');

            // TDD STYLE
            assert.equal(btnLogoutText, expectedBtnLogoutText);
        })
        cy.contains('.logout', 'Sign out');
    });

    it('IMPLICIT ASSERTIONS - Verivy URL positive test', () => {
        cy.visit(PAGE_URL)

        cy.url() // should + and
            .should('include', 'my-account')
            .and('eq', PAGE_URL)
            .and('contain', '.php');
    });

    it('IMPLICIT ASSERTIONS - Verivy URL negative test', () => {
        cy.visit(PAGE_URL);

        cy.url() // should + and + not
            .should('not.include', 'setup')
            .and('not.eq', 'http://www.ukr.net/')
            .and('not.contain', '.csv');
    });

    it('IMPLICIT ASSERTIONS - Verivy title test', () => {
        cy.visit(PAGE_URL);

        cy.title() // should + and + not
            .should('include', 'Login')
            .and('eq', 'Login - My Shop')
            .and('not.contain', 'Setup');
    });

    it('IMPLICIT ASSERTIONS - Verivy login form test', () => {
        cy.visit(PAGE_URL);

        cy.get('#login_form').should('be.visible');
        cy.xpath("//input[@id='email']").should('be.visible');
        cy.xpath("//input[@id='passwd']").should('be.visible');
    });

    it('IMPLICIT ASSERTIONS - Verivy if user can sign-in test', () => {
        cy.visit(PAGE_URL);

        cy.get('#login_form').should('be.visible');
        cy.xpath("//input[@id='email']").type(URER_NAME);
        cy.xpath("//input[@id='email']").should('have.value', URER_NAME);

        cy.xpath("//input[@id='passwd']").type(PASSWORD);
        cy.xpath("//button[@id='SubmitLogin']").click();

        cy.url().should('include', 'controller=my-account');
        cy.title().and('eq', 'My account - My Shop');
        cy.xpath("//h1[@class='page-heading']")
            .should('be.visible')
            .and('exist');

        cy.xpath("//a").should('have.length', 51);
        cy.get(".logout").invoke('text').as('textFunction').should('contain', 'Sign out');
    });
});