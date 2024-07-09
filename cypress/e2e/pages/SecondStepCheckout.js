export default class SecondStepCheckout {

    get itemsAtCheckout() { return cy.get('.cart_item_label'); }
    get itemTotal() { return cy.get('.summary_subtotal_label'); }
}