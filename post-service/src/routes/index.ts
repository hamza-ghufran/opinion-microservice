import { Router } from 'express'

import PostRouter from './post'

const ApiRouter = Router()

ApiRouter.use('/', PostRouter)

export default ApiRouter