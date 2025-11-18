import { CreateCouponModal } from "@/features/admin/coupons/ui/create-modal"
import { AdminCouponsFilters } from "@/features/admin/coupons/ui/filters"
import { CouponsTable } from "@/features/admin/coupons/ui/table"
import { PageTitle } from "@/shared/components/common/page-title"

import { getTranslations } from "next-intl/server"

type Props = {
  searchParams: TSearchParams
}

export default async function CouponsPage({ searchParams }: Props) {
  const sp = await searchParams
  const t = await getTranslations()

  return (
    <div className='space-y-4'>
      <PageTitle title={t("Coupons")}>
        <CreateCouponModal />
      </PageTitle>
      <AdminCouponsFilters />
      <CouponsTable searchParams={sp} />
    </div>
  )
}
