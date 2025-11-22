import { DeliveryOrdersFilters } from "@/features/deliveryCompany/orders/ui/filters"
import { DeliveryOrdersTable } from "@/features/deliveryCompany/orders/ui/table"
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
        <DeliveryOrdersFilters />
      </PageTitle>
      <DeliveryOrdersTable searchParams={sp} />
    </div>
  )
}
