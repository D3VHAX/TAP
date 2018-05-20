import { Logger } from './libs/logger';
let log = new Logger('Runner');

let store = (data) => {
  log.info('***** New article found *****');

  // Generate an identifier from URL (sha1)
  // Use elasticsearch client SDK to search an object with that hash
  // If exist, ignore
  // If doesn't exist, store object in datastore
  log.debug(data);
};

export default store;