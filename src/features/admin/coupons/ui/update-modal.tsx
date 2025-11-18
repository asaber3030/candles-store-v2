"use client"
import { useQueryClient } from "@tanstack/react-query"

import { useDefaultMutation } from "@/shared/hooks/useMutation"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { updateCouponAction } from "@/entities/coupon/api/coupon.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { queryKeys } from "@/shared/config/query-keys"
import { z } from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import { CheckboxField, TextField } from "@/shared/components/form/form"
import { CreateCouponSchema } from "@/entities/coupon/model/coupon.schema"
import { Coupon } from "@prisma/client"
import { Button } from "@/shared/components/ui/button"
import { Form } from "@/shared/components/ui/form"
import { Edit2, Plus } from "lucide-react"
import { TooltipButton } from "@/shared/components/common/tooltip-button"

type TMut = {
  data: z.infer<typeof CreateCouponSchema>
}

export const UpdateCouponModal = ({ coupon }: { coupon: Coupon }) => {
  const [open, setOpen] = useState(false)

  const t = useTranslations()
  const qc = useQueryClient()
  const form = useForm({
    resolver: zodResolver(CreateCouponSchema),
    defaultValues: {
      name: coupon.name,
      discount: coupon.discount,
      usages: coupon.usages,
      active: coupon.active
    }
  })

  const mutation = useDefaultMutation({
    mutationFn: ({ data }: TMut) => updateCouponAction(coupon.id, data),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.coupons.index() })
      if (data.status == 200) {
        setOpen(false)
        form.reset()
      }
    }
  })

  const handleAction = (data: z.infer<typeof CreateCouponSchema>) => {
    mutation.mutate({
      data
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <TooltipButton tooltip={t("Update Coupon")} icon={Edit2} variant='info' size='icon' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Update Coupon")}</DialogTitle>
          <DialogDescription>{t("Update Coupon Description")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAction)} className='space-y-4'>
            <TextField name='name' label={t("Name")} control={form.control} />
            <TextField valueAsNumber type='number' name='discount' label={t("Discount")} control={form.control} />
            <TextField valueAsNumber type='number' name='usages' label={t("Usages")} control={form.control} />
            <CheckboxField name='active' label={t("Is Active")} control={form.control} />

            <Button loading={mutation.isPending} variant='success'>
              {t("Save")}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
