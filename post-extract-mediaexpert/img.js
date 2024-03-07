const selectImg = select => {
    return select('string(.//img//@src)');
    // return select('string(.//div[@class="product-list-gallery-slider is-possible-hover"]//a//div[1]//@src)');
};
////div[@class="product-list-gallery-slider is-possible-hover"]//a//div[1]//@src
module.exports = selectImg;
