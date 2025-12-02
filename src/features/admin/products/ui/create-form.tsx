"use client";

import { useDefaultMutation } from "@/shared/hooks/useMutation";
import { useAllCategories } from "@/entities/category/hooks/useCategories";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { createProductAction } from "@/entities/product/api/proudct.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { queryKeys } from "@/shared/config/query-keys";
import { z } from "zod";

import { SelectField, TextField, TextareaField } from "@/shared/components/form/form";
import { CreateProductSchema } from "@/entities/product/model/product.schema";
import { NoDataLabel } from "@/shared/components/common/no-data-label";
import { Button } from "@/shared/components/ui/button";
import { Form } from "@/shared/components/ui/form";
import { FileUploader } from "@/shared/components/form/file";
import TiptapEditor from "@/shared/components/common/editor";

type TMut = {
  data: z.infer<typeof CreateProductSchema>;
  file: File | null;
};

export const CreateProductForm = () => {
  const [file, setFile] = useState<File | null>(null);

  const { categories, isCategoriesLoading } = useAllCategories();

  const t = useTranslations();
  const qc = useQueryClient();
  const form = useForm({
    resolver: zodResolver(CreateProductSchema),
  });

  const mutation = useDefaultMutation({
    mutationFn: ({ data, file }: TMut) => createProductAction(data, file),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.products.index() });
      if (data.status == 201) {
        form.reset();
      }
    },
  });

  const handleAction = (data: z.infer<typeof CreateProductSchema>) => {
    mutation.mutate({
      data,
      file,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAction)} className="space-y-4">
        <FileUploader setFile={setFile} />
        <TextField name="name" label={t("Name")} control={form.control} />
        <TextField name="nameAr" label={t("Name Ar")} control={form.control} />
        <TextareaField name="description" label={t("Description")} control={form.control} />
        <TextareaField name="descriptionAr" label={t("Description Ar")} control={form.control} />
        <div className="space-y-2">
          <TiptapEditor value={form.getValues("longDescription")} onChange={(value) => form.setValue("longDescription", value)} />
          {form.formState.errors.longDescription && <p className="text-sm text-red-600">{form.formState.errors.longDescription.message}</p>}
        </div>
        <TextField name="price" type="number" label={t("Price")} control={form.control} valueAsNumber />
        <TextField name="offerPrice" type="number" label={t("Offer Price")} control={form.control} valueAsNumber />
        <TextField name="quantity" type="number" label={t("Quantity")} control={form.control} valueAsNumber />

        {isCategoriesLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {categories && categories.length > 0 ? (
              <SelectField
                valueAsNumber
                name="categoryId"
                label={t("Category")}
                control={form.control}
                options={categories.map((category) => ({
                  label: category.name,
                  value: category.id.toString(),
                }))}
              />
            ) : (
              <NoDataLabel label={t("No addresses found")} />
            )}
          </div>
        )}

        <Button loading={mutation.isPending} variant="success">
          {t("Save")}
        </Button>
      </form>
    </Form>
  );
};
