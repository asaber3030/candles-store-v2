"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { createCategoryAction, updateCategoryAction } from "@/entities/category/api/category.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { queryKeys } from "@/shared/config/query-keys"
import { z } from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import { CreateCategorySchema } from "@/entities/category/model/category.schema"
import { TextField } from "@/shared/components/form/form"
import { Button } from "@/shared/components/ui/button"
import { Form } from "@/shared/components/ui/form"
import { Edit, Plus } from "lucide-react"
import { Category } from "@prisma/client"
import { TooltipButton } from "@/shared/components/common/tooltip-button"
import { useDefaultMutation } from "@/shared/hooks/useMutation"

type TMut = {
  data: z.infer<typeof CreateCategorySchema>
}

export const UpdateCategoryModal = ({ category }: { category: Category }) => {
  const [open, setOpen] = useState(false)

  const t = useTranslations()
  const qc = useQueryClient()
  const form = useForm({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      name: category.name
    }
  })

  const mutation = useDefaultMutation({
    mutationFn: ({ data }: TMut) => updateCategoryAction(category.id, data),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.categories.index() })
      if (data.status === 200) {
        setOpen(false)
      }
    }
  })

  const handleAction = (data: z.infer<typeof CreateCategorySchema>) => {
    mutation.mutate({
      data
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <TooltipButton tooltip={t("Update Category")} icon={Edit} variant='info' size='icon' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Update Category")}</DialogTitle>
          <DialogDescription>{t("Update Category Description")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
            <TextField name='name' label={t("Name")} control={form.control} />

            <Button loading={mutation.isPending} variant='success'>
              {t("Save")}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
