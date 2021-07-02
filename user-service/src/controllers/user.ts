import { Request, Response, NextFunction } from "express";

import { UserService } from "../services";
import { logger } from '../util';

const userService = new UserService()

export async function listUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const resp = await userService.list()
    res.send(resp)
  }
  catch (e) {
    logger.error(e, 'UserController', 'listUsers')
    next(e)
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const resp = await userService.get(req.params.userId)
    res.send(resp)
  }
  catch (e) {
    logger.error(e, 'UserController', 'listUsers')
    next(e)
  }
}