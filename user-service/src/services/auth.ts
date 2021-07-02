import type { User } from 'local-types'

import { logger } from '../util';

import { UserService } from './user';
import { AccountService } from './account';

interface RegisterParams {
  userPayload: Omit<User, 'active'>;
}

export class AuthService {
  private account: AccountService = new AccountService()

  private user: UserService = new UserService()

  public async login(email: string, password: string): Promise<any> {
    try {
      const user = await this.user.findUserWithEmail(email);
      const matched = await this.user.comparePassword(password, user.password);

      delete user.password;

      if (matched) {
        return { user }
      }
      else throw new Error('Password mismatch')
    }
    catch (e) {
      logger.error(e, 'AuthService', 'login');
    }
  }

  public async registerUser(params: RegisterParams) {
    const { userPayload } = params;

    try {
      const password = this.user.hashPassword(userPayload.password);

      // TODO create commit transaction for Atomicity
      const user = await this.user.create({
        active: true,
        password,
        name: userPayload.name,
        email: userPayload.email,
      })

      //user._id to for middleware
      await this.account.create(user._id, {
        _id: user._id,
        user: user._id,
        active: true,
        no_of_post: 0,
        no_of_comments: 0
      });

      return { user };
    } catch (e) {
      logger.error(e, 'AuthService', 'registerUser');
    }
  }
}