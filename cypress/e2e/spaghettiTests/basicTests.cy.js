describe('BASIC TEST SUITE - its my introduction to cypress', () => {
    const PAGE_URL = "http://www.automationpractice.pl";

    it('Perform a search with valid search query - V1', () => {
        cy.visit(PAGE_URL);
        cy.title().should('eq', 'My Shop');

        cy.get(".search_query", { setTimeout: 5000 }).type('dress').type('{enter}');
        cy.get(".page-heading").should('be.visible');
        cy.get(".lighter").contains("dress");

        cy.title().should('eq', 'Search - My Shop');
    })

    it('Perform a search with valid search query - V2', () => {
        cy.visit(PAGE_URL);
        cy.title().should('eq', 'My Shop');

        cy.xpath("//input[@id='search_query_top']").type('dress');
        cy.xpath("//input[@id='search_query_top']").type('{enter}');

        cy.xpath("//ul[@class='product_list grid row']/li").should('have.length', 7);
    })

    it('Mouse actions - hovering', () => {
        cy.visit("https://demo.opencart.com/");
        cy.xpath("//a[contains(text(),'Mac (1)')]").should('not.be.visible');

        cy.xpath("//body/main[1]/div[1]/nav[1]/div[2]/ul[1]/li[1]/a[1]").trigger('mouseover').click();
        cy.xpath("//a[contains(text(),'Mac (1)')]").should('be.visible');
    });

    it('Mouse actions - right click', () => {
        cy.visit("https://swisnl.github.io/jQuery-contextMenu/demo.html");

        //Approach 1
        cy.xpath("//span[@class='context-menu-one btn btn-neutral']").trigger('contextmenu');
        cy.get(".context-menu-icon-copy").should('be.visible');
        cy.get(".context-menu-icon-copy").click();
        cy.get(".context-menu-icon-copy").should('not.be.visible');

        //Approach 2
        cy.xpath("//span[@class='context-menu-one btn btn-neutral']").rightclick();
        cy.get(".context-menu-icon-copy").should('be.visible');
    });

    it('Mouse actions - double click', () => {
        cy.visit("https://demo.opencart.com/index.php?route=account/login");

        cy.get("#input-email").type("wellcome").dblclick();
        cy.get("#input-email").should('have.value', "wellcome");

        cy.get("#input-email").type('{enter}')
        cy.get("#input-email").should('have.value', "");
    });

    it('Mouse actions - page scrolling', () => {
        cy.visit("https://www.countries-ofthe-world.com/flags-of-the-world.html");

        // Scrolling to Ukraine flag
        cy.xpath("//img[@alt='Flag of Ukraine']").scrollIntoView({ duration: 2000 });
        cy.xpath("//img[@alt='Flag of Ukraine']").should('be.visible');

        // Scrolling to Ukraine flag
        cy.xpath("//img[@alt='Flag of Mexico']").scrollIntoView({ duration: 2000 });
        cy.xpath("//img[@alt='Flag of Mexico']").should('be.visible');
    });
})