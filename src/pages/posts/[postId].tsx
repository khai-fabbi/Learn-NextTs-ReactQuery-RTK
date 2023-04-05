import axios from 'axios'
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from 'next'
import type { ReactElement } from 'react'

import { Main } from '@/layouts/Main'
import { Meta } from '@/layouts/Meta'
import type { NextPageWithLayout } from '@/models'

export interface PostDetailPageProps {
  post: any
}
const PostDetailPage: NextPageWithLayout<PostDetailPageProps> = ({ post }) => {
  if (!post) return null
  return (
    <div>
      {' '}
      <h1 className="text-4xl text-black-origin">Post Detail Page</h1>
      <h2>title : {post.title}</h2>
      <p>description : {post.body}</p>
    </div>
  )
}
export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10'
  )
  const postList = await response.data

  const paths = postList.map((post: any) => {
    return {
      params: {
        postId: `${post.id}`,
      },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<PostDetailPageProps> = async (
  context: GetStaticPropsContext
) => {
  const postId = context.params?.postId
  if (!postId) return { notFound: true }

  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  )
  const post = response.data

  return {
    props: {
      post,
    },
  }
}

PostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Main meta={<Meta title="Post Detail" description="Detail" />}>{page}</Main>
  )
}
export default PostDetailPage
