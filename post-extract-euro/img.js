const selectImg = select => {
    return select('string(.//div[@class="box-medium__photo"]//@src)');
};
module.exports = selectImg;
