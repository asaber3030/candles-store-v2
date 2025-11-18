"use client"

import { useEffect, useState } from "react"
import { useDefaultMutation } from "@/shared/hooks/useMutation"
import { useAllCountries } from "@/entities/country/hooks/useCountries"
import { useTranslations } from "next-intl"
import { useQueryClient } from "@tanstack/react-query"
import { useCountry } from "@/entities/country/hooks/useCountry"
import { useForm } from "react-hook-form"

import { createUserAction } from "@/entities/user/api/user.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { queryKeys } from "@/shared/config/query-keys"
import { z } from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import { PasswordField, SelectField, TextField } from "@/shared/components/form/form"
import { CreateUserSchema } from "@/entities/user/model/user.schema"
import { InputSkeleton } from "@/shared/components/skeletons/input"
import { UserRoleEnum } from "@prisma/client"
import { Button } from "@/shared/components/ui/button"
import { Plus } from "lucide-react"
import { Form } from "@/shared/components/ui/form"

type TMut = {
  data: z.infer<typeof CreateUserSchema>
}

export const CreateUserModal = () => {
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState<UserRoleEnum>(UserRoleEnum.user)

  const [selectedCountryId, setSelectedCountryId] = useState<number>(1)

  const { countries, isCountriesLoading } = useAllCountries()
  const { country, isCountryLoading, refetchCountry } = useCountry(selectedCountryId)

  const t = useTranslations()
  const qc = useQueryClient()
  const form = useForm({
    resolver: zodResolver(CreateUserSchema)
  })

  const mutation = useDefaultMutation({
    mutationFn: ({ data }: TMut) => createUserAction(data),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.users.index() })
      if (data.status == 201) {
        setOpen(false)
        form.reset()
      }
    }
  })

  const handleAction = (data: z.infer<typeof CreateUserSchema>) => {
    mutation.mutate({
      data
    })
  }

  useEffect(() => {
    setSelectedCountryId(Number(form.watch("countryId")))
    refetchCountry()
  }, [form.watch("countryId")])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={Plus} variant='success'>
          {t("Create User")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Create User")}</DialogTitle>
          <DialogDescription>{t("Create User Description")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
            <TextField name='name' label={t("Name")} control={form.control} />
            <TextField name='email' label={t("Email")} control={form.control} />
            <TextField name='phoneNumber' label={t("Phone Number")} control={form.control} />
            <PasswordField name='password' label={t("Password")} control={form.control} />

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

            <SelectField
              name='role'
              label={t("Role")}
              control={form.control}
              options={[
                { label: t("User"), value: UserRoleEnum.user },
                { label: t("Admin"), value: UserRoleEnum.admin },
                { label: t("Delivery Company"), value: UserRoleEnum.deliveryCompany }
              ]}
            />

            {!form.watch("countryId") || !form.watch("cityId") ? (
              <p className='text-sm text-red-600'>{t("Please select a country and city")}</p>
            ) : (
              <Button loading={mutation.isPending} variant='success'>
                {t("Save")}
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
