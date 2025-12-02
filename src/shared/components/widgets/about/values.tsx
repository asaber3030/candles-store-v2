"use client";

import { FullSection, SectionList } from "@/entities/section/model/section";
import { Award, Heart, Leaf, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export const AboutValues = ({ section }: { section: FullSection }) => {
  const locale = useLocale();
  const t = useTranslations();

  const usedTranslation = section.translations.find((translation) => translation.locale === locale);
  if (!usedTranslation) return null;

  const list: SectionList = usedTranslation.list as SectionList;
  const icons = [Leaf, Award, Users, Heart];
  const colors = ["bg-amber-50", "bg-rose-50", "bg-indigo-50", "bg-amber-50"];
  const textColors = ["text-amber-600", "text-rose-600", "text-indigo-600", "text-amber-600"];

  return (
    <section className="py-20 from-white to-amber-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-bold text-stone-900 mb-16 text-center">{t("about.values.title")}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {list &&
            list.length > 0 &&
            list.map((value, i) => {
              const Icon = icons[i];
              const color = colors[i];
              const textColor = textColors[i];
              return (
                <div key={i} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition group">
                  <div
                    className={`w-16 h-16 ${color} ${textColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 mb-4">{value.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};
