import { getCategory } from "@/entities/category/api/category.api";
import { CategoryProductsTable } from "@/features/admin/products/ui/category-products";
import { AdminProductsFilters } from "@/features/admin/products/ui/filters";
import { LinkBtn } from "@/shared/components/common/link-button";
import { PageTitle } from "@/shared/components/common/page-title";
import { adminRoutes } from "@/shared/config/routes";
import { Plus } from "lucide-react";

import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
  searchParams: TSearchParams;
  params: Promise<{ categoryId: string }>;
};

export default async function CategoryProductsPage({ searchParams, params }: Props) {
  const sp = await searchParams;
  const t = await getTranslations();

  const category = await getCategory(+(await params).categoryId);

  if (!category) notFound();

  return (
    <div className="space-y-4">
      <PageTitle title={t("Products Of #", { name: category.name })}>
        <LinkBtn href={adminRoutes.products.create} variant="success" icon={Plus}>
          {t("Create Product")}
        </LinkBtn>
      </PageTitle>
      <AdminProductsFilters />
      <CategoryProductsTable searchParams={sp} categoryId={+(await params).categoryId} />
    </div>
  );
}
