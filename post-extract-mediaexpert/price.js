const selectPrice = select => {
    return select("string(.//div[@class=\"price-box\"]//div//span[@class=\"whole\"])");
};

module.exports = selectPrice;
