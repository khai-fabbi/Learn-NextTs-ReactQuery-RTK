import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { postApi } from './postService'
import postReducer from './postSlice'

const reducer = combineReducers({
  post: postReducer,
  [postApi.reducerPath]: postApi.reducer,
})
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
