import type { User } from 'local-types'

import bcrypt from 'bcrypt';

import { UserRepo } from '../repositories';

import { logger } from '../util';

export class UserService {
  private SALT_ROUNDS = 10;

  private repo: UserRepo = new UserRepo()

  public async get(_id: string): Promise<User> {
    try {
      const user = await this.repo.get({ _id });
      return user;
    } catch (e) {
      logger.error(e, 'UserService', 'get')
    }
  }

  public async findUserWithEmail(email: string): Promise<User> {
    try {
      const user = await this.repo.get({ email: email.toLowerCase() });
      return user;
    } catch (e) {
      logger.error(e, 'UserService', 'findUserWithEmail');
    }
  }

  public async comparePassword(password: string, storedHash: string): Promise<boolean> {
    try {
      const matched = await bcrypt.compare(password, storedHash);
      return matched;
    } catch (e) {
      logger.error(e, 'UserService', 'comparePassword');
    }
  }

  public hashPassword(password: string): string {
    try {
      const hash = bcrypt.hashSync(password, this.SALT_ROUNDS);
      return hash;
    } catch (e) {
      logger.error(e, 'UserService', 'hashPassword');
    }
  }

  public async list(): Promise<any> {
    try {
      const user = await this.repo.list();
      return user;
    } catch (e) {
      logger.error(e, 'UserService', 'list');
    }
  }

  public async create(user: User): Promise<any> {
    try {
      const newUser = await this.repo.create(user);

      return newUser;
    } catch (e) {
      logger.error(e, 'UserService', 'create');
    }
  }
}
