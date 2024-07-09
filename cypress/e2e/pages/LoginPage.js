import GeneralPage from "./GeneralPage";
const Endpoints = require('../common/Endpoints');

class LoginPage extends GeneralPage {

    get username() { return cy.get('#user-name'); }
    get password() { return cy.get('#password'); }
    get loginButton() { return cy.get('#login-button'); }
    get alertMessage() { return cy.get('.error-message-container'); }

    navigate() {
        return super.navigate(Endpoints.LOGIN)
    }

    inputUsername(data) {
        this.username.type(data, {log: false})
    }

    inputPassword(data) {
        this.password.type(data, {log: false})
    }

    clickLogin() {
        this.loginButton.click()
    }
}

export default new LoginPage();