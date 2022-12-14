import 'react-datepicker/dist/react-datepicker.css'

import Link from 'next/link'
import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'

import { useAppDispatch } from '@/app/hook'
import {
  useAddPostMutation,
  useGetPostByIdQuery,
  useGetPostQuery,
  useUpdatePostMutation,
} from '@/app/services/postService'
import type { PostState } from '@/app/slices/postSlice'
import {
  deletePostItem,
  fetchPostList,
  resetPostList,
} from '@/app/slices/postSlice'
import { Input } from '@/components/input'
import { CustomInputDatePicker } from '@/components/input/InputDatePicker'
import Loading from '@/components/loading/Loading'
import { Meta } from '@/layouts/Meta'
import type { NextPageWithLayout } from '@/models'
import { Main } from '@/templates/Main'

const TestRedux: NextPageWithLayout = () => {
  const { data: postList = [], isFetching } = useGetPostQuery()

  const [editPostId, setEditPostId] = useState<number | string>('')

  const [datePost, setDatePost] = useState<Date | null>(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [addPost] = useAddPostMutation()

  const dispatch = useAppDispatch()

  const handleResetPost = () => {
    dispatch(resetPostList())
  }
  const handleGetPostList = () => {
    dispatch(fetchPostList())
  }

  const { data: postEdit } = useGetPostByIdQuery(editPostId, {
    skip: !editPostId,
  })
  const [updatePost, { error: errorUpdatePost }] = useUpdatePostMutation()
  useEffect(() => {
    if (postEdit) {
      setTitle(postEdit.title)
      setDescription(postEdit.body)
    }
  }, [postEdit])
  const handleSubmitPost = async () => {
    const bodyValue = {
      title,
      body: description,
      userId: 1,
    }
    const rs = await addPost(bodyValue)
    console.log(rs)

    // dispatch(addPost(bodyValue))
  }
  const handleDeletePostItem = (postItemId: number | string) => {
    dispatch(deletePostItem(postItemId))
  }
  const handleUpdatePost = async () => {
    const formValue: Partial<PostState> & Pick<PostState, 'id'> = {
      title,
      body: description,
      id: editPostId,
    }
    const updateRs = await updatePost(formValue)
    // console.log(updateRs)
  }
  console.log(errorUpdatePost)
  // if (error) return <h1> Error</h1>
  return (
    <section>
      <h1 className="text-3xl font-bold text-black-origin">POST LIST</h1>
      {/* post list */}
      <div className="mt-10">
        <div className="flex gap-16">
          <div className="flex flex-col w-2/5 gap-y-5">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="rounded textarea textarea-primary"
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
            {isFetching && <Loading />}
            {!isFetching &&
              postList?.slice(0, 4).map((item) => (
                <li
                  key={item.id}
                  className="flex items-center capitalize gap-x-10"
                >
                  <div className="flex gap-3">
                    <button
                      className="btn btn-md btn-outline btn-info"
                      onClick={() => setEditPostId(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-md btn-circle btn-outline btn-error"
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
                  </div>
                  <div>
                    <Link href={`test/${item.id}`} legacyBehavior passHref>
                      <a className="text-lg italic font-bold text-red-500 transition-all hover:text-red-600">
                        {item.title}
                      </a>
                    </Link>

                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <div className="flex mt-4 gap-x-4">
          <button className="btn btn-error" onClick={handleResetPost}>
            Reset
          </button>
          <button className="btn btn-success" onClick={handleGetPostList}>
            GET DATA
          </button>
          <button className="btn btn-primary" onClick={handleSubmitPost}>
            POST
          </button>
          {editPostId && (
            <button className="btn btn-success" onClick={handleUpdatePost}>
              Update
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
TestRedux.getLayout = function getLayout(page: ReactElement) {
  return <Main meta={<Meta title="test" description="Test" />}>{page}</Main>
}

export default TestRedux
