import { UpdateProductForm } from "@/features/admin/products/ui/update-form";
import { PageTitle } from "@/shared/components/common/page-title";

import { getTranslations } from "next-intl/server";
import { getProduct } from "@/entities/product/api/proudct.api";
import { notFound } from "next/navigation";
import ProductInfo from "@/features/admin/products/ui/view/product-info";

type Props = {
  params: Promise<{ productId: string }>;
};

export default async function CreateProductPage({ params }: Props) {
  const t = await getTranslations();

  const { productId } = await params;
  const product = await getProduct(+productId);

  if (isNaN(+productId) || !product) notFound();

  return (
    <div>
      <PageTitle title={t("Update Product")} />
      <div className="grid xl:grid-cols-7 gap-4 grid-cols-1">
        <div className="col-span-3">
          <UpdateProductForm product={product} />
        </div>
        <div className="col-span-4">
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  );
}
