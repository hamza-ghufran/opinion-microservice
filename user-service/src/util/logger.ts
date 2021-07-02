import pino from 'pino'
import pinoLogger from 'express-pino-logger'

const logger = pino({
  prettyPrint: {
    colorize: process.env.NODE_CONTEXT === 'local' ? true : false,
    singleLine: process.env.NODE_CONTEXT === 'local' ? false : true,
    ignore: 'time,hostname,pid',
    messageFormat: (log: any, messageKey: any) => {
      // ':method :status :response-time ms :url'
      const statusCode = log && log.res && log.res.statusCode

      const req = log && log.req
      const url = req && req.url
      const method = req && req.method

      if (!method) {
        return log && log[messageKey]
      }

      return `${method} ${statusCode} ${url}`
    }
  }
})

const useLogger = () => {
  return pinoLogger({
    autoLogging: {
      ignorePaths: ["/health"]
    },
    logger: logger,
    serializers: {
      req: (req) => ({
        ...req,
        body: req.raw.body,
      }),
    },
  })
}

export { useLogger, logger }