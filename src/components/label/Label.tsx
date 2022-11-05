import clsx from 'clsx'
import type { ReactNode } from 'react'

interface LabelProps {
  htmlFor?: string
  children: ReactNode
  className?: string
}

export default function Label({ htmlFor, className, children }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        className,
        'inline-block self-start text-black-text1 text-sm font-normal cursor-pointer'
      )}
    >
      {children}
    </label>
  )
}
