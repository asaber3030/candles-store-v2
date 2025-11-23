"use client"

import { useEffect, useState } from "react"
import { useDefaultMutation } from "@/shared/hooks/useMutation"
import { useTranslations } from "next-intl"
import { useAllCountries } from "@/entities/country/hooks/useCountries"
import { useQueryClient } from "@tanstack/react-query"
import { useCountry } from "@/entities/country/hooks/useCountry"
import { useForm } from "react-hook-form"

import { createUserAddressAction } from "@/entities/user/api/user.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { queryKeys } from "@/shared/config/query-keys"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import { CheckboxField, SelectField, TextField, TextareaField } from "@/shared/components/form/form"
import { TCreateAddressPayload } from "@/entities/user/model/user"
import { CreateAddressSchema } from "@/entities/user/model/user.schema"
import { InputSkeleton } from "@/shared/components/skeletons/input"
import { Button } from "@/shared/components/ui/button"
import { Form } from "@/shared/components/ui/form"
import { Plus } from "lucide-react"

export const CreateUserAddressModal = () => {
  const [selectedCountryId, setSelectedCountryId] = useState<number>(1)
  const [open, setOpen] = useState(false)

  const { countries, isCountriesLoading } = useAllCountries()
  const { country, refetchCountry } = useCountry(selectedCountryId)

  const qc = useQueryClient()
  const t = useTranslations()
  const mutation = useDefaultMutation({
    mutationFn: ({ data }: { data: TCreateAddressPayload }) => createUserAddressAction(data),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.users.currentUserAddresses() })
      if (data.status == 201) {
        setOpen(false)
        form.reset()
      }
    }
  })

  const form = useForm({
    resolver: zodResolver(CreateAddressSchema),
    defaultValues: {}
  })

  const handleAction = () => {
    mutation.mutate({ data: form.getValues() })
  }

  useEffect(() => {
    setSelectedCountryId(Number(form.watch("countryId")))
    refetchCountry()
  }, [form.watch("countryId")])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={Plus}>{t("Create Address")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Create Address")}</DialogTitle>
          <DialogDescription>{t("Create Address Description")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <TextField control={form.control} name='streetName' label={t("Street Name")} placeholder={t("Street Name")} />
              <TextField control={form.control} name='streetNo' label={t("Street Number")} placeholder={t("Street Number")} />
            </div>
            <TextField control={form.control} name='phoneNumber' label={t("Phone Number")} placeholder={t("Phone Number")} />
            <TextareaField control={form.control} name='notes' label={t("Notes")} placeholder={t("Notes")} />

            {isCountriesLoading ? (
              <InputSkeleton />
            ) : (
              <SelectField
                valueAsNumber
                name='countryId'
                label={t("Country")}
                control={form.control}
                options={
                  (countries &&
                    countries?.map((country) => ({
                      label: country.name,
                      value: country.id.toString()
                    }))) ||
                  []
                }
              />
            )}

            <SelectField
              valueAsNumber
              name='cityId'
              label={t("City")}
              control={form.control}
              options={
                country?.cities.map((city) => ({
                  label: city.name,
                  value: city.id.toString()
                })) || []
              }
            />

            <CheckboxField control={form.control} name='isDefault' label={t("Set as default address")} />

            {!form.watch("countryId") || !form.watch("cityId") ? (
              <p className='text-sm text-red-600'>{t("Please select a country and city")}</p>
            ) : (
              <Button className='w-full' loading={mutation.isPending} variant='indigo'>
                {t("Save")}
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
