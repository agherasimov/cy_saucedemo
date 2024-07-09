import LoggedPage from "./LoggedPage";
const Endpoints = require('../common/Endpoints');

class ProductDescriptionPage extends LoggedPage {
    get productDetailName() { return cy.get('.inventory_details_name'); }
    get productDetailDescription() { return cy.get('.inventory_details_desc'); }
    get productDetailPrice() { return cy.get('.inventory_details_price'); }
    get productDetailAddToCartButton() { return cy.get('#add-to-cart'); }
    get productDetailRemoveButton() { return cy.get('#remove'); }

    addToCart() {
        this.productDetailAddToCartButton.click()
    }

    removeFromCart() {
        this.productDetailRemoveButton.click()
    }
}

export default new ProductDescriptionPage();