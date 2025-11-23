"use client"

import { useDefaultMutation } from "@/shared/hooks/useMutation"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"

import { sendPasswordResetEmail } from "@/entities/auth/api/auth.api"
import { zodResolver } from "@hookform/resolvers/zod"

import { ForgetPasswordSchema } from "@/entities/auth/model/auth.schema"
import { TextField } from "@/shared/components/form/form"
import { Button } from "@/shared/components/ui/button"
import { Form } from "@/shared/components/ui/form"

type Props = {}

export const ForgetPasswordForm = ({}: Props) => {
  const t = useTranslations()

  const form = useForm({
    resolver: zodResolver(ForgetPasswordSchema)
  })

  const mut = useDefaultMutation({
    mutationFn: ({ email }: { email: string }) => sendPasswordResetEmail(email)
  })

  const handleForgetPassword = () => {
    mut.mutate({ email: form.getValues("email") })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleForgetPassword)} className='space-y-4'>
        <TextField control={form.control} name='email' label={t("Email")} placeholder={t("Email")} />

        <Button className='w-full' loading={mut.isPending} variant='indigo'>
          {t("Send Reset Link")}
        </Button>
      </form>
    </Form>
  )
}
