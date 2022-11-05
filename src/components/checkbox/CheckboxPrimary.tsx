import clsx from 'clsx'
import * as React from 'react'

interface CheckboxProps extends Omit<React.ComponentProps<'input'>, 'type'> {}

export default function Checkbox({
  checked = false,
  onChange = () => {},
  className = '',
}: CheckboxProps) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={clsx(
        className,
        'checkbox-primary checkbox checkbox-sm text-white border border-gray-bor'
      )}
    />
  )
}
