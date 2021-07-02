import { Request, Response, NextFunction } from 'express'

import { logger } from '../util'
import { PostService } from '../services'

const postService = new PostService()

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const resp = await postService.list()
    res.send(resp)
  }
  catch (e) {
    logger.error(e, 'PostController', 'list')
    next(e)
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const resp = await postService.create(req.body)
    res.send(resp)
  }
  catch (e) {
    logger.error(e, 'PostController', 'create')
    next(e)
  }
}