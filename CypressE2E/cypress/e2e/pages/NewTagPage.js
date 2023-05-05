class NewTagsPage {
  url = "ghost/#/tags/new";
  visit(baseUrl) {
    cy.visit(baseUrl + this.url);
  }

  save() {
    const buttonNewTag = cy.get("#ember111");
    buttonNewTag.click();
  }

  fillTagName(value) {
    const field = cy.get('#tag-name')
    field.clear()
    field.type(value)
    return this
  }

  fillTagSlug(value) {
    const field = cy.get('#tag-slug')
    field.clear()
    field.type(value)
    return this
  }

  fillTagDescription(value) {
    const field = cy.get('#tag-description')
    field.clear()
    field.type(value)
    return this
  }
}

export default new NewTagsPage();
