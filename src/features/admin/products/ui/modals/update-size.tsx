"use client"

import { useDefaultMutation } from "@/shared/hooks/useMutation"
import { useTranslations } from "next-intl"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { updateProductSizeAction } from "@/entities/product/api/proudct.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { queryKeys } from "@/shared/config/query-keys"
import { z } from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import { CheckboxField, TextField } from "@/shared/components/form/form"
import { CreateProductSizeSchema } from "@/entities/product/model/product.schema"
import { Button } from "@/shared/components/ui/button"
import { Form } from "@/shared/components/ui/form"
import { Edit2 } from "lucide-react"
import { ProductSize } from "@prisma/client"

type TMut = {
  data: z.infer<typeof CreateProductSizeSchema>
}

export const UpdateSizeModal = ({ size }: { size: ProductSize }) => {
  const [open, setOpen] = useState(false)

  const t = useTranslations()
  const qc = useQueryClient()
  const form = useForm({
    resolver: zodResolver(CreateProductSizeSchema),
    defaultValues: {
      label: size.label,
      isCircle: size.isCircle,
      radius: size.radius || undefined,
      width: size.width || undefined,
      height: size.height || undefined,
      length: size.length || undefined,
      price: size.price || 0
    }
  })

  const mutation = useDefaultMutation({
    mutationFn: ({ data }: TMut) => updateProductSizeAction(size.id, data),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.products.single(size.productId) })
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
        <Button icon={Edit2} variant='info'>
          {t("Update Size")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Update Size")}</DialogTitle>
          <DialogDescription>{t("Update Size Description")}</DialogDescription>
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
