import type { Request, Response, NextFunction } from 'express';

import express from 'express';

import bodyParser from 'body-parser';

import { useLogger } from './util';

import ApiRouter from './routes';

const app = express();

const config = {
  port: 3000,
  env: 'dev',
}

// Express configuration
app.disable('x-powered-by');
app.set('port', config.port);
app.set('env', config.env);

app.use(useLogger())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/health', (req: Request, res: Response, next: NextFunction) => {
  res.send(200);
});

app.use('/opinion/v1/user', ApiRouter);

export default app;
