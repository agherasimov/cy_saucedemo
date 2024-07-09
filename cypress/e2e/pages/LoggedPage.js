import GeneralPage from "./GeneralPage";
import Header from "./Header";
import Menu from "./Menu";

class LoggedPage extends GeneralPage {

    constructor() {
        super();
        this.header = new Header();
        this.menu = new Menu()
    }

    expandMenu() {
        this.header.expandMenu()
    }

    openCart() {
        this.header.openCart()
    }

    logout() {
        this.menu.logout()
    }

    navigateToAbout() {
        this.menu.navigateToAbout()
    }

    navigateToPlp() {
        this.menu.navigateToPlp()
    }

    resetSession() {
        this.menu.resetSession()
    }

    getBackToPlp() {
        this.header.getBackToPlp()
    }

    chooseSortingOption(option) {
        this.header.chooseSortingOption(option)
    }

}

export default LoggedPage;