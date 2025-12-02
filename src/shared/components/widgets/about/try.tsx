"use client";

import { FullSection } from "@/entities/section/model/section";
import { userRoutes } from "@/shared/config/routes";
import { ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import Link from "next/link";

export const AboutTry = ({ section }: { section: FullSection }) => {
  const locale = useLocale();
  const t = useTranslations();

  const usedTranslation = section.translations.find((translation) => translation.locale === locale);
  if (!usedTranslation) return null;

  return (
    <section className="py-20 bg-gradient-to-r from-stone-900 to-indigo-800 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl font-bold mb-6">{usedTranslation.title ? usedTranslation.title : t("about.cta.title")}</h2>
        <p className="text-2xl mb-10 text-amber-50">{usedTranslation.content ? usedTranslation.content : t("about.cta.subtitle")}</p>
        <Link href={usedTranslation.actionButtonLink ? usedTranslation.actionButtonLink : userRoutes.shop}>
          <button className="bg-white text-stone-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-stone-100 transition inline-flex items-center gap-3 shadow-2xl hover:scale-105 transform">
            {usedTranslation.actionButtonText ? usedTranslation.actionButtonText : t("about.cta.button")}
            <ChevronRight className="w-6 h-6" />
          </button>
        </Link>
      </div>
    </section>
  );
};
