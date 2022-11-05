import clsx from 'clsx'
import * as React from 'react'

export interface ButtonSquareProps {
  children: React.ReactNode
  className?: string
}
// for Button with icon
export default function ButtonSquare({
  children,
  className,
}: ButtonSquareProps) {
  return (
    <button
      type="button"
      className={clsx(
        className,
        'hover: w-[2.25rem] h-[2.25rem] border border-gray-bor rounded flex justify-center items-center transition-all hover:bg-gray-1 active:scale-90'
      )}
    >
      {children}
    </button>
  )
}
