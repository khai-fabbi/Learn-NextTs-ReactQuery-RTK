import axios from 'axios'
import type { GetStaticProps } from 'next'
import Link from 'next/link'
import type { ReactElement } from 'react'

import { PaginatedItems } from '@/components/common'
import { Meta } from '@/layouts/Meta'
import type { NextPageWithLayout } from '@/models'
import { Main } from '@/templates/Main'

interface PostPageProps {
  posts: any[]
}
const PostPage: NextPageWithLayout<PostPageProps> = ({ posts }) => {
  return (
    <div className="">
      <h1 className="text-4xl font-semibold uppercase">Post Page</h1>
      <ul className="ml-10 ">
        {posts.length > 0 &&
          posts.map((post) => (
            <li
              className="capitalize cursor-pointer hover:text-red-600"
              key={post.id}
            >
              <Link href={`posts/${post.id}`} passHref legacyBehavior>
                <a>
                  {post.title} - {post.id}
                </a>
              </Link>
            </li>
          ))}
      </ul>
      <div className="flex flex-row justify-center mt-4 mb-7">
        <PaginatedItems currentPage={1} onChange={() => {}} />
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (_) => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
  const postList = response.data

  return {
    props: {
      posts: [...postList],
    },
  }
}
PostPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Main meta={<Meta title="Post" description="Post List" />}>{page}</Main>
  )
}

export default PostPage
