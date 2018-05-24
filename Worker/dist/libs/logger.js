'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; };

exports.Logger = Logger;
exports.TimeDiff = TimeDiff;
var chalk = require('chalk');
var CircularJSON = require('circular-json');

var types = {
  error: 'ERROR',
  debug: 'DEBUG',
  info: 'INFO',
  success: 'SUCCS',
  warning: 'WARN'
};

function formatMessage(input, appname, color, type) {
  return getFormattedDate() + ' ' + color(type) + chalk.white(' (' + appname + ') :') + color(' ' + input);
}

function getFormattedDate() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

  date = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
  var currentHours = ('0' + date.getHours()).slice(-2);
  var currentMinutes = ('0' + date.getMinutes()).slice(-2);
  var currentSeconds = ('0' + date.getSeconds()).slice(-2);
  var currentMs = date.getMilliseconds();
  return '[' + currentHours + ':' + currentMinutes + ':' + currentSeconds + '.' + currentMs + ']';
}

function Logger(appname) {
  var _this = this;

  this.appname = appname;
  this.debug = function (msg) {
    if ((typeof msg === 'undefined' ? 'undefined' : _typeof(msg)) === 'object') {
      msg = CircularJSON.stringify(msg, null, 4);
    }
    if (process.env.NODE_ENV === 'development') {
      console.log(formatMessage(msg, this.appname, chalk.magenta, types.debug));
    }
  };
  this.warning = function (msg) {
    if ((typeof msg === 'undefined' ? 'undefined' : _typeof(msg)) === 'object') {
      msg = CircularJSON.stringify(msg, null, 4);
    }
    console.log(formatMessage(msg, this.appname, chalk.yellow, types.warning));
  };
  this.info = function (msg) {
    if ((typeof msg === 'undefined' ? 'undefined' : _typeof(msg)) === 'object') {
      msg = CircularJSON.stringify(msg, null, 4);
    }
    console.log(formatMessage(msg, this.appname, chalk.cyan, types.info));
  };
  this.error = function (msg) {
    if ((typeof msg === 'undefined' ? 'undefined' : _typeof(msg)) === 'object') {
      msg = CircularJSON.stringify(msg, null, 4);
    }
    console.log(formatMessage(msg, this.appname, chalk.red, types.error));
  };
  this.getError = function (err) {
    if ((typeof err === 'undefined' ? 'undefined' : _typeof(err)) === 'object') {
      if (err.message) {
        _this.error('\nMessage: ' + err.message);
      }
      if (err.stack) {
        _this.error('\nStacktrace:\n====================');
        console.log(err.stack);
        _this.error('\n====================');
      }
    } else {
      _this.error('dumpError :: argument is not an object');
    }
  };
  this.reject = function (err) {
    if ((typeof err === 'undefined' ? 'undefined' : _typeof(err)) === 'object') {
      if (err.message) {
        return err.message;
      }
      if (err.stack) {
        return err.stack;
      }
    } else {
      return err;
    }
  };
  this.success = function (msg) {
    if ((typeof msg === 'undefined' ? 'undefined' : _typeof(msg)) === 'object') {
      msg = CircularJSON.stringify(msg, null, 4);
    }
    console.log(formatMessage(msg, this.appname, chalk.green, types.success));
  };
}

function TimeDiff() {
  var _this2 = this;

  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'TimeDiff';

  this.name = name;
  this.starter = null;
  this.start = function () {
    this.starter = new Date();
    console.log(formatMessage('Start timer ' + getFormattedDate(this.starter), this.name, chalk.yellowBright, 'DIFF'));
  };

  this.stop = function () {
    var tmp = new Date() - _this2.starter;

    console.log(formatMessage(getFormattedDate(_this2.starter) + ' +' + tmp + 'ms', _this2.name, chalk.yellowBright, 'DIFF'));
  };

  this.stats = function () {
    var tmp = new Date() - _this2.starter;
    var file = stats + _this2.name;
    console.log(formatMessage(getFormattedDate(_this2.starter) + ' +' + tmp + 'ms', _this2.name, chalk.yellowBright, 'DIFF'));
    var writeStream = fs.createWriteStream(stats + _this2.name + '.xls', { flags: 'a', encoding: 'utf-8', mode: '0777' });
    var row2 = tmp + '\n';
    writeStream.write(row2);
    writeStream.close();
  };
}