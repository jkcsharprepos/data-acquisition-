const selectLink = select => {
    return select("string(.//h2//a//@href)");
};

module.exports = selectLink;
