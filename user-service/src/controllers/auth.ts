import type { Request, Response, NextFunction } from 'express';

import { AuthService } from '../services';
import { logger } from '../util';

const authService = new AuthService()

export async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const resp = await authService.registerUser({ userPayload: req.body });
    res.json(resp);
  } catch (e) {
    logger.error(e, 'AuthController', 'registerUser');
    next(e);
  }
}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const resp = await authService.login(req.body.email, req.body.password);
    res.send(resp);
  } catch (e) {
    logger.error(e, 'AuthController', 'loginUser');
    next(e);
  }
}