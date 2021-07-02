import { Router } from 'express'

import { PostController } from '../controllers'

import { authenticateUser } from '../middlewares'

const router = Router()

router.route('/')
  .get(authenticateUser(), PostController.list)
  .post(authenticateUser(), PostController.create)

export default router