"use client"

import { useCurrentUser } from "@/entities/auth/hooks/useAuth"
import { adminRoutes } from "@/shared/config/routes"

import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"

import Link from "next/link"

export const SidebarHeader = () => {
  const { user } = useCurrentUser()

  return (
    <div className='flex gap-4 bg-[#222] items-center transition-all p-4 py-4 bg-sidebarLight rounded-md cursor-pointer shadow-sm hover:bg-sidebarLighter'>
      <Link href={adminRoutes.dashboard}>
        <Avatar className='bg-secondaryMain hover:opacity-80 text-white'>
          <AvatarFallback className='bg-secondaryMain'>{user?.name?.[0]}</AvatarFallback>
        </Avatar>
      </Link>
      <div>
        <h2 className='text-lg text-white'>{user?.name}</h2>
        <p className='line-clamp-1 text-sm text-gray-200'>{user?.email}</p>
      </div>
    </div>
  )
}
