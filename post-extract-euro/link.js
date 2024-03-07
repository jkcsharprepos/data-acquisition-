const selectLink = select => {
    return select("string(.//@href)");
};

module.exports = selectLink;
