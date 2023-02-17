import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import * as React from 'react'

import postsApi from '@/api/post.api'
import { Meta } from '@/layouts/Meta'
import type { NextPageWithLayout } from '@/models'
import { Main } from '@/templates/Main'

const PostTestDetail: NextPageWithLayout = () => {
  const router = useRouter()
  const { postId = '' } = router.query
  const { data: dataRes } = useQuery({
    queryKey: ['post-detail', postId],
    queryFn: () => postsApi.getById(postId as string),
    enabled: !!postId,
  })
  return (
    <div>
      <h1 className="text-3xl text-red-600">Detail Post</h1>
      <h2>{dataRes?.data.title}</h2>
      <p>{dataRes?.data.content}</p>
    </div>
  )
}

PostTestDetail.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Main meta={<Meta title="Todo app" description="To do app" />}>{page}</Main>
  )
}

export default PostTestDetail
