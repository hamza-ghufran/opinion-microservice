import type { Post } from 'local-types'

import { AccountService } from './account'

import { PostRepo } from '../repositories'

import { logger } from '../util'

export class PostService {
  private repo: PostRepo = new PostRepo()

  private account: AccountService = new AccountService()

  public async create(data: Pick<Post, 'author' | 'body'>): Promise<Post> {
    const payload = { ...data, active: true }
    const userId = data.author // userId === accountId

    try {
      const resp = await this.repo.create(payload)
      await this.account.update(userId, { no_of_post: 1 })
      return resp
    }
    catch (e) {
      logger.error(e, 'PostService', 'create')
    }
  }

  public async list() {
    try {
      const resp = await this.repo.list()
      return resp
    }
    catch (e) {
      logger.error(e, 'PostService', 'list')
    }
  }

}