class NewPostPage {
  constructor(driver) {
    this.driver = driver;
  }

  async getPostTitle() {
    return await this.driver.$("textarea.gh-editor-title.ember-text-area");
  }

  async getPostContent() {
    return await this.driver.$("div.koenig-editor__editor-wrapper");
  }

  async getTagInput() {
    return await this.driver.$("div#tag-input");
  }

  async getTagValue() {
    return await this.driver.$("li.tag-token").getText();
  }

  async getPostUrl() {
    return await this.driver.$(".post-setting-slug");
  }

  async clickPublishOptions() {
    await this.driver.$("div.gh-publishmenu").click();
  }

  async clickPublishButton() {
    await this.driver
      .$("button.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon")
      .click();
  }

  async clickConfirmPublishButton() {
    const span = await this.driver.$('//span[text()="Publish and send"]');
    const button = await span.parentElement();
    await button.click();
  }

  async clickPostSettings() {
    await this.driver.$("button.post-settings").click();
  }

  async clickClosePostSettings() {
    await this.driver.$("button.close.settings-menu-header-action").click();
  }

  async clickBackToPosts() {
    await this.driver.$('a[href="#/posts/"]').first().click();
  }

  async clickLeaveAfterEdit() {
    await this.driver.$("button").contains("Leave").click();
  }

  async saveChanges() {
    await this.driver.keys(["Control", "s"]);
  }

  async getPostName() {
    return await this.driver.$("h1.post-full-title").getText();
  }
}

module.exports = NewPostPage;
