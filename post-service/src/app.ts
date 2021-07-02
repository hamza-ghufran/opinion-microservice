import type { Request, Response, NextFunction } from 'express';

import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';

import { winstonStream } from './util';

import ApiRouter from './routes';

const app = express();

const DEV_LOG = ':method :status :response-time ms :url';

const config = {
  port: 3002,
  env: 'dev',
}

// Express configuration
app.disable('x-powered-by');
app.set('port', config.port);
app.set('env', config.env);

app.use(
  morgan(DEV_LOG, {
    stream: winstonStream,
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/health', (req: Request, res: Response, next: NextFunction) => {
  res.send(200);
});

app.use('/opinion/v1/post', ApiRouter);

export default app;
