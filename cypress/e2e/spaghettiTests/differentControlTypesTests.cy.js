import practicePage from '../pageObject/pages/womenPage';

const DROP_DOWN_OPTIONS = ['In stock', 'Price: Highest first', 'Reference: Lowest first', 'Price: Lowest first', 'Reference: Lowest first'];

describe('Tests for different control types', () => {

    it('Drop-down test', () => {
        cy.visit("http://www.automationpractice.pl/index.php?id_category=3&controller=category");

        let dropDown = cy.get("#selectProductSort");
        let targetDropDownText = cy.xpath("//div[@id='uniform-selectProductSort']/span");

        DROP_DOWN_OPTIONS.forEach(option =>
            dropDown.select(value),
            targetDropDownText.should('have.text', value)
        );
    });
});

it('Field with auto suggestion test', () => {
    cy.visit("https://en.wikipedia.org/w/index.php?search=&title=Special:Search");

    practicePage.elements.autoSuggessionExample().type('New');


});