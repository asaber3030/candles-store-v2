"use client";

import { useDefaultMutation } from "@/shared/hooks/useMutation";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { updatePopupData } from "@/entities/popup/api/popup.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { queryKeys } from "@/shared/config/query-keys";
import { z } from "zod";

import { CheckboxField, TextField, TextareaField } from "@/shared/components/form/form";
import { FileUploader } from "@/shared/components/form/file";
import { PopupSchema } from "@/entities/popup/model/popup.schema";
import { FullPopup } from "@/entities/popup/model/popup";
import { Button } from "@/shared/components/ui/button";
import { Form } from "@/shared/components/ui/form";

type TMut = {
  data: z.infer<typeof PopupSchema>;
  file: File | null;
};

export const PopupForm = ({ popup }: { popup: FullPopup }) => {
  const [file, setFile] = useState<File | null>(null);

  const t = useTranslations();
  const qc = useQueryClient();
  const form = useForm({
    resolver: zodResolver(PopupSchema),
    defaultValues: {
      title: popup?.title || "",
      titleAr: popup?.titleAr || "",
      content: popup?.content || "",
      contentAr: popup?.contentAr || "",
      link: popup?.link || "",
      isActive: popup?.isActive || false,
    },
  });

  const mutation = useDefaultMutation({
    mutationFn: ({ data, file }: TMut) => updatePopupData(data, file),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.settings.popup() });
    },
  });

  const handleAction = (data: z.infer<typeof PopupSchema>) => {
    mutation.mutate({
      data,
      file,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAction)} className="space-y-4 p-4 border rounded-md bg-white">
        <FileUploader setFile={setFile} label={t("Upload Popup Image")} />

        <div className="grid grid-cols-2 gap-4">
          <TextField name="title" label={t("Title")} control={form.control} />
          <TextField name="titleAr" label={t("Title (Arabic)")} control={form.control} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TextareaField name="content" label={t("Content")} control={form.control} />
          <TextareaField name="contentAr" label={t("Content (Arabic)")} control={form.control} />
        </div>

        <TextField name="link" label={t("Link")} control={form.control} />
        <CheckboxField name="isActive" label={t("Is Active")} control={form.control} />

        <Button loading={mutation.isPending} variant="success">
          {t("Save")}
        </Button>
      </form>
    </Form>
  );
};
