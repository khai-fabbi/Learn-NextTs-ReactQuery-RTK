import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { PostState } from './postSlice'

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/posts/',
  }),
  endpoints: (builder) => ({
    getPostById: builder.query<PostState, string>({
      query: (postId) => `${postId}`,
    }),
  }),
})

export const { useGetPostByIdQuery } = postApi
