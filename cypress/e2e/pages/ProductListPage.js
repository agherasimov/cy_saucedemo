import LoggedPage from "./LoggedPage";
const Endpoints = require('../common/Endpoints');

class ProductListPage extends LoggedPage {

    get productsList() { return cy.get('.inventory_item'); }

    navigate() {
        return super.navigate(Endpoints.PLP)
    }

}

export default new ProductListPage();