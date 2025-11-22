"use client"

import { formatCurrency } from "@/shared/lib/numbers"
import { useTranslations } from "next-intl"

type Props = {
  totalIncoming: number | null
  totalEarned: number | null
}

export const DeliveryEarningCards = ({ totalIncoming = 0, totalEarned = 0 }: Props) => {
  const t = useTranslations()

  return (
    <div>
      <div className='flex justify-between gap-10 items-center p-4 rounded-md shadow-sm bg-white'>
        <div>
          <p className='flex text-gray-500 text-sm gap-2 items-center before:w-4 before:h-4 before:bg-yellow-500 before:rounded-full before:block'>{t("Total Incoming")}</p>
          <p className='font-bold text-xl ml-6'>{formatCurrency(totalIncoming || 0)}</p>
        </div>

        <div>
          <p className='flex text-gray-500 text-sm gap-2 items-center before:w-4 before:h-4 before:bg-green-200 before:rounded-full before:block'>{t("Total Earned")}</p>
          <p className='font-bold text-xl ml-6'>{formatCurrency(totalEarned || 0)}</p>
        </div>
      </div>
    </div>
  )
}
