const LoginPage = require('../support/LoginPage');
const { Given, When, Then } = require('@cucumber/cucumber');
const expect = require('chai').expect;

const baseUrl = "http://localhost:2368/";

Given('I log into ghost', async function () {
  let loginPage = new LoginPage(this.driver);
  await loginPage.visit(baseUrl);
  await loginPage.fillEmail("testemail@email.com");
  await loginPage.fillPassword("testing100");
  return await loginPage.submit();
});