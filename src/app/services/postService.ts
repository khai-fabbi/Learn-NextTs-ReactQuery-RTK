import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { PostState } from '../slices/postSlice'

export const postApi = createApi({
  reducerPath: 'postApi',
  tagTypes: ['Posts'],
  keepUnusedDataFor: 20,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
    prepareHeaders(headers) {
      headers.set('Authorization', 'Bearer ABCXYZ')
      return headers
    },
  }),
  endpoints: (builder) => ({
    getPostById: builder.query<PostState, number | string>({
      query: (postId) => `/posts/${postId}`,
    }),
    getPost: builder.query<PostState[], void>({
      query: () => '/posts',

      // * interface Tags: {
      // *    type: "Posts";
      // *    id: string;
      // *  }[]
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
              { type: 'Posts' as const, id: 'LIST' },
            ]
          : [{ type: 'Posts' as const, id: 'LIST' }],
    }),

    addPost: builder.mutation<PostState, Omit<PostState, 'id'>>({
      query: (body) => ({
        url: '/posts',
        method: 'POST',
        body,
      }),

      // invalidatesTags: (_, error) =>
      //   error ? [] : [{ type: 'Posts', id: 'LIST' }],
    }),
    updatePost: builder.mutation<
      PostState,
      Partial<PostState> & Pick<PostState, 'id'>
    >({
      query: ({ id, ...body }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_, error, { id }) =>
        error ? [] : [{ type: 'Posts' as const, id }],
    }),
    deletePost: builder.mutation<PostState, string | number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, error, id) =>
        error ? [] : [{ type: 'Posts' as const, id }],
    }),
  }),
})

export const {
  useGetPostByIdQuery,
  useGetPostQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi
