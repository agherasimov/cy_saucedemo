import { PageTitles, Strings, Values} from "../common/Constants.js"
import { ProductCard } from "../common/Selectors.js"
import { faker } from '@faker-js/faker/locale/en'
import ProductListPage from "../pages/ProductListPage"
import CartPage from "../pages/CartPage"
import CheckoutPage from "../pages/CheckoutPage"

const Endpoints = require('../common/Endpoints');

describe("Checkout functionality", () => {

    beforeEach(() => {
        cy.standardLogin()
        cy.assertHasText(ProductListPage.header.pageTitle, PageTitles.PLP)
    })

    context("positive flow", () => {
        it("user can checkout from cart" , function () {
            let numberOfItems = faker.number.int({min: Values.Min_Number_Of_Products, max: Values.Max_Number_Of_Products})
            ProductListPage.productsList.selectRandomElements(numberOfItems).each(randomElement => {
                cy.clickOnChildElement(randomElement, ProductCard.Add_Button)
            });

            ProductListPage.openCart();
            cy.assertIsOnPage(Endpoints.CART)
            CartPage.checkout()
            cy.assertIsOnPage(Endpoints.FIRST_STEP_CHECKOUT)
        })

        it("user can place order" , function () {
           let numberOfItems = faker.number.int({min: Values.Min_Number_Of_Products, max: Values.Max_Number_Of_Products})
           let totalPriceWithotTax = 0
           ProductListPage.productsList.selectRandomElements(numberOfItems).each(randomElement => {
                cy.wrap(randomElement).as('selectedElement')
                cy.get('@selectedElement').find(ProductCard.Add_Button).click();
                cy.get('@selectedElement').find(ProductCard.Price).then($sometext => {
                    totalPriceWithotTax = totalPriceWithotTax + parseFloat($sometext.text().replace("$", ''))
                    cy.wrap(totalPriceWithotTax).as('Total')
                })
           });

           ProductListPage.openCart();
           cy.assertIsOnPage(Endpoints.CART)
           CartPage.checkout()
           cy.assertIsOnPage(Endpoints.FIRST_STEP_CHECKOUT)

           CheckoutPage.completeFirstCheckoutStep(faker.person.firstName(),
           faker.person.lastName(), faker.location.zipCode())

            cy.get('@Total').then(val => {
                cy.assertHasText(CheckoutPage.secondStepCheckout.itemTotal, val)
            })
            cy.assertLength(CheckoutPage.secondStepCheckout.itemsAtCheckout, numberOfItems)

            CheckoutPage.finishCheckout()
            cy.assertIsOnPage(Endpoints.THANK_YOU)
            CheckoutPage.validateOnCheckoutComplete(Strings.Checkout_Complete_Header, Strings.Checkout_Complete_Message)
        })

        it("user can cancel checkout on first step" , function () {
            let numberOfItems = faker.number.int({min: Values.Min_Number_Of_Products, max: Values.Max_Number_Of_Products})
            ProductListPage.productsList.selectRandomElements(numberOfItems).each(randomElement => {
                cy.clickOnChildElement(randomElement, ProductCard.Add_Button)
            });

            ProductListPage.openCart();
            cy.assertIsOnPage(Endpoints.CART)
            CartPage.checkout()
            cy.assertIsOnPage(Endpoints.FIRST_STEP_CHECKOUT)

            CheckoutPage.cancelCheckout()
            cy.assertIsOnPage(Endpoints.CART)
        })

        it("user can cancel checkout on second step" , function () {
            let numberOfItems = faker.number.int({min: Values.Min_Number_Of_Products, max: Values.Max_Number_Of_Products})
            ProductListPage.productsList.selectRandomElements(numberOfItems).each(randomElement => {
                cy.clickOnChildElement(randomElement, ProductCard.Add_Button)
            });

            ProductListPage.openCart();
            cy.assertIsOnPage(Endpoints.CART)
            CartPage.checkout()
            cy.assertIsOnPage(Endpoints.FIRST_STEP_CHECKOUT)

            CheckoutPage.completeFirstCheckoutStep(faker.person.firstName(),
                faker.person.lastName(), faker.location.zipCode())

            CheckoutPage.cancelCheckout()
            cy.assertIsOnPage(Endpoints.PLP)
        })

    })

    context("negative flow", () => {
        it("user cannot checkout without products in cart" , function () {
            ProductListPage.openCart();
            cy.assertIsOnPage(Endpoints.CART)
            cy.assertIsDisabled(CartPage.checkoutButton)
        })

        it("user cannot checkout after session reset" , function () {
            let numberOfItems = faker.number.int({min: Values.Min_Number_Of_Products, max: Values.Max_Number_Of_Products})
            ProductListPage.productsList.selectRandomElements(numberOfItems).each(randomElement => {
                cy.clickOnChildElement(randomElement, ProductCard.Add_Button)
            });

            ProductListPage.openCart();
            cy.assertIsOnPage(Endpoints.CART)
            CartPage.checkout()
            cy.assertIsOnPage(Endpoints.FIRST_STEP_CHECKOUT)

            CartPage.expandMenu()
            CartPage.resetSession()
            cy.assertIsOnPage(Endpoints.PLP)
        })

    })

 })