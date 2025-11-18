"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card"
import { Address, City, Country } from "@prisma/client"
import { Separator } from "@/shared/components/ui/separator"

import { useTranslations } from "next-intl"

type Props = {
  address: Address & {
    city: City
    country: Country
  }
}

export const PartOrderAddress = ({ address }: Props) => {
  const t = useTranslations()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='text-muted-foreground space-y-2 w-full'>
          <li className='flex items-center justify-between w-full'>
            <span>{t("Country")}</span>
            <span>
              {address?.country?.name} | ({address?.country?.code})
            </span>
          </li>

          <li className='flex items-center justify-between w-full'>
            <span>{t("City")}</span>
            <span>
              {address?.city?.name} | ({address?.city?.code})
            </span>
          </li>

          <li className='flex items-center justify-between w-full'>
            <span>{t("Phone Number")}</span>
            <span>{address.phoneNumber}</span>
          </li>

          <li className='flex items-center justify-between w-full'>
            <span>{t("Details")}</span>
            <span>
              {address.streetName} / {address.streetNo}
            </span>
          </li>
        </ul>
        <Separator className='my-2' />
        <p className='italic'>{address.notes}</p>
      </CardContent>
    </Card>
  )
}
