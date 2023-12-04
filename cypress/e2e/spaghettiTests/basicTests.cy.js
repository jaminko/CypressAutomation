describe('Basic test sute, its my introduction to cypress', () => {
    const PAGE_URL = "http://www.automationpractice.pl";

    it('Navigate to the My Shop web page and perform a search with valid search query', () => {
        cy.visit(PAGE_URL);
        cy.title().should('eq', 'My Shop');

        cy.get(".search_query", { setTimeout: 5000 }).type('dress').type('{enter}');
        cy.get(".page-heading").should('be.visible');
        cy.get(".lighter").contains("dress");

        cy.title().should('eq', 'Search - My Shop');
    })

    it('Navigate to the My Shop web page and perform a search with valid search query', () => {
        cy.visit(PAGE_URL);
        cy.title().should('eq', 'My Shop');

        cy.xpath("//input[@id='search_query_top']").type('dress');
        cy.xpath("//input[@id='search_query_top']").type('{enter}');

        cy.xpath("//ul[@class='product_list grid row']/li").should('have.length', 7);
    })
})