import clsx from 'clsx'
import type { ReactNode } from 'react'

export interface BadgeProps {
  children: ReactNode
  className?: string
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <div className={clsx(className, 'text-xs badge badge-md text-default')}>
      {children}
    </div>
  )
}
