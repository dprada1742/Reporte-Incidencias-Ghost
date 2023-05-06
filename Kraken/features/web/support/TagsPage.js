class TagsPage {
  url = "ghost/#/tags";
  
  async visit(driver, baseUrl) {
    await driver.get(baseUrl + this.url);
  }

  async createNewTag(driver) {
    let newTagButton = await driver.findElement(By.xpath("//a[text()='New tag']"));
    await newTagButton.click();
  }

  async getTagList(driver) {
    return await driver.findElements(By.css(".gh-tag-list-name"));
  }

  async getTagNameList(driver) {
    return await driver.findElements(By.css("h3.gh-tag-list-name"));
  }

  async editTagByName(driver, name) {
    let tagTitle = await driver.findElement(By.xpath(`//h3[contains(text(), '${name}')]`));
    await tagTitle.click();
  }
}

module.exports = TagsPage;