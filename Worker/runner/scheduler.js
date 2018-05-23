import schedule from 'node-schedule';
import EventEmitter from 'events';

class Scheduler extends EventEmitter {

  constructor() {
    super();
    this.endpoints = [];
    this.event = new EventEmitter();
    let context = this;
    this.job = schedule.scheduleJob('0-59/30 * * * * *', () => {
      for (let endPoint of context.endpoints) {
        context.event.emit('fetching', endPoint);
      }
    });
  }

  addJob(feed, publisher) {
    let endpoint = feed.endpoint;
    let categories = feed.categories;
    this.endpoints.push({
      endpoint,
      categories : categories,
      publisher
    });
  }

  listenJobs(callback) {
    let context = this;
    context.event.setMaxListeners(0);
    this.event.on('fetching', (feed) => {
      let data = {
        url: feed.endpoint,
        categories: feed.categories,
        publisher: feed.publisher,

      };
      callback(data);
    });
  }

  viewJobs() {
    return JSON.stringify(this.endpoints);
  }

  cancelJobs() {
    if (this.job !== null) {
      return this.job.cancel();
    }
  }

  removeJob(endpoint) {

  }
}

export default Scheduler;