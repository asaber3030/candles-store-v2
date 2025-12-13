"use client"

import { useDefaultMutation } from "@/shared/hooks/useMutation"
import { useTranslations } from "next-intl"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { updateSettingsAction } from "@/entities/settings/api/settings.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { queryKeys } from "@/shared/config/query-keys"
import { z } from "zod"

import { SelectField, TextField, TextareaField } from "@/shared/components/form/form"
import { SettingsSchema } from "@/entities/settings/model/settings.schema"
import { FileUploader } from "@/shared/components/form/file"
import { Settings } from "@prisma/client"
import { Button } from "@/shared/components/ui/button"
import { Form } from "@/shared/components/ui/form"
import { AllowedPaymentMethodsList, AnimationList } from "@/shared/config/defaults"

type TMut = {
  data: z.infer<typeof SettingsSchema>
  logo: File | null
  defaultBanner: File | null
}

export const SettingsForm = ({ settings }: { settings: Settings }) => {
  const [bannerFile, setBannerFile] = useState<File | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)

  const t = useTranslations()
  const qc = useQueryClient()
  const form = useForm({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      siteName: settings.siteName,
      description: settings.description,
      arDescription: settings.arDescription,
      phoneNumber: settings.phoneNumber,
      email: settings.email,
      address: settings.address,
      facebook: settings.facebook || "",
      instagram: settings.instagram || "",
      twitter: settings.twitter || "",
      snapchat: settings.snapchat || "",
      tiktok: settings.tiktok || "",
      defaultAnimation: settings.defaultAnimation || AnimationList[0],
      allowedPaymentMethod: settings.allowedPaymentMethod || AllowedPaymentMethodsList[0],
    },
  })

  const mutation = useDefaultMutation({
    mutationFn: ({ data, logo, defaultBanner }: TMut) => updateSettingsAction(data, logo, defaultBanner),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.settings.single(1) })
      if (data.status == 201) {
        form.reset()
      }
    },
  })

  const handleAction = (data: z.infer<typeof SettingsSchema>) => {
    mutation.mutate({
      data,
      logo: logoFile,
      defaultBanner: bannerFile,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAction)} className="space-y-4 divide-y ">
        {/* Basic Information Section */}
        <section className="grid grid-cols-7 gap-4 py-5">
          <div className="col-span-2 space-y-2">
            <h2 className="text-xl font-medium">{t("settings.basicInfo.title")}</h2>
            <p className="text-sm text-muted-foreground">{t("settings.basicInfo.description")}</p>
          </div>
          <div className="col-span-5">
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
              <TextField name="siteName" label={t("Name")} control={form.control} />

              <TextField name="phoneNumber" label={t("Phone Number")} control={form.control} />
              <TextField name="email" label={t("Email")} control={form.control} />
              <TextField name="address" label={t("Address")} control={form.control} />

              <TextareaField name="description" label={t("Description")} control={form.control} />
              <TextareaField name="arDescription" label={t("Arabic Description")} control={form.control} />
            </div>
          </div>
        </section>

        {/* Logo and Banner Upload Section */}
        <section className="grid grid-cols-7 gap-4 py-5">
          <div className="col-span-2 space-y-2">
            <h2 className="text-xl font-medium">{t("settings.branding.title")}</h2>
            <p className="text-sm text-muted-foreground">{t("settings.branding.description")}</p>
          </div>
          <div className="col-span-5">
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
              <FileUploader setFile={setLogoFile} label={t("Upload Logo")} />
              <FileUploader setFile={setBannerFile} label={t("Upload Banner")} />
            </div>
          </div>
        </section>

        {/* Default Animation Section */}
        <section className="grid grid-cols-7 gap-4 py-5">
          <div className="col-span-2 space-y-2">
            <h2 className="text-xl font-medium">{t("settings.animation.title")}</h2>
            <p className="text-sm text-muted-foreground">{t("settings.animation.description")}</p>
          </div>
          <div className="col-span-5">
            <SelectField name="defaultAnimation" label={t("Default Animation")} control={form.control} options={AnimationList.map((anim) => ({ label: anim, value: anim }))} />
          </div>
        </section>

        {/* Social Media Links Section */}
        <section className="grid grid-cols-7 gap-4 py-5">
          <div className="col-span-2 space-y-2">
            <h2 className="text-xl font-medium">{t("settings.socialMedia.title")}</h2>
            <p className="text-sm text-muted-foreground">{t("settings.socialMedia.description")}</p>
          </div>
          <div className="col-span-5">
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
              <TextField name="facebook" label="Facebook" control={form.control} />
              <TextField name="instagram" label="Instagram" control={form.control} />
              <TextField name="twitter" label="Twitter" control={form.control} />
              <TextField name="tiktok" label="Tiktok" control={form.control} />
              <TextField name="snapchat" label="Snapchat" control={form.control} />
              <TextField name="youtube" label="YouTube" control={form.control} />
            </div>
          </div>
        </section>

        {/* Payment */}
        <section className="grid grid-cols-7 gap-4 py-5">
          <div className="col-span-2 space-y-2">
            <h2 className="text-xl font-medium">{t("settings.payment.title")}</h2>
            <p className="text-sm text-muted-foreground">{t("settings.payment.description")}</p>
          </div>
          <div className="col-span-5">
            <SelectField
              name="allowedPaymentMethod"
              label={t("Allowed Payment Method")}
              control={form.control}
              options={AllowedPaymentMethodsList.map((method) => ({ label: method, value: method }))}
            />
          </div>
        </section>

        <section className="flex justify-end">
          <Button loading={mutation.isPending} variant="success">
            {t("Save")}
          </Button>
        </section>
      </form>
    </Form>
  )
}
