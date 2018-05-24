'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.CheckExist = CheckExist;
exports.Persist = Persist;

var _logger = require('./libs/logger');

var _elasticsearch = require('elasticsearch');

var _elasticsearch2 = _interopRequireDefault(_elasticsearch);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = new _logger.Logger('Storage');

var ES_URL = 'tap-project.tk:9200';

var client = new _elasticsearch2.default.Client({
  host: ES_URL,
  apiVersion: '2.4'
});

var urlToSystemId = function urlToSystemId(url) {
  var shasum = _crypto2.default.createHash('sha1');
  shasum.update(url);

  return shasum.digest('hex');
};

function CheckExist(data) {
  return new Promise(function (resolve, reject) {
    client.search({
      index: 'tap',
      type: 'item',
      body: {
        query: {
          match: {
            system_id: urlToSystemId(data.url)
          }
        }
      }
    }).then(function success(resp) {
      resolve(resp.hits.total !== 0);
    }, function error(err) {
      reject(err);
    });
  });
}

function Persist(data) {
  return new Promise(function (resolve, reject) {
    data.system_id = urlToSystemId(data.url);

    log.info('[' + data.publisher + '] [' + data.system_id + '] Storing');

    _axios2.default.post('http://' + ES_URL + '/tap/item/_taste/event', {
      json: {
        item: data
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }, function (error, response, body) {
      if (error || response.statusCode != 200) {
        //reject('['+data.publisher+'] [' + data.system_id + '] Error while sending data (HTTPCode: '+response.statusCode+')');
        resolve(); // ignore
      } else {
        log.success('[' + data.publisher + '] [' + data.system_id + '] Successfuly added');
        resolve();
      }
    });
  });
}