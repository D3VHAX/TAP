import 'babel-polyfill';
const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const { addPath } = require('app-module-path');
global.__basedir = __dirname;



addPath(path.join(__dirname));

// Adds common/js to the app module path so we can access local modules without
// having to use relative paths on the server-side. This is done on the client
// side using webpack's `resolve`.
addPath(path.join(__dirname, '../server'));

// HTML files are read as pure strings
require.extensions['.html'] = (module, filename) => {
  module.exports = fs.readFileSync(filename, 'utf8');
};

if (env === 'development') {
  require('dotenv').load();

  // Add better stack tracing for promises in dev mode
  process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
  });
}

const startServer = () => {
  const server = require('./server');
  const port = process.env.PORT || process.env.APPLICATION_PORT || 3000;


    return server.listen(port, error => {
      if (error) {
        console.error(error);
      } else {
        console.info(`Application server mounted on http://localhost:${port}.`);
      }
    });
};

startServer();