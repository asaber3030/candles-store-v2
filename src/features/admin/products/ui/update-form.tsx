"use client"

import { useDefaultMutation } from "@/shared/hooks/useMutation"
import { useAllCategories } from "@/entities/category/hooks/useCategories"
import { useTranslations } from "next-intl"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { updateProductAction } from "@/entities/product/api/proudct.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { queryKeys } from "@/shared/config/query-keys"
import { z } from "zod"

import { SelectField, TextField, TextareaField } from "@/shared/components/form/form"
import { CreateProductSchema } from "@/entities/product/model/product.schema"
import { FileUploader } from "@/shared/components/form/file"
import { NoDataLabel } from "@/shared/components/common/no-data-label"
import { Product } from "@prisma/client"
import { Button } from "@/shared/components/ui/button"
import { Form } from "@/shared/components/ui/form"

type TMut = {
  data: z.infer<typeof CreateProductSchema>
  file: File | null
}

export const UpdateProductForm = ({ product }: { product: Product }) => {
  const [file, setFile] = useState<File | null>(null)

  const { categories, isCategoriesLoading } = useAllCategories()

  const t = useTranslations()
  const qc = useQueryClient()
  const form = useForm({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: product.name || "",
      description: product.description || "",
      longDescription: product.longDescription || "",
      price: product.price || 0,
      offerPrice: product.offerPrice || 0,
      quantity: product.quantity || 0,
      categoryId: product.categoryId
    }
  })

  const mutation = useDefaultMutation({
    mutationFn: ({ data, file }: TMut) => updateProductAction(product.id, data, file),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.products.index() })
      if (data.status == 201) {
        form.reset()
      }
    }
  })

  const handleAction = (data: z.infer<typeof CreateProductSchema>) => {
    mutation.mutate({
      data,
      file
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
        <FileUploader setFile={setFile} />
        <TextField name='name' label={t("Name")} control={form.control} />

        <TextareaField name='description' label={t("Description")} control={form.control} />
        <TextareaField name='longDescription' label={t("Long Description")} control={form.control} />
        <TextField name='price' type='number' label={t("Price")} control={form.control} valueAsNumber />
        <TextField name='offerPrice' type='number' label={t("Offer Price")} control={form.control} valueAsNumber />
        <TextField name='quantity' type='number' label={t("Quantity")} control={form.control} valueAsNumber />

        {isCategoriesLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {categories && categories.length > 0 ? (
              <SelectField
                valueAsNumber
                name='categoryId'
                label={t("Category")}
                control={form.control}
                defaultValue={product.categoryId.toString()}
                options={categories.map((category) => ({
                  label: category.name,
                  value: category.id.toString()
                }))}
              />
            ) : (
              <NoDataLabel label={t("No categories found")} />
            )}
          </div>
        )}

        <Button loading={mutation.isPending} variant='success'>
          {t("Save")}
        </Button>
      </form>
    </Form>
  )
}
