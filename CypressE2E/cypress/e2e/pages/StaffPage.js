class StaffPage {
  url = "ghost/#/staff";
  visit(baseUrl) {
    cy.visit(baseUrl + this.url);
  }

  selectOwner() {
    const buttonOwner = cy.get("article > div.apps-card-right > div > span.gh-badge.owner");
    buttonOwner.click();
    cy.wait(800)
  }

  fillOldPassword(value) {
    //cy.get("main > section > header").invoke('addclass','hidden');
    const field = cy.get('#user-password-old').type(value)    
    cy.wait(300)
    return this
  }

  fillNewPassword(value) {
    //cy.get("main > section > header").invoke('addclass','hidden');
    const field = cy.get('#user-password-new').type(value)    
    cy.wait(200)
    return this
  }

  fillVerificationPassword(value) {
    //cy.get("main > section > header").invoke('addclass','hidden');
    const field = cy.get('#user-new-password-verification').type(value)
    cy.wait(200)  
    return this
  }

  save() {
    const buttonSavePassword = cy.get("button.gh-btn.gh-btn-icon.button-change-password.gh-btn-red.ember-view");
    buttonSavePassword.click();
    cy.wait(800)
  }

  assertMessage(message) {
    const messageElement = cy.get('div.gh-notification-content > span')
    messageElement.contains(message).should('be.visible')
  }

  assertErrorMessage(message) {
    const messageElement = cy.get('p.response')
    messageElement.contains(message).should('be.visible')
  }

}

export default new StaffPage();
