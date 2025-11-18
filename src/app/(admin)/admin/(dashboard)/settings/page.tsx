import { ViewSettingsCard } from "@/features/admin/settings/ui/view-settings"
import { SettingsForm } from "@/features/admin/settings/ui/update-form"
import { PageTitle } from "@/shared/components/common/page-title"

import { getTranslations } from "next-intl/server"
import { getAppSettings } from "@/entities/settings/api/settings.api"
import { notFound } from "next/navigation"

export default async function AppSettingsPage() {
  const t = await getTranslations()
  const settings = await getAppSettings()

  if (!settings) return notFound()

  return (
    <div>
      <PageTitle title={t("Settings")} />
      <div className='grid xl:grid-cols-7 grid-cols-1 gap-4'>
        <div className='xl:col-span-4 col-span-7'>
          <SettingsForm settings={settings} />
        </div>
        <div className='xl:col-span-3 col-span-7'>
          <ViewSettingsCard settings={settings} />
        </div>
      </div>
    </div>
  )
}
