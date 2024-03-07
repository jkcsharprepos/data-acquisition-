const { scrollPageToBottom } = require("puppeteer-autoscroll-down");
const xhtmlToDom = require("./xhtmlToDom");
const createSelector = require("../post-extract-mediaexpert/selector");
const selectPosts = require("../post-extract-mediaexpert/posts");

const returnHtmlPosts = async (page, siteUrl,entryInstructions) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  await page.goto(siteUrl);

  if(!!entryInstructions){
    if(!!entryInstructions.skippedElement){
      let input = await page.waitForSelector(entryInstructions.skippedElement);
      await input.click();
    }
    let input = await page.waitForSelector(entryInstructions.inputField);
    await input.type(entryInstructions.productUrl);
    await new Promise(resolve => setTimeout(resolve, 500));
    let inputBtn = await page.waitForSelector(entryInstructions.inputBtn);
    await inputBtn.click();
  }

  await new Promise(resolve => setTimeout(resolve, 2000));
  await scrollPageToBottom(page, {
    size: 500,
    delay: 500
  });
  await new Promise(resolve => setTimeout(resolve, 2000));


  return await page.content();
};

module.exports = returnHtmlPosts;
