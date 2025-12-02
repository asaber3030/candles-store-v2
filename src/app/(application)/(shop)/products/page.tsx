import { DefaultContainer } from "@/shared/components/common/default-container";
import { ProductsHero } from "@/shared/components/widgets/products/hero";
import { ViewAllProductsList } from "@/shared/components/widgets/products/products-list";
import { filterSections } from "@/shared/lib/functions";
import { Metadata } from "next";

import { getPageSectionsByName, getPageWithSEO } from "@/entities/page/api/page.api";
import { defaultMetadata, generatePageMetadata } from "@/shared/lib/metadata";
import { getLocale } from "next-intl/server";

export async function generateMetadata() {
  const locale = await getLocale();
  const page = await getPageWithSEO("products");
  const seo = page?.seoList?.find((seo) => seo.locale === locale);
  if (!page || !seo) return defaultMetadata;
  return generatePageMetadata(seo, page);
}

type Props = {
  searchParams: TSearchParams;
};

export default async function ProductsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const sections = await getPageSectionsByName("products");
  const hero = filterSections("hero", sections);

  return (
    <div>
      {hero && <ProductsHero section={hero} />}
      <DefaultContainer className="py-10">
        <ViewAllProductsList searchParams={sp} />
      </DefaultContainer>
    </div>
  );
}
