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

  getTagValue() {
    return cy.get('li.tag-token')
  }

  getPostUrl(){
    return cy.get('.post-setting-slug')
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

  clickPostSettings() {
    cy.get('button.post-settings').click()
  }

  clickClosePostSettings() {
    cy.get('button.close.settings-menu-header-action').click()
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
}

export default new PostsPage();
