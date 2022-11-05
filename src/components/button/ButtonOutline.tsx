import clsx from 'clsx'
import type { MouseEventHandler, ReactNode } from 'react'

type ButtonOutlineProps = {
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
} & React.ComponentProps<'button'>

export default function ButtonOutline({
  children,
  type = 'button',
  className,
  ...props
}: ButtonOutlineProps) {
  return (
    <button
      type={type}
      {...props}
      onClick={props.onClick}
      className={clsx(
        'border-gray-bor hover:border-gray-bor text-black-text1 hover:text-black-text1 hover:bg-gray-bor min-w-[60px] min-h-[34px] shadow btn btn-sm btn-outline',
        className
      )}
    >
      {children}
    </button>
  )
}
