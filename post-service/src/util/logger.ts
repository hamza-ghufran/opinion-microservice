import type { LoggerOptions } from 'winston';

import { transports, createLogger, format } from 'winston';

import path from 'path';

const options: LoggerOptions = {
  exitOnError: false,
  format: format.combine(
    format.label({ label: path.basename(process.mainModule ? process.mainModule.filename : '') }),
    format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    // Format the metadata object
    format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
  ),
  defaultMeta: {},
  transports: [],
};

const logger = createLogger(options);

const logFormat = format.printf((info) => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`);

logger.add(
  new transports.Console({
    level: 'silly',
    format: format.combine(format.colorize(), logFormat),
  }),
);

class MyStream {
  public write(text: string) {
    // since morgan adds a newline at the end of every debug statement
    logger.info(text.replace(/\n$/, ''), { type: 'ROUTE' });
  }
}

const winstonStream = new MyStream();

export { winstonStream, logger };
