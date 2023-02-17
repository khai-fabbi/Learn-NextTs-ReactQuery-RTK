import * as React from 'react'
import ReactPaginate from 'react-paginate'

export interface PaginatedItemsProps {
  currentPage?: number
  totalPage?: number
  onChange?: (select: { selected: number }) => void
}

export default function PaginatedItems({
  currentPage = 1,
  totalPage = 1,
  onChange,
}: PaginatedItemsProps) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={
        <button
          className="ml-4 btn btn-outline btn-primary"
          disabled={currentPage === totalPage}
        >
          Next
        </button>
      }
      previousLabel={
        <button
          className="mr-4 btn btn-outline btn-primary"
          disabled={currentPage === 1}
        >
          Previous
        </button>
      }
      onPageChange={onChange}
      pageRangeDisplayed={4}
      marginPagesDisplayed={2}
      pageCount={totalPage}
      pageClassName="page-item"
      pageLinkClassName="page-link"
      // previousClassName="page-item"
      // previousLinkClassName="page-link"
      // nextClassName="page-item"
      // nextLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      forcePage={currentPage - 1}
    />
  )
}
