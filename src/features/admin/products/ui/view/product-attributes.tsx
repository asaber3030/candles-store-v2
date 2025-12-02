"use client";

import { useTranslations } from "next-intl";

import { deleteProductAttributeAction } from "@/entities/product/api/proudct.api";

import { CreateAttributeModal } from "../modals/create-attribute";
import { UpdateAttributeModal } from "../modals/update-attribute";
import { ProductAttribute } from "@prisma/client";
import { NoDataLabel } from "@/shared/components/common/no-data-label";
import { DeleteModal } from "@/shared/components/common/delete-modal";
import { Card } from "@/shared/components/ui/card";

interface SizesSectionProps {
  attributes: ProductAttribute[];
  productId: number;
}

export default function AttributesSection({ attributes, productId }: SizesSectionProps) {
  const t = useTranslations();

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">{t("product.sections.attributes")}</h3>
        <CreateAttributeModal productId={productId} />
      </div>

      {attributes.length == 0 ? (
        <NoDataLabel label={t("No Data Found")} />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-center py-3 px-4 font-semibold">{t("Name")}</th>
                <th className="text-center py-3 px-4 font-semibold">{t("Value")}</th>
                <th className="text-center py-3 px-4 font-semibold">{t("Name Ar")}</th>
                <th className="text-center py-3 px-4 font-semibold">{t("Value Ar")}</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {attributes.map((attribute) => (
                <tr key={attribute.id} className="border-b hover:bg-muted/50">
                  <td className="text-center py-3 px-4">{attribute.name}</td>
                  <td className="text-center py-3 px-4">{attribute.value}</td>
                  <td className="text-center py-3 px-4">{attribute.nameAr}</td>
                  <td className="text-center py-3 px-4">{attribute.valueAr}</td>
                  <td className="text-center py-3 px-4 space-x-2">
                    <UpdateAttributeModal attribute={attribute} />
                    <DeleteModal id={attribute.id} action={deleteProductAttributeAction} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
