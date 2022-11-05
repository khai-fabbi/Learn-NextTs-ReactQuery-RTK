import clsx from 'clsx'
import React from 'react'

export interface TooglePrimaryProps {
  isChecked: boolean
  className?: string
  onChange?: () => void
}

export default function TogglePrimary({
  isChecked,
  className,
  onChange,
}: TooglePrimaryProps) {
  return (
    <label className="cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        className="hidden"
        onChange={onChange}
      />
      <div
        className={clsx(
          'inline-block w-12 h-6 relative rounded-full p-1 transition-all',
          isChecked ? 'bg-green-primary' : 'bg-gray-300',
          className
        )}
      >
        <span
          className={clsx(
            'absolute transition-all w-4 h-4 bg-white rounded-full inline-block',
            isChecked && 'translate-x-[150%]'
          )}
        ></span>
      </div>
    </label>
  )
}
