"use client"

import { cn } from "@/shared/lib/cn"
import { ClassValue } from "class-variance-authority/types"
import { AlertCircleIcon } from "lucide-react"

type Props = {
  label?: string
  className?: ClassValue
}

export const NoDataLabel = ({ label = "لا يوجد بيانات.", className }: Props) => {
  return (
    <div className={cn("text-gray-500 text-sm text-right flex-row-reverse font-medium bg-white border p-4 rounded-md shadow flex items-center gap-4 justify-end", className)}>
      {label}
      <AlertCircleIcon className='w-5 h-5 text-gray-400' />
    </div>
  )
}
