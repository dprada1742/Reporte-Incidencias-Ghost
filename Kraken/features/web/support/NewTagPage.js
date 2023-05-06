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
    return this.driver.$("#tag-slug");
  }

  async fillTagName(value) {
    const tagNameInput = await this.driver.$("#tag-name");
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

}

module.exports = NewTagsPage;