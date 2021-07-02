import type { Post } from "local-types";

import { Post as PostModel } from "../models";

import { logger } from '../util'

export class PostRepo {
  private model = PostModel.Model

  public async create(payload: Pick<Post, 'author' | 'body'>): Promise<any> {
    try {
      const data: Pick<Post, 'author' | 'body'> = payload;
      const doc = new this.model(data)
      await doc.save()

      return doc.toObject()
    }
    catch (e) {
      logger.error(e, 'PostRepo', 'create')
    }
  }

  public async list(): Promise<{ data: Post[] }> {
    try {
      const docs = await this.model.find({}).sort({ createdAt: -1 }).lean().read('primary').exec();
      return { data: docs }
    }
    catch (e) {
      logger.error(e, 'PostRepo', 'list')
    }
  }
}