import { Logger } from 'utils/logger';
import Koa from 'koa';
import Router from 'koa-router';
import articles from './articles/index';
import cors from 'koa2-cors';
let logger = new Logger('API');
const Api = new Koa();
Api.use(cors());
const router = new Router();

router.get('/ping', function (ctx) {
  ctx.body = {msg : "pong"}
});

router.get('*', ctx => {
  ctx.body = {err : "Stop procrastinating"};
  ctx.status = 404;
});

Api.use(async (ctx, next) => {
  logger.debug(ctx.method + ' => ' + ctx.request.originalUrl);
  ctx.set('Content-Type', 'application/json');
  await next();
});

Api.use(articles.routes());
Api.use(router.routes());

export default Api;
