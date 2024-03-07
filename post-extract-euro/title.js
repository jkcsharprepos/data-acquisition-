const selectTitle = select => {
  return select("string(.//h4[@class=\"box-medium__title | body-1-b\"])");
};
module.exports = selectTitle;
