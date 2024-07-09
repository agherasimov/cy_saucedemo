export default class Header {

    get burgerMenuIcon() { return cy.get('#react-burger-menu-btn'); }
    get pageTitle() { return cy.get('.header_secondary_container'); }
    get cartIcon() { return cy.get('#shopping_cart_container'); }
    get plpSortDropdown() { return cy.get('.product_sort_container'); }
    get plpActiveSortingOption() { return cy.get('.active_option'); }
    get backToPlpButton() { return cy.get('#back-to-products'); }

    expandMenu() {
        this.burgerMenuIcon.click()
    }

    openCart() {
        this.cartIcon.click()
    }

    getBackToPlp() {
        this.backToPlpButton.click()
    }

    chooseSortingOption(option) {
        this.plpSortDropdown.select(option)
    }
}