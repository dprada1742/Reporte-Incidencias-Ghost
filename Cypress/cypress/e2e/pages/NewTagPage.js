class NewTagsPage {
  url = "ghost/#/tags/new";
  visit(baseUrl) {
    cy.visit(baseUrl + this.url);
  }

  save() {
    const buttonSave = cy.get('.gh-btn-blue');
    buttonSave.click({ force: true });
  }

  fillTagName(value) {
    const field = cy.get('#tag-name')
    field.clear()
    field.type(value, { force: true })
    return this
  }

  fillTagSlug(value) {
    const field = cy.get('#tag-slug')
    field.clear()
    field.type(value, { force: true })
    return this
  }

  fillTagDescription(value) {
    const field = cy.get('#tag-description')
    field.clear()
    field.type(value, { force: true })
    return this
  }
}

export default new NewTagsPage();
