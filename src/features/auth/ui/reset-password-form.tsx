"use client"

import z from "zod"

import { useDefaultMutation } from "@/shared/hooks/useMutation"
import { useRouter, useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"

import { resetPasswordAction } from "@/entities/auth/api/auth.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { userRoutes } from "@/shared/config/routes"

import { AuthResetPasswordSchema } from "@/entities/auth/model/auth.schema"
import { PasswordField } from "@/shared/components/form/form"
import { Button } from "@/shared/components/ui/button"
import { Form } from "@/shared/components/ui/form"

export const ResetPasswordForm = () => {
  const t = useTranslations()
  const sp = useSearchParams()
  const router = useRouter()

  const email = sp.get("email") || ""
  const token = sp.get("token") || ""

  const form = useForm({
    resolver: zodResolver(AuthResetPasswordSchema)
  })

  const mut = useDefaultMutation({
    mutationFn: ({ data }: { data: z.infer<typeof AuthResetPasswordSchema> }) => resetPasswordAction(email, token, data.newPassword),
    onSuccess: (data) => {
      if (data.status === 200) {
        form.reset()
        router.push(userRoutes.login)
      }
    }
  })

  const handleResetPassword = () => {
    mut.mutate({ data: form.getValues() })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleResetPassword)} className='space-y-4'>
        <PasswordField control={form.control} name='newPassword' label={t("New Password")} placeholder={t("New Password")} />
        <PasswordField control={form.control} name='confirmNewPassword' label={t("Password Confirmation")} placeholder={t("Password Confirmation")} />

        <Button className='w-full' loading={mut.isPending} variant='indigo'>
          {t("Change Password")}
        </Button>
      </form>
    </Form>
  )
}
