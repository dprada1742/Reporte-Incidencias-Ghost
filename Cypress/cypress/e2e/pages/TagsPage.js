class TagsPage {
  url = "ghost/#/tags";
  visit(baseUrl) {
    cy.visit(baseUrl + this.url);
  }

  createNewTag() {
    const buttonNewTag = cy.get(".gh-btn-green");
    buttonNewTag.click();
  }

  getTagList() {
    return cy.get(".gh-tag-list-name");
  }
}

export default new TagsPage();
