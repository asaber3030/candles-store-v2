"use client"

import Link from "next/link"

import { User, LucideIcon, LockIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { adminRoutes } from "@/shared/config/routes"

type Tab = {
  label: string
  icon: LucideIcon
  href: string
}

const defaultTabs = [
  { label: "Profile", icon: User, href: adminRoutes.profile },
  { label: "Change Password", icon: LockIcon, href: adminRoutes.changePassword }
]

export const ProfileTabs = ({ tabs }: { tabs?: Tab[] }) => {
  const t = useTranslations()
  const pathname = usePathname()

  const realTabs = tabs || defaultTabs

  return (
    <div className='w-96 border rounded-lg shadow-sm p-4 bg-white'>
      <ul className='flex flex-col gap-1'>
        {realTabs.map((tab) => {
          const Icon = tab.icon
          const isActive = pathname === tab.href

          return (
            <li key={tab.label}>
              <Link href={tab.href} className={`flex items-center gap-3 p-2 rounded transition-colors hover:bg-gray-100 ${isActive ? "bg-gray-200 font-semibold text-gray-900" : "text-gray-700"}`}>
                <Icon className='w-5 h-5' />
                <span>{t(tab.label)}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
