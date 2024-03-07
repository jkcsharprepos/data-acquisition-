const selectPrice = select => {
    return select("string(.//div[@class=\"price__value\"])");
};

module.exports = selectPrice;
