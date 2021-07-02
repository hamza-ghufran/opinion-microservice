import type { User } from 'local-types'

import { User as UserModel } from '../models';
import { logger } from '../util';

interface GetUserSearchParams {
  _id?: string;
  email?: string;
}

export class UserRepo {
  protected model = UserModel.Model;

  public async list(): Promise<{ data: User[] }> {
    try {
      const docs = await this.model.find({}, { password: 0 }).sort({ createdAt: -1 }).lean().read('primary').exec();
      return { data: docs };
    } catch (e) {
      logger.error(e, 'UserRepo', 'list');
    }
  }

  public async get(search: GetUserSearchParams): Promise<User> {
    try {
      const userQuery = this.model.findOne(search);
      const user = await userQuery.orFail().lean().exec();

      return user;
    } catch (e) {
      logger.error(e, 'UserRepo', 'get');
    }
  }

  public async create(user: User): Promise<User> {
    try {
      const newUser = new this.model(user);

      if (!newUser.password) {
        throw new Error('Password not present.');
      }

      await newUser.save()
      return newUser.toObject();
    } catch (e) {
      logger.error(e, 'UserRepo', 'create');
    }
  }
}
