"use client";

import { FullSection, SectionList } from "@/entities/section/model/section";
import { ArrowRight, Award, Heart, Leaf, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export const AboutHow = ({ section }: { section: FullSection }) => {
  const locale = useLocale();
  const t = useTranslations();

  const usedTranslation = section.translations.find((translation) => translation.locale === locale);
  if (!usedTranslation) return null;

  const list: SectionList = usedTranslation.list as SectionList;

  return (
    <section className="py-20 bg-stone-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-bold mb-16 text-center">{t("about.process.title")}</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {list &&
            list.length > 0 &&
            list.map((process, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-amber-600/20 mb-4">{process.title}</div>
                <h3 className="text-2xl font-bold mb-3">{process.description}</h3>
                <p className="text-stone-400">{process.subTitle}</p>
                {i < 3 && <ArrowRight className="hidden md:block absolute top-8 -right-4 w-8 h-8 text-amber-600" />}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
