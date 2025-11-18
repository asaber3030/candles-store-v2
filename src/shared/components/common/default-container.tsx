import { cn } from "@/shared/lib/cn"
import { ClassValue } from "class-variance-authority/types"

type Props = {
  className?: ClassValue
  children: React.ReactNode
}
export const DefaultContainer = ({ className, children }: Props) => {
  return <div className={cn("max-w-[1600px] xl:px-16 px-4 py-2 mx-auto", className)}>{children}</div>
}
