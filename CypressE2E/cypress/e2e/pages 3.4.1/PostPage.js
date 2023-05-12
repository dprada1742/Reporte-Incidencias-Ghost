class TagsPage {
  url = "ghost/#/posts";
  visit(baseUrl) {
    cy.visit(baseUrl + this.url);
  }

  createNewPost() {
    const buttonNewTag = cy.get("a.ember-view.gh-btn.gh-btn-green");
    buttonNewTag.click();
  }
}

export default new TagsPage();
