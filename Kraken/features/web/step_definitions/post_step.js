const PostsPage = require('../support/PostsPage');
const { Given, When, Then } = require('@cucumber/cucumber');
const expect = require('chai').expect;

const baseUrl = "http://localhost:2368/";

When('I go to new post page', async function () {
  let postsPage = new PostsPage(this.driver);
  await postsPage.visitNewPost(baseUrl);
});

When('I navigate to the posts page', async function () {
  let postsPage = new PostsPage(this.driver);
  await postsPage.visit(baseUrl);
});

When('I edit the post with name {kraken-string}', async function (postTitle) {
  let postPage = new PostsPage(this.driver)
  await postPage.editPostByName(postTitle)
});

Then('the post list must contain the {kraken-string}', async function (postTitle) {
  let postPage = new PostsPage(this.driver)
  let postList = await postPage.getPostsList()
  const values = await Promise.all(postList.map(async (element) => {
    return await element.getText()
  }));
  expect(values).to.include(postTitle);
});

Then('the post list must not contain the {kraken-string}', async function (postTitle) {
  let postPage = new PostsPage(this.driver)
  let postList = await postPage.getPostsList()
  const values = await Promise.all(postList.map(async (element) => {
    return await element.getText()
  }));
  expect(values).to.not.include(postTitle);
});

Then('the post list must contain the {kraken-string} at least twice', async function (postTitle) {
  let postPage = new PostsPage(this.driver)
  let postList = await postPage.getPostsList()
  const values = await Promise.all(postList.map(async (element) => {
    return await element.getText()
  }));
  expect(values.filter(element => element === postTitle)).to.have.lengthOf.at.least(2);
});