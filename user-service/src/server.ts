import app from './app';

import { logger, Db } from './util'

async function runServer() {
  try {
    await Db.init();

    const server = app.listen(app.get('port'), () => {
      logger.info(`Server started at http://localhost:${app.get('port')}`);
      logger.info(`Check health at ----> /health`);
      logger.info(`BASE_URL::${process.env.BASE_URL}`);
    });

    // Catch unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.error('Unhandled Rejection --> ', err);
    });

    return server;
  } catch (e) {
    logger.info(`<<< Server initialization failed >>> ${e.message}`);
    logger.info(`<<< Server initialization Begin >>>`);
    logger.info(`${e.stack}`);
    logger.info(`<<< Server initialization End >>>`);
  }
}

const serverAsPromise = runServer();

export default serverAsPromise;
