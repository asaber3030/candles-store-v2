"use client";

import { useDefaultMutation } from "@/shared/hooks/useMutation";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { updateSectionTranslationAction } from "@/entities/section/api/section.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/shared/lib/cn";
import { z } from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Section, SectionTranslation } from "@prisma/client";
import { SectionTranslationSchema } from "@/entities/section/model/section.schema";
import { SectionListItem } from "@/entities/section/model/section";
import { FileUploader } from "@/shared/components/form/file";
import { Minus, Plus } from "lucide-react";
import { TextField } from "@/shared/components/form/form";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Form } from "@/shared/components/ui/form";

type Props = {
  section: Section;
  translations: SectionTranslation[];
};

export const UpdateSectionForm = ({ section, translations }: Props) => {
  const t = useTranslations();
  const locale = useLocale();

  const en = translations.find((t) => t.locale === "en");
  const ar = translations.find((t) => t.locale === "ar");

  const [listCount, setListCount] = useState((en?.list as SectionListItem[])?.length || 1);
  const [list, setList] = useState<SectionListItem[]>((en?.list || []) as SectionListItem[]);
  const [listAr, setListAr] = useState<SectionListItem[]>((ar?.list || []) as SectionListItem[]);

  const [image, setImage] = useState<File | null>(null);

  const form = useForm({
    resolver: zodResolver(SectionTranslationSchema),
    defaultValues: {
      en: {
        title: en?.title || "",
        subTitle: en?.subTitle || "",
        content: en?.content || "",
        actionButtonText: en?.actionButtonText || "",
        actionButtonLink: en?.actionButtonLink || "",
        actionButton2Text: en?.actionButton2Text || "",
        actionButton2Link: en?.actionButton2Link || "",
      },
      ar: {
        title: ar?.title || "",
        subTitle: ar?.subTitle || "",
        content: ar?.content || "",
        actionButtonText: ar?.actionButtonText || "",
        actionButtonLink: ar?.actionButtonLink || "",
        actionButton2Text: ar?.actionButton2Text || "",
        actionButton2Link: ar?.actionButton2Link || "",
      },
    },
  });

  const mutation = useDefaultMutation({
    mutationFn: (data: z.infer<typeof SectionTranslationSchema>) => updateSectionTranslationAction(section.id, data, list, listAr, image),
  });

  const handleIncreaseListItems = () => {
    setListCount((prev) => (prev != 6 ? prev + 1 : 6));
    setList((prev) => [
      ...prev,
      {
        title: "",
        description: "",
        icon: "",
      },
    ]);
  };

  const handleDecreaseListItems = () => {
    setListCount((prev) => (prev - 1 != 0 ? prev - 1 : 1));
    if (listCount === 1) return;
    setList((prev) => prev.slice(0, prev.length - 1));
  };

  const handleUpdateItem = (event: React.ChangeEvent<HTMLInputElement>, idx: number, key: string) => {
    setList((prev) => {
      const newList = [...prev];
      newList[idx] = {
        ...newList[idx],
        [key]: event.target.value,
      };
      return newList;
    });
  };

  const handleUpdateArItem = (event: React.ChangeEvent<HTMLInputElement>, idx: number, key: string) => {
    setListAr((prev) => {
      const newList = [...prev];
      newList[idx] = {
        ...newList[idx],
        [key]: event.target.value,
      };
      return newList;
    });
  };
  const handleSubmit = () => {
    mutation.mutate(form.getValues());
  };

  const handleErrors = () => {
    console.log(form.formState.errors);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className={cn("font-medium", locale === "ar" && "text-right flex justify-end")}>
          <bdi>
            {t("Section Name")}: <bdi className="capitalize font-extrabold">{section.name}</bdi>
          </bdi>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="home-intro-form-en">
          <TabsList className={cn("w-full bg-white shadow-md border", locale === "ar" && "flex justify-end")}>
            <TabsTrigger value="home-intro-form-en">
              {t("English")} {!en && `(${t("Missing")})`}
            </TabsTrigger>
            <TabsTrigger value="home-intro-form-ar">
              {t("Arabic")} {!ar && `(${t("Missing")})`}
            </TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="py-4">
              <TabsContent value="home-intro-form-en" className="space-y-4">
                <FileUploader setFile={setImage} />
                <TextField
                  labelClassName={cn(locale == "ar" && "justify-end")}
                  inputClassName={cn(locale == "ar" && "text-right")}
                  label={t("Title")}
                  control={form.control}
                  placeholder="Section title"
                  name="en.title"
                />
                <TextField
                  labelClassName={cn(locale == "ar" && "justify-end")}
                  inputClassName={cn(locale == "ar" && "text-right")}
                  label={t("Sub Title")}
                  control={form.control}
                  placeholder="Section sub title"
                  name="en.subTitle"
                />
                <TextField
                  labelClassName={cn(locale == "ar" && "justify-end")}
                  inputClassName={cn(locale == "ar" && "text-right")}
                  label={t("Content")}
                  control={form.control}
                  placeholder="Section content"
                  name="en.content"
                />

                <div className="grid grid-cols-2 gap-2">
                  <TextField
                    labelClassName={cn(locale == "ar" && "justify-end")}
                    label={t("Action Button Text")}
                    control={form.control}
                    placeholder="Action Button Text"
                    name="en.actionButtonText"
                  />
                  <TextField
                    inputClassName={cn(locale == "ar" && "text-right")}
                    label={t("Action Button Link")}
                    control={form.control}
                    placeholder="Action Button Link"
                    name="en.actionButtonLink"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <TextField
                    labelClassName={cn(locale == "ar" && "justify-end")}
                    inputClassName={cn(locale == "ar" && "text-right")}
                    label={t("Action Button 2 Text")}
                    control={form.control}
                    placeholder="Action Button 2 Text"
                    name="en.actionButton2Text"
                  />
                  <TextField
                    labelClassName={cn(locale == "ar" && "justify-end")}
                    inputClassName={cn(locale == "ar" && "text-right")}
                    label={t("Action Button 2 Link")}
                    control={form.control}
                    placeholder="Action Button 2 Link"
                    name="en.actionButton2Link"
                  />
                </div>

                <div>
                  <div className=" mb-4 border-b pb-2 flex justify-between items-center">
                    <p className="text-xl font-bold">{t("List Items")}</p>
                    <div className="flex gap-2 items-center">
                      <Button variant="outline" onClick={handleIncreaseListItems} icon={Plus} size="icon" type="button" />
                      {listCount}
                      <Button variant="outline" onClick={handleDecreaseListItems} icon={Minus} size="icon" type="button" />
                    </div>
                  </div>

                  {Array.from({ length: listCount }).map((_, i) => (
                    <div key={`list-intro-${section.id}-${i}`} className="grid grid-cols-3 gap-2 items-center mb-2">
                      <div className="space-y-1">
                        <Label className={cn(locale == "ar" && "text-right")}>{t("Title")}</Label>
                        <Input value={list?.[i]?.title || ""} onChange={(event) => handleUpdateItem(event, i, "title")} placeholder="Title" />
                      </div>

                      <div className="space-y-1">
                        <Label className={cn(locale == "ar" && "text-right")}>{t("Sub Title")}</Label>
                        <Input
                          value={list?.[i]?.subTitle || ""}
                          onChange={(event) => handleUpdateItem(event, i, "subTitle")}
                          placeholder="Sub Title"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label className={cn(locale == "ar" && "text-right")}>{t("Description")}</Label>
                        <Input
                          defaultValue={list?.[i]?.description || ""}
                          onChange={(event) => handleUpdateItem(event, i, "description")}
                          placeholder="Description"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="home-intro-form-ar" className="space-y-4">
                <FileUploader setFile={setImage} />

                <TextField
                  labelClassName={cn(locale == "ar" && "justify-end")}
                  inputClassName={cn(locale == "ar" && "text-right")}
                  label={t("Title")}
                  control={form.control}
                  placeholder="Section title"
                  name="ar.title"
                />
                <TextField
                  labelClassName={cn(locale == "ar" && "justify-end")}
                  inputClassName={cn(locale == "ar" && "text-right")}
                  label={t("Sub Title")}
                  control={form.control}
                  placeholder="Section sub title"
                  name="ar.subTitle"
                />
                <TextField
                  labelClassName={cn(locale == "ar" && "justify-end")}
                  inputClassName={cn(locale == "ar" && "text-right")}
                  label={t("Content")}
                  control={form.control}
                  placeholder="Section content"
                  name="ar.content"
                />

                <div className="grid grid-cols-2 gap-2">
                  <TextField
                    labelClassName={cn(locale == "ar" && "justify-end")}
                    inputClassName={cn(locale == "ar" && "text-right")}
                    label={t("Action Button Text")}
                    control={form.control}
                    placeholder="Action Button Text"
                    name="ar.actionButtonText"
                  />
                  <TextField
                    labelClassName={cn(locale == "ar" && "justify-end")}
                    inputClassName={cn(locale == "ar" && "text-right")}
                    label={t("Action Button Link")}
                    control={form.control}
                    placeholder="Action Button Link"
                    name="ar.actionButtonLink"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <TextField
                    labelClassName={cn(locale == "ar" && "justify-end")}
                    inputClassName={cn(locale == "ar" && "text-right")}
                    label={t("Action Button 2 Text")}
                    control={form.control}
                    placeholder="Action Button 2 Text"
                    name="ar.actionButton2Text"
                  />
                  <TextField
                    labelClassName={cn(locale == "ar" && "justify-end")}
                    inputClassName={cn(locale == "ar" && "text-right")}
                    label={t("Action Button 2 Link")}
                    control={form.control}
                    placeholder="Action Button 2 Link"
                    name="ar.actionButton2Link"
                  />
                </div>

                <div>
                  <section className=" mb-4 border-b pb-2 flex justify-between items-center">
                    <p className="text-xl font-bold">List Items</p>
                    <div className="flex gap-2 items-center">
                      <Button variant="outline" onClick={handleIncreaseListItems} icon={Plus} size="icon" />
                      <span>{listCount}</span>
                      <Button variant="outline" onClick={handleDecreaseListItems} icon={Minus} size="icon" />
                    </div>
                  </section>

                  <section>
                    {Array.from({ length: listCount }).map((_, i) => (
                      <div key={`list-intro-home-${i}`} className="grid grid-cols-3 gap-4 items-center mb-2">
                        <div className="space-y-2">
                          <Label className={cn(locale == "ar" && "text-right block")}>{t("Title")}</Label>
                          <Input
                            defaultValue={listAr?.[i]?.title || ""}
                            onChange={(event) => handleUpdateArItem(event, i, "title")}
                            placeholder="Title"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className={cn(locale == "ar" && "text-right block")}>{t("Sub Title")}</Label>
                          <Input
                            value={listAr?.[i]?.subTitle || ""}
                            onChange={(event) => handleUpdateArItem(event, i, "subTitle")}
                            placeholder="Sub Title"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className={cn(locale == "ar" && "text-right block")}>{t("Description")}</Label>
                          <Input
                            defaultValue={listAr?.[i]?.description || ""}
                            onChange={(event) => handleUpdateArItem(event, i, "description")}
                            placeholder="Description"
                          />
                        </div>
                      </div>
                    ))}
                  </section>
                </div>
              </TabsContent>

              <Button loading={mutation.isPending} className="mt-4">
                {t("Save")}
              </Button>
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  );
};
