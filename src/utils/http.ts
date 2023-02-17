import type { AxiosInstance } from 'axios'
import axios from 'axios'

class Http {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:8008/api/v1',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
const http = new Http().instance
export default http
