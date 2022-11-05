import axios from 'axios'

const axiosClient = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptors
axiosClient.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { config, data, status } = error.response
    if (config.url === '/users' && status === 400) {
      const listError = data.username || []
      const mesError = listError[0]
      throw new Error(mesError)
    }
    if (config.url === '/login/' && status === 401) {
      const mesError = data.detail
      throw new Error(mesError)
    }

    return Promise.reject(error)
  }
)

export default axiosClient
