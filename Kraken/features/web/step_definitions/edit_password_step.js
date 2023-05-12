const StaffPage = require('../support/StaffPage');
const { Given, When, Then } = require('@cucumber/cucumber');


const baseUrl = "http://localhost:2368/";

  Given('I go to owner page with step id of {string}', async function (stepname) {
    let staffPage = new StaffPage(this.driver);
    await staffPage.visit(baseUrl);    
    await staffPage.selectOwner();
    await this.driver.saveScreenshot(`./newReports/${stepname}.png`)
  });

  When('I fill the old password with {string} with step id of {string}', async function (text, stepname) {
    let staffPage = new StaffPage(this.driver);   
    await staffPage.fillOldPassword(text);
    await this.driver.saveScreenshot(`./newReports/${stepname}.png`)
  });

  When('I fill the new password with {string} with step id of {string}', async function (text, stepname) {
    let staffPage = new StaffPage(this.driver);   
    await staffPage.fillNewPassword(text);
    await this.driver.saveScreenshot(`./newReports/${stepname}.png`)
  });

  When('I click on Change Password', async function () {
    let staffPage = new StaffPage(this.driver);
    await staffPage.changePassword();
  });

  Then('It must says {string} with step id of {string}', async function (text, stepname) {
    let staffPage = new StaffPage(this.driver);
    await staffPage.AssertConfirmation(text);
    await this.driver.saveScreenshot(`./newReports/${stepname}.png`)
  });

  Then('Error must says {string} with step id of {string}', async function (text, stepname) {
    let staffPage = new StaffPage(this.driver);
    await staffPage.AssertError(text);
    await this.driver.saveScreenshot(`./newReports/${stepname}.png`)
  });



