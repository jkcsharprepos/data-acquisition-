const DOMParser = require("xmldom").DOMParser;
// const xml = require("simple-xml-dom");

const xhtmlToDom = xhtml => {
  // return xml.parse(xhtml);
  return new DOMParser({
    locator: {},
    errorHandler: {
      warning: function(w) {},
      error: function(e) {},
      fatalError: function(e) {}
    }
  }).parseFromString(xhtml);
};

module.exports = xhtmlToDom;
