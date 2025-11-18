import { CreateCityModal } from "@/features/admin/cities/ui/create-modal"
import { AdminCitiesFilters } from "@/features/admin/cities/ui/filters"
import { CitiesTable } from "@/features/admin/cities/ui/table"
import { PageTitle } from "@/shared/components/common/page-title"
import { getTranslations } from "next-intl/server"

type Props = {
  searchParams: TSearchParams
}

export default async function CitiesPage({ searchParams }: Props) {
  const sp = await searchParams
  const t = await getTranslations()

  return (
    <div className='space-y-4'>
      <PageTitle title={t("Cities")}>
        <CreateCityModal />
      </PageTitle>
      <AdminCitiesFilters />
      <CitiesTable searchParams={sp} />
    </div>
  )
}
