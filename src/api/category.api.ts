import type {
  Category,
  CategoryPost,
  CategoryUpdate,
  ResultPaginatorResponse,
  ResultResponse,
} from '@/models'
import http from '@/utils/http'

const categoryApi = {
  async getAll({ page = 1 }: { page: number }) {
    const url = '/category'
    const res = await http.get<ResultPaginatorResponse<Category[]>>(url, {
      params: {
        page,
      },
    })
    return res.data
  },
  async getById(id: string) {
    const url = `/category/${id}/`
    const res = await http.get<ResultResponse<Category>>(url)
    return res.data
  },
  async deleteCategoryById(id: number) {
    const url = `/category/${id}/`
    const res = await http.delete<void>(url)
    return res.data
  },
  async createCategory(data: CategoryPost) {
    const url = '/category/'
    const res = await http.post<ResultResponse<Category>>(url, data)
    return res.data
  },
  async updateCategory({ id, ...dataPost }: CategoryUpdate) {
    const url = `/category/${id}/`
    const res = await http.patch<ResultResponse<Category>>(url, dataPost)
    return res.data
  },
}

export default categoryApi
