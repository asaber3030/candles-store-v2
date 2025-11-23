"use client"

import { useDefaultMutation } from "@/shared/hooks/useMutation"
import { useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { createCityAction } from "@/entities/city/api/city.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { queryKeys } from "@/shared/config/query-keys"
import { z } from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import { CheckboxField, SelectField, TextField } from "@/shared/components/form/form"
import { CreateCitySchema } from "@/entities/city/model/city.schema"
import { Button } from "@/shared/components/ui/button"
import { Form } from "@/shared/components/ui/form"
import { Plus } from "lucide-react"
import { InputSkeleton } from "@/shared/components/skeletons/input"
import { useAllCountries } from "@/entities/country/hooks/useCountries"

type TMut = {
  data: z.infer<typeof CreateCitySchema>
}

export const CreateCityModal = () => {
  const [open, setOpen] = useState(false)

  const { countries, isCountriesLoading } = useAllCountries()

  const t = useTranslations()
  const qc = useQueryClient()
  const form = useForm({
    resolver: zodResolver(CreateCitySchema)
  })

  const mutation = useDefaultMutation({
    mutationFn: ({ data }: TMut) => createCityAction(data),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.cities.index() })
      if (data.status == 201) {
        setOpen(false)
        form.reset()
      }
    }
  })

  const handleAction = (data: z.infer<typeof CreateCitySchema>) => {
    mutation.mutate({
      data
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={Plus} variant='success'>
          {t("Create City")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Create City")}</DialogTitle>
          <DialogDescription>{t("Create City Description")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
            <TextField name='code' label={t("Code")} control={form.control} />
            <TextField name='name' label={t("Name")} control={form.control} />
            <TextField name='price' label={t("Price")} control={form.control} type='number' />
            {isCountriesLoading ? (
              <InputSkeleton />
            ) : (
              <div>
                {countries && countries.length > 0 ? (
                  <SelectField
                    name='countryId'
                    valueAsNumber
                    label={t("Country")}
                    control={form.control}
                    options={
                      countries &&
                      countries?.map((country) => ({
                        label: country.name,
                        value: country.id.toString()
                      }))
                    }
                  />
                ) : (
                  <p className='text-sm text-muted-foreground'>{t("No Countries Found")}</p>
                )}
              </div>
            )}
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
