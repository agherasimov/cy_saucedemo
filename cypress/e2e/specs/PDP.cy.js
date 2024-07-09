import { PageTitles, Strings } from "../common/Constants.js"
import { ProductCard } from "../common/Selectors.js"
import { faker } from '@faker-js/faker/locale/en'
import ProductListPage from "../pages/ProductListPage"
import ProductDescriptionPage from "../pages/ProductDescriptionPage"

const Endpoints = require('../common/Endpoints');

describe("PDP functionality", () => {

    beforeEach(() => {
        cy.standardLogin()
        cy.assertHasText(ProductListPage.header.pageTitle, PageTitles.PLP)
    })

    it("user can navigate from PDP back to PLP" , function () {
       ProductListPage.productsList.selectRandomElements().each(randomElement => {
            cy.wrap(randomElement).as('product')
            cy.get('@product').find(ProductCard.Name).as('productName')
            cy.get('@productName').invoke('text')
                .then( text => { return text }).as('expectedName')
            cy.get('@product').find(ProductCard.Description).invoke('text')
                .then( text => { return text }).as('expectedDescription')
            cy.get('@product').find(ProductCard.Price).invoke('text')
                .then( text => { return text }).as('expectedPrice')
            cy.get('@productName').click();
       })

        cy.get('@expectedName').then(name => {
            cy.assertHasText(ProductDescriptionPage.productDetailName, name)
        })
        cy.get('@expectedDescription').then(description => {
            cy.assertHasText(ProductDescriptionPage.productDetailDescription, description)
        })
        cy.get('@expectedPrice').then(price => {
            cy.assertHasText(ProductDescriptionPage.productDetailPrice, price)
        })

       ProductDescriptionPage.getBackToPlp()

    })

    it("product can be added to cart from PDP" , function () {
        ProductListPage.productsList.selectRandomElements().each(randomElement => {
            cy.wrap(randomElement).find(ProductCard.Name).click();
        })

        ProductDescriptionPage.addToCart()
        cy.assertHasText(ProductDescriptionPage.header.cartIcon, 1)
    })

    it("product can removed from cart from PDP" , function () {
        let numberOfItems = 1
        ProductListPage.productsList.selectRandomElements(numberOfItems).each(randomElement => {
            cy.wrap(randomElement).as('selectedElement')
            cy.get('@selectedElement').find(ProductCard.Add_Button).click();
            cy.get('@selectedElement').find(ProductCard.Name).click();
        });

        cy.assertHasText(ProductDescriptionPage.header.cartIcon, numberOfItems.toString())
        cy.assertIsVisible(ProductDescriptionPage.productDetailRemoveButton)

        ProductDescriptionPage.removeFromCart()
        numberOfItems -= 1
        cy.assertHasText(ProductDescriptionPage.header.cartIcon, Strings.Empty)
    })

 })