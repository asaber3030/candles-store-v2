import { ClassValue } from "clsx"
import { Skeleton } from "../ui/skeleton"
import { cn } from "@/shared/lib/cn"

type Props = {
  className?: ClassValue
  showLabel?: boolean
}

export const InputSkeleton = ({ className, showLabel = true }: Props) => {
  return (
    <div className={cn(className, "space-y-2 my-2")}>
      {showLabel && <Skeleton className='h-4 w-32' />}
      <Skeleton className='h-9 w-full' />
    </div>
  )
}
