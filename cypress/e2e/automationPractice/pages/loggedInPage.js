class LoggedInPage {

    pageHeading = () => cy.xpath("//h1[@class='page-heading']");
    logOutLnk = () => cy.get(".logout");
    userNameInfoLnk = () => cy.get(".account span");

    act_logOut = () => {
        this.logOutLnk().click();
    }
}

export default new LoggedInPage();