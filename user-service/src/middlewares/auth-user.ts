import type { Request, Response, NextFunction } from 'express';

import { UserService } from '../services';

import { logger } from '../util';

const userService = new UserService()

async function getUser(userId: string) {
  try {
    const user = await userService.get(userId);
    delete user.password;
    return user
  } catch (e) {
    logger.error(e, 'middleware', 'getUser');
  }
}

export const authenticateUser = () => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // probably use JWT here: later
  const userId = req.headers.authorization

  const user = await getUser(userId)

  if (!user) {
    return next(new Error('Cannot find a user'));
  }

  if (typeof user.active === 'boolean' && !user.active) {
    return next(new Error('The account is closed.'));
  }

  next();
};
