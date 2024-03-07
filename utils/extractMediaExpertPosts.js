const selectTitle = require("../post-extract-mediaexpert/title");
const createSelector = require("../post-extract-mediaexpert/selector");
const selectAttributes = require("../post-extract-mediaexpert/attributes");
const selectAttributeName = require("../post-extract-mediaexpert/attributeName");
const selectAttributeValue = require("../post-extract-mediaexpert/attributeValue");
const selectImg = require("../post-extract-mediaexpert/img");
const selectPrice =require("../post-extract-mediaexpert/price");
const selectLink = require("../post-extract-mediaexpert/link");
const selectPosts = require("../post-extract-mediaexpert/posts");

const returnHtmlPosts = require("./returnHtmlPosts");
const xhtmlToDom = require("./xhtmlToDom");

const _ = require("lodash");

const extractPost = post => {
  let postSelector,title,imgUrl,price,attributesTable,originalLink;
  try {
    postSelector = createSelector(post);
    title = selectTitle(postSelector).trim();
    imgUrl = selectImg(postSelector);
    price = selectPrice(postSelector).trim();
    price = price.replaceAll("&nbsp;", "");
    price = price.replace(/\s/g, '');
    price = price.replaceAll("zł", "");
    attributesTable = selectAttributes(postSelector);
    originalLink = "https://www.mediaexpert.pl"+selectLink(postSelector);
  }catch{
    console.log("Warning! Scraping MediaExpert!");
    return null;
  }

  let attributes = [];
  for(let attribute of attributesTable){
    const attributeSelector = createSelector(attribute);
    const attributeName = selectAttributeName(attributeSelector);
    const attributeValue = selectAttributeValue(attributeSelector);
    if (!attributeName.trim()) continue;
    attributes.push({attributeName:attributeName.trim(),attributeValue:attributeValue.trim()});

  }
  return {
    title,
    originalLink,
    imgUrl,
    price,
    attributes
  }
};

const extractMediaExpertPosts = async (page, productUrl) => {

  let pageContent = await returnHtmlPosts(page,`https://www.mediaexpert.pl/${productUrl}`,null );
  let dom = xhtmlToDom(pageContent);
  let domSelector = createSelector(dom);

  let htmlPosts =  selectPosts(domSelector);

  let extractedPosts = [];
  for (let post of htmlPosts) {
    let extractedPost = extractPost(post);
    if(!extractedPost.title || !extractedPost.price) continue;
    extractedPosts.push(extractedPost);
  }
  return extractedPosts;
};

module.exports = extractMediaExpertPosts;
