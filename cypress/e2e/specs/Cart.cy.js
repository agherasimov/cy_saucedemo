import { PageTitles, Strings, Values } from "../common/Constants.js"
import { ProductCard, Cart } from "../common/Selectors.js"
import { faker } from '@faker-js/faker/locale/en';
import ProductListPage from "../pages/ProductListPage"
import CartPage from "../pages/CartPage"

const Endpoints = require('../common/Endpoints');

describe("Cart functionality", () => {

    beforeEach(() => {
        cy.standardLogin()
        cy.assertHasText(ProductListPage.header.pageTitle, PageTitles.PLP)
    })

    it("user can remove product from cart" , function () {
        let numberOfItems = faker.number.int({min: Values.Min_Number_Of_Products, max: Values.Max_Number_Of_Products})
        ProductListPage.productsList.selectRandomElements(numberOfItems).each(randomElement => {
            cy.wrap(randomElement).find(ProductCard.Add_Button).click();
        });

        ProductListPage.openCart();
        cy.assertIsOnPage(Endpoints.CART)
        cy.assertLength(CartPage.itemsInCart, numberOfItems)

        CartPage.itemsInCart.find(Cart.Remove_Button).first().click();
        numberOfItems -= 1
        cy.assertLength(CartPage.itemsInCart, numberOfItems)
    })

    it("user can navigate from cart back to PLP" , function () {
        ProductListPage.productsList.selectRandomElements().each(randomElement => {
            cy.wrap(randomElement).find(ProductCard.Add_Button).click();
        });

        ProductListPage.openCart();
        cy.assertIsOnPage(Endpoints.CART)
        CartPage.continueShopping()
        cy.assertIsOnPage(Endpoints.PLP)
    })

    it("user can checkout from cart" , function () {
        ProductListPage.productsList.selectRandomElements().each(randomElement => {
            cy.wrap(randomElement).find(ProductCard.Add_Button).click();
        });

        ProductListPage.openCart();
        cy.assertIsOnPage(Endpoints.CART)
        CartPage.checkout()
        cy.assertIsOnPage(Endpoints.FIRST_STEP_CHECKOUT)
    })

 })