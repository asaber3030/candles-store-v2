"use client";

import { useLocale } from "next-intl";

import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { FullSection, SectionList } from "@/entities/section/model/section";

export function ContactGetInTouch({ section }: { section: FullSection }) {
  const locale = useLocale();
  const usedTranslation = section.translations.find((translation) => translation.locale === locale);

  if (!usedTranslation) return null;

  const list = usedTranslation.list as SectionList;
  const Icons = [MailIcon, PhoneIcon, MapPinIcon];

  return (
    <section id="contact-info" className="bg-white py-20 md:py-32 px-4 border-t">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-16 text-center">Get in Touch</h2>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {list &&
            list.length &&
            list.length > 0 &&
            list.map((item, index) => {
              const Icon = Icons[index];
              return (
                <div className="flex flex-col items-center text-center p-8 rounded-lg bg-card hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{item.subTitle}</h3>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <a href="mailto:hello@lumiere.com" className="text-primary font-semibold hover:underline text-lg">
                    {item.title}
                  </a>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
