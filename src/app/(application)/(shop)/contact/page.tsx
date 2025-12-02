import { ContactCTA } from "@/features/contact/ui/contact-cta";
import { ContactHero } from "@/features/contact/ui/contact-hero";
import { ContactForm } from "@/features/contact/ui/form";
import { ContactGetInTouch } from "@/features/contact/ui/get-in-touch";
import { ContactSocialLinks } from "@/features/contact/ui/social-items";
import { DefaultContainer } from "@/shared/components/common/default-container";
import { filterSections } from "@/shared/lib/functions";
import { Metadata } from "next";

import { getPageSectionsByName, getPageWithSEO } from "@/entities/page/api/page.api";
import { defaultMetadata, generatePageMetadata } from "@/shared/lib/metadata";
import { getLocale } from "next-intl/server";

export async function generateMetadata() {
  const locale = await getLocale();
  const page = await getPageWithSEO("contact");
  const seo = page?.seoList?.find((seo) => seo.locale === locale);
  if (!page || !seo) return defaultMetadata;
  return generatePageMetadata(seo, page);
}

export default async function ContactPage() {
  const sections = await getPageSectionsByName("contact");

  const hero = filterSections("hero", sections);
  const getInTouch = filterSections("get-in-touch", sections);
  const socialLinks = filterSections("social", sections);
  const form = filterSections("form", sections);
  const cta = filterSections("cta", sections);

  return (
    <main>
      {hero && <ContactHero section={hero} />}
      {getInTouch && <ContactGetInTouch section={getInTouch} />}
      {socialLinks && <ContactSocialLinks section={socialLinks} />}
      {form && <ContactForm section={form} />}
      {cta && <ContactCTA section={cta} />}
    </main>
  );
}
