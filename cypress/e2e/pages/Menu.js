export default class Menu {

    get plpLink() { return cy.get('#inventory_sidebar_link'); }
    get aboutLink() { return cy.get('#about_sidebar_link'); }
    get logoutLink() { return cy.get('#logout_sidebar_link'); }
    get resetSessionLink() { return cy.get('#reset_sidebar_link'); }
    get closeMenuIcon() { return cy.get('#react-burger-cross-btn'); }

    logout() {
        this.logoutLink.click()
    }

    navigateToAbout() {
        this.aboutLink.click()
    }

    navigateToPlp() {
        this.plpLink.click()
    }

    closeMenu() {
        this.closeMenuIcon.click()
    }

    resetSession() {
        this.resetSessionLink.click()
        this.closeMenu()
    }
}