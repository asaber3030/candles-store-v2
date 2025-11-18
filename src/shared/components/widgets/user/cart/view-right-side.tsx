"use client"

import Link from "next/link"

import { useCurrentUserAddresses } from "@/entities/user/hooks/useUsers"
import { useTranslations } from "next-intl"
import { useCurrentUser } from "@/entities/auth/hooks/useAuth"
import { useCartStore } from "@/features/cart/model/cart.store"

import { formatCurrency } from "@/shared/lib/numbers"

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { InputSkeleton } from "@/shared/components/skeletons/input"
import { LogInIcon } from "lucide-react"
import { LinkBtn } from "@/shared/components/common/link-button"

export const ViewCartRightSide = () => {
  const t = useTranslations()

  const { user, isUserLoading } = useCurrentUser()
  const { items, getTotal } = useCartStore()

  return (
    <div className='w-full lg:w-1/3'>
      <Card>
        <CardHeader>
          <CardTitle>{t("Order Summary")}</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-2'>
          <div className='flex justify-between'>
            <span>{t("Items")}:</span>
            <span>{items.length}</span>
          </div>
          <div className='flex justify-between font-semibold text-lg'>
            <span>{t("Total")}:</span>
            <span className='text-green-700'>{formatCurrency(getTotal())}</span>
          </div>

          {isUserLoading ? (
            <InputSkeleton />
          ) : (
            <>
              {user?.id ? (
                <LinkBtn href={"/checkout"} className='mt-2 w-full' disabled={items.length === 0}>
                  {t("Proceed to Checkout")}
                </LinkBtn>
              ) : (
                <Link href='/login' className='text-red-500 text-sm text-center hover:underline flex gap-2 items-center mt-4'>
                  <LogInIcon size={16} />
                  {t("Login to Checkout")}
                </Link>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
