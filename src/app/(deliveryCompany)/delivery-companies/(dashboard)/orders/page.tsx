import { AdminOrdersFilters } from "@/features/admin/orders/ui/filters"
import { OrdersTable } from "@/features/admin/orders/ui/table"
import { PageTitle } from "@/shared/components/common/page-title"

import { getTranslations } from "next-intl/server"

type Props = {
  searchParams: TSearchParams
}

export default async function OrdersPage({ searchParams }: Props) {
  const sp = await searchParams
  const t = await getTranslations()

  return (
    <div>
      <PageTitle title={t("Orders")}>
        <AdminOrdersFilters />
      </PageTitle>
      <OrdersTable searchParams={sp} />
    </div>
  )
}
