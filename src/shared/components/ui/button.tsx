import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/cn";
import { Loader, LucideIcon } from "lucide-react";

const buttonVariants = cva(
  "inline-flex cursor-pointer rounded-full items-center flex-row-reverse justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/60 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-white shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        indigo: "bg-indigo-500 text-white shadow-xs hover:bg-indigo-500/80",

        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-green-700 text-white shadow-xs hover:bg-green-600 focus-visible:ring-green-200 dark:focus-visible:ring-green-400",
        warning: "bg-yellow-500 text-black shadow-xs hover:bg-yellow-600 focus-visible:ring-yellow-200 dark:focus-visible:ring-yellow-400",
        info: "bg-blue-500 text-white shadow-xs hover:bg-blue-600 focus-visible:ring-blue-200 dark:focus-visible:ring-blue-400",
        muted: "bg-muted text-muted-foreground shadow-xs hover:bg-muted/80 dark:bg-muted/40",
        subtle: "bg-transparent text-foreground hover:bg-accent/30",
        transparent: "bg-transparent text-inherit shadow-none hover:bg-accent/20",
        elevated: "bg-background shadow-md hover:shadow-lg dark:bg-card dark:hover:bg-card/90",
        gradient: "bg-gradient-to-r from-primary to-secondary text-white shadow-xs hover:opacity-90",
        outlinePrimary: "border border-primary text-primary hover:bg-primary/10",
        outlineSecondary: "border border-secondary text-secondary hover:bg-secondary/10",
        outlineSuccess: "border border-green-700 text-green-600 hover:bg-green-50 dark:hover:bg-green-950/30",
        outlineWarning: "border border-yellow-500 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-950/30",
        outlineDestructive: "border border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30",
        outlineInfo: "border border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30",
      },
      size: {
        default: "h-8 px-4 py-2 has-[>svg]:px-3",
        sm: "h-7 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-9 px-6 has-[>svg]:px-4",
        icon: "size-8",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "sm",
    },
  }
);

export type UIButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
    icon?: LucideIcon;
  };

function Button({ className, variant, size, rounded, loading, icon: Icon, asChild = false, ...props }: UIButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp data-slot="button" disabled={loading} className={cn(buttonVariants({ variant, size, rounded, className }))} {...props}>
      {props.children}
      {loading && <Loader className="size-4 animate-spin" />}
      {Icon && !loading && <Icon className="size-4" />}
    </Comp>
  );
}

export { Button, buttonVariants };
