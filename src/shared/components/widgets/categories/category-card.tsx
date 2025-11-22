import Link from "next/link"

import { Category } from "@prisma/client"
import { ChevronRight } from "lucide-react"

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categories/${category.id}`}
      className='
        group
        flex items-center justify-between
        bg-white border border-gray-200
        hover:border-gray-300 hover:shadow-lg
        transition-all duration-200
        p-5 rounded-2xl
        w-full
      '
    >
      <span className='text-lg font-medium text-gray-800 group-hover:text-gray-900'>{category.name}</span>

      <ChevronRight className='w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-all' />
    </Link>
  )
}
