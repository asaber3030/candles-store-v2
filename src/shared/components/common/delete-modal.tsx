"use client"

import { useDefaultMutation } from "@/shared/hooks/useMutation"
import { useTranslations } from "next-intl"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import { TooltipButton } from "./tooltip-button"
import { Button } from "@/shared/components/ui/button"
import { Trash } from "lucide-react"

type Props = {
  openWith?: React.ReactNode
  id: number
  action: (id: number) => Promise<ApiResponse<any>>
  queryKey?: any
}

export const DeleteModal = ({ id, openWith, queryKey, action }: Props) => {
  const [open, setOpen] = useState(false)

  const t = useTranslations()
  const qc = useQueryClient()

  const mutation = useDefaultMutation({
    mutationFn: () => action(id),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey })
      if (data.status == 200) {
        setOpen(false)
      }
    }
  })

  const handleAction = () => {
    mutation.mutate()
  }

  const trigger = openWith ? openWith : <TooltipButton tooltip={t("Delete")} icon={Trash} variant='destructive' size='icon' />

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Delete Title")}</DialogTitle>
          <DialogDescription>{t("Delete Description")}</DialogDescription>
        </DialogHeader>

        <Button variant='destructive' onClick={handleAction} loading={mutation.isPending}>
          {t("Delete")}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
