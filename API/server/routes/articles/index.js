import Router from 'koa-router';
import { Logger } from 'utils/logger';
const router = new Router();
const logger = new Logger('api@Articles');
import Elastic from 'models';

/*
Params
number : int
 */


router.get('/articles', async ctx => {
  let articles = null;

  try {
    if (ctx.query.number){
      return ctx.body = (articles); //Only required number;
    }
    ctx.body = (articles);

  } catch (error) {
    ctx.status = 400;
    ctx.body = { err: 'Error occured while fetching data' };
  }
});
/*
Params
action : "like" or "dislike"
articleID : int
readingTime int
 */
router.post('/opinion', async ctx => {
  try {
    let body = ctx.request.body;
    if(body.readingTime && body.action === 'like'){
      logger.info(body.readingTime);
    }
    logger.debug(body.action);
    logger.debug(body.articleID);
    ctx.status = 200;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { err: 'Error occured while fetching data' };
  }
});

export default router;
