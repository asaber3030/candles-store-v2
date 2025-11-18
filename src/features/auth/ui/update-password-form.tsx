"use client"

import { useDefaultMutation } from "@/shared/hooks/useMutation"
import { useTranslations } from "next-intl"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { updateUserPasswordAction } from "@/entities/auth/api/auth.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { queryKeys } from "@/shared/config/query-keys"

import { AuthUpdatePasswordSchema } from "@/entities/auth/model/auth.schema"
import { TUpdatePasswordPayload } from "@/entities/auth/model/auth"
import { PasswordField, TextField } from "@/shared/components/form/form"
import { Button } from "@/shared/components/ui/button"
import { Form } from "@/shared/components/ui/form"

export const UpdateUserPasswordForm = () => {
  const qc = useQueryClient()
  const t = useTranslations()

  const form = useForm({
    resolver: zodResolver(AuthUpdatePasswordSchema)
  })

  const mutation = useDefaultMutation({
    mutationFn: ({ data }: { data: TUpdatePasswordPayload }) => updateUserPasswordAction(data),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.users.currentUserAddresses() })
      if (data.status == 200) {
        form.reset()
      }
    }
  })

  const handleAction = () => {
    mutation.mutate({ data: form.getValues() })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
        <PasswordField control={form.control} name='currentPassword' label={t("Current Password")} />
        <PasswordField control={form.control} name='newPassword' label={t("New Password")} />
        <PasswordField control={form.control} name='confirmNewPassword' label={t("Confirm New Password")} />

        <Button className='w-full' loading={mutation.isPending} variant='indigo'>
          {t("Save")}
        </Button>
      </form>
    </Form>
  )
}
