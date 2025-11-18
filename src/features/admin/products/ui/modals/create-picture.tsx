"use client"

import { useDefaultMutation } from "@/shared/hooks/useMutation"
import { useTranslations } from "next-intl"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

import { createProductPictureAction } from "@/entities/product/api/proudct.api"
import { queryKeys } from "@/shared/config/query-keys"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import { FileUploader } from "@/shared/components/form/file"
import { Button } from "@/shared/components/ui/button"
import { Plus } from "lucide-react"

type TMut = {
  picture: File | null
}

export const CreatePictureModal = ({ productId }: { productId: number }) => {
  const [open, setOpen] = useState(false)
  const [picture, setPicture] = useState<File | null>(null)

  const t = useTranslations()
  const qc = useQueryClient()

  const mutation = useDefaultMutation({
    mutationFn: ({ picture }: TMut) => createProductPictureAction(productId, picture),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.products.single(productId) })
      if (data.status == 201) {
        setOpen(false)
      }
    }
  })

  const handleAction = () => {
    mutation.mutate({
      picture
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={Plus} variant='success'>
          {t("Create Picture")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Create Picture")}</DialogTitle>
          <DialogDescription>{t("Create Picture Description")}</DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          <FileUploader setFile={setPicture} />

          <Button onClick={handleAction} loading={mutation.isPending} variant='success'>
            {t("Save")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
