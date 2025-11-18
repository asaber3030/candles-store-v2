import { CreateCategoryModal } from "@/features/admin/category/ui/create-modal"
import { AdminCategoriesFilters } from "@/features/admin/category/ui/filters"
import { CategoriesTable } from "@/features/admin/category/ui/table"
import { PageTitle } from "@/shared/components/common/page-title"

import { getTranslations } from "next-intl/server"

type Props = {
  searchParams: TSearchParams
}

export default async function CategoriesPage({ searchParams }: Props) {
  const sp = await searchParams
  const t = await getTranslations()

  return (
    <div className='space-y-4'>
      <PageTitle title={t("Categories")}>
        <CreateCategoryModal />
      </PageTitle>
      <AdminCategoriesFilters />
      <CategoriesTable searchParams={sp} />
    </div>
  )
}
