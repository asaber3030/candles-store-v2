import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/cn"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",

        // extended to match button
        indigo: "border-transparent bg-indigo-500 text-white [a&]:hover:bg-indigo-500/80",
        ghost: "border border-transparent hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "border-transparent text-primary underline-offset-4 hover:underline",
        success: "border-transparent bg-green-700 text-white [a&]:hover:bg-green-600",
        warning: "border-transparent bg-yellow-500 text-black [a&]:hover:bg-yellow-600",
        info: "border-transparent bg-blue-500 text-white [a&]:hover:bg-blue-600",
        muted: "border-transparent bg-muted text-muted-foreground [a&]:hover:bg-muted/80 dark:bg-muted/40",
        subtle: "border-transparent bg-transparent text-foreground hover:bg-accent/30",
        transparent: "border-transparent bg-transparent text-inherit hover:bg-accent/20",
        elevated: "border-transparent bg-background shadow-md dark:bg-card dark:hover:bg-card/90",
        gradient: "border-transparent bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90",
        outlinePrimary: "border border-primary text-primary hover:bg-primary/10",
        outlineSecondary: "border border-secondary text-secondary hover:bg-secondary/10",
        outlineSuccess: "border border-green-700 text-green-600 hover:bg-green-50 dark:hover:bg-green-950/30",
        outlineWarning: "border border-yellow-500 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-950/30",
        outlineDestructive: "border border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30",
        outlineInfo: "border border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

function Badge({ className, variant, asChild = false, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return <Comp data-slot='badge' className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
