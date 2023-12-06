class LoggedInPage {
    elements = {
        pageHeading: () => cy.xpath("//h1[@class='page-heading']"),
        logOutLink: () => cy.get(".logout")
    }

    getLogOutLinkText() {
        return this.elements.logOutLink().invoke('text').as('textFunction');
    }
}

export default new LoggedInPage();