import  elasticsearch from 'elasticsearch';
import { Logger } from 'utils/logger';
let logger = new Logger('Elastic');
let client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

client.ping({
  requestTimeout: 3000
}, function (error) {
  if (error) {
    logger.error('elasticsearch cluster is down!');
  } else {
    logger.debug('All is well');
  }
});



export default client;