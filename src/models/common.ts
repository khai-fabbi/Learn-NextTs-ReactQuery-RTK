import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
export type PaginatorInfo = {
  prev: boolean
  next: boolean
  page: number
  page_size: number
  total_record: number
  total_page: number
}
export type ResultResponse<D> = {
  status: string
  error: boolean
  data: D
  time: Date
}
export type ResultPaginatorResponse<D> = {
  status: string
  error: boolean
  data: {
    links: PaginatorInfo
    data: D
  }
  time: Date
}
