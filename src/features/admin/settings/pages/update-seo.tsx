"use client";

import { useDefaultMutation } from "@/shared/hooks/useMutation";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { updatePageTranslationAction } from "@/entities/page/api/page.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { SelectField, TextField } from "@/shared/components/form/form";
import { PageSEOSchema } from "@/entities/page/model/page.schema";
import { FileUploader } from "@/shared/components/form/file";
import { FullPage } from "@/entities/page/model/page";
import { Button } from "@/shared/components/ui/button";
import { Form } from "@/shared/components/ui/form";
import { cn } from "@/shared/lib/cn";

type Props = {
  page: FullPage;
};

export const UpdatePageSEO = ({ page }: Props) => {
  const enTranslation = page.seoList.find((t) => t.locale === "en");
  const arTranslation = page.seoList.find((t) => t.locale === "ar");
  const locale = useLocale();
  const t = useTranslations();

  const [image, setImage] = useState<File | null>(null);

  const form = useForm({
    resolver: zodResolver(PageSEOSchema),
    defaultValues: {
      en: {
        title: enTranslation?.title ?? "",
        description: enTranslation?.description ?? "",
        keywords: enTranslation?.keywords ?? "",
        ogTitle: enTranslation?.ogTitle ?? "",
        ogDescription: enTranslation?.ogDescription ?? "",
        ogType: "website",
        ogSiteName: enTranslation?.ogSiteName ?? "Sharkia Candles",
      },
      ar: {
        title: arTranslation?.title ?? "",
        description: arTranslation?.description ?? "",
        keywords: arTranslation?.keywords ?? "",
        ogTitle: arTranslation?.ogTitle ?? "",
        ogDescription: arTranslation?.ogDescription ?? "",
        ogType: "website",
        ogSiteName: arTranslation?.ogSiteName ?? "Sharkia Candles",
      },
    },
  });

  const mutation = useDefaultMutation({
    mutationFn: ({ data, image }: { data: z.infer<typeof PageSEOSchema>; image: File | null }) => updatePageTranslationAction(page.id, data, image),
  });

  const handleSubmit = () => {
    mutation.mutate({ data: form.getValues(), image });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 bg-white p-4 rounded-md border">
        <Tabs defaultValue="en">
          <TabsList className={cn("w-full bg-white shadow-md border", locale === "ar" && "flex justify-end")}>
            <TabsTrigger value="en">
              {t("English SEO")} {!enTranslation && "(Missing)"}
            </TabsTrigger>
            <TabsTrigger value="ar">
              {t("Arabic SEO")} {!arTranslation && "(Missing)"}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="en" className="space-y-4">
            <FileUploader setFile={setImage} />
            <TextField
              labelClassName={cn(locale == "ar" && "justify-end")}
              inputClassName={cn(locale == "ar" && "text-right")}
              placeholder={t("Title")}
              control={form.control}
              name="en.title"
              label={t("Title")}
            />
            <TextField
              labelClassName={cn(locale == "ar" && "justify-end")}
              inputClassName={cn(locale == "ar" && "text-right")}
              placeholder={t("Description")}
              control={form.control}
              name="en.description"
              label={t("Description")}
            />
            <TextField
              labelClassName={cn(locale == "ar" && "justify-end")}
              inputClassName={cn(locale == "ar" && "text-right")}
              placeholder={t("Keywords")}
              control={form.control}
              name="en.keywords"
              label={t("Keywords")}
            />
            <TextField
              labelClassName={cn(locale == "ar" && "justify-end")}
              inputClassName={cn(locale == "ar" && "text-right")}
              placeholder={t("Open Graph Title")}
              control={form.control}
              name="en.ogTitle"
              label={t("Open Graph Title")}
            />
            <TextField
              labelClassName={cn(locale == "ar" && "justify-end")}
              inputClassName={cn(locale == "ar" && "text-right")}
              placeholder={t("Open Graph Site Name")}
              control={form.control}
              name="en.ogSiteName"
              label={t("Open Graph Site Name")}
            />
            <TextField
              labelClassName={cn(locale == "ar" && "justify-end")}
              inputClassName={cn(locale == "ar" && "text-right")}
              placeholder={t("Open Graph Description")}
              control={form.control}
              name="en.ogDescription"
              label={t("Open Graph Description")}
            />
          </TabsContent>
          <TabsContent value="ar" className="space-y-4">
            <FileUploader setFile={setImage} />
            <TextField
              labelClassName={cn(locale == "ar" && "justify-end")}
              inputClassName={cn(locale == "ar" && "text-right")}
              placeholder={t("Title")}
              control={form.control}
              name="ar.title"
              label={t("Title")}
            />
            <TextField
              labelClassName={cn(locale == "ar" && "justify-end")}
              inputClassName={cn(locale == "ar" && "text-right")}
              placeholder={t("Description")}
              control={form.control}
              name="ar.description"
              label={t("Description")}
            />
            <TextField
              labelClassName={cn(locale == "ar" && "justify-end")}
              inputClassName={cn(locale == "ar" && "text-right")}
              placeholder={t("Keywords")}
              control={form.control}
              name="ar.keywords"
              label={t("Keywords")}
            />
            <TextField
              labelClassName={cn(locale == "ar" && "justify-end")}
              inputClassName={cn(locale == "ar" && "text-right")}
              placeholder={t("Open Graph Title")}
              control={form.control}
              name="ar.ogTitle"
              label={t("Open Graph Title")}
            />
            <TextField
              labelClassName={cn(locale == "ar" && "justify-end")}
              inputClassName={cn(locale == "ar" && "text-right")}
              placeholder={t("Open Graph Site Name")}
              control={form.control}
              name="ar.ogSiteName"
              label={t("Open Graph Site Name")}
            />
            <TextField
              labelClassName={cn(locale == "ar" && "justify-end")}
              inputClassName={cn(locale == "ar" && "text-right")}
              placeholder={t("Open Graph Description")}
              control={form.control}
              name="ar.ogDescription"
              label={t("Open Graph Description")}
            />
          </TabsContent>
        </Tabs>
        <div className="flex gap-2">
          <Button loading={mutation.isPending} type="submit">
            {t("Save")}
          </Button>
        </div>
      </form>
    </Form>
  );
};
