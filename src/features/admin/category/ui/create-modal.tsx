"use client"

import { useDefaultMutation } from "@/shared/hooks/useMutation"
import { useTranslations } from "next-intl"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { createCategoryAction } from "@/entities/category/api/category.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { queryKeys } from "@/shared/config/query-keys"
import { z } from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import { CreateCategorySchema } from "@/entities/category/model/category.schema"
import { TextField, TextareaField } from "@/shared/components/form/form"
import { Button } from "@/shared/components/ui/button"
import { Form } from "@/shared/components/ui/form"
import { Plus } from "lucide-react"
import { FileUploader } from "@/shared/components/form/file"

type TMut = {
  data: z.infer<typeof CreateCategorySchema>
  file: File | null
}

export const CreateCategoryModal = () => {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const t = useTranslations()
  const qc = useQueryClient()
  const form = useForm({
    resolver: zodResolver(CreateCategorySchema)
  })

  const mutation = useDefaultMutation({
    mutationFn: ({ data }: TMut) => createCategoryAction(data, file),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.categories.index() })
      if (data.status == 201) {
        setOpen(false)
        form.reset()
      }
    }
  })

  const handleAction = (data: z.infer<typeof CreateCategorySchema>) => {
    mutation.mutate({
      data,
      file
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={Plus} variant='success'>
          {t("Create Category")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Create Category")}</DialogTitle>
          <DialogDescription>{t("Create Category Description")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
            <FileUploader label={t("Category Image")} setFile={setFile} />
            <TextField name='name' label={t("Name")} control={form.control} />
            <TextField name='nameAr' label={t("Arabic Name")} control={form.control} />
            <TextareaField name='description' label={t("Description")} control={form.control} />

            <Button loading={mutation.isPending} variant='success'>
              {t("Save")}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
