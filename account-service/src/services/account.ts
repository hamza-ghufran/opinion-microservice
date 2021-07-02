import type { Account } from 'local-types'

import { AccountRepo } from '../repositories';

import { logger } from "../util"

type UpdatableFields = Pick<Account, 'no_of_comments' | 'no_of_post'>

interface CreateParams {
  accountPayload: Account;
}

export class AccountService {
  private repo: AccountRepo = new AccountRepo()

  public async create(payload: CreateParams) {
    const { accountPayload } = payload;

    try {
      const resp = await this.repo.create(accountPayload)
      return resp;
    }
    catch (e) {
      logger.error(e, 'AccountService', 'create')
    }
  }

  public async update(id: string, payload: UpdatableFields): Promise<Account> {
    try {
      const resp = await this.repo.update(id, payload)
      return resp;
    } catch (e) {
      logger.error(e, 'AccountService', 'update')
    }
  }
}