import * as React from "react"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip"
import { buttonVariants, UIButtonProps } from "../ui/button"
import { Loader } from "lucide-react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/shared/lib/cn"

type Props = UIButtonProps & {
  tooltip: React.ReactNode
}

export function TooltipButton({ className, variant, size, rounded, loading, icon: Icon, asChild = false, ...props }: Props) {
  const Comp = asChild ? Slot : "button"

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Comp data-slot='button' disabled={loading} className={cn(buttonVariants({ variant, size, rounded, className }))} {...props}>
          {props.children}
          {loading && <Loader className='size-4 animate-spin' />}
          {Icon && !loading && <Icon className='size-4' />}
        </Comp>
      </TooltipTrigger>
      <TooltipContent>{props.tooltip}</TooltipContent>
    </Tooltip>
  )
}
