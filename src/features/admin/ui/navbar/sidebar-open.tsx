import { Button } from "@/shared/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/shared/components/ui/sheet"
import { Menu } from "lucide-react"
import { cookies } from "next/headers"
import { SidebarLinks } from "../sidebar/sidebar-links"
import { Separator } from "@/shared/components/ui/separator"
import { SidebarHeader } from "../sidebar/sidebar-header"
import { ScrollArea } from "@/shared/components/ui/scroll-area"

export const SidebarNavbarOpen = () => {
  const store = cookies()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' className='h-9'>
          <Menu className='size-4 text-gray-500' />
        </Button>
      </SheetTrigger>
      <ScrollArea>
        <SheetContent className='pt-6'>
          <SidebarHeader />
          <SidebarLinks />
          <Separator className='my-2' />
        </SheetContent>
      </ScrollArea>
    </Sheet>
  )
}
