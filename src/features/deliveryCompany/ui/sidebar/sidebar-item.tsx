"use client"

import Link from "next/link"

import { LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/shared/lib/cn"

type Props = {
  icon: LucideIcon
  label: string
  url: string
}

export const DeliverySidebarItem = ({ icon: Icon, label, url }: Props) => {
  const pathname = usePathname()
  const isActive = pathname.includes(url)

  return (
    <li>
      <Link href={url} className={cn("px-4 py-2 rounded-md mb-1 flex gap-4 items-center transition-all hover:bg-sidebarLight text-sm font-medium text-gray-200 hover:bg-[#222]", isActive && "bg-sidebarLight")}>
        <Icon className='size-5 text-gray-200' />
        <span>{label}</span>
      </Link>
    </li>
  )
}
