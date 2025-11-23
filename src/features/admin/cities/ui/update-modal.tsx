"use client"

import { useDefaultMutation } from "@/shared/hooks/useMutation"
import { useTranslations } from "next-intl"
import { useAllCountries } from "@/entities/country/hooks/useCountries"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { updateCityAction } from "@/entities/city/api/city.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { queryKeys } from "@/shared/config/query-keys"
import { z } from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import { CheckboxField, SelectField, TextField } from "@/shared/components/form/form"
import { CreateCitySchema } from "@/entities/city/model/city.schema"
import { InputSkeleton } from "@/shared/components/skeletons/input"
import { TooltipButton } from "@/shared/components/common/tooltip-button"
import { Button } from "@/shared/components/ui/button"
import { City } from "@prisma/client"
import { Form } from "@/shared/components/ui/form"
import { Edit } from "lucide-react"

type TMut = {
  data: z.infer<typeof CreateCitySchema>
}

export const UpdateCityModal = ({ city }: { city: City }) => {
  const [open, setOpen] = useState(false)

  const { countries, isCountriesLoading } = useAllCountries()

  const t = useTranslations()
  const qc = useQueryClient()
  const form = useForm({
    resolver: zodResolver(CreateCitySchema),
    defaultValues: {
      code: city.code,
      name: city.name,
      price: city.price,
      countryId: city.countryId,
      isActive: city.isActive
    }
  })

  const mutation = useDefaultMutation({
    mutationFn: ({ data }: TMut) => updateCityAction(city.id, data),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.cities.index() })
      if (data.status == 200) {
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
        <TooltipButton tooltip={t("Update City")} icon={Edit} variant='info' size='icon' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Update City")}</DialogTitle>
          <DialogDescription>{t("Update City Description")}</DialogDescription>
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
                    valueAsNumber
                    name='countryId'
                    label={t("Country")}
                    control={form.control}
                    defaultValue={city.countryId.toString()}
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
