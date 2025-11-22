import Link from "next/link"

import { LucideIcon } from "lucide-react"

type Props = {
  href: string
  icon?: LucideIcon
  label: string
}

export const MobileNavbarItem = ({ href, icon: Icon, label }: Props) => {
  return (
    <li>
      <Link
        className="flex gap-2 py-2 px-4 rounded-md text-nowrap items-center transition-all border bg-white line-clamp-1 hover:bg-gray-100 text-sm"
        href={href}
      >
        {Icon && <Icon className="size-4 text-main" />} {label}
      </Link>
    </li>
  )
}
