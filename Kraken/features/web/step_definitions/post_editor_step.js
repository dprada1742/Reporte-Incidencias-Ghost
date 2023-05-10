const PostEditPage = require('../support/PostEditPage');
const { Given, When, Then } = require('@cucumber/cucumber');
const expect = require('chai').expect;

const baseUrl = "http://localhost:2368/";

When('I fill the post title with {kraken-string} with step id of {string}', async function (postTitle, stepname) {
  let postEdit = new PostEditPage(this.driver)
  let postTitleElement = await postEdit.getPostTitle()
  await postTitleElement.setValue(postTitle)
  await this.driver.saveScreenshot(`./newReports/${stepname}.png`)
});

When('I click in the post content', async function () {
  let postEdit = new PostEditPage(this.driver)
  let postContent = await postEdit.getPostContent()
  postContent.click()
  await new Promise(r => setTimeout(r, 300));
});

When('I add a new tag {kraken-string} to the post with step id of {string}', async function (tagName, stepname) {
  let postEdit = new PostEditPage(this.driver)
  await postEdit.clickPostSettings()
  await new Promise(r => setTimeout(r, 500));
  let tagInput = await postEdit.getTagInput()
  await tagInput.click()
  await new Promise(r => setTimeout(r, 1000));
  await tagInput.setValue(`${tagName}\n`)
  await this.driver.saveScreenshot(`./newReports/${stepname}.png`)
  await postEdit.clickClosePostSettings()
});

When('I save the post', async function() {
  let postEdit = new PostEditPage(this.driver)
  await postEdit.saveChanges()
})

When('I modify the URL of the post to {kraken-string} with step id of {string}', async function(newUrl, stepname) {
  let postEdit = new PostEditPage(this.driver)
  await postEdit.clickPostSettings()
  await new Promise(r => setTimeout(r, 500));
  let postUrl = await postEdit.getPostUrl()
  await postUrl.click()
  await new Promise(r => setTimeout(r, 1000));
  await postUrl.setValue(newUrl)
  await new Promise(r => setTimeout(r, 300));
  await this.driver.saveScreenshot(`./newReports/${stepname}.png`)
  await postEdit.clickClosePostSettings()
})

When('I publish the post with step id of {string}', async function (stepname) {
  let postEdit = new PostEditPage(this.driver)
  await postEdit.clickPublishOptions()
  await postEdit.clickPublishButton()
  await new Promise(r => setTimeout(r, 500));
  await this.driver.saveScreenshot(`./newReports/${stepname}.png`)
  await postEdit.clickConfirmPublishButton()
});

Then('the tag {kraken-string} I created must be saved', async function(tagName) {
  let postEdit = new PostEditPage(this.driver)
  let savedValue = await postEdit.getTagValue()
  expect(tagName).to.equal(savedValue.trim());
})

Then('the new URL {kraken-string} must be accesible', async function (newUrl) {
  this.driver.url(`${baseUrl}${newUrl}/`);
});

Then('contains the post {kraken-string}', async function (postName) {
  let postEdit = new PostEditPage(this.driver)
  let postNamePublished = await postEdit.getPostName()
  expect(postName).to.equal(postNamePublished.trim());
});