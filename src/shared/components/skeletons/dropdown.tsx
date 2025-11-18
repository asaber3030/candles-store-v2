import { cn } from "@/shared/lib/cn"
import { ClassValue } from "clsx"
import { Skeleton } from "../ui/skeleton"

type Props = {
  className?: ClassValue
}

export const DropdownSkeleton = ({ className }: Props) => {
  return (
    <div className={cn(className, "space-y-2 my-2")}>
      <Skeleton className='h-9 w-full' />
    </div>
  )
}
