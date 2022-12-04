import type { ReactElement } from 'react'
import { useState } from 'react'

import { decrement, increment, incrementByAmount } from '@/app/counterSlice'
import { useAppDispatch, useAppSelector } from '@/app/hook'
import { Meta } from '@/layouts/Meta'
import type { NextPageWithLayout } from '@/models'
import { Main } from '@/templates/Main'

const Counter: NextPageWithLayout = () => {
  const counter = useAppSelector((state) => state.counter.value)
  const [value, setValue] = useState(0)
  const dispatch = useAppDispatch()
  const handleIncrement = () => {
    dispatch(increment())
  }
  const handleDecrement = () => {
    dispatch(decrement())
  }
  const handleIncrementValueInput = () => {
    dispatch(incrementByAmount(value))
  }
  return (
    <section>
      <div className="flex items-center justify-center">
        <h2 className="flex items-center justify-center w-20 h-20 text-4xl text-red-500 rounded-full bg-slate-200">
          {counter}
        </h2>
      </div>
      <div className="flex items-center justify-center gap-5 mt-10">
        <button className="btn btn-primary" onClick={handleIncrement}>
          Increment
        </button>
        <button className="btn btn-accent" onClick={handleDecrement}>
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
        <button className="btn btn-info" onClick={handleIncrementValueInput}>
          Increment Value
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
