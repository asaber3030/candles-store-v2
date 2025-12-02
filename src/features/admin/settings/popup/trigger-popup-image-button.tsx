"use client";

import { useDefaultMutation } from "@/shared/hooks/useMutation";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { togglePopupStatus } from "@/entities/popup/api/popup.api";
import { queryKeys } from "@/shared/config/query-keys";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Trash } from "lucide-react";

export const TogglePopupButton = ({ status }: { status: boolean }) => {
  const [open, setOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(status);

  const t = useTranslations();
  const qc = useQueryClient();

  const mutation = useDefaultMutation({
    mutationFn: ({ updated }: { updated: boolean }) => togglePopupStatus(updated),
    onSuccess: (data) => {
      if (data.status === 200) {
        qc.invalidateQueries({ queryKey: queryKeys.settings.popup() });
        setOpen(false);
      }
    },
  });

  const handleAction = () => {
    mutation.mutate({
      updated: !newStatus,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={newStatus ? "destructive" : "default"} icon={newStatus ? Trash : undefined}>
          {t("Toggle" + (newStatus ? " Off" : " On"))}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Toggle Popup")}</DialogTitle>
          <p>{t("Are you sure you want to toggle this popup?")}</p>
        </DialogHeader>

        <div className="space-y-4">
          <Button onClick={handleAction} loading={mutation.isPending} variant={newStatus ? "destructive" : "success"}>
            {t("Toggle" + (newStatus ? " Off" : " On"))}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
