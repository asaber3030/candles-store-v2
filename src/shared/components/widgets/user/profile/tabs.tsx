"use client"

import { User, MapPin, Lock, ShoppingCart, Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
  { label: "Profile", icon: User, href: "/profile" },
  { label: "Addresses", icon: MapPin, href: "/profile/addresses" },
  { label: "Update Password", icon: Lock, href: "/profile/update-password" },
  { label: "Orders", icon: ShoppingCart, href: "/profile/orders" }
]

export const ProfileTabs = () => {
  const t = useTranslations()
  const pathname = usePathname()

  return (
    <div className='w-96 border rounded-lg shadow-sm p-4 bg-white'>
      <ul className='flex flex-col gap-1'>
        {tabs.map((tab) => {
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
