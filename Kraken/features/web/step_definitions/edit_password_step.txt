const { Given, When, Then } = require('@cucumber/cucumber');
const expect = require('chai').expect;

Given('I log in', async function () {
    let emailField = await this.driver.$('#ember8');
    let passwordField = await this.driver.$('#ember10');
    
    await emailField.setValue("testemail@email.com");
    await passwordField.setValue("testing100");
    
    let element = await this.driver.$('#ember12');
    return await element.click();
  });

  Given('I go to owner page', async function () {
    await this.driver.url('http://localhost:2368/ghost/#/staff');
    let ownerButton = await this.driver.$('article > div.apps-card-right > div > span.gh-badge.owner');
    await ownerButton.waitForExist({ timeout: 5000 });
    await ownerButton.click();
    let oldPasswordField = await this.driver.$('#user-password-old');
    return await oldPasswordField.click();
    
    
  });

  When('I fill the old password with {string}', async function (text) {     
    let oldPasswordField = await this.driver.$('#user-password-old');
    return await oldPasswordField.setValue(text)    
  });

  When('I fill the new password with {string}', async function (text) {     
    let newPasswordField = await this.driver.$('#user-password-new');
    let confirmPasswordField = await this.driver.$('#user-new-password-verification');

    await newPasswordField.setValue(text) 
    return await confirmPasswordField.setValue(text)
  });

  When('I click on Change Password', async function () {
    let changePWDButton = await this.driver.$('button.gh-btn.gh-btn-icon.button-change-password.gh-btn-red.ember-view');
    return await changePWDButton.click();
  });

  Then('It must says {string}', async function (text) {
    let messageElement = await this.driver.$('div.gh-notification-content > span');
    let elementText = await messageElement.getText()
    return expect(elementText).to.equal(text)
  });

  Then('Error must says {string}', async function (text) {
    let messageElement = await this.driver.$('div.form-group.error.ember-view > p.response');
    let elementText = await messageElement.getText()
    return expect(elementText).to.equal(text)
  });



