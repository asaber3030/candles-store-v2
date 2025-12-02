import { ProductsTable } from "@/features/admin/products/ui/table";
import { PageTitle } from "@/shared/components/common/page-title";
import { LinkBtn } from "@/shared/components/common/link-button";
import { Plus } from "lucide-react";

import { getTranslations } from "next-intl/server";
import { adminRoutes } from "@/shared/config/routes";
import { ProductFilters } from "@/shared/components/widgets/products/filters";
import { AdminProductsFilters } from "@/features/admin/products/ui/filters";

type Props = {
  searchParams: TSearchParams;
};

export default async function ProductsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const t = await getTranslations();

  return (
    <div className="space-y-4">
      <PageTitle title={t("Products")}>
        <LinkBtn href={adminRoutes.products.create} icon={Plus} variant="success">
          {t("Create Product")}
        </LinkBtn>
      </PageTitle>
      <AdminProductsFilters />
      <ProductsTable searchParams={sp} />
    </div>
  );
}
