import { CreateCountryModal } from "@/features/admin/countries/ui/create-modal"
import { AdminCountriesFilters } from "@/features/admin/countries/ui/filters"
import { CountriesTable } from "@/features/admin/countries/ui/table"
import { PageTitle } from "@/shared/components/common/page-title"
import { getTranslations } from "next-intl/server"

type Props = {
  searchParams: TSearchParams
}

export default async function CountriesPage({ searchParams }: Props) {
  const sp = await searchParams
  const t = await getTranslations()

  return (
    <div className='space-y-4'>
      <PageTitle title={t("Countries")}>
        <CreateCountryModal />
      </PageTitle>
      <AdminCountriesFilters />
      <CountriesTable searchParams={sp} />
    </div>
  )
}
