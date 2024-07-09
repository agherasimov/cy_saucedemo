class GeneralPage {

    constructor() {}

    navigate(url) {
        return cy.visit(url)
    }

}

export default GeneralPage;