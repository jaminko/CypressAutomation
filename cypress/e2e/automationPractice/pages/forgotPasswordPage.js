export default class ForgotPasswordPage {
  emailAddressFld = () => cy.get("#email");
  retrievePasswordBtn = () => cy.get("fieldset button[type='submit']");

  act_clickRetrievePasswordBtn() {
    return this.retrievePasswordBtn().click();
  }

  act_inputEmailAddress(userEmailAddress) {
    return this.emailAddressFld().type(userEmailAddress);
  }
}
