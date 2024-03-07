const selectTitle = require("../post-extract-euro/title");
const createSelector = require("../post-extract-euro/selector");
const selectAttributes = require("../post-extract-euro/attributes");
const selectAttributeName = require("../post-extract-euro/attributeName");
const selectAttributeValue = require("../post-extract-euro/attributeValue");
const selectImg = require("../post-extract-euro/img");
const selectPrice =require("../post-extract-euro/price");
const selectLink = require("../post-extract-euro/link");
const selectPosts = require("../post-extract-euro/posts");

const returnHtmlPosts = require("./returnHtmlPosts");
const xhtmlToDom = require("./xhtmlToDom");

const _ = require("lodash");

const extractPost = post => {
    let postSelector,title,imgUrl,price,attributesTable,originalLink;
    try{
    postSelector = createSelector(post);

    title = selectTitle(postSelector).trim();
    imgUrl = selectImg(postSelector);
    price = selectPrice(postSelector).trim();
    price = price.replaceAll("&nbsp;","");
    price = price.replace(/\s/g, '');
    price = price.replaceAll("zł","");
    attributesTable = selectAttributes(postSelector);
    originalLink = "https://www.euro.com.pl/"+selectLink(postSelector);
    }
    catch{
        console.log("Warning! Scraping Euro!")
    }

    let attributes = [];
    for(let attribute of attributesTable){
        const attributeSelector = createSelector(attribute);
        let attributeName = selectAttributeName(attributeSelector);
        attributeName = attributeName.replaceAll("&nbsp;", "");
        let attributeValue = selectAttributeValue(attributeSelector);
        attributeValue = attributeValue.replaceAll("&nbsp;", "");
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
const entryInstructions = {
    inputField:"div div div div div div div div div .text-input__box .text-input__wrapper .text-input__input",
    inputBtn:"div .search-container__search-button span",
    skippedElement:".banner-actions-container #onetrust-accept-btn-handler",
    productUrl:""


}

const extractEuroPosts = async (page, productUrl) => {
    entryInstructions.productUrl=productUrl;
    let pageContent = await returnHtmlPosts(page,`https://www.euro.com.pl/`,entryInstructions);
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

module.exports = extractEuroPosts;
