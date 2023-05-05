class PostsPage {
  url = "ghost/#/posts";
  visit(baseUrl) {
    cy.visit(baseUrl + this.url);
  }

  createNewPost() {
    const buttonNewTag = cy.get("#ember629");
    buttonNewTag.click();
  }
}

export default new PostsPage();
