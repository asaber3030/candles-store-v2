import { cn } from "@/shared/lib/cn"
import { ClassValue } from "class-variance-authority/types"
import { AlertTriangle } from "lucide-react"

type Props = {
  error: Error | null
}

export const DisplayError = ({ error }: Props) => {
  if (!error) return null

  return (
    <div className='flex items-center gap-3 p-4 rounded-lg bg-red-50 border border-red-200 text-red-900 shadow-sm'>
      <AlertTriangle className='w-6 h-6 text-red-500 shrink-0' />
      <div>
        <div className='font-semibold text-red-700'>Something went wrong</div>
        <div className='text-sm mt-1'>{error.message}</div>
        {error.stack && (
          <details className='mt-2 text-xs text-red-400'>
            <summary>Show stack trace</summary>
            <pre className='whitespace-pre-wrap'>{error.stack}</pre>
          </details>
        )}
      </div>
    </div>
  )
}

type ErrorLabelProps = {
  error: Error | null | undefined
  className?: ClassValue
}

export const ErrorLabel = ({ className, error }: ErrorLabelProps) => {
  return <p className={cn("text-red-500 text-sm font-medium mt-1", className)}>{error?.message || "Something went wrong"}</p>
}
