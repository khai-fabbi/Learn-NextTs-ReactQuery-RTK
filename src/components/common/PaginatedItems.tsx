import * as React from 'react'
import ReactPaginate from 'react-paginate'

import { IconChevronLeft, IconChevronRight } from '../icon'

export interface PaginatedItemsProps {
  currentPage?: number
  onChange?: () => void
}

export default function PaginatedItems({
  currentPage = 1,
  onChange = () => {},
}: PaginatedItemsProps) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={<IconChevronRight />}
      previousLabel={<IconChevronLeft />}
      onPageChange={onChange}
      pageRangeDisplayed={4}
      marginPagesDisplayed={2}
      pageCount={10}
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      forcePage={currentPage - 1}
    />
  )
}
