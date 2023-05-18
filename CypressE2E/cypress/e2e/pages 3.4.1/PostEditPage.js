class PostsPage {
  getPostTitle() {
    return cy.get('textarea.gh-editor-title.ember-text-area')
  }

  getPostContent() {
    return cy.get("div.koenig-editor__editor-wrapper")
  }

  getTagInput() {
    return cy.get('div#tag-input')
  }

  getAutorInput() {
    return cy.get('div#author-list')
  }

  getExcerptInput() {
    return cy.get('#custom-excerpt')
  }

  getTagValue() {
    return cy.get('li.tag-token')
  }

  getPostUrl(){
    return cy.get('.post-setting-slug')
  }

  getErrorBanner(){
    return cy.get('div.gh-alert-content')
  }

  clickPublishOptions() {
    cy.get("div.gh-publishmenu").click()
  }

  clickPublishButton() {
    cy.get("button.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon").click()
  }

  clickConfirmPublishButton() {
    cy.get('button').contains('Publish and send').click()
  }

  clickMetaButton() {
    cy.get('button').contains('Meta data').click()
  }

  clickTwitterButton() {
    cy.get('button').contains('Twitter card').click()
  }

  clickPostSettings() {
    cy.get('button.post-settings').click()
  }

  clickClosePostSettings() {
    cy.get('button.close.settings-menu-header-action').click()
  }

  clickBackSettings() {
    cy.get('button.back.settings-menu-header-action').click()
  }

  clickBackToPosts() {
    cy.get('a[href="#/posts/"]').first().click()
  }

  clickLeaveAfterEdit() {
    cy.get('button').contains('Leave').click()
  }

  saveChanges() {
    cy.get('body').type('{ctrl}s');
  }

  fillMetaTitle(value){
    const field = cy.get('#meta-title')
    field.click()
    field.type(value)
  }

  fillTwitterTitle(value){
    const field = cy.get('#twitter-title')
    field.click()
    field.type(value)
  }
  fillMetaDescription(value){
    const field = cy.get('#meta-description')
    field.click()
    field.type(value)
  }
}

export default new PostsPage();
