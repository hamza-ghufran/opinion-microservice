import type { Account } from 'local-types'

import { Account as AccountModel } from '../models'

import { logger } from "../util"

interface UpdatePayload {
  no_of_post?: number
  no_of_comments?: number
}

export class AccountRepo {
  private model = AccountModel.Model

  public async create(payload: Account): Promise<Account> {
    try {
      const data: Account = payload;
      const doc = new this.model(data);
      await doc.save()
      return doc.toObject();
    } catch (e) {
      logger.error(e, 'AccountRepo', 'create')
    }
  }

  public async update(_id: string, payload: UpdatePayload): Promise<Account> {
    const key = payload.no_of_comments ? 'no_of_comments' : 'no_of_post'

    try {
      const resp = await this.model.findOneAndUpdate({ _id }, {
        $inc: {
          [key]: 1
        }
      }, { new: true }).orFail().lean().exec();

      return resp as Account;
    } catch (e) {
      logger.error(e, 'AccountRepo', 'update')
    }
  }
}