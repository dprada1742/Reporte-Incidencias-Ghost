class TagsPage {
  url = "ghost/#/tags";
  visit(baseUrl) {
    cy.visit(baseUrl + this.url);
  }

  createNewTag() {
    cy.get('a').contains("New tag").click({ force: true });
  }

  getTagList() {
    return cy.get(".gh-tag-list-name");
  }

  getTagNameList() {
    return cy.get("h3.gh-tag-list-name");
  }

  editTagByName(name){
    cy.get("h3", {force:true}).contains(name).click()
  }
}

export default new TagsPage();
