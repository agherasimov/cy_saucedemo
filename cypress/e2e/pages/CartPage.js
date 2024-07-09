import LoggedPage from "./LoggedPage";
const Endpoints = require('../common/Endpoints');

class CartPage extends LoggedPage {

    get continueShoppingButton() { return cy.get('#continue-shopping'); }
    get checkoutButton() { return cy.get('#checkout'); }
    get itemsInCart() { return cy.get('.cart_item_label'); }

    navigate() {
        return super.navigate(Endpoints.CART)
    }

    continueShopping() {
        this.continueShoppingButton.click()
    }

    checkout() {
        this.checkoutButton.click()
    }
}

export default new CartPage();