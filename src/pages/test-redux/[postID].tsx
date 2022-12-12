import { useRouter } from 'next/router'
import type { ReactElement } from 'react'

import { useGetPostByIdQuery } from '@/app/postService'
import { Loading } from '@/components/loading'
import { Meta } from '@/layouts/Meta'
import type { NextPageWithLayout } from '@/models'
import { Main } from '@/templates/Main'

const DeatailPost: NextPageWithLayout = () => {
  const router = useRouter()
  console.log('2222', router.query)

  const { data, error, isLoading } = useGetPostByIdQuery('1')
  if (error) return <h1>Error</h1>
  return (
    <div>
      {isLoading && <Loading />}

      <h1>{data?.title}</h1>
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
