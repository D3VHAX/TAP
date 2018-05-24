'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called'); } return call && (typeof call === 'object' || typeof call === 'function') ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scheduler = function (_EventEmitter) {
  _inherits(Scheduler, _EventEmitter);

  function Scheduler() {
    _classCallCheck(this, Scheduler);

    var _this = _possibleConstructorReturn(this, (Scheduler.__proto__ || Object.getPrototypeOf(Scheduler)).call(this));

    _this.endpoints = [];
    _this.event = new _events2.default();
    var context = _this;
    _this.job = _nodeSchedule2.default.scheduleJob('0-59/30 * * * * *', function () {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = context.endpoints[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var endPoint = _step.value;

          context.event.emit('fetching', endPoint);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });
    return _this;
  }

  _createClass(Scheduler, [{
    key: 'addJob',
    value: function addJob(feed, publisher) {
      var endpoint = feed.endpoint;
      var categories = feed.categories;
      this.endpoints.push({
        endpoint: endpoint,
        categories: categories,
        publisher: publisher
      });
    }
  }, {
    key: 'listenJobs',
    value: function listenJobs(callback) {
      var context = this;
      context.event.setMaxListeners(0);
      this.event.on('fetching', function (feed) {
        var data = {
          url: feed.endpoint,
          categories: feed.categories,
          publisher: feed.publisher

        };
        callback(data);
      });
    }
  }, {
    key: 'viewJobs',
    value: function viewJobs() {
      return JSON.stringify(this.endpoints);
    }
  }, {
    key: 'cancelJobs',
    value: function cancelJobs() {
      if (this.job !== null) {
        return this.job.cancel();
      }
    }
  }, {
    key: 'removeJob',
    value: function removeJob(endpoint) {}
  }]);

  return Scheduler;
}(_events2.default);

exports.default = Scheduler;