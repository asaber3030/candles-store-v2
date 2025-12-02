"use client";

import Link from "next/link";

import { useLocale, useTranslations } from "next-intl";
import { DefaultContainer } from "@/shared/components/common/default-container";
import { userRoutes } from "@/shared/config/routes";
import { FullSection } from "@/entities/section/model/section";

export const HomeCTA = ({ section }: { section: FullSection }) => {
  const t = useTranslations();
  const locale = useLocale();

  const usedTranslation = section.translations.find((t) => t.locale === locale);
  if (!usedTranslation) return null;

  return (
    <section className="relative bg-white w-full min-h-[600px] from-background via-card to-background overflow-hidden border-t">
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <DefaultContainer className="px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-foreground text-balance">
                {usedTranslation.title ? usedTranslation.title : t("hero.title")}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground text-balance leading-relaxed">
                {usedTranslation.content ? usedTranslation.content : t("hero.subtitle")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={usedTranslation.actionButtonLink ? usedTranslation.actionButtonLink : userRoutes.shop}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-center"
              >
                {usedTranslation.actionButtonText ? usedTranslation.actionButtonText : t("hero.cta")}
              </Link>
              <Link
                href={usedTranslation.actionButton2Link ? usedTranslation.actionButton2Link : userRoutes.about}
                className="px-8 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors text-center"
              >
                {usedTranslation.actionButton2Text ? usedTranslation.actionButton2Text : t("Learn More")}
              </Link>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-96 md:h-[500px] from-primary/20 to-accent/20 rounded-2xl overflow-hidden flex items-center justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <img
                src={usedTranslation.image ? usedTranslation.image : "/images/candles/05.jpg"}
                alt="Featured candle"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </DefaultContainer>
    </section>
  );
};
