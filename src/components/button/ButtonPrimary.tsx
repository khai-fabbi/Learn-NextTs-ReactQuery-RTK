import clsx from 'clsx'
import type { MouseEventHandler, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
} & React.ComponentProps<'button'>

export default function Button({
  children,
  type = 'button',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      {...props}
      onClick={props.onClick}
      className={clsx(
        'text-white min-w-[60px] min-h-[34px] shadow btn btn-sm btn-primary disabled:cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  )
}
