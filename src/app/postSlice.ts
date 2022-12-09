import type { AsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

import type { RootState } from './store'

export interface PostState {
  userId?: number
  id: number | string
  title: string
  body: string
}

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

const initialState: {
  postList: PostState[]
  loading: boolean
  currentRequestId: string | undefined
} = {
  postList: [
    {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    },
  ],
  loading: false,
  currentRequestId: undefined,
}

export const fetchPostList = createAsyncThunk(
  'post/fetchPostList',
  async (_, thunkAPI) => {
    const response = await axios.get<PostState[]>(
      'https://jsonplaceholder.typicode.com/posts',
      {
        signal: thunkAPI.signal,
      }
    )
    return response.data
  }
)

export const getPostItemById = createAsyncThunk(
  'get/getPostItemById',
  async (postId: number, thunkAPI) => {
    const response = await axios.get<PostState>(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        signal: thunkAPI.signal,
      }
    )
    return response.data
  }
)

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    resetPostList: (state) => {
      state.postList = []
    },
    addPost: (
      state,
      action: PayloadAction<Omit<PostState, 'userId' | 'id'>>
    ) => {
      const post = { ...action.payload, id: uuidv4() }
      state.postList.push(post)
    },
    deletePostItem: (state, action: PayloadAction<string | number>) => {
      const postItemId = action.payload
      const foundIndexPost = state.postList.findIndex(
        (post) => post.id === postItemId
      )
      if (foundIndexPost < 0) return
      state.postList.splice(foundIndexPost, 1)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostList.fulfilled, (state, action) => {
        state.postList = action.payload
      })
      .addMatcher<PendingAction>(
        (action): action is PendingAction => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true
          state.currentRequestId = action.meta.requestId
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) =>
          action.type.endsWith('/rejected') ||
          action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (
            state.loading &&
            state.currentRequestId === action.meta.requestId
          ) {
            state.loading = false
            state.currentRequestId = undefined
          }
        }
      )
    // .addDefaultCase((state, action) => {})
  },
})

// Action creators are generated for each case reducer function
export const { resetPostList, addPost, deletePostItem } = postSlice.actions
export const selectPostList = (state: RootState) => state.post.postList
export default postSlice.reducer
