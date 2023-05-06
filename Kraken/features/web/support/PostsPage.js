class PostsPage {
  constructor(driver) {
    this.driver = driver;
  }

  async visit(baseUrl) {
    await this.driver.url(`${baseUrl}ghost/#/posts`);
  }

  async visitNewPost(baseUrl){
    await this.driver.url(baseUrl+"ghost/#/editor/post/")
  }

  async editPostByName(name){
    await this.driver.$(`//h3[contains(.,"${name}")]`).click()
  }

  async getPostsList(){
    return await this.driver.$$(".gh-content-entry-title")
  }
}

module.exports = PostsPage;
