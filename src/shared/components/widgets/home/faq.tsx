"use client";

import { FullSection, SectionList } from "@/entities/section/model/section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/components/ui/accordion";
import { useLocale, useTranslations } from "next-intl";

type Props = {
  section: FullSection;
};

export function HomeFAQSection({ section }: Props) {
  const translate = useTranslations();
  const locale = useLocale();

  const translation = section.translations.find((item) => item.locale === locale);
  if (!translation) return null;

  const list: SectionList = translation.list as SectionList;

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-400">
            {translation.title}
            <span className="relative">
              <span className="absolute bottom-1 left-0 h-1 w-full bg-primary" />
            </span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">{translation.content}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Accordion type="single" collapsible className="space-y-4 overflow-hidden">
            {list.slice(0, 3).map((item, idx) => (
              <AccordionItem key={`faq-1-${idx}`} value={`faq-1-value-${idx}`} className="border rounded-lg shadow-sm">
                <AccordionTrigger className="px-6 hover:no-underline bg-white">
                  <span className="text-left font-semibold text-gray-900 dark:text-gray-400">{item.title}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-500 pt-4 bg-white rounded-md">
                  {item.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Accordion type="single" collapsible className="space-y-4 overflow-hidden">
            {list.slice(3, 6).map((item, idx) => (
              <AccordionItem key={`faq-2-${idx}`} value={`faq-2-value-${idx}`} className="border rounded-lg shadow-sm">
                <AccordionTrigger className="px-6 hover:no-underline bg-white">
                  <span className="text-left font-semibold text-gray-900 dark:text-gray-400">{item.title}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-500 pt-4 bg-white rounded-md">
                  {item.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
