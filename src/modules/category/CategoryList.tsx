import type { Category } from '@/models'

interface CategoryListProps {
  categoryList: Category[]
  onClick: (id: number) => void
  onDelete?: (id: number) => void
  onEditable?: (id: number) => void
  onPrefetchCategoryDetail?: (id: number) => void
}
const CategoryList = ({
  categoryList,
  onClick,
  onDelete,
  onEditable,
  onPrefetchCategoryDetail,
}: CategoryListProps) => {
  return (
    <ul className="flex flex-col gap-y-4">
      {categoryList.map(({ id, name, description }) => (
        <li key={id} className="flex items-center gap-x-5">
          <button
            className="btn btn-warning btn-outline"
            onClick={() => onEditable?.(id)}
          >
            Edit
          </button>
          <button
            className="btn btn-circle btn-outline btn-error"
            onClick={() => onDelete?.(id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div>
            <h2
              className="text-xl font-bold capitalize transition-all duration-200 cursor-pointer w-fit hover:text-blue-400"
              onClick={() => onClick(id)}
              onMouseEnter={() => onPrefetchCategoryDetail?.(id)}
            >
              {name}
            </h2>
            <span className="first:capitalize hover:text-gray-700">
              {description}
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}
export default CategoryList
