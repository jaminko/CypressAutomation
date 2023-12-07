class LoginPage {
    signInButton = () => cy.get(".login");
    usernameInput = () => cy.xpath("//input[@id='email']");
    passwordInput = () => cy.xpath("//input[@id='passwd']");
    loginButton = () => cy.xpath("//button[@id='SubmitLogin']");
    errorMessage = () => cy.get(".alert-danger ol");

    act_login = (username, password) => {
        this.usernameInput().type(username);
        this.passwordInput().type(password);
        this.loginButton().click();
    }

    act_clearLoginForm = () => {
        this.usernameInput().clear();
        this.passwordInput().clear();
    }
}

export default new LoginPage();