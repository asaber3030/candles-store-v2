"use client";

import { FullSection, SectionList } from "@/entities/section/model/section";
import { Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export const AboutJourney = ({ section }: { section: FullSection }) => {
  const locale = useLocale();
  const t = useTranslations();

  const usedTranslation = section.translations.find((translation) => translation.locale === locale);
  if (!usedTranslation) return null;

  const list: SectionList = usedTranslation.list as SectionList;

  return (
    <section>
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square from-amber-100 to-rose-100 rounded-3xl overflow-hidden shadow-2xl">
                <div className="flex items-center justify-center h-full text-9xl">
                  <img src={usedTranslation.image ? usedTranslation.image : "/images/candles/01.jpg"} />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-amber-200 rounded-3xl -z-10"></div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-stone-900 mb-6">{usedTranslation.title ? usedTranslation.title : t("about.journey.title")}</h2>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                {usedTranslation.content ? usedTranslation.content : t("about.journey.content")}
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded-r-2xl">
                <p className="text-stone-700 italic">{usedTranslation.subTitle ? usedTranslation.subTitle : t("about.mission.content")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {list &&
              list.length > 0 &&
              list.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-5xl font-bold text-amber-400 mb-2">{stat.title}</div>
                  <div className="text-stone-400 text-sm uppercase tracking-wide">{stat.description}</div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </section>
  );
};
