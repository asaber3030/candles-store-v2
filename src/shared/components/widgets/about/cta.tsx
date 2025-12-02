"use client";

import { FullSection } from "@/entities/section/model/section";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export function AboutCTA({ section }: { section: FullSection }) {
  const locale = useLocale();
  const t = useTranslations();

  const usedTranslation = section.translations.find((translation) => translation.locale === locale);
  if (!usedTranslation) return null;

  return (
    <section className="relative h-screen md:h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-primary/5" />

      {/* Decorative element */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6 text-primary text-sm tracking-widest uppercase">{t("Welcome to Our Story")}</div>

        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance">
          {usedTranslation.title ? usedTranslation.title : t("Illuminating Moments")}
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-balance">
          {usedTranslation.content ? usedTranslation.content : ""}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={usedTranslation.actionButtonLink ? usedTranslation.actionButtonLink : ""}>
            <button className="px-8 py-4 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity font-semibold">
              {usedTranslation.actionButtonText ? usedTranslation.actionButtonText : "Explore Collection"}
            </button>
          </Link>
          <Link href={usedTranslation.actionButton2Link ? usedTranslation.actionButton2Link : ""}>
            <button className="px-8 py-4 border-2 border-primary text-primary rounded hover:bg-primary/5 transition-colors font-semibold">
              {usedTranslation.actionButton2Text ? usedTranslation.actionButton2Text : "Learn More"}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
