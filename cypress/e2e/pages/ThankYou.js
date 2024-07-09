export default class ThankYou {

    get thankYouHeader() { return cy.get('.complete-header'); }
    get thankYouMessage() { return cy.get('.complete-text'); }
    get backToProductsButton() { return cy.get('#back-to-products'); }

    validateThankYouMessage(header, message) {
        cy.assertHasText(this.thankYouHeader, header)
        cy.assertHasText(this.thankYouMessage, message)
    }
}