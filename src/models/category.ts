export interface Category {
  id: number
  name: string
  description: string
  is_active: boolean
  created_date: Date
  updated_date: Date
}
export type CategoryPost = Pick<Category, 'name' | 'description' | 'is_active'>
export type CategoryUpdate = Partial<CategoryPost> & Pick<Category, 'id'>
