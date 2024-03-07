const selectAttributeValue = select => {
    return select("string(.//span[2])");
};
module.exports = selectAttributeValue;
