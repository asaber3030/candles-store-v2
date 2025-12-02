import { filterSections } from "@/shared/lib/functions";
import { getTranslations } from "next-intl/server";
import { AboutHero } from "@/shared/components/widgets/about/hero";
import { AboutJourney } from "@/shared/components/widgets/about/journey";
import { AboutValues } from "@/shared/components/widgets/about/values";
import { AboutHow } from "@/shared/components/widgets/about/how";
import { AboutCTA } from "@/shared/components/widgets/about/cta";
import { AboutTry } from "@/shared/components/widgets/about/try";

import { getPageSectionsByName, getPageWithSEO } from "@/entities/page/api/page.api";
import { defaultMetadata, generatePageMetadata } from "@/shared/lib/metadata";
import { getLocale } from "next-intl/server";

export async function generateMetadata() {
  const locale = await getLocale();
  const page = await getPageWithSEO("about");
  const seo = page?.seoList?.find((seo) => seo.locale === locale);
  if (!page || !seo) return defaultMetadata;
  return generatePageMetadata(seo, page);
}

export default async function AboutPage() {
  const t = await getTranslations();

  const sections = await getPageSectionsByName("about");

  const hero = filterSections("hero", sections);
  const journey = filterSections("journey", sections);
  const values = filterSections("values", sections);
  const how = filterSections("how", sections);
  const cta = filterSections("cta", sections);
  const tryUs = filterSections("try", sections);

  return (
    <div className={`min-h-screen bg-white`}>
      {/* Hero Section */}
      {hero && <AboutHero section={hero} />}

      {/* Journey Section */}
      {journey && <AboutJourney section={journey} />}

      {/* Values Section */}
      {values && <AboutValues section={values} />}

      {/* Process Section */}
      {how && <AboutHow section={how} />}

      {/* CTA Section */}
      {cta && <AboutCTA section={cta} />}

      {/* Try US Section */}
      {tryUs && <AboutTry section={tryUs} />}
    </div>
  );
}
