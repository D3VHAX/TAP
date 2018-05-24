'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _keywordExtractor = require('keyword-extractor');

var _keywordExtractor2 = _interopRequireDefault(_keywordExtractor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keyword = function keyword(text) {
  return new Promise(function (resolve, reject) {
    var keys = _keywordExtractor2.default.extract(text, {
      language: 'french',
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true
    });
    resolve(keys);
  });
};

exports.default = keyword;