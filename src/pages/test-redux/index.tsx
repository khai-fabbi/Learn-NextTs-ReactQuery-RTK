import 'react-datepicker/dist/react-datepicker.css'

import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'

import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from '@/app/counterSlice'
import { useAppDispatch, useAppSelector } from '@/app/hook'
import {
  addPost,
  deletePostItem,
  fetchPostList,
  resetPostList,
  selectPostList,
} from '@/app/postSlice'
import { Input } from '@/components/input'
import { CustomInputDatePicker } from '@/components/input/InputDatePicker'
import Loading from '@/components/loading/Loading'
import { Meta } from '@/layouts/Meta'
import type { NextPageWithLayout } from '@/models'
import { Main } from '@/templates/Main'

const TestRedux: NextPageWithLayout = () => {
  const counter = useAppSelector(selectCount)
  const postList = useAppSelector(selectPostList)
  const loading = useAppSelector((state) => state.post.loading)

  const [datePost, setDatePost] = useState<Date | null>(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [value, setValue] = useState(0)
  const dispatch = useAppDispatch()

  const handleResetPost = () => {
    dispatch(resetPostList())
  }
  const handleGetPostList = () => {
    dispatch(fetchPostList())
  }
  useEffect(() => {
    const promise = dispatch(fetchPostList())
    return () => promise.abort()
  }, [dispatch])

  const handleSubmitPost = () => {
    const bodyValue = {
      title,
      body: description,
    }
    dispatch(addPost(bodyValue))
  }
  const handleDeletePostItem = (postItemId: number | string) => {
    dispatch(deletePostItem(postItemId))
  }

  return (
    <section>
      {/* counter */}
      <div>
        <div className="flex items-center justify-center">
          <h2 className="flex items-center justify-center w-20 h-20 text-4xl text-red-500 rounded-full bg-slate-200">
            {counter}
          </h2>
        </div>
        <div className="flex items-center justify-center gap-5 mt-10">
          <button
            className="btn btn-primary"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <button
            className="btn btn-accent"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
        <div className="flex items-center justify-center gap-5 mt-10">
          <input
            type="number"
            className="input input-primary"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
          <button
            className="btn btn-info"
            onClick={() => dispatch(incrementByAmount(value))}
          >
            Increment Value
          </button>
        </div>
      </div>

      {/* post list */}
      <div className="mt-10">
        <div className="flex gap-10">
          <div className="flex flex-col w-2/5 gap-y-5">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="p-2 input input-primary min-h-[80px]"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <ReactDatePicker
              selected={datePost}
              onChange={(date) => setDatePost(date)}
              placeholderText="date"
              closeOnScroll
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              isClearable
              customInput={
                <CustomInputDatePicker className="w-full input input-primary" />
              }
              strictParsing
            />
          </div>
          <ul className="flex flex-col max-w-2xl gap-4 grow">
            {loading && <Loading />}
            {postList.length > 0 &&
              postList.slice(0, 4).map((item) => (
                <li key={item.id} className="flex capitalize gap-x-10">
                  <button
                    className="btn btn-sm btn-circle btn-outline btn-warning"
                    onClick={() => handleDeletePostItem(item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div>
                    <a
                      href=""
                      className="text-lg italic font-bold text-red-500 transition-all hover:text-red-600"
                    >
                      {item.title}
                    </a>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <div className="flex gap-x-4">
          <button className="mt-4 btn btn-error" onClick={handleResetPost}>
            Reset
          </button>
          <button className="mt-4 btn btn-success" onClick={handleGetPostList}>
            GET DATA
          </button>
          <button className="mt-4 btn btn-primary" onClick={handleSubmitPost}>
            POST
          </button>
        </div>
      </div>
    </section>
  )
}
TestRedux.getLayout = function getLayout(page: ReactElement) {
  return <Main meta={<Meta title="test" description="Test" />}>{page}</Main>
}

export default TestRedux
