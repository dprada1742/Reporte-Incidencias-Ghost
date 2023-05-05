
class LoginPage {
    visit(baseUrl) {
      cy.visit(baseUrl + 'ghost/#/signin')
      cy.wait(1000)
    }
  
    fillEmail(value) {
      const field = cy.get('#ember8')
      field.clear()
      field.type(value)
      return this
    }
  
    fillPassword(value) {
      const field = cy.get('#ember10')
      field.clear()
      field.type(value)
      return this
    }
  
    submit() {
      const button = cy.get('#ember12')
      button.click()
    }
  }
  
  export default new LoginPage()