const StaffPage = require('../support/StaffPage');
const { Given, When, Then } = require('@cucumber/cucumber');


const baseUrl = "http://localhost:2368/";

  Given('I go to owner page', async function () {
    let staffPage = new StaffPage(this.driver);
    await staffPage.visit(baseUrl);    
    await staffPage.selectOwner();
  });

  When('I fill the old password with {string}', async function (text) {
    let staffPage = new StaffPage(this.driver);   
    await staffPage.fillOldPassword(text);  
  });

  When('I fill the new password with {string}', async function (text) {
    let staffPage = new StaffPage(this.driver);   
    await staffPage.fillNewPassword(text);  
  });

  When('I click on Change Password', async function () {
    let staffPage = new StaffPage(this.driver);
    await staffPage.changePassword()    
  });

  Then('It must says {string}', async function (text) {
    let staffPage = new StaffPage(this.driver);
    await staffPage.AssertConfirmation(text)
  });

  Then('Error must says {string}', async function (text) {
    let staffPage = new StaffPage(this.driver);
    await staffPage.AssertError(text)
  });



