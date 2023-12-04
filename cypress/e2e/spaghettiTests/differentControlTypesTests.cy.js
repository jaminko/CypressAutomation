describe('Tests for different control types', () => {

    it('Drop-down with select tag test', () => {
        cy.visit("http://www.automationpractice.pl/index.php?id_category=3&controller=category");

        cy.get("#selectProductSort").select('In stock');
        cy.xpath("//div[@id='uniform-selectProductSort']/span").should('have.text', 'In stock')

    });

    it('Autosuggest drop-down test', () => {
        cy.visit("https://en.wikipedia.org/w/index.php?search=&title=Special:Search");

        cy.xpath("//input[@title = 'Search Wikipedia [alt-shift-f]']").type('Ukraine');
        cy.get(".cdx-menu-item").contains('Ukraine national football team').click();

    });

    it('Autosuggest field test', () => {
        cy.visit("https://www.google.com/");

        cy.xpath("//textarea[@name='q']").type('Cypress automation');
        cy.wait(500);

        cy.get(".lnnVSe").should('have.length', 12);
        cy.get(".lnnVSe").each(($el, index, $list) => {
            if ($el.text() == 'cypress automation framework structureХіп-хоп гурт') {
                cy.wrap($el).click();
            }
        })
    });
});