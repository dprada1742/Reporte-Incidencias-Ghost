
class LoginPage {
    visit() {
      cy.visit('http://localhost:2368/ghost/#/signin')
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