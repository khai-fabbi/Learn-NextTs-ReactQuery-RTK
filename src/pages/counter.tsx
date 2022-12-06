import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'

import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from '@/app/counterSlice'
import { useAppDispatch, useAppSelector } from '@/app/hook'
import { fetchPostList, resetPostList, selectPostList } from '@/app/postSlice'
import { Meta } from '@/layouts/Meta'
import type { NextPageWithLayout } from '@/models'
import { Main } from '@/templates/Main'

const Counter: NextPageWithLayout = () => {
  const counter = useAppSelector(selectCount)
  const postList = useAppSelector(selectPostList)

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
        <ul className="flex flex-col max-w-2xl gap-4">
          {postList.length > 0 &&
            postList.map((item) => (
              <li key={item.id} className="capitalize">
                <a
                  href=""
                  className="text-lg italic font-bold text-red-500 transition-all hover:text-red-600"
                >
                  {item.title}
                </a>
                <p>{item.body}</p>
              </li>
            ))}
        </ul>
        <button className="mt-4 btn btn-primary" onClick={handleResetPost}>
          Reset
        </button>
        <button className="mt-4 btn btn-success" onClick={handleGetPostList}>
          GET DATA
        </button>
      </div>
    </section>
  )
}
Counter.getLayout = function getLayout(page: ReactElement) {
  return (
    <Main meta={<Meta title="Counter" description="Counter" />}>{page}</Main>
  )
}

export default Counter
