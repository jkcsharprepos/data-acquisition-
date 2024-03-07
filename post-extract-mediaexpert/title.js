const selectTitle = select => {
  return select('string(.//div[@class="row"]//div//h2//a)');
};
module.exports = selectTitle;
