"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X, AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react"
import { cn } from "@/shared/lib/cn"

const errorAlertVariants = cva("relative w-full rounded-lg border px-4 py-4 transition-all duration-300", {
  variants: {
    severity: {
      error: "border-destructive/30 bg-destructive/5 text-destructive",
      warning: "border-amber-300/30 bg-amber-100/5 text-amber-700 dark:text-amber-200",
      info: "border-blue-300/30 bg-blue-100/5 text-blue-700 dark:text-blue-200",
      success: "border-success/30 bg-success/5 text-success"
    },
    animated: {
      true: "animate-in fade-in slide-in-from-top-2 duration-500",
      false: ""
    }
  },
  defaultVariants: {
    severity: "error",
    animated: true
  }
})

interface ErrorAlertProps extends React.ComponentProps<"div">, VariantProps<typeof errorAlertVariants> {
  onClose?: () => void
  closeable?: boolean
  title?: any
  description?: React.ReactNode
  icon?: React.ReactNode
  actions?: React.ReactNode
}

const severityIcons = {
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle2
}

const ErrorAlert = React.forwardRef<HTMLDivElement, ErrorAlertProps>(({ className, severity = "error", animated = true, onClose, closeable = true, title, description, icon, actions, ...props }, ref) => {
  const [isVisible, setIsVisible] = React.useState(true)

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  const IconComponent = icon || severityIcons[severity as keyof typeof severityIcons] || AlertCircle

  return (
    <div ref={ref} data-slot='error-alert' role='alert' className={cn(errorAlertVariants({ severity, animated }), "grid grid-cols-[1fr_auto] items-start gap-4 has-[>svg]:grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto]", className)} {...props}>
      {typeof IconComponent === "function" ? <IconComponent className='mt-0.5 size-5 shrink-0' /> : icon}

      <div className='grid gap-1 sm:gap-2'>
        {title && (
          <p className='font-semibold text-sm leading-tight' data-slot='error-alert-title'>
            {title}
          </p>
        )}
        {description && (
          <p className='text-xs sm:text-sm opacity-90 leading-relaxed' data-slot='error-alert-description'>
            {description}
          </p>
        )}
        {actions && (
          <div className='pt-2 flex flex-wrap gap-2' data-slot='error-alert-actions'>
            {actions}
          </div>
        )}
      </div>
    </div>
  )
})
ErrorAlert.displayName = "ErrorAlert"

export { ErrorAlert, errorAlertVariants }
