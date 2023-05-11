
class LoginPage {
    visit(baseUrl) {
      cy.visit(baseUrl + 'ghost/#/signin')
    }
  
    fillEmail(value) {
      const field = cy.get('#ember7')
      field.clear()
      field.type(value)
      return this
    }
  
    fillPassword(value) {
      const field = cy.get('#ember9')
      field.clear()
      field.type(value)
      return this
    }
  
    submit() {
      const button = cy.get('#ember11')
      button.click()
      cy.wait(2000)
    }
  }
  
  export default new LoginPage()