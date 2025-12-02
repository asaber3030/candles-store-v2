"use client";

import { useDefaultMutation } from "@/shared/hooks/useMutation";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { createProductAttributeAction, createProductSizeAction } from "@/entities/product/api/proudct.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { queryKeys } from "@/shared/config/query-keys";
import { z } from "zod";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { TextField } from "@/shared/components/form/form";
import { CreateProductAttributeSchema } from "@/entities/product/model/product.schema";
import { Button } from "@/shared/components/ui/button";
import { Form } from "@/shared/components/ui/form";
import { Plus } from "lucide-react";

type TMut = {
  data: z.infer<typeof CreateProductAttributeSchema>;
};

export const CreateAttributeModal = ({ productId }: { productId: number }) => {
  const [open, setOpen] = useState(false);

  const t = useTranslations();
  const qc = useQueryClient();
  const form = useForm({
    resolver: zodResolver(CreateProductAttributeSchema),
  });

  const mutation = useDefaultMutation({
    mutationFn: ({ data }: TMut) => createProductAttributeAction(productId, data),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.products.single(productId) });
      if (data.status == 201) {
        setOpen(false);
        form.reset();
      }
    },
  });

  const handleAction = (data: z.infer<typeof CreateProductAttributeSchema>) => {
    mutation.mutate({
      data,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={Plus} variant="success">
          {t("Create Attribute")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Create Attribute")}</DialogTitle>
          <DialogDescription>{t("Create Attribute Description")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <TextField name="name" label={t("Name")} control={form.control} />
              <TextField name="value" label={t("Value")} control={form.control} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextField name="nameAr" label={t("Name Ar")} control={form.control} />
              <TextField name="valueAr" label={t("Value Ar")} control={form.control} />
            </div>

            <Button loading={mutation.isPending} variant="success">
              {t("Save")}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
