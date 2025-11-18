"use client"

import { useCountry } from "@/entities/country/hooks/useCountry"
import { NoDataLabel } from "@/shared/components/common/no-data-label"
import { TooltipButton } from "@/shared/components/common/tooltip-button"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import { Country } from "@prisma/client"
import { Building2 } from "lucide-react"
import { useTranslations } from "next-intl"

type Props = {
  country: Country
}

export const CountryCitiesModal = ({ country }: Props) => {
  const t = useTranslations()

  const { country: data, isCountryLoading } = useCountry(country.id)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TooltipButton tooltip={t("View Cities")} size='icon' icon={Building2} variant='indigo' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("Cities Of", { name: data?.name || "Loading..." })}</DialogTitle>
        </DialogHeader>

        {data?.cities && data.cities.length === 0 ? (
          <NoDataLabel label={t("No Cities Found")} />
        ) : (
          <div className='grid grid-cols-4 gap-2'>
            {data?.cities?.map((city) => (
              <div className='border p-4 rounded-md text-center text-sm h-fit' key={`city-item-${city.id}`}>
                <p>
                  {city.name} - {city.code}
                </p>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
