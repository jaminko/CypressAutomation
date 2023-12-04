class LoginPage {
    elements = {
        usernameInput: () => cy.xpath("//input[@id='email']"),
        passwordInput: () => cy.xpath("//input[@id='passwd']"),
        loginButton: () => cy.xpath("//button[@id='SubmitLogin']")
    }

    login(username, password) {
        this.elements.usernameInput().type(username);
        this.elements.passwordInput().type(password);
        this.elements.loginButton().click();
    }
}

export default new LoginPage();