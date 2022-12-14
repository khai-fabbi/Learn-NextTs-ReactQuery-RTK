import { useRouter } from 'next/router'
import type { ReactElement } from 'react'

import { useGetPostByIdQuery } from '@/app/services/postService'
import { Loading } from '@/components/loading'
import { Meta } from '@/layouts/Meta'
import type { NextPageWithLayout } from '@/models'
import { Main } from '@/templates/Main'

const DeatailPost: NextPageWithLayout = () => {
  const router = useRouter()
  const { id } = router.query
  // eslint-disable-next-line no-console
  console.log('🚀 ~ file: [id].tsx:20 ~ id', id)

  const { data, error, isLoading } = useGetPostByIdQuery(`${id}`, {
    skip: !id,
    pollingInterval: 60000 * 2,
  })
  if (error) return <h1>Error</h1>
  return (
    <div>
      {isLoading && <Loading />}

      <h1 className="text-2xl text-red-600 capitalize transition-all hover:brightness-75">
        {data?.title}
      </h1>
      <p>{data?.body}</p>
    </div>
  )
}
DeatailPost.getLayout = function getLayout(page: ReactElement) {
  return (
    <Main meta={<Meta title="Detail Post" description="Detail Post" />}>
      {page}
    </Main>
  )
}

export default DeatailPost
