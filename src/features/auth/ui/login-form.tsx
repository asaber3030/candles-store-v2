"use client"

import z from "zod"
import Link from "next/link"

import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { useLogin } from "@/entities/auth/hooks/useAuth"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { PasswordField, TextField } from "@/shared/components/form/form"
import { AuthLoginSchema } from "@/entities/auth/model/auth.schema"
import { TLoginType } from "@/entities/auth/model/auth"
import { Button } from "@/shared/components/ui/button"
import { Form } from "@/shared/components/ui/form"

type Props = {
  type: TLoginType
  hideForgetPassword?: boolean
  redirectUrl: string
}

export const LoginForm = ({ hideForgetPassword = false, type = "user", redirectUrl }: Props) => {
  const t = useTranslations()
  const sp = useSearchParams()

  const form = useForm({
    resolver: zodResolver(AuthLoginSchema),
    defaultValues: {
      email: "a@a.com",
      password: "0552320541",
      type
    }
  })

  const finalRedirection = sp.get("redirect") || redirectUrl

  const { login, isLoginPending } = useLogin(finalRedirection)

  const handleLogin = (data: z.infer<typeof AuthLoginSchema>) => {
    login({ data, type })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className='space-y-4'>
        <TextField control={form.control} name='email' label={t("Email")} placeholder={t("Email")} />
        <div>
          <PasswordField control={form.control} name='password' type='password' label={t("Password")} placeholder={t("Password")} />
          {!hideForgetPassword && (
            <Link href='/forgot-password' className='text-sm text-primary hover:underline flex justify-end '>
              {t("Forgot Password?")}
            </Link>
          )}
        </div>

        <Button className='w-full' loading={isLoginPending} variant='indigo'>
          {t("Login")}
        </Button>
      </form>
    </Form>
  )
}
