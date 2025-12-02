"use client";

import { FullSection, SectionList } from "@/entities/section/model/section";
import { DefaultContainer } from "@/shared/components/common/default-container";
import { Heart, Leaf } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export const HomeUSP = ({ section }: { section: FullSection }) => {
  const t = useTranslations();
  const locale = useLocale();
  const usedTranslation = section.translations.find((t) => t.locale === locale);
  if (!usedTranslation) return null;

  const list: SectionList = usedTranslation.list as SectionList;

  return (
    <section className="py-16 bg-secondaryLight">
      <DefaultContainer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className={"text-3xl font-bold mb-8 text-center"}>{usedTranslation.title ? usedTranslation.title : t("Why Choose Us")}</h1>

        <div className="grid md:grid-cols-3 gap-12">
          {list.map((item, index) => (
            <div key={`usp-item-${index}`} className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-2">{item.title}</h3>
              <p className="text-stone-600">{item.description}</p>
            </div>
          ))}
        </div>
      </DefaultContainer>
    </section>
  );
};
