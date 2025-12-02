"use client";

import z from "zod";

import { useLocale, useTranslations } from "next-intl";
import { useDefaultMutation } from "@/shared/hooks/useMutation";
import { useForm } from "react-hook-form";

import { sendEmailToOwner } from "../api/contact.api";
import { zodResolver } from "@hookform/resolvers/zod";

import { TextareaField, TextField } from "@/shared/components/form/form";
import { ContactSchema } from "../model/contact.schema";
import { FullSection } from "@/entities/section/model/section";
import { Button } from "@/shared/components/ui/button";
import { Form } from "@/shared/components/ui/form";
import { DefaultContainer } from "@/shared/components/common/default-container";

type Props = { section: FullSection };

export const ContactForm = ({ section }: Props) => {
  const t = useTranslations();
  const locale = useLocale();
  const usedTranslation = section.translations.find((translation) => translation.locale === locale);

  const form = useForm({
    resolver: zodResolver(ContactSchema),
  });

  const mutation = useDefaultMutation({
    mutationFn: (data: z.infer<typeof ContactSchema>) => sendEmailToOwner(data),
    onSuccess: (data) => {
      if (data.status === 200) {
        form.reset();
      }
    },
  });

  const handleAction = (data: z.infer<typeof ContactSchema>) => {
    mutation.mutate(data);
  };

  if (!usedTranslation) return null;

  return (
    <section className="bg-white py-20 md:py-32 px-4">
      <DefaultContainer>
        <section>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center">{usedTranslation.title || "Send us a message"}</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">{usedTranslation.content || "Send us a message"}</p>
        </section>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className="space-y-4">
            <TextField control={form.control} name="name" label={t("Name")} placeholder={t("Name")} />
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
              <TextField control={form.control} name="email" label={t("Email")} placeholder={t("Email")} />
              <TextField control={form.control} name="phoneNumber" label={t("Phone Number")} placeholder={t("Phone Number")} />
            </div>
            <TextField control={form.control} name="subject" label={t("Subject")} placeholder={t("Subject")} />
            <TextareaField control={form.control} name="message" label={t("Message")} placeholder={t("Message")} className="h-60" />

            <Button className="w-full" loading={mutation.isPending} variant="indigo">
              {t("Send")}
            </Button>
          </form>
        </Form>
      </DefaultContainer>
    </section>
  );
};
