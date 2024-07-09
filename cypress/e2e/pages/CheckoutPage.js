import LoggedPage from "./LoggedPage";
import FirstStepCheckout from "./FirstStepCheckout";
import SecondStepCheckout from "./SecondStepCheckout";
import ThankYou from "./ThankYou";
const Endpoints = require('../common/Endpoints');

class CheckoutPage extends LoggedPage {

    get cancelCheckoutButton() { return cy.get('#cancel'); }
    get continueCheckoutButton() { return cy.get('#continue'); }
    get finishCheckoutButton() {return cy.get('#finish');}

    constructor() {
        super()
        this.firstStepCheckout = new FirstStepCheckout()
        this.secondStepCheckout = new SecondStepCheckout()
        this.thankYou = new ThankYou()
    }

    navigate() {
        return super.navigate(Endpoints.FIRST_STEP_CHECKOUT)
    }

    continueCheckout() {
        this.continueCheckoutButton.click()
    }

    cancelCheckout() {
        this.cancelCheckoutButton.click()
    }

    finishCheckout() {
        this.finishCheckoutButton.click()
    }

    completeFirstCheckoutStep(firstName, lastName, postCode) {
        this.firstStepCheckout.populateFirstName(firstName)
        this.firstStepCheckout.populateLastName(lastName)
        this.firstStepCheckout.populatePostCode(postCode)

        this.continueCheckout()
    }

    validateOnCheckoutComplete(header, message) {
        this.thankYou.validateThankYouMessage(header, message)
    }

}

export default new CheckoutPage();