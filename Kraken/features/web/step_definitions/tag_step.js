const TagsPage = require('../support/TagsPage');
const NewTagsPage = require('../support/NewTagPage');
const { Given, When, Then } = require('@cucumber/cucumber');
const expect = require('chai').expect;

const baseUrl = "http://localhost:2368/";

Given('I go to the the Tag section with step id of {string}', async function (stepname) {
  let tagPage = new TagsPage(this.driver);
  await tagPage.visit(baseUrl);
  await this.driver.saveScreenshot(`./newReports/${stepname}.png`)
});

When('I press the button New Tag with step id of {string}', async function (stepname) {
  let tagPage = new TagsPage(this.driver);
  await tagPage.createNewTag();
  await this.driver.saveScreenshot(`./newReports/${stepname}.png`)
});

When('I fill the new tag fields {kraken-string} with step id of {string}', async function (name, stepname) {
  let newTagPage = new NewTagsPage(this.driver);
  await newTagPage.fillTagName(name);
  await newTagPage.fillTagSlug("slug value");
  await newTagPage.fillTagDescription(name);
  await this.driver.saveScreenshot(`./newReports/${stepname}.png`)
});
When('I edit the tag name with {kraken-string} with step id of {string}', async function (name, stepname) {
  let newTagPage = new NewTagsPage(this.driver);
  await newTagPage.fillTagName(name);
  await this.driver.saveScreenshot(`./newReports/${stepname}.png`)
});

When('I edit the description with step id of {string}', async function (stepname) {
  let newTagPage = new NewTagsPage(this.driver);
  await newTagPage.fillTagDescription(generateRandomString(501));
  await this.driver.saveScreenshot(`./newReports/${stepname}.png`)
});

When('I fill the new tag fields but the slug is empty {kraken-string} with step id of {string}', async function (name, stepname) {
  let newTagPage = new NewTagsPage(this.driver);
  await newTagPage.fillTagName(name);
  await newTagPage.fillTagSlug("");
  await newTagPage.fillTagDescription("description");
  await this.driver.saveScreenshot(`./newReports/${stepname}.png`)
});

When('I fill the new tag fields but an invalid description {kraken-string} with step id of {string}', async function (name, stepname) {
  let newTagPage = new NewTagsPage(this.driver);
  await newTagPage.fillTagName(name);
  await newTagPage.fillTagSlug("slug");
  await newTagPage.fillTagDescription(generateRandomString(501));
  await this.driver.saveScreenshot(`./newReports/${stepname}.png`)
});

When('I select the tag that was created {kraken-string} with step id of {string}', async function (name, stepname) {
  let tagPage = new TagsPage(this.driver);
  await tagPage.editTagByName(name);
  await this.driver.saveScreenshot(`./newReports/${stepname}.png`)
});

When('I select the tag that was edited {kraken-string} with step id of {string}', async function (name, stepname) {
  let tagPage = new TagsPage(this.driver);
  await tagPage.editTagByName(name);
  await this.driver.saveScreenshot(`./newReports/${stepname}.png`)
});

When('I save the tag with step id of {string}', async function (stepname) {
  let newTagPage = new NewTagsPage(this.driver);
  await newTagPage.save();
  await this.driver.saveScreenshot(`./newReports/${stepname}.png`)
});

When('I press the button Leave with step id of {string}', async function (stepname) {
  let newTagPage = new NewTagsPage(this.driver);
  await newTagPage.leave();
  await this.driver.saveScreenshot(`./newReports/${stepname}.png`)
});

When('I clear the slug with step id of {string}', async function (stepname) {
  let newTagPage = new NewTagsPage(this.driver);
  await newTagPage.clearSlug();
  await this.driver.saveScreenshot(`./newReports/${stepname}.png`)
});

Then('I should have two tags with the same name {kraken-string}', async function (tagName) {
  let tagPage = new TagsPage(this.driver);
  const tagList = await tagPage.getTagNameList();
 
  const values = await Promise.all(tagList.map(async (element) => {
    return await element.getText()
  }));
  expect(values.filter(element => element === tagName)).to.have.lengthOf.at.least(2);
});

Then('I should have a tags with the name {kraken-string}', async function (tagName) {
  let tagPage = new TagsPage(this.driver);
  const tagList = await tagPage.getTagNameList();
 
  const values = await Promise.all(tagList.map(async (element) => {
    return await element.getText()
  }));
  expect(values.filter(element => element == tagName)).to.have.lengthOf.at.least(1);
});

Then('No tag should be created {kraken-string}', async function (tagName) {
  let tagPage = new TagsPage(this.driver);
  const tagList = await tagPage.getTagNameList();
 
  const values = await Promise.all(tagList.map(async (element) => {
    return await element.getText()
  }));
  expect(values.filter(element => element === tagName)).to.have.lengthOf(0);
});

Then('I should validate the description {kraken-string}', async function (tagName) {
  let newTagPage = new NewTagsPage(this.driver);
  let tagText = await newTagPage.GetTagDescription()
  expect(tagText).to.equal(tagName);
});

Then('I should validate the Tag name {kraken-string}', async function (tagName) {
  let newTagPage = new NewTagsPage(this.driver);
  let tagText = await newTagPage.GetTagName()
  expect(tagText).to.equal(tagName);
});

Then('I should validate the slug is not empty', async function () {
  let newTagPage = new NewTagsPage(this.driver);
  let slugField = await newTagPage.getSlugField()
  let slugValue = await slugField.getValue()
  expect(slugValue).not.to.be.empty;
});

When('I fill the new tag fields {kraken-string} {kraken-string} {kraken-string}', async function (tagName, tagSlug, tagDescription) {
  let newTagPage = new NewTagsPage(this.driver);
  await newTagPage.fillTagName(tagName);
  await newTagPage.fillTagSlug(tagSlug);
  await newTagPage.fillTagDescription(tagDescription);
});

function generateRandomString(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += 'A'
  }

  return result;
}