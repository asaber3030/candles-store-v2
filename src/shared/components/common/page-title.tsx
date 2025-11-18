import { cn } from "@/shared/lib/cn"
import { ClassValue } from "class-variance-authority/types"

type Props = {
  title: React.ReactNode
  children?: React.ReactNode
  rightClassName?: ClassValue
  className?: ClassValue
  titleClassName?: ClassValue
}

export const PageTitle = ({ title, children, rightClassName, className, titleClassName }: Props) => {
  return (
    <div className={cn("flex items-center flex-wrap xl:justify-between justify-center gap-4 mb-4", className)}>
      <h2 className={cn("text-2xl font-medium capitalize", titleClassName)}>{title}</h2>
      <div className={cn("flex gap-2 items-center", rightClassName)}>{children}</div>
    </div>
  )
}
