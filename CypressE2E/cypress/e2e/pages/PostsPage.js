class PostsPage {
  url = "ghost/#/posts";
  visit(baseUrl) {
    cy.visit(baseUrl + this.url);
  }

  visitNewPost(baseUrl){
    cy.visit(baseUrl+"ghost/#/editor/post/")
  }

  editPostByName(name){
    cy.get("h3").contains(name).click()
  }

  getPostsList(){
    return cy.get(".gh-content-entry-title")
  }
}

export default new PostsPage();
