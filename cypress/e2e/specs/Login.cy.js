import { ErrorMessages } from "../common/errorMessages.js"
import { PageTitles } from "../common/Constants.js"
import { faker } from '@faker-js/faker/locale/en'
import LoginPage from "../pages/LoginPage"
import ProductListPage from "../pages/ProductListPage"

describe("Login functionality", () => {

const validUsers = require('../../fixtures/valid_user.json')
const invalidUsers = require('../../fixtures/invalid_users.json')

    context("positive flow", () => {
        validUsers.forEach((user) => {
            it("successful user login: " + user.username, function () {
                cy.login(user.username, user.password)
                cy.assertHasText(ProductListPage.header.pageTitle, PageTitles.PLP)
            })
        })
    })

    context("negative flow", () => {
        invalidUsers.forEach((user) => {
            it("unsuccessful user login: " + user.username , function () {
                cy.login(user.username, user.password)
                cy.assertHasText(LoginPage.alertMessage, user.error_message)
            })
        })

        it("unsuccessful user login: empty fields" , function () {
            LoginPage.navigate()
            LoginPage.clickLogin()
            cy.assertHasText(LoginPage.alertMessage, ErrorMessages.USERNAME_REQUIRED)
        })

        it("unsuccessful user login: empty password field" , function () {
            LoginPage.navigate()
            LoginPage.inputUsername(faker.internet.userName())
            LoginPage.clickLogin()
            cy.assertHasText(LoginPage.alertMessage, ErrorMessages.PASSWORD_REQUIRED)
        })
    })
})