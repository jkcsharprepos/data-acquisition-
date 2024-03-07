const selectAttributeValue = select => {
    return select('string(.//td)');
};
module.exports = selectAttributeValue;
