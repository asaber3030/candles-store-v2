"use client";

import { useLocale, useTranslations } from "next-intl";
import { FullSection, SectionList } from "@/entities/section/model/section";

import { Package } from "lucide-react";
import { Category } from "@prisma/client";

type Props = {
  section: FullSection;
  categoriesLength: number;
  productsLength: number;
};

export const CategoriesHero = ({ section, categoriesLength, productsLength }: Props) => {
  const t = useTranslations();
  const locale = useLocale();

  const usedTranslation = section.translations.find((t) => t.locale === locale);

  if (!usedTranslation) return null;

  return (
    <div className="relative mb-12 rounded-3xl overflow-hidden bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700 p-12 shadow-2xl">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-400/20 rounded-full blur-2xl animate-pulse delay-300"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 text-white/90 text-sm font-medium">
          <Package className="h-4 w-4" />
          <span>{t("SharkiaCandles Categories")}</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
          {usedTranslation.title ? usedTranslation.title : t("Organize Your")}
          <span className="block bg-linear-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
            {usedTranslation.subTitle ? usedTranslation.subTitle : t("Space")}
          </span>
        </h1>

        <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
          {usedTranslation.content ? usedTranslation.content : t("See all different types of categories of candles")}
        </p>

        <div className="flex flex-wrap gap-8 text-white/90">
          <div className="flex items-center gap-3">
            <div className="w-12 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-2xl font-bold">{categoriesLength}</span>
            </div>
            <div>
              <div className="text-sm opacity-80">{t("Total")}</div>
              <div className="font-semibold">{t("Categories")}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-2xl font-bold">{productsLength}</span>
            </div>
            <div>
              <div className="text-sm opacity-80">{t("Total")}</div>
              <div className="font-semibold">{t("Products")}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                               linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>
    </div>
  );
};
