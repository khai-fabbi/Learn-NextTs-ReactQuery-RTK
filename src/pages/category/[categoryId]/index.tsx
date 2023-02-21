import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import * as React from 'react'

import categoryApi from '@/api/category.api'
import { Loading } from '@/components/loading'
import { Meta } from '@/layouts/Meta'
import type { NextPageWithLayout } from '@/models'
import { Main } from '@/templates/Main'

const CategoryDetail: NextPageWithLayout = () => {
  const router = useRouter()
  const { categoryId = '' } = router.query
  const { data: dataRes, isLoading } = useQuery({
    queryKey: ['category-detail', categoryId],
    queryFn: () => categoryApi.getById(categoryId as string),
    enabled: !!categoryId,
    staleTime: 10 * 1000,
  })
  return (
    <div>
      {isLoading && <Loading />}
      <h1 className="text-3xl text-red-600">Detail Post</h1>
      <h2>{dataRes?.data.name}</h2>
      <p>{dataRes?.data.description}</p>
    </div>
  )
}

CategoryDetail.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Main meta={<Meta title="Category detail" description="Category detail" />}>
      {page}
    </Main>
  )
}

export default CategoryDetail
