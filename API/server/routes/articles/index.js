import Router from 'koa-router';
import { Logger } from 'utils/logger';
const router = new Router();
const logger = new Logger('api@Articles');
import Elastic from 'models';
import _ from 'lodash';

/*
Params
int maxItems number of items to get
int userID
*/
router.get('/articles', async ctx => {
    let maxItems = ctx.query.number || 10;

    if(ctx.query.userID === undefined) {
        ctx.status = 400;
        ctx.body = { err: 'UserID parameter must be provided.' };
        return;
    }
    let userID = ctx.query.user_id;

    try {
        let articles = await Elastic.getUserRecommended(userID, maxItems);

        articles = _.map(articles, '_source');

        ctx.body = (articles);
    } catch (error) {
        ctx.status = 400;
        ctx.body = { err: 'Error occured while fetching data' };
        logger.debug(error)
    }

});

/*
Params
action : "like" or "dislike"
articleID : int
userID : int
readingTime int (not yet)
 */
router.post('/opinion', async ctx => {
    let body = ctx.request.body;

    if(body.action === undefined || body.articleID === undefined || body.userID === undefined) {
        ctx.status = 400;
        ctx.body = { err: 'You must provide an action, an articleID and an userID'};
        return;
    }

    try {
        let userID = body.userID;
        let articleID = body.articleID;

        if(body.action === 'like') {
            let value = 10;
            logger.debug('User' + userID + ' liked ' + articleID + ' [value : ' + value + ']');
            await Elastic.storePreference(userID, articleID, value);
        } else {
            let value = 1;
            logger.debug('User' + userID + ' disliked ' + articleID + ' [value : ' + value + ']');
            await Elastic.storePreference(userID, articleID, value);
        }

        ctx.status = 200;
    } catch (error) {
        ctx.status = 400;
        ctx.body = { err: 'Error occured while sending data' };
        logger.debug(error);
    }
});

export default router;
