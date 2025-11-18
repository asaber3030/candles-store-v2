"use client"

import { useDefaultMutation } from "@/shared/hooks/useMutation"
import { useTranslations } from "next-intl"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

import { deleteUserAction, restoreUserAction } from "@/entities/user/api/user.api"
import { queryKeys } from "@/shared/config/query-keys"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import { TooltipButton } from "@/shared/components/common/tooltip-button"
import { Button } from "@/shared/components/ui/button"
import { Edit } from "lucide-react"
import { User } from "@prisma/client"

export const UpdateUserModal = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false)
  const [isActive, setIsActive] = useState(user.deletedAt === null)

  const qc = useQueryClient()
  const t = useTranslations()

  const mutation = useDefaultMutation({
    mutationFn: async () => {
      if (isActive) {
        return await restoreUserAction(user.id)
      } else {
        return await deleteUserAction(user.id)
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.users.index() })
      setOpen(false)
    }
  })

  const handleAction = () => {
    mutation.mutate()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <TooltipButton tooltip={t("Update User")} icon={Edit} size='icon' variant='info' />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Update User")}</DialogTitle>
          <DialogDescription>{t("Update User Description")}</DialogDescription>
        </DialogHeader>

        <div className='space-y-3'>
          <Select
            value={isActive ? "yes" : "no"}
            onValueChange={(value) => setIsActive(value === "yes")} // This correctly updates 'isActive'
          >
            <SelectTrigger>
              <SelectValue placeholder='Is Account Active?' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='yes'>{t("Yes")}</SelectItem>
              <SelectItem value='no'>{t("No")}</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleAction} loading={mutation.isPending} variant='info'>
            {t("Save")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
