"use client";

import { useDefaultMutation } from "@/shared/hooks/useMutation";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { deletePopupImage } from "@/entities/popup/api/popup.api";
import { queryKeys } from "@/shared/config/query-keys";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Trash } from "lucide-react";

export const DeleteImagePopupButton = ({ imageId }: { imageId: number }) => {
  const [open, setOpen] = useState(false);

  const t = useTranslations();
  const qc = useQueryClient();

  const mutation = useDefaultMutation({
    mutationFn: () => deletePopupImage(imageId),
    onSuccess: (data) => {
      if (data.status === 200) {
        qc.invalidateQueries({ queryKey: queryKeys.settings.popup() });
        setOpen(false);
      }
    },
  });

  const handleAction = () => {
    mutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" icon={Trash} className="w-full">
          {t("Delete")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Delete Popup Image")}</DialogTitle>
          <p>{t("Are you sure you want to delete this popup image?")}</p>
        </DialogHeader>

        <div className="space-y-4">
          <Button onClick={handleAction} loading={mutation.isPending} variant="destructive">
            {t("Delete")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
