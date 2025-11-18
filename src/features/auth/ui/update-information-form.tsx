"use client"

import { useState, useEffect } from "react"
import { useDefaultMutation } from "@/shared/hooks/useMutation"
import { useTranslations } from "next-intl"
import { useAllCountries } from "@/entities/country/hooks/useCountries"
import { useQueryClient } from "@tanstack/react-query"
import { useCountry } from "@/entities/country/hooks/useCountry"
import { useForm } from "react-hook-form"

import { updateUserInformationAction } from "@/entities/auth/api/auth.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { queryKeys } from "@/shared/config/query-keys"

import { TextField, SelectField } from "@/shared/components/form/form"
import { AuthUpdateInformationSchema } from "@/entities/auth/model/auth.schema"
import { TUpdateInformationPayload } from "@/entities/auth/model/auth"
import { InputSkeleton } from "@/shared/components/skeletons/input"
import { Button } from "@/shared/components/ui/button"
import { Form } from "@/shared/components/ui/form"
import { User } from "@prisma/client"

type Props = {
  user: Omit<User, "password">
}

export const UpdateUserInformationForm = ({ user }: Props) => {
  const [selectedCountryId, setSelectedCountryId] = useState<number>(1)

  const { countries, isCountriesLoading } = useAllCountries()
  const { country, refetchCountry } = useCountry(selectedCountryId)

  const qc = useQueryClient()
  const t = useTranslations()
  const mutation = useDefaultMutation({
    mutationFn: ({ data }: { data: TUpdateInformationPayload }) => updateUserInformationAction(data),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.users.currentUserAddresses() })
      if (data.status == 201) {
        form.reset()
      }
    }
  })

  const form = useForm({
    resolver: zodResolver(AuthUpdateInformationSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      countryId: user.countryId,
      cityId: user.cityId
    }
  })

  const handleAction = () => {
    mutation.mutate({ data: form.getValues() })
  }

  useEffect(() => {
    setSelectedCountryId(Number(form.watch("countryId")))
    refetchCountry()
  }, [form.watch("countryId")])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
        <TextField control={form.control} name='name' label={t("Name")} />
        <TextField control={form.control} name='email' label={t("Email")} />
        <TextField control={form.control} name='phoneNumber' label={t("Phone Number")} />

        {isCountriesLoading ? (
          <InputSkeleton />
        ) : (
          <SelectField
            valueAsNumber
            name='countryId'
            label={t("Country")}
            control={form.control}
            options={
              countries?.map((country) => ({
                label: country.name,
                value: country.id.toString()
              })) || []
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

        {!form.watch("countryId") || !form.watch("cityId") ? (
          <p className='text-sm text-red-600'>{t("Please select a country and city")}</p>
        ) : (
          <Button className='w-full' loading={mutation.isPending} variant='indigo'>
            {t("Save")}
          </Button>
        )}
      </form>
    </Form>
  )
}
