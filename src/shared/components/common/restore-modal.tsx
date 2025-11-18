"use client"

import { useDefaultMutation } from "@/shared/hooks/useMutation"
import { useTranslations } from "next-intl"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import { FolderSyncIcon, Trash } from "lucide-react"
import { TooltipButton } from "./tooltip-button"

type Props = {
  openWith?: React.ReactNode
  id: number
  action: (id: number) => Promise<ApiResponse<any>>
  queryKey?: any
}

export const RestoreModal = ({ id, openWith, action, queryKey }: Props) => {
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

  const trigger = openWith ? openWith : <TooltipButton tooltip={t("Restore")} icon={FolderSyncIcon} variant='info' size='icon' />

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Restore Title")}</DialogTitle>
          <DialogDescription>{t("Restore Description")}</DialogDescription>
        </DialogHeader>

        <Button variant='info' onClick={handleAction} loading={mutation.isPending}>
          {t("Restore")}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
