class TagsPage {
  url = "ghost/#/tags";
  visit(baseUrl) {
    cy.visit(baseUrl + this.url);
  }

  createNewTag() {
    const buttonNewTag = cy.get("#ember97");
    buttonNewTag.click();
  }

  getTagList() {
    return cy.get(".gh-tag-list-name");
  }
}

export default new TagsPage();
