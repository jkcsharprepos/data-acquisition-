const xpath = require("xpath");
const _ = require("lodash");

const createSelector = dom => {
  return (callback, ...args) => {
    const selector = pathExpression => {
      return xpath.select(pathExpression, dom);
    };

    if (_.isFunction(callback)) {
      return callback(selector, ...args);
    } else {
      return selector(callback);
    }
  };
};

module.exports = createSelector;
