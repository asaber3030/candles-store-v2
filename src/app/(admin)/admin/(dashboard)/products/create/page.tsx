import { CreateProductForm } from "@/features/admin/products/ui/create-form";
import { PageTitle } from "@/shared/components/common/page-title";

import { getTranslations } from "next-intl/server";

export default async function CreateProductPage() {
  const t = await getTranslations();

  return (
    <div>
      <PageTitle title={t("Create Product")} />
      <div className="grid xl:grid-cols-7 gap-4 grid-cols-1">
        <div className="col-span-3">
          <CreateProductForm />
        </div>
      </div>
    </div>
  );
}
