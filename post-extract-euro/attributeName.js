const selectAttributeName = select => {
    return select('string(.//span[1])');
};
module.exports = selectAttributeName;
