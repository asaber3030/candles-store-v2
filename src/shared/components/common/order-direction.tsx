"use client"

import { useTranslations } from "next-intl"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { ClassValue } from "class-variance-authority/types"
import { cn } from "@/shared/lib/cn"

type Props = {
  direction: TOrderDirection
  onDirectionChange: (direction: TOrderDirection) => void
  showLabel?: boolean
  className?: ClassValue
}

export const OrderDirection = ({ showLabel = false, className, direction, onDirectionChange }: Props) => {
  const t = useTranslations()

  return (
    <div className={cn(className)}>
      {showLabel && <Label>{t("Order Direction")}</Label>}
      <Select value={direction} onValueChange={onDirectionChange}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder={t("Order Direction")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='desc'>{t("Descending")}</SelectItem>
          <SelectItem value='asc'>{t("Ascending")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
