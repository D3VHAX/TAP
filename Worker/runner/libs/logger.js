const chalk = require('chalk');
const CircularJSON = require('circular-json');

let types = {
  error: 'ERROR',
  debug: 'DEBUG',
  info: 'INFO',
  success: 'SUCCS',
  warning: 'WARN'
};

function formatMessage (input, appname, color, type) {
  return getFormattedDate() + ' ' + color(type) +
    chalk.white(' (' + appname + ') :') + color(' ' + input);
}

function getFormattedDate (date = new Date()) {
  date = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
  let currentHours = ('0' + date.getHours()).slice(-2);
  let currentMinutes = ('0' + date.getMinutes()).slice(-2);
  let currentSeconds = ('0' + date.getSeconds()).slice(-2);
  let currentMs = date.getMilliseconds();
  return '[' + currentHours + ':' + currentMinutes + ':' + currentSeconds +
    '.' + currentMs + ']';
}

export function Logger (appname) {
  this.appname = appname;
  this.debug = function (msg) {
    if (typeof msg === 'object') {
      msg = CircularJSON.stringify(msg, null, 4);
    }
    if (process.env.NODE_ENV==='development') {
      console.log(formatMessage(msg, this.appname, chalk.magenta, types.debug));
    }
  };
  this.warning = function (msg) {
    if (typeof msg === 'object') {
      msg = CircularJSON.stringify(msg, null, 4);
    }
    console.log(formatMessage(msg, this.appname, chalk.yellow, types.warning));
  };
  this.info = function (msg) {
    if (typeof msg === 'object') {
      msg = CircularJSON.stringify(msg, null, 4);
    }
    console.log(formatMessage(msg, this.appname, chalk.cyan, types.info));
  };
  this.error = function (msg) {
    if (typeof msg === 'object') {
      msg = CircularJSON.stringify(msg, null, 4);
    }
    console.log(formatMessage(msg, this.appname, chalk.red, types.error));
  };
  this.getError = err => {
    if (typeof err === 'object') {
      if (err.message) {
        this.error('\nMessage: ' + err.message);
      }
      if (err.stack) {
        this.error('\nStacktrace:\n====================');
        console.log(err.stack);
        this.error('\n====================');
      }
    } else {
      this.error('dumpError :: argument is not an object');
    }
  };
  this.reject = err => {
    if (typeof err === 'object') {
      if (err.message) {
        return (err.message);
      }
      if (err.stack) {
        return (err.stack);
      }
    } else {
      return (err);
    }
  };
  this.success = function (msg) {
    if (typeof msg === 'object') {
      msg = CircularJSON.stringify(msg, null, 4);
    }
    console.log(formatMessage(msg, this.appname, chalk.green, types.success));
  };
}

export function TimeDiff (name = 'TimeDiff') {
  this.name = name;
  this.starter = null;
  this.start = function () {
    this.starter = new Date();
    console.log(
      formatMessage('Start timer ' + getFormattedDate(this.starter), this.name,
        chalk.yellowBright, 'DIFF'));
  };

  this.stop = () => {
    const tmp = new Date() - this.starter;

    console.log(formatMessage(getFormattedDate(this.starter) + ' +' + tmp + 'ms',
      this.name, chalk.yellowBright, 'DIFF'));
  };

  this.stats= () => {
    const tmp = new Date() - this.starter;
    const file = stats + this.name;
    console.log(formatMessage(getFormattedDate(this.starter) + ' +' + tmp + 'ms',
      this.name, chalk.yellowBright, 'DIFF'));
    const writeStream = fs.createWriteStream(stats + this.name + '.xls', { flags: 'a', encoding: 'utf-8', mode: '0777' });
    const row2 = tmp + '\n';
    writeStream.write(row2);
    writeStream.close();
  };

}
