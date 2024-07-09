import { PageTitles, Strings, SortingOptions } from "../common/Constants.js"
import { ProductCard } from "../common/Selectors.js"
import { faker } from '@faker-js/faker/locale/en'
import ProductListPage from "../pages/ProductListPage"

const Endpoints = require('../common/Endpoints');

describe("PLP functionality", () => {

    beforeEach(() => {
        cy.standardLogin()
        cy.assertHasText(ProductListPage.header.pageTitle, PageTitles.PLP)
    })

    it("products can be sorted DESC by name" , function () {
        let productNames = []
        let productNamesAfterSort = []
        cy.wrap(productNames).as('productsNameArray')
        cy.wrap(productNamesAfterSort).as('afterSortProductsArray')
            ProductListPage.productsList.each(element => {
                cy.wrap(element).find(ProductCard.Name).invoke('text'). then( text => {
                        let elemName = text;
                        cy.wrap(elemName).as('elemName')
            })

            cy.get('@productsNameArray').then(array => { cy.get('@elemName').then(val => { array.push(val) }) })
        })

        ProductListPage.chooseSortingOption(SortingOptions.Name_Descending)

        ProductListPage.productsList.each(element => {
            cy.wrap(element).find(ProductCard.Name).invoke('text'). then( text => {
                let elemName = text;
                cy.wrap(elemName).as('afterSortElem')
            })

            cy.get('@afterSortProductsArray').then(array => { cy.get('@afterSortElem').then(val => { array.push(val) }) })
        })

        cy.get('@productsNameArray').then(array => {
            array.sort().reverse()
            cy.get('@afterSortProductsArray').then(afterSortArray => {
                cy.compareArrays(afterSortArray, array)
            })
        })
    })

    it("products can be sorted DESC by price" , function () {
        let productPrices = []
        let productPricesAfterSort = []
        cy.wrap(productPrices).as('productPricesArray')
        cy.wrap(productPricesAfterSort).as('afterSortProductsArray')

        ProductListPage.productsList.each(element => {
            cy.wrap(element).find(ProductCard.Price).invoke('text'). then( text => {
               let elemName = text.replace("$", '');
               cy.wrap(elemName).as('elemPrice')
            })

            cy.get('@productPricesArray').then(array => { cy.get('@elemPrice')
                .then(val => { array.push(parseFloat(val)) }) })
        })

        ProductListPage.chooseSortingOption(SortingOptions.Price_Descending)

        ProductListPage.productsList.each(element => {
            cy.wrap(element).find(ProductCard.Price).invoke('text'). then( text => {
                let elemName = text.replace("$", '');
                cy.wrap(elemName).as('afterSortElem')
            })

            cy.get('@afterSortProductsArray').then(array => { cy.get('@afterSortElem')
                .then(val => { array.push(parseFloat(val)) }) })
        })

        cy.get('@productPricesArray').then(array => {
            cy.get('@afterSortProductsArray').then(afterSortArray => {
                cy.compareArrays(afterSortArray, array.sort((a, b) => {return a- b}).reverse())
            })
        })
    })

    it("product can added to cart from PLP" , function () {
        let numberOfItems = 1
        ProductListPage.productsList.selectRandomElements(numberOfItems).each(randomElement => {
            cy.wrap(randomElement).find(ProductCard.Add_Button).as('selectedElementButton')
            cy.get('@selectedElementButton').click();
        });

        cy.assertHasText(cy.get('@selectedElementButton'), Strings.Remove_Product)
        cy.assertHasText(ProductListPage.header.cartIcon, numberOfItems.toString())
    })

    it("product can removed from cart from PLP" , function () {
       let numberOfItems = 1
       ProductListPage.productsList.selectRandomElements(numberOfItems).each(randomElement => {
            cy.wrap(randomElement).find(ProductCard.Add_Button).as('selectedElementButton')
            cy.get('@selectedElementButton').click();
       });

       cy.assertHasText(cy.get('@selectedElementButton'), Strings.Remove_Product)
       cy.assertHasText(ProductListPage.header.cartIcon, numberOfItems.toString())

       cy.get('@selectedElementButton').click()
       cy.assertHasText(cy.get('@selectedElementButton'), Strings.Add_Product)
       numberOfItems -= 1
       cy.assertHasText(ProductListPage.header.cartIcon, Strings.Empty)
    })

 })