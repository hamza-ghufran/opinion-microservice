import axios from 'axios'

// TODO get from config/global
const baseURL = process.env.NODE_CONTEXT === 'local'
  ? `http://account-service:3001/opinion/v1`
  : `http://${process.env.BASE_URL}/opinion/v1`

const end_points = {
  update: (accountId: string) => `/account/${accountId}`,
}

export class AccountService {
  private https = axios.create({ baseURL: baseURL })

  public async update(accountId: string, payload: any): Promise<void> {
    const url = end_points.update(accountId)

    await this.https.patch(url, payload)
  }
}