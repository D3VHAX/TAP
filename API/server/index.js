import 'babel-polyfill';
import  path from 'path';
const env = process.env.NODE_ENV || 'development';
import { addPath } from 'app-module-path';
import { Logger } from 'utils/logger';
let logger = new Logger('Server');

addPath(path.join(__dirname));


addPath(path.join(__dirname, '../server'));


if (env === 'development') {
  require('dotenv').load();
  process.on('unhandledRejection', (reason, p) => {
    logger.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  });
}

const startServer = () => {
  const server = require('./server');
  const port = process.env.PORT || process.env.APPLICATION_PORT || 3000;


  return server.listen(port, error => {
    if (error) {
      logger.error(error);
    } else {
      logger.info(`Application server mounted on http://localhost:${port}.`);
    }
  });
};

startServer();