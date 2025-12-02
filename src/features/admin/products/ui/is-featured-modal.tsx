"use client";

import { useDefaultMutation } from "@/shared/hooks/useMutation";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { updateProductFeaturedStateAction } from "@/entities/product/api/proudct.api";
import { queryKeys } from "@/shared/config/query-keys";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Check, X } from "lucide-react";

export const AddToFeaturedProductsModal = ({ productId, isFeatured }: { productId: number; isFeatured: boolean }) => {
  const [open, setOpen] = useState(false);

  const t = useTranslations();
  const qc = useQueryClient();

  const mutation = useDefaultMutation({
    mutationFn: () => updateProductFeaturedStateAction(productId, !isFeatured),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.products.single(productId) });
      qc.invalidateQueries({ queryKey: queryKeys.products.index() });
      if (data.status == 200) {
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
        <Button icon={isFeatured ? X : Check} variant={isFeatured ? "destructive" : "indigo"} size="icon" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Update this product featured state")}</DialogTitle>
          <DialogDescription>{t("Adding project to featured means it will be highlighted on the main page")}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-gray-600">{isFeatured ? t("Are you sure you want to remove this product from featured?") : t("Are you sure you want to add this product to featured?")}</p>
          <Button onClick={handleAction} loading={mutation.isPending} variant="success">
            {t("Save")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
