"use client";

import { useLocale } from "next-intl";

import { FullSection } from "@/entities/section/model/section";

export function ContactHero({ section }: { section: FullSection }) {
  const locale = useLocale();
  const usedTranslation = section.translations.find((translation) => translation.locale === locale);

  if (!usedTranslation) return null;

  return (
    <section className="min-h-[60vh] bg-gradient-to-r from-primary/10 to-accent/10 flex flex-col items-center justify-center px-4 py-20 md:py-32">
      <div className="max-w-4xl w-full text-center animate-fade-in-up space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground text-balance">{usedTranslation.title}</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">{usedTranslation.content}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <a
            href={usedTranslation.actionButtonLink || "#"}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            {usedTranslation.actionButtonText || "Get In Touch"}
          </a>
          <a
            href={usedTranslation.actionButton2Link || "#"}
            className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors"
          >
            {usedTranslation.actionButton2Text || "Get In Touch"}
          </a>
        </div>
      </div>
    </section>
  );
}
