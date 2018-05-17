import { Logger } from './libs/logger'
let log = new Logger("Runner");

let store = (data) => {
  log.info("***** New article found *****")

  // Generate an identifier from title and creation date
  log.debug('YO');
  log.debug(data)
}

export default store