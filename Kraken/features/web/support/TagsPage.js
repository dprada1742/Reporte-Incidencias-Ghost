class TagsPage {
  url = "ghost/#/tags";

  constructor(driver) {
    this.driver = driver;
  }
  
  async visit(baseUrl) {
    await this.driver.url(baseUrl + this.url);
  }

  async createNewTag() {
    const newTagButton = await this.driver.$('//a[contains(span,"New tag")]');
    await newTagButton.click();
  }

  async getTagList() {
    return await this.driver.findElements(By.css(".gh-tag-list-name"));
  }

  async getTagNameList() {
    return await this.driver.$$("h3.gh-tag-list-name");
  }

  async editTagByName(name) {
    const tag = await this.driver.$(`h3=${name}`);
    await tag.click();
  }
}

module.exports = TagsPage;