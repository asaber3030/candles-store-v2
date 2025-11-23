"use client"

import Link from "next/link"

import { Category } from "@prisma/client"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLocale } from "next-intl"

export function CategoryCard({ category }: { category: Category }) {
  const locale = useLocale()
  const name = (locale === "ar" ? category.nameAr : category.name) || category.name
  const Icon = locale == "ar" ? ChevronLeft : ChevronRight

  return (
    <Link
      href={`/categories/${category.id}`}
      className='
        group
        flex items-end justify-between
        bg-white border border-gray-200
        hover:border-gray-300 hover:shadow-lg
        transition-all duration-200
        p-5 rounded-2xl
        w-full
      '
    >
      <div>
        <img src={category.icon || "/images/category-placeholder.png"} alt={name} className='w-10 h-10 object-contain mb-2' />
        <span className='text-lg font-medium text-gray-800 group-hover:text-gray-900'>{name}</span>
      </div>

      <Icon className='w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-all' />
    </Link>
  )
}
