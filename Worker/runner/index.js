import 'babel-polyfill';
import striptags from 'striptags';
import { Logger } from './libs/logger';
let log = new Logger('Runner');
let Parser = require('rss-parser');
let parser = new Parser();
import _ from 'lodash';
import * as publishers from './publishers';
import Scheduler from './scheduler';
import keyword from './keywords';
import { Persist, CheckExist } from './storage';
import readingTime from './timeEstimator';
import urlCleaner from './urlCleaner';

let scheduler = new Scheduler();

let runner = function() {
  log.info('Jobs started');
  // Loop through exported publishers
  for (let publisher in publishers) {
    // Loop through resources
    for (let feed in publishers[publisher].resources) {
      let feed = publishers[publisher].resources[feed];
      scheduler.addJob(feed, publisher);
    }
  }
  log.info(scheduler.viewJobs());
};


scheduler.listenJobs(async (feed) => {
  let items = await parser.parseURL(feed.url);
  for (let item of items.items) {
    let data = {};

    data.publisher = publishers[feed.publisher].commonName;
    data.url = urlCleaner(
      _.get(item, publishers[feed.publisher].tags.url),
      publishers[feed.publisher].urlStripParameters
    );

    if(await CheckExist(data)) {
      log.debug('['+data.publisher+'] Skipping duplicate content');
      continue;
    }

    try {
      data.keywords = await keyword(item[publishers[feed.publisher].tags.title]);
    }
    catch (e) {
      log.error(e);
    }

    data.categories = feed.categories;
    data.title = _.get(item, publishers[feed.publisher].tags.title);
    data.description = striptags(_.get(item, publishers[feed.publisher].tags.description));
    data.creationDate = _.get(item,
      publishers[feed.publisher].tags.creationDate);
    data.picture = _.get(item, publishers[feed.publisher].tags.picture);

    try {
      let stats = await readingTime(data.url, publishers[feed.publisher]);

      data.stats = {
        readingTime: Math.floor(stats.time),
        wordCount: stats.words,
      };

      try {
        await Persist(data);
      } catch(e) {
        log.error('['+data.publisher+'] Storage error : ' + e);
      }
    } catch(e) {
      log.warning('['+data.publisher+'] Quality Check filtering : ' + e);
    }
  }

});

runner();

