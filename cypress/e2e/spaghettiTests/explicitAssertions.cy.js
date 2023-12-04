describe('EXPLICIT ASSERTIONS', () => {
    const PAGE_URL = "http://www.automationpractice.pl/index.php?controller=authentication&back=my-account";
    const URER_NAME = "yaugoitrepece-1938@yopmail.com";
    const PASSWORD = "Qwerty12345!";

    it('BDD AND TDD ASSERT STYLES', () => {
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
});