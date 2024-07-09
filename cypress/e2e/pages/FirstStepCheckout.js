export default class FirsStepCheckout {

    get firstNameInput() { return cy.get('#first-name'); }
    get lastNameInput() { return cy.get('#last-name'); }
    get zipInput() { return cy.get('#postal-code'); }

    populateFirstName(data) {
        this.firstNameInput.type(data)
    }

    populateLastName(data) {
        this.lastNameInput.type(data)
    }

    populatePostCode(data) {
        this.zipInput.type(data)
    }
}