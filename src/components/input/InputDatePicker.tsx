import { forwardRef } from 'react'

// eslint-disable-next-line react/display-name
export const CustomInputDatePicker = forwardRef(
  (props: React.ComponentProps<'input'>, ref: any) => {
    return <input className="input input-primary" {...props} ref={ref} />
  }
)
