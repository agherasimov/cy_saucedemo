import LoginPage from "../e2e/pages/LoginPage"
import LoggedPage from "../e2e/pages/LoggedPage"

const validUsers = require('../fixtures/valid_user.json')

Cypress.Commands.add('login', (username, password) => {
    LoginPage.navigate()
    LoginPage.inputUsername(username)
    LoginPage.inputPassword(password)
    LoginPage.clickLogin()
})

Cypress.Commands.add('standardLogin', () => {
    cy.login(validUsers[0].username, validUsers[0].password)
})

Cypress.Commands.add('assertHasText', (field, message) => {
     return field.should('contains.text', message);
})

Cypress.Commands.add('assertLength', (field, value) => {
    return field.should('have.length', value)
})

Cypress.Commands.add('assertIsDisabled', (field) => {
    return field.should('be.disabled');
})

Cypress.Commands.add('assertIsVisible', (field) => {
    return field.should('be.visible')
})

Cypress.Commands.add('assertIsOnPage', (value) => {
    return cy.url().should('eq', Cypress.config('baseUrl') + value)
})

Cypress.Commands.add('assertIsOnExternalPage', (value) => {
    return cy.url().should('eq', value)
})

Cypress.Commands.add('selectRandomElements', { prevSubject: 'element' }, (subject, size = 1) => {
  cy.wrap(subject).then(elementList => {
    elementList = (elementList.jquery) ? elementList.get() : elementList;
    elementList = Cypress._.sampleSize(elementList, size);
    elementList = (elementList.length > 1) ? elementList : elementList[0];
    cy.wrap(elementList);
  });
});

Cypress.Commands.add('clickOnChildElement', (element, childElement) => {
    cy.wrap(element).find(childElement).click();
})

Cypress.Commands.add('compareArrays', (arrA, arrB) => {
     expect(arrA.length).to.equal(arrB.length)
      for (var i = 0; i < arrA.length; i++) {
        expect(arrA[i]).to.equal(arrB[i])
      }
})

