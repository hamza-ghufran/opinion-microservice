import redis from 'redis';
import { promisify } from "util"

// TODO move to config
const config = {
  local: {
    host: '127.0.0.1',
    port: 6379
  },
  server: {
    url: process.env.REDIS_CLIENT,
    port: 6379
  }
}

const context = process.env.NODE_CONTEXT === 'local' ? 'local' : 'server'

async function connectToRedisClient() {
  try {
    const client = redis.createClient(config[context])
    const getAsync = promisify(client.get).bind(client);
    const setAsync = promisify(client.set).bind(client);

    return {
      get: getAsync,
      set: setAsync
    };
  } catch (e) {
    throw e;
  }
}

async function init(): Promise<any> {
  try {
    const redisClient = await connectToRedisClient();
  } catch (e) {
    throw e;
  }
}

export { init };
