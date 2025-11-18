"use client"

import Link from "next/link"
import { usePathname } from "next/navigation" // Use usePathname to check the current route
import { cn } from "@/shared/lib/cn"

// Optional: Import a type for an Icon component if you support icons
// import { LucideIcon } from "lucide-react"

type Props = {
  label: string
  url: string
  // Optional: Add support for an icon
  // icon?: LucideIcon
}

export const NavbarItem = ({ label, url /*, icon: Icon*/ }: Props) => {
  const pathname = usePathname()

  const isActive = url === "/" ? pathname === "/" : pathname.startsWith(url)

  return (
    <li>
      <Link
        href={url}
        className={cn(
          "flex items-center gap-3",
          "py-2 px-4 rounded-lg",
          "text-sm font-medium",
          "transition-all duration-200 ease-in-out",

          "text-gray-600 hover:text-primary-600",
          "hover:bg-gray-100 text-lg",

          isActive && "bg-primary-50 text-primary-700 font-semibold"
        )}
      >
        {label}
      </Link>
    </li>
  )
}
