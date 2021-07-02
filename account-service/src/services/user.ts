import type { AxiosRequestConfig } from 'axios'
import type { User } from 'local-types'

import axios from 'axios'

const baseURL = process.env.NODE_CONTEXT === 'local'
  ? `http://user-service:3000/opinion/v1`
  : `http://${process.env.BASE_URL}/opinion/v1`

const end_points = {
  getUser: (userId: string) => `/user/${userId}`,
}

export class UserService {
  private https = axios.create({ baseURL: baseURL })

  public async get(userId: string): Promise<User> {
    const url = end_points.getUser(userId)
    const config: AxiosRequestConfig = {
      headers: {
        authorization: userId,
      },
    };

    return await this.https.get(url, config)
  }
}