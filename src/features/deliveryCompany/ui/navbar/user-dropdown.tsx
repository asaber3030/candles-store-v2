import { useCurrentUser } from "@/entities/auth/hooks/useAuth"
import { useLogout } from "@/entities/auth/hooks/useLogout"
import { DropdownSkeleton } from "@/shared/components/skeletons/dropdown"
import { Button } from "@/shared/components/ui/button"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu"
import { UserIcon } from "lucide-react"

export const DeliveryNavbarUserDropdown = () => {
  const { user, isUserLoading } = useCurrentUser()
  const { logout } = useLogout()

  if (isUserLoading) return <DropdownSkeleton />

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='cursor-pointer flex items-center gap-2'>
          <UserIcon size={16} /> {user?.name} (Delivery Company)
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
