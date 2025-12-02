"use client";

import { useLocale } from "next-intl";

import { FullSection } from "@/entities/section/model/section";

export const ContactCTA = ({ section }: { section: FullSection }) => {
  const locale = useLocale();
  const usedTranslation = section.translations.find((translation) => translation.locale === locale);

  if (!usedTranslation) return null;

  return (
    <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-20 md:py-28 px-4">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">{usedTranslation.title}</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">{usedTranslation.content}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <a
            href={usedTranslation.actionButtonLink || "#"}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            {usedTranslation.actionButtonText || "Get In Touch"}
          </a>
          <a
            href={usedTranslation.actionButton2Link || "#"}
            className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold text-lg hover:bg-primary/5 transition-colors"
          >
            {usedTranslation.actionButton2Text || "Get In Touch"}
          </a>
        </div>
      </div>
    </section>
  );
};
