class NewTagsPage {
  url = "ghost/#/tags/new";
  visit(baseUrl) {
    cy.visit(baseUrl + this.url);
  }

  save() {
    const buttonSave = cy.get("button");
    buttonSave.contains("Save").click({ force: true });
  }

  leave() {
    const buttonLeave = cy.get("button");
    buttonLeave.contains("Leave").click({ force: true });
  }

  getSlugField(){
    return cy.get("#tag-slug");
  }

  fillTagName(value) {
    const field = cy.get("#tag-name");
    field.clear();
    field.type(value, { force: true });
    return this;
  }

  fillTagSlug(value) {
    const field = cy.get("#tag-slug");
    field.clear();
    field.type(value, { force: true });
    return this;
  }

  clearSlug() {
    const field = cy.get("#tag-slug");
    field.clear();
    return this;
  }

  fillTagDescription(value) {
    const field = cy.get("#tag-description");
    field.clear();
    field.type(value, { force: true });
    return this;
  }

  GetTagDescription() {
    return cy.get("#tag-description");
  }

}

export default new NewTagsPage();
