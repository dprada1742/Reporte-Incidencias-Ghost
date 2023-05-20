const expect = require('chai').expect;

class TagsPage {
  url = "ghost/#/staff";

  constructor(driver) {
    this.driver = driver;
  }
  
  async visit(baseUrl) {
    await this.driver.url(baseUrl + this.url);
  }

  async selectOwner() {
    const ownerButton = await this.driver.$('article > div.apps-card-right > div > span.gh-badge.owner');
    await ownerButton.waitForExist({ timeout: 5000 });
    await ownerButton.click();
    const oldPasswordField = await this.driver.$('#user-password-old');
    return await oldPasswordField.click();  
  }

  async fillOldPassword(oldPassword) {
    const oldPasswordField = await this.driver.$('#user-password-old');
    return await oldPasswordField.setValue(oldPassword) 
  }

  async fillNewPassword(newPassword) {
    const newPasswordField = await this.driver.$('#user-password-new');
    const confirmPasswordField = await this.driver.$('#user-new-password-verification');

    await newPasswordField.setValue(newPassword) 
    return await confirmPasswordField.setValue(newPassword)
  }

  async changePassword() {
    const changePWDButton = await this.driver.$('button.gh-btn.gh-btn-icon.button-change-password.gh-btn-red.ember-view');
    return await changePWDButton.click();
  }

  async AssertConfirmation(message) {
    const messageElement = await this.driver.$('div.gh-notification-content > span');
    const elementText = await messageElement.getText()
    return expect(elementText).to.equal(message)
  }

  async AssertError(message) {
    const messageElement = await this.driver.$('div.form-group.error.ember-view > p.response');
    const elementText = await messageElement.getText()
    return expect(elementText).to.equal(message)
  }

  async AssertWrongPass(message) {
    const messageElement = await this.driver.$('article.gh-alert.gh-alert-red.ember-view');
    const elementText = await messageElement.getText()
    return expect(elementText).to.equal(message)
  }

  

  
}

module.exports = TagsPage;