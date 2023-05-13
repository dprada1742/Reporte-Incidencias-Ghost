class NewTagsPage {
  save() {
    const buttonNewTag = cy.get("#ember111");
    buttonNewTag.click();
  }

  fillTitle(value) {
    const field = cy.get('textarea.gh-editor-title.ember-text-area.gh-input.ember-view')
    field.clear()
    field.type(value)
    return this
  }

  fillContent(value) {
    const field = cy.get('div.koenig-editor__editor-wrapper').click()
    field.type(value)
    return this
  }

  publish() {
    const publishButton = cy.get('div > span:nth-child(1) > svg:nth-child(1)')
    publishButton.click()
    cy.wait(800)
  }

  schedule(){
    const scheduleRadioButton = cy.get('section > div > div:nth-child(2) > div.gh-publishmenu-radio-button')
    scheduleRadioButton.click()
    cy.wait(100)
  }

  comfirmPublish(){
    const comfirmPublishButton = cy.get('button.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view')
    comfirmPublishButton.click()
    cy.wait(800)
    const PublishButton = cy.get('button.gh-btn.gh-btn-black.gh-btn-icon.ember-view')
    PublishButton.click()
    cy.wait(500)
  }

  assertMessage(message) {
    const messageElement = cy.get('div.gh-notification-content > span.gh-notification-title')
    messageElement.contains(message).should('be.visible')
  }

}

export default new NewTagsPage();
