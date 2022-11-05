import type { ReactNode } from 'react'

interface FormGroupProps {
  children: ReactNode
}

export default function FormGroup({ children }: FormGroupProps) {
  return <div className="form-control gap-y-2">{children}</div>
}
