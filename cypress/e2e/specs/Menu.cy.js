import { PageTitles, ExternalPages, Strings } from "../common/Constants.js"
import { ProductCard } from "../common/Selectors.js"
import { faker } from '@faker-js/faker/locale/en'
import ProductListPage from "../pages/ProductListPage"

const Endpoints = require('../common/Endpoints');

describe("Menu functionality", () => {

    beforeEach(() => {
        cy.standardLogin()
        cy.assertHasText(ProductListPage.header.pageTitle, PageTitles.PLP)
    })

    it("user can logout" , function () {
        ProductListPage.expandMenu()
        ProductListPage.logout()
        cy.assertIsOnPage(Endpoints.LOGIN)
    })

    it("user can navigate to about" , function () {
         ProductListPage.expandMenu()
         ProductListPage.navigateToAbout()
         cy.assertIsOnExternalPage(ExternalPages.About)
    })

    it("user can navigate to PLP" , function () {
        ProductListPage.openCart()
        ProductListPage.expandMenu()
        ProductListPage.navigateToPlp()
        cy.assertIsOnPage(Endpoints.PLP)
    })

    it("user can reset session" , function () {
        let numberOfItems = 1
        ProductListPage.productsList.selectRandomElements(numberOfItems).each(randomElement => {
            cy.wrap(randomElement).as('selectedElement')
            cy.get('@selectedElement').find(ProductCard.Add_Button).click();
        });
        cy.assertHasText(cy.get('@selectedElement')
            .find(ProductCard.Add_Button), Strings.Remove_Product)
        cy.assertHasText(ProductListPage.header.cartIcon, numberOfItems.toString())

        ProductListPage.expandMenu()
        ProductListPage.resetSession()
        cy.assertHasText(ProductListPage.header.cartIcon, Strings.Empty)
        cy.get('@selectedElement').scrollIntoView()
        cy.assertHasText(cy.get('@selectedElement').find(ProductCard.Add_Button), Strings.Add_Product)
    })
})