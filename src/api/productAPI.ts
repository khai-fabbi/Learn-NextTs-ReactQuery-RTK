import axiosClient from './axiosClient'

const productApi = {
  getAll(params: any) {
    const url = '/product/'
    return axiosClient.get(url, { params })
  },
  get(id: string) {
    const url = `/product/${id}/`
    return axiosClient.get(url)
  },
  createRate(idProduct: string, data: any) {
    const url = `/product/${idProduct}/rating/`
    const token = JSON.parse(localStorage.getItem('access_token') ?? '')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    return axiosClient.post(url, data, config)
  },
  getRating(id: string) {
    const url = `/product/${id}/listRating/`
    return axiosClient.get(url)
  },
}

export default productApi
