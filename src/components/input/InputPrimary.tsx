import clsx from 'clsx'
import React from 'react'

type InputProps = {
  containerClass?: string
  error?: string
} & React.ComponentProps<'input'>

export default function Input({
  name,
  children,
  type = 'text',
  containerClass,
  onChange = () => {},
  className,
  error,
  ...rest
}: InputProps) {
  return (
    <div className={`${containerClass} relative flex flex-col`}>
      <input
        {...rest}
        type={type}
        id={`${name}-id`}
        name={name}
        onChange={onChange}
        className={clsx(
          className,
          'input input-sm lg:min-h-[38px] border border-gray-bor placeholder:italic',
          {
            'input-error': error,
            'pr-16': Boolean(children),
          }
        )}
      />
      {children && (
        <div className="absolute right-[.75rem] -translate-y-1/2 top-1/2">
          {children}
        </div>
      )}
      {error && (
        <span className="absolute label-text top-full text-error">{error}</span>
      )}
    </div>
  )
}
