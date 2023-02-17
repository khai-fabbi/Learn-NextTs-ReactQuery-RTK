import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import categoryApi from '@/api/category.api'
import { PaginatedItems } from '@/components/common'
import { useToast } from '@/hooks'
import { Meta } from '@/layouts/Meta'
import type {
  Category,
  CategoryPost,
  CategoryUpdate,
  NextPageWithLayout,
} from '@/models'
import { CategoryForm, CategoryList } from '@/modules/category'
import { Main } from '@/templates/Main'

const CategoryApp: NextPageWithLayout = () => {
  const router = useRouter()
  const toast = useToast()
  const queryClient = useQueryClient()
  const [categorySelected, setCategorySelected] = useState<Category | null>(
    null
  )
  const [filter, setFilter] = useState<{ page: number }>({
    page: 1,
  })
  useEffect(() => {
    if (router.isReady) {
      setFilter({ ...filter, page: Number(router?.query.page) || 1 })
    }
  }, [router])
  const { data: categoryRes, isError } = useQuery({
    select: (data) => data.data,
    queryKey: ['category', filter.page],
    queryFn: () => categoryApi.getAll({ page: filter.page }),
    enabled: !!router.isReady,
    keepPreviousData: true,
    staleTime: 60 * 1000,
    cacheTime: 5 * 1000,
  })

  const { mutate: createCategory } = useMutation(
    (dt: CategoryPost) => categoryApi.createCategory(dt),
    {
      onSuccess: (_) => {
        toast('success', 'Created Successfully')
        queryClient.invalidateQueries(['category'])
      },
      onError: (error: Error) => {
        toast('error', 'Error')
        // eslint-disable-next-line no-console
        console.log(error)
      },
    }
  )
  const { mutate: updateCategory } = useMutation(
    (formValue: CategoryUpdate) => categoryApi.updateCategory(formValue),
    {
      onSuccess: (_) => {
        toast('success', 'Update Successfully')
        setCategorySelected(null)
        queryClient.invalidateQueries(['category'])
      },
      onError: (error: Error) => {
        toast('error', 'Error')
        // eslint-disable-next-line no-console
        console.log(error)
      },
    }
  )
  const { mutate: deleteCategoryMutate } = useMutation(
    (categoryId: number) => categoryApi.deleteCategoryById(categoryId),
    {
      onSuccess: (_) => {
        toast('success', 'Delete Successfully')
        queryClient.invalidateQueries(['category'])
      },
      onError: (error: Error) => {
        toast('error', 'Error')
        // eslint-disable-next-line no-console
        console.log(error)
      },
    }
  )
  const handleClickPost = (id: number) => {
    router.push(`/category/${id}`)
  }
  const handleSelectedCategory = (categoryId: number) => {
    const findCategoryItem = categoryRes?.data.find(
      (item) => item.id === categoryId
    )
    if (findCategoryItem) setCategorySelected(findCategoryItem)
  }
  const handleDeleteCategory = (id: number) => {
    // eslint-disable-next-line no-alert
    if (window !== undefined && window.confirm('Delete Category')) {
      deleteCategoryMutate(id)
    }
  }
  const handleSubmitCatetegory = (
    formValue: Pick<Category, 'name' | 'description' | 'is_active'>
  ) => {
    if (!categorySelected) {
      createCategory(formValue)
      return
    }
    updateCategory({ ...formValue, id: categorySelected.id })
  }

  const handleChangePage = ({ selected }: { selected: number }) => {
    setFilter({ ...filter, page: selected + 1 })
  }
  if (isError) return <h1>Error</h1>
  return (
    <div>
      <h1 className="text-3xl text-red-600">Category App</h1>
      <div className="divider text-black-origin" />
      <div className="flex gap-x-10">
        {categoryRes && (
          <div className="flex flex-col flex-1 gap-y-6">
            <CategoryList
              categoryList={categoryRes.data}
              onClick={handleClickPost}
              onDelete={handleDeleteCategory}
              onEditable={handleSelectedCategory}
            />
            <PaginatedItems
              currentPage={filter.page}
              totalPage={categoryRes.links.total_page}
              onChange={handleChangePage}
            />
          </div>
        )}
        <div className="flex-1">
          <CategoryForm
            onSubmitFormValue={handleSubmitCatetegory}
            categoryDetail={categorySelected || undefined}
          />
        </div>
      </div>
    </div>
  )
}

CategoryApp.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Main meta={<Meta title="Category" description="Category" />}>{page}</Main>
  )
}

export default CategoryApp
