import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import type { RootState } from './store'

export interface PostState {
  userId: number
  id: number
  title: string
  body: string
}

const initialState: {
  postList: PostState[]
} = {
  postList: [
    {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    },
    {
      userId: 1,
      id: 2,
      title: 'qui est esse',
      body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
    },
  ],
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

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    resetPostList: (state) => {
      state.postList = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostList.fulfilled, (state, action) => {
      state.postList = action.payload
    })
  },
})

// Action creators are generated for each case reducer function
export const { resetPostList } = postSlice.actions
export const selectPostList = (state: RootState) => state.post.postList
export default postSlice.reducer
