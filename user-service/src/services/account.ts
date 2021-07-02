import type { Account } from 'local-types'

import axios from 'axios'

const baseURL = process.env.NODE_CONTEXT === 'local'
  ? `http://account-service:3001/opinion/v1`
  : `http://${process.env.BASE_URL}/opinion/v1`


const end_points = {
  create: () => `/account/create`,
}

export class AccountService {
  private https = axios.create({ baseURL: baseURL })

  public async create(userId: string, data: Account) {
    const url = end_points.create()
    const payload = {
      ...data,
      userId
    }

    try {
      await this.https.post(url, payload)
    }
    catch (e) {
      throw e
    }
  }
}