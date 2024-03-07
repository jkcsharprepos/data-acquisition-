const selectAttributeName = select => {
    return select('string(.//th)');
};
module.exports = selectAttributeName;
