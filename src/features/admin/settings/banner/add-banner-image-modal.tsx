"use client";

import { useDefaultMutation } from "@/shared/hooks/useMutation";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { createBannerImageAction } from "@/entities/banner/api/banner.api";
import { queryKeys } from "@/shared/config/query-keys";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { FileUploader } from "@/shared/components/form/file";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";

type TMut = {
  file: File | null;
};

export const CreateBannerImageModal = () => {
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const t = useTranslations();
  const qc = useQueryClient();

  const mutation = useDefaultMutation({
    mutationFn: ({ file }: TMut) => createBannerImageAction(file),
    onSuccess: (data) => {
      if (data.status === 200) {
        qc.invalidateQueries({ queryKey: queryKeys.settings.banner() });
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
          {t("Add Banner Image")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Add Banner Image")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <FileUploader setFile={setFile} label={t("Upload Banner Image")} />
          <Button onClick={handleAction} loading={mutation.isPending} variant="success">
            {t("Save")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
