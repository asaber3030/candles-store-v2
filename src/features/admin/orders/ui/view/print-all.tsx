"use client"

import { useTranslations } from "next-intl"

import { Button } from "@/shared/components/ui/button"
import { Printer } from "lucide-react"

export const PrintOrderButton = ({ variant = "outline" }: any) => {
  const t = useTranslations()

  const onClick = () => {
    window.print()
  }

  return (
    <Button onClick={onClick} variant={variant} icon={Printer}>
      {t("Print")}
    </Button>
  )
}
