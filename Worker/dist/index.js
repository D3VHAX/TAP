'use strict';

require('babel-polyfill');

var _striptags = require('striptags');

var _striptags2 = _interopRequireDefault(_striptags);

var _logger = require('./libs/logger');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _publishers = require('./publishers');

var publishers = _interopRequireWildcard(_publishers);

var _scheduler = require('./scheduler');

var _scheduler2 = _interopRequireDefault(_scheduler);

var _keywords = require('./keywords');

var _keywords2 = _interopRequireDefault(_keywords);

var _storage = require('./storage');

var _timeEstimator = require('./timeEstimator');

var _timeEstimator2 = _interopRequireDefault(_timeEstimator);

var _urlCleaner = require('./urlCleaner');

var _urlCleaner2 = _interopRequireDefault(_urlCleaner);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step('next', value); }, function (err) { step('throw', err); }); } } return step('next'); }); }; }

var log = new _logger.Logger('Runner');
var Parser = require('rss-parser');
var parser = new Parser();


var scheduler = new _scheduler2.default();

var runner = function runner() {
  log.info('Jobs started');
  // Loop through exported publishers
  for (var publisher in publishers) {
    // Loop through resources
    for (var feed in publishers[publisher].resources) {
      var feed = publishers[publisher].resources[feed];
      scheduler.addJob(feed, publisher);
    }
  }
  log.info(scheduler.viewJobs());
};

scheduler.listenJobs(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(feed) {
    var items, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, data, stats;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return parser.parseURL(feed.url);

          case 2:
            items = _context.sent;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 6;
            _iterator = items.items[Symbol.iterator]();

          case 8:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 53;
              break;
            }

            item = _step.value;
            data = {};


            data.publisher = publishers[feed.publisher].commonName;
            data.url = (0, _urlCleaner2.default)(_lodash2.default.get(item, publishers[feed.publisher].tags.url), publishers[feed.publisher].urlStripParameters);

            _context.next = 15;
            return (0, _storage.CheckExist)(data);

          case 15:
            if (!_context.sent) {
              _context.next = 18;
              break;
            }

            log.debug('[' + data.publisher + '] Skipping duplicate content');
            return _context.abrupt('continue', 50);

          case 18:
            _context.prev = 18;
            _context.next = 21;
            return (0, _keywords2.default)(item[publishers[feed.publisher].tags.title]);

          case 21:
            data.keywords = _context.sent;
            _context.next = 27;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context['catch'](18);

            log.error(_context.t0);

          case 27:

            data.categories = feed.categories;
            data.title = _lodash2.default.get(item, publishers[feed.publisher].tags.title);
            data.description = (0, _striptags2.default)(_lodash2.default.get(item, publishers[feed.publisher].tags.description));
            data.creationDate = _lodash2.default.get(item, publishers[feed.publisher].tags.creationDate);
            data.picture = _lodash2.default.get(item, publishers[feed.publisher].tags.picture);

            _context.prev = 32;
            _context.next = 35;
            return (0, _timeEstimator2.default)(data.url, publishers[feed.publisher]);

          case 35:
            stats = _context.sent;


            data.stats = {
              readingTime: Math.floor(stats.time),
              wordCount: stats.words
            };

            _context.prev = 37;
            _context.next = 40;
            return (0, _storage.Persist)(data);

          case 40:
            _context.next = 45;
            break;

          case 42:
            _context.prev = 42;
            _context.t1 = _context['catch'](37);

            log.error('[' + data.publisher + '] Storage error : ' + _context.t1);

          case 45:
            _context.next = 50;
            break;

          case 47:
            _context.prev = 47;
            _context.t2 = _context['catch'](32);

            log.warning('[' + data.publisher + '] Quality Check filtering : ' + _context.t2);

          case 50:
            _iteratorNormalCompletion = true;
            _context.next = 8;
            break;

          case 53:
            _context.next = 59;
            break;

          case 55:
            _context.prev = 55;
            _context.t3 = _context['catch'](6);
            _didIteratorError = true;
            _iteratorError = _context.t3;

          case 59:
            _context.prev = 59;
            _context.prev = 60;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 62:
            _context.prev = 62;

            if (!_didIteratorError) {
              _context.next = 65;
              break;
            }

            throw _iteratorError;

          case 65:
            return _context.finish(62);

          case 66:
            return _context.finish(59);

          case 67:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[6, 55, 59, 67], [18, 24], [32, 47], [37, 42], [60,, 62, 66]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

runner();