import type { Post, ResultPaginatorResponse, ResultResponse } from '@/models'
import http from '@/utils/http'

const postsApi = {
  async getAll({ _page = 1 }: { _page: number }) {
    const url = '/post'
    const res = await http.get<ResultPaginatorResponse<Post[]>>(url, {
      params: {
        _page,
      },
    })
    return res.data
  },
  async getById(id: string) {
    const url = `/post/${id}`
    const res = await http.get<ResultResponse<Post>>(url)
    return res.data
  },
}

export default postsApi
