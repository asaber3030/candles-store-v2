"use client"

import { useDefaultMutation } from "@/shared/hooks/useMutation"
import { useTranslations } from "next-intl"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { createProductSizeAction } from "@/entities/product/api/proudct.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { queryKeys } from "@/shared/config/query-keys"
import { z } from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import { CheckboxField, TextField } from "@/shared/components/form/form"
import { CreateProductSizeSchema } from "@/entities/product/model/product.schema"
import { Button } from "@/shared/components/ui/button"
import { Form } from "@/shared/components/ui/form"
import { Plus } from "lucide-react"

type TMut = {
  data: z.infer<typeof CreateProductSizeSchema>
}

export const CreateSizeModal = ({ productId }: { productId: number }) => {
  const [open, setOpen] = useState(false)

  const t = useTranslations()
  const qc = useQueryClient()
  const form = useForm({
    resolver: zodResolver(CreateProductSizeSchema)
  })

  const mutation = useDefaultMutation({
    mutationFn: ({ data }: TMut) => createProductSizeAction(productId, data),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.products.single(productId) })
      if (data.status == 201) {
        setOpen(false)
        form.reset()
      }
    }
  })

  const handleAction = (data: z.infer<typeof CreateProductSizeSchema>) => {
    mutation.mutate({
      data
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={Plus} variant='success'>
          {t("Create Size")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Create Size")}</DialogTitle>
          <DialogDescription>{t("Create Size Description")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
            <TextField name='label' label={t("Label")} control={form.control} />
            <TextField type='number' valueAsNumber name='radius' label={t("Radius")} control={form.control} />
            <TextField type='number' valueAsNumber name='width' label={t("Width")} control={form.control} />
            <TextField type='number' valueAsNumber name='height' label={t("Height")} control={form.control} />
            <TextField type='number' valueAsNumber name='length' label={t("Length")} control={form.control} />
            <TextField type='number' valueAsNumber name='price' label={t("Price")} control={form.control} />

            <CheckboxField name='isCircle' label={t("Is Circle")} control={form.control} />

            <Button loading={mutation.isPending} variant='success'>
              {t("Save")}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
