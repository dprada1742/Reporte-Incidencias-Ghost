const PostEditPage = require('../support/PostEditPage');
const PostsPage = require('../support/PostsPage');
const { Given, When, Then } = require('@cucumber/cucumber');

const expect = require('chai').expect;


const baseUrl = "http://localhost:2368/";

When('I fill the post title with {string} with step id of {string}', async function (postTitle, stepname) {
  let postEdit = new PostEditPage(this.driver)
  if (postTitle){
    let postTitleElement = await postEdit.getPostTitle()
    await postTitleElement.setValue(postTitle)
    await this.driver.saveScreenshot(`./newReports/${stepname}.png`)
  }  
});

When('I click in the post content', async function () {
  let postEdit = new PostEditPage(this.driver)
  let postContent = await postEdit.getPostContent()
  postContent.click()
  await new Promise(r => setTimeout(r, 300));
});

When('I fill the post content with {string}', async function (content) {
  let postEdit = new PostEditPage(this.driver)
  if (content){
    let postContent = await postEdit.getPostContent()
    postContent.setValue(content)
  }
  
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

When('I save the post', async function () {
  let postEdit = new PostEditPage(this.driver)
  await postEdit.saveChanges()
})

When('I modify the URL of the post to {kraken-string} with step id of {string}', async function (newUrl, stepname) {
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

When('I modify the URL of the post to {kraken-string} with length {string}', async function (newUrl, length) {
  let postEdit = new PostEditPage(this.driver)
  await postEdit.clickPostSettings()
  await new Promise(r => setTimeout(r, 500));

  let postUrl = await postEdit.getPostUrl()
  await postUrl.click()
  await new Promise(r => setTimeout(r, 1000));
  await postUrl.setValue(newUrl.padEnd(parseInt(length), "a"))

  await new Promise(r => setTimeout(r, 300));
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

When('I add a new meta title {kraken-string} to the post', async function (metaTitleName) {
  let postEdit = new PostEditPage(this.driver)
  await postEdit.clickPostSettings()
  await new Promise(r => setTimeout(r, 500));
  await postEdit.clickMetaDataButton()
  await new Promise(r => setTimeout(r, 500));
  let metaTitle = await postEdit.getMetaTitle()
  await metaTitle.click()
  await new Promise(r => setTimeout(r, 1000));
  await metaTitle.setValue(`${metaTitleName}\n`)
  await postEdit.clickBackButton()
  await postEdit.clickClosePostSettings()
});

When('I add a new meta description {kraken-string} to the post', async function (metaDescName) {
  let postEdit = new PostEditPage(this.driver)
  await postEdit.clickPostSettings()
  await new Promise(r => setTimeout(r, 500));
  await postEdit.clickMetaDataButton()
  await new Promise(r => setTimeout(r, 500));
  let metaDesc = await postEdit.getMetaDescription()
  await metaDesc.click()
  await new Promise(r => setTimeout(r, 1000));
  await metaDesc.setValue(`${metaDescName}\n`)
  await postEdit.clickBackButton()
  await postEdit.clickClosePostSettings()
});

When('I add a new twitter title {kraken-string} to the post', async function (twitterTitleName) {
  let postEdit = new PostEditPage(this.driver)
  await postEdit.clickPostSettings()
  await new Promise(r => setTimeout(r, 500));
  await postEdit.clickTwitterDataButton()
  await new Promise(r => setTimeout(r, 500));
  let twitterTitle = await postEdit.getTwitterTitle()
  await twitterTitle.click()
  await new Promise(r => setTimeout(r, 1000));
  await twitterTitle.setValue(`${twitterTitleName}\n`)
  await postEdit.clickBackButton()
  await postEdit.clickClosePostSettings()
});

When('I fill the post with {kraken-string} {kraken-string} {kraken-string}', async function (post_title, post_tag, post_excerpt) {
  let postEdit = new PostEditPage(this.driver)

  let postTitleElement = await postEdit.getPostTitle()
  await postTitleElement.setValue(post_title)

  await postEdit.clickPostSettings()
  await new Promise(r => setTimeout(r, 500));

  let tagInput = await postEdit.getTagInput()
  await tagInput.click()
  await new Promise(r => setTimeout(r, 1000));
  await tagInput.setValue(`${post_tag}\n`)

  let excerptInput = await postEdit.getExcerptInput()
  await excerptInput.click()
  await new Promise(r => setTimeout(r, 1000));
  await excerptInput.setValue(`${post_excerpt}\n`)

  await postEdit.clickClosePostSettings()
});

Then('the tag {kraken-string} I created must be saved', async function (tagName) {
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

Then('an error gets generated', async function () {
  let postEdit = new PostEditPage(this.driver)
  expect(postEdit.getErrorBanner()).to.exist();
});

Then('the data is saved properly', async function () {
  let postEdit = new PostEditPage(this.driver)

  let postTitleElement = await postEdit.getPostTitleValue()

  await postEdit.clickPostSettings()
  await new Promise(r => setTimeout(r, 500));

  let tagInput = await postEdit.getTagValue()
  let excerptInput = await postEdit.getExcerptValue()

  await postEdit.clickClosePostSettings()

  let postsPage = new PostsPage(this.driver);
  await postsPage.visit(baseUrl);
  await postsPage.editPostByName(postTitleElement)

  await new Promise(r => setTimeout(r, 500));
  await postEdit.clickPostSettings()

  let savedTagValue = await postEdit.getTagValue()
  expect(tagInput.trim()).to.equal(savedTagValue.trim());

  let savedExcerptValue = await postEdit.getExcerptValue()
  expect(excerptInput.trim()).to.equal(savedExcerptValue.trim());
});

Then('the URL must match {kraken-string} with length {kraken-string}', async function (url, length){
  let postEdit = new PostEditPage(this.driver)
  await postEdit.clickPostSettings()
  await new Promise(r => setTimeout(r, 500));

  let postUrl = await postEdit.getPostUrlValue()
  expect(postUrl).to.equal(url.padEnd(parseInt(length), "a").toLowerCase());

})