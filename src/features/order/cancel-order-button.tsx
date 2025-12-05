"use client"

import { useDefaultMutation } from "@/shared/hooks/useMutation"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { cancelUserOrderAction } from "@/entities/order/api/order.api"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import { XIcon } from "lucide-react"

type Props = {
  orderId: number
}

type Mut = {
  orderId: number
}

export const CancelOrderButton = ({ orderId }: Props) => {
  const [open, setOpen] = useState(false)

  const router = useRouter()
  const t = useTranslations()

  const cancelOrder = useDefaultMutation({
    mutationFn: ({ orderId }: Mut) => cancelUserOrderAction(orderId),
    onSuccess: (data) => {
      if (data.status === 200) {
        setOpen(false)
        router.refresh()
      }
    },
  })

  const cancelOrderHandler = () => {
    cancelOrder.mutate({ orderId })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" icon={XIcon}>
          {t("Cancel Order")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Cancel your Order")}</DialogTitle>
        </DialogHeader>
        <p className="text-gray-500 font-medium text-lg">{t("Are you sure you want to cancel your order? This action cannot be undone")}</p>

        <DialogFooter>
          <Button disabled={cancelOrder.isPending} onClick={cancelOrderHandler} className="w-full">
            {t("Confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
