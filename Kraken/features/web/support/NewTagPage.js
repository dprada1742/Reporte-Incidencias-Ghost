class NewTagsPage {

  constructor(driver) {
    this.driver = driver;
  }

  async save() {
    const saveButton = await this.driver.$('//span[contains(.,"Save")]');
    await saveButton.click();
  }

  async leave() {
    const saveButton = await this.driver.$('//span[contains(.,"Leave")]');
    await saveButton.click();
  }

  async getSlugField() {
    return await this.driver.$("#tag-slug");
  }

  async fillTagName(value) {
    const tagNameInput = await this.driver.$("#tag-name");    
    await tagNameInput.waitForExist({ timeout: 5000 });
    await tagNameInput.clearValue();
    await tagNameInput.addValue(value)
    return this;
  }

  async fillTagSlug(value) {
    const field = this.driver.$("#tag-slug");
    await field.clearValue();
    await field.setValue(value);
    return this;
  }

  async clearSlug() {
    const field = this.driver.$("#tag-slug");
    await field.clearValue();
    return this;
  }

  async fillTagDescription(value) {
    const field = this.driver.$("#tag-description");
    await field.clearValue();
    await field.setValue(value);
    return this;
  }

  async GetTagDescription() {
    const field = await this.driver.$("#tag-description");
    return await field.getValue()
  }

  async GetTagName() {
    const field = await this.driver.$("#tag-name");
    return await field.getValue()
  }

}

module.exports = NewTagsPage;