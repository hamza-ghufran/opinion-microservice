import { Request, Response, NextFunction } from "express"

import { AccountService } from '../services'
import { logger } from "../util"

const accountService = new AccountService()

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const resp = await accountService.create({ accountPayload: req.body })
    res.send(resp);
  }
  catch (e) {
    logger.error(e, 'AccountController', 'create')
    next(e)
  }
}
export async function update(req: Request, res: Response, next: NextFunction) {
  const { accountId } = req.params
  const payload = req.body
  try {
    const resp = await accountService.update(accountId, payload)
    res.send(resp);
  }
  catch (e) {
    logger.error(e, 'AccountController', 'update')
    next(e)
  }
}