"use client"

import { useLocale, useTranslations } from "next-intl"
import { useCategories } from "@/entities/category/hooks/useCategories"
import { useRouter } from "next/navigation"

import { cn } from "@/shared/lib/cn"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu"
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react"
import { userRoutes } from "@/shared/config/routes"
import Link from "next/link"

export const NavbarCategoriesDropdown = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations()

  const Icon = locale == "ar" ? ArrowLeft : ArrowRight

  const { categories, isCategoriesLoading } = useCategories()

  const trigger = children || (
    <li
      className={cn(
        "flex items-center gap-3",
        "py-2 px-4 rounded-lg",
        "text-sm font-medium",
        "transition-all duration-200 ease-in-out",
        "text-gray-600 hover:text-primary-600",
        "hover:bg-gray-100 text-lg"
      )}
    >
      {t("Categories")} <ChevronDown />
    </li>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full xl:w-fit">{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="xl:min-w-[600px] w-[200px]">
        <DropdownMenuLabel className="flex items-center gap-2 w-full justify-between">
          {t("Categories")}
          <Link href={userRoutes.categories.index} className="ml-2 flex items-center gap-2 hover:underline">
            {t("See All")}
            <Icon className="size-4" />
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isCategoriesLoading ? (
          <DropdownMenuItem>Loading...</DropdownMenuItem>
        ) : (
          <div className="grid xl:grid-cols-2 grid-cols-1 gap-2">
            {categories?.data?.map((category) => (
              <DropdownMenuItem
                onClick={() => router.push(userRoutes.categories.viewBySlug(category.slug!))}
                key={`navbar-category-${category.id}`}
                className="flex items-center gap-2 font-bold cursor-pointer"
              >
                <img src={category.icon} alt={category.name} className="w-8 h-8 rounded-md" />
                {(locale == "ar" ? category.nameAr : category.name) || category.name}
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
