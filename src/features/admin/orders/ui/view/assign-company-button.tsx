"use client"

import { useDefaultMutation } from "@/shared/hooks/useMutation"
import { useTranslations } from "next-intl"
import { useAllUsers } from "@/entities/user/hooks/useUsers"
import { useState } from "react"

import { assignOrderShippingCompany } from "@/entities/order/api/order.api"
import { toast } from "react-toastify"
import { cn } from "@/shared/lib/cn"

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { InputSkeleton } from "@/shared/components/skeletons/input"
import { UserRoleEnum } from "@prisma/client"
import { NoDataLabel } from "@/shared/components/common/no-data-label"
import { ClassValue } from "class-variance-authority/types"
import { Button } from "@/shared/components/ui/button"

type Props = {
  className?: ClassValue
  orderId: number
  variant?: string
}

type Mut = { companyId: number }

export const AssignCompanyToOrderButton = ({ className, orderId }: Props) => {
  const t = useTranslations()

  const { users: deliveryCompanies, isUsersLoading: isDeliveryCompaniesLoading } = useAllUsers({ role: UserRoleEnum.deliveryCompany })

  const [open, setOpen] = useState(false)
  const [companyId, setCompanyId] = useState<number | null>(null)

  const mutation = useDefaultMutation({
    mutationFn: ({ companyId }: Mut) => assignOrderShippingCompany(orderId, companyId),
    onSuccess: (data) => {
      if (data.status === 200) {
        setOpen(false)
      }
    }
  })

  const handleUpdate = () => {
    if (!companyId) {
      toast.error(t("Please select a shipping company"))
      return
    }

    mutation.mutate({
      companyId
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className={cn(className)}>
          {t("Assign Shipping Company")}
        </Button>
      </DialogTrigger>

      <DialogContent className='xl:min-w-[700px] w-[600px]'>
        <DialogHeader>
          <DialogTitle>{t("Assign Company To Order #", { orderNumber: orderId })}</DialogTitle>
        </DialogHeader>

        {isDeliveryCompaniesLoading ? (
          <InputSkeleton />
        ) : (
          <div>
            {deliveryCompanies?.length === 0 ? (
              <NoDataLabel label={t("No delivery companies available")} />
            ) : (
              <Select onValueChange={(value) => setCompanyId(Number(value))} defaultValue={companyId ? String(companyId) : undefined}>
                <SelectTrigger>
                  <SelectValue placeholder={t("Delivery Company")} />
                </SelectTrigger>
                <SelectContent>
                  {deliveryCompanies?.map((company) => (
                    <SelectItem key={company.id} value={String(company.id)}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        )}

        <DialogFooter className='flex gap-1'>
          <Button onClick={handleUpdate}>{t("Save")}</Button>
          <DialogClose asChild>
            <Button variant='outline'>{t("Cancel")}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
