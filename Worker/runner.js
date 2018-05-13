import striptags from 'striptags'
import { Logger } from './libs/logger'
let log = new Logger("Runner");
let Parser = require('rss-parser')
let parser = new Parser()
import _ from 'lodash'
import * as publishers from './publishers'
import Scheduler from './scheduler'
import keyword from './keywords'
import storage from './storage'
import readingTime from './timeEstimator'


let scheduler = new Scheduler()

let runner = function() {
  log.info("Jobs started")
  // Loop through exported publishers
  for (let publisher in publishers) {
    // Loop through resources
    for (let feed in publishers[publisher].resources) {
      let feed = publishers[publisher].resources[feed]
      scheduler.addJob(feed, publisher)
    }
  }
  log.info(scheduler.viewJobs());
}


scheduler.listenJobs(async (feed) => {
  let items = await parser.parseURL(feed.url)
  for (let item of items.items) {
    let data = {}
    try {
      data.keywords = await keyword(item[publishers[feed.publisher].tags.title])
    }
    catch (e) {
          log.error(e)
    }

    data.publisher = publishers[feed.publisher].commonName
    data.categories = feed.categories
    data.title = _.get(item, publishers[feed.publisher].tags.title)
    data.description = striptags(_.get(item, publishers[feed.publisher].tags.description))
    data.creationDate = _.get(item,
        publishers[feed.publisher].tags.creationDate)
    data.picture = _.get(item, publishers[feed.publisher].tags.picture)
    data.url = _.get(item, publishers[feed.publisher].tags.url)

    readingTime(data.url, publishers[feed.publisher]).then((stats)=>{
      data.stats = {
        readingTime: Math.floor(stats.time),
        wordCount: stats.words,
      }
      storage(data)
    }).catch((e)=>{
      log.error("Can't estimate readingTime: " + e)
    });

  }

})

export default runner

