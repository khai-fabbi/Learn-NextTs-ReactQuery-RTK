import type { ReactNode } from 'react'
import React from 'react'

export interface HeadingHomeProps {
  chidren: ReactNode
}

export default function HeadingHome({ chidren }: HeadingHomeProps) {
  return <div className="text-2xl font-semibold text-center">{chidren}</div>
}
