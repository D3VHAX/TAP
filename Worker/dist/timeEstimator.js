'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _publishers = require('./publishers');

var publishers = _interopRequireWildcard(_publishers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cheerio = require('cheerio');

var htmlToText = require('html-to-text');
var readTime = require('reading-time');

var instance = _axios2.default.create({
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36' }
});

var readingTime = function readingTime(url, publisher) {
  return new Promise(function (resolve, reject) {
    instance.get(url).then(function (res) {
      var $ = cheerio.load(res.data, { normalizeWhitespace: true });
      var div = $(publisher.articleParsingTag).html();
      if (div == null) {
        reject('Content not fitting app policy. Filtering (url : ' + url + ')');
      }
      var text = htmlToText.fromString(div, {
        wordwrap: 130,
        ignoreHref: true,
        ignoreImage: true
      });
      resolve(readTime(text));
    }).catch(function (err) {
      reject(err);
    });
  });
};

exports.default = readingTime;