"use client";

import { ProductWithCategory } from "@/entities/product/model/product";
import { useLocale, useTranslations } from "next-intl";
import { DefaultContainer } from "@/shared/components/common/default-container";
import { ProductCard } from "../products/product-card";
import { FullSection } from "@/entities/section/model/section";

type Props = {
  products: ProductWithCategory[];
  section: FullSection;
};

export const HomeFeaturedProducts = ({ section, products }: Props) => {
  const t = useTranslations();
  const locale = useLocale();
  const usedTranslation = section.translations.find((t) => t.locale === locale);
  if (!usedTranslation) return null;

  return (
    <section className=" bg-white">
      <DefaultContainer className="py-8">
        <h1 className={"text-3xl font-bold mb-8"}>{usedTranslation.title ? usedTranslation.title : t("Featured Products")}</h1>
        <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductCard key={`featured-product-home-${product.id}`} product={product} />
          ))}
        </div>
      </DefaultContainer>
    </section>
  );
};
