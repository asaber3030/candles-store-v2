"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { createCountryAction } from "@/entities/country/api/country.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { queryKeys } from "@/shared/config/query-keys"
import { z } from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import { CheckboxField, TextField } from "@/shared/components/form/form"
import { CreateCountrySchema } from "@/entities/country/model/country.schema"
import { Button } from "@/shared/components/ui/button"
import { Form } from "@/shared/components/ui/form"
import { Plus } from "lucide-react"
import { useDefaultMutation } from "@/shared/hooks/useMutation"

type TMut = {
  data: z.infer<typeof CreateCountrySchema>
}

export const CreateCountryModal = () => {
  const [open, setOpen] = useState(false)

  const t = useTranslations()
  const qc = useQueryClient()
  const form = useForm({
    resolver: zodResolver(CreateCountrySchema)
  })

  const mutation = useDefaultMutation({
    mutationFn: ({ data }: TMut) => createCountryAction(data),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.countries.index() })
      if (data.status == 201) {
        setOpen(false)
        form.reset()
      }
    }
  })

  const handleAction = (data: z.infer<typeof CreateCountrySchema>) => {
    mutation.mutate({
      data
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={Plus} variant='success'>
          {t("Create Country")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Create Country")}</DialogTitle>
          <DialogDescription>{t("Create Country Description")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
            <TextField name='code' label={t("Code")} control={form.control} />
            <TextField name='name' label={t("Name")} control={form.control} />
            <TextField name='price' label={t("Price")} control={form.control} type='number' />
            <CheckboxField name='isActive' label={t("Is Active?")} control={form.control} />

            <Button loading={mutation.isPending} variant='success'>
              {t("Save")}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
