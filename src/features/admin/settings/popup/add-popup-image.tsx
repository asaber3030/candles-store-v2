"use client";

import { useDefaultMutation } from "@/shared/hooks/useMutation";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { createPopupImage } from "@/entities/popup/api/popup.api";
import { queryKeys } from "@/shared/config/query-keys";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { FileUploader } from "@/shared/components/form/file";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";

type TMut = {
  file: File | null;
};

export const AddImagePopupForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const t = useTranslations();
  const qc = useQueryClient();

  const mutation = useDefaultMutation({
    mutationFn: ({ file }: TMut) => createPopupImage(file),
    onSuccess: (data) => {
      if (data.status === 200) {
        qc.invalidateQueries({ queryKey: queryKeys.settings.popup() });
        setOpen(false);
        setFile(null);
      }
    },
  });

  const handleAction = () => {
    mutation.mutate({
      file,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" icon={Plus}>
          {t("Add Popup Image")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Add Popup Image")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <FileUploader setFile={setFile} label={t("Upload Popup Image")} />
          <Button onClick={handleAction} loading={mutation.isPending} variant="success">
            {t("Save")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
