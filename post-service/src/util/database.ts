import mongoose from 'mongoose';
import bluebird from 'bluebird';

import { logger } from './logger'

const dbURI = process.env.MONGO_DB_URL

mongoose.Promise = bluebird;

async function connectToDb() {
  try {
    const connection = await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      dbName: 'opinion-ops',
      keepAlive: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    logger.info('Connected to Database');
    return connection;
  } catch (e) {
    throw e;
  }
}

async function init(): Promise<typeof mongoose> {
  try {
    const conn = await connectToDb();
    return conn;
  } catch (e) {
    throw e;
  }
}

export { init };
