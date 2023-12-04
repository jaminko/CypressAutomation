class WomenPage {
    elements = {
        dropDown: () => cy.get("#selectProductSort"),
        targetDropDownText: () => cy.xpath("//div[@id='uniform-selectProductSort']/span")
    }

    selectDropDown(value) {
        this.elements.dropDown().select(value);
        this.elements.targetDropDownText().should('have.text', value)
    }
}

export default new WomenPage();