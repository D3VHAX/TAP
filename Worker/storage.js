import { Logger } from './libs/logger'
let log = new Logger("Runner");

let store = (data) => {
  log.info("***** New article found *****")
  log.debug(data)
}

export default store