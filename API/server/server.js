import Api from './routes/index';
import Koa from 'koa';
import errorHandler from 'koa-error';
import helmet from 'koa-helmet';
import vhost from 'koa-virtual-host';
let app = new Koa();
import cors from 'koa2-cors';
import bodyParser from 'koa-bodyparser';

let { API_HOST } = process.env;
app.use(bodyParser());
app.use(cors());
app.use(vhost(API_HOST, Api));

app.use(errorHandler());

app.use(helmet());

module.exports = app;