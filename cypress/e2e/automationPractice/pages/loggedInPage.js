/// <reference types="cypress" />

class LoggedInPage {

    pageHeading = () => cy.xpath("//h1[@class='page-heading']");
    logOutLnk = () => cy.get(".logout");
    userNameInf = () => cy.get(".header_user_info a");

    ass_hasLogOutLnkCorrectSignature(targetText) {
        return this.logOutLnk().should('contain', targetText);
    }

    ass_hasCorrectUserInfo(targetText) {
        return this.userNameInf().should('contain', targetText);
    }

    act_logOut = () => {
        this.logOutLnk().click();
    }
}

export default new LoggedInPage();