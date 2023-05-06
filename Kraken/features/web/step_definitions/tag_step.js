const TagsPage = require('../support/TagsPage');
const NewTagsPage = require('../support/NewTagPage');
const { Given, When, Then } = require('@cucumber/cucumber');
const expect = require('chai').expect;

const baseUrl = "http://localhost:2368/";

Given('I go to the the Tag section', async function () {
  let tagPage = new TagsPage(this.driver);
  await tagPage.visit(baseUrl);
});

When('I press the button New Tag', async function () {
  let tagPage = new TagsPage(this.driver);
  await tagPage.createNewTag();
});

When('I fill the new tag fields {kraken-string}', async function (name) {
  let newTagPage = new NewTagsPage(this.driver);
  await newTagPage.fillTagName(name);
  await newTagPage.fillTagSlug("slug value");
  await newTagPage.fillTagDescription("description");
});

When('I fill the new tag fields but the slug is empty {kraken-string}', async function (name) {
  let newTagPage = new NewTagsPage(this.driver);
  await newTagPage.fillTagName(name);
  await newTagPage.fillTagSlug("");
  await newTagPage.fillTagDescription("description");
});

When('I fill the new tag fields but an invalid description {kraken-string}', async function (name) {
  let newTagPage = new NewTagsPage(this.driver);
  await newTagPage.fillTagName(name);
  await newTagPage.fillTagSlug("slug");
  await newTagPage.fillTagDescription(generateRandomString(501));
});

When('I select the tag that was created {kraken-string}', async function (name) {
  let tagPage = new TagsPage(this.driver);
  await newTagPage.editTagByName(name);
});

When('I save the tag', async function () {
  let newTagPage = new NewTagsPage(this.driver);
  await newTagPage.save();
});

When('I press the button Leave', async function () {
  let newTagPage = new NewTagsPage(this.driver);
  await newTagPage.leave();
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
  expect(values.filter(element => element === tagName)).to.have.lengthOf.at.least(1);
});

Then('No tag should be created {kraken-string}', async function (tagName) {
  let tagPage = new TagsPage(this.driver);
  const tagList = await tagPage.getTagNameList();
 
  const values = await Promise.all(tagList.map(async (element) => {
    return await element.getText()
  }));
  expect(values.filter(element => element === tagName)).to.have.lengthOf(0);
});

function generateRandomString(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += 'A'
  }

  return result;
}