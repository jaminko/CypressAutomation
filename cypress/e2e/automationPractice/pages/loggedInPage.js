/// <reference types="cypress" />

class LoggedInPage {

    pageHeading = () => cy.xpath("//h1[@class='page-heading']");
    logOutLink = () => cy.get(".logout");
    userNameInfo = () => cy.get(".header_user_info a span");

    ass_logOutLinkText(targetText) {
        return this.logOutLink().should('contain', targetText);
    }

    ass_hasCorrectUserInfo(targetText) {
        return this.userNameInfo().should('contain', targetText);
    }

    act_logOut = () => {
        this.logOutLink().click();
    }
}

export default new LoggedInPage();