class TagsPage {
  url = "ghost/#/tags";
  visit(baseUrl) {
    cy.visit(baseUrl + this.url);
  }

  createNewTag() {
    const buttonNewTag = cy.get("#ember97");
    buttonNewTag.click();
  }
}

export default new TagsPage();
