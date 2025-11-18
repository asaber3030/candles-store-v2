"use client"

import { useUserAddresses } from "@/entities/user/hooks/useUsers"
import { FullUser } from "@/entities/user/model/user"
import { NoDataLabel } from "@/shared/components/common/no-data-label"
import { Badge } from "@/shared/components/ui/badge"
import { getRoleLabel, getRoleVariant } from "@/shared/lib/functions"
import { useTranslations } from "next-intl"
import { UserOrdersTable } from "./orders-table"

type Props = {
  user: FullUser
  searchParams: TObject
}

export const AdminViewUser = ({ searchParams, user }: Props) => {
  const t = useTranslations()

  const { addresses, isAddressesLoading } = useUserAddresses(user.id)

  console.log({ addresses })

  return (
    <div className='space-y-4'>
      <div>
        <div className='flex justify-between items-center'>
          <p className='text-lg font-bold'>{t("User Information")}</p>
          <Badge variant={getRoleVariant(user.role) as any}>{getRoleLabel(user.role)}</Badge>
        </div>
        <ul className='p-4 rounded-md border bg-white shadow-md divide-y space-y-2'>
          <li className='flex justify-between items-center'>
            <span>{t("ID")}:</span>
            <span className='font-semibold'>{user.id}</span>
          </li>
          <li className='flex justify-between items-center'>
            <span>{t("Name")}:</span>
            <span className='font-semibold'>{user.name}</span>
          </li>
          <li className='flex justify-between items-center'>
            <span>{t("Country / City")}:</span>
            <span className='font-semibold'>
              {user.country.name}({user.country.code}) / {user.city.name}({user.city.code})
            </span>
          </li>
          <li className='flex justify-between items-center'>
            <span>{t("Phone Number")}:</span>
            <span className='font-semibold'>{user.phoneNumber}</span>
          </li>
          <li className='flex justify-between items-center'>
            <span>{t("Email")}:</span>
            <span className='font-semibold'>{user.email}</span>
          </li>
          <li className='flex justify-between items-center'>
            <span>{t("Created At")}:</span>
            <span className='font-semibold'>{new Date(user.createdAt).toLocaleDateString()}</span>
          </li>
        </ul>
      </div>

      <div>
        <p className='text-lg font-bold'>{t("User Addresses")}</p>
        <div className='grid grid-cols-3 gap-4'>
          {isAddressesLoading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {addresses && addresses.length > 0 ? (
                <div>
                  {addresses.map((address) => (
                    <ul key={`address-user-${address.id}`} className='border p-4 rounded-md divide-y space-y-2 bg-white shadow-md'>
                      <li className='flex justify-between items-center mb-2'>
                        <span className='font-semibold'>{t("Street Name / Street No")}</span>
                        <span>
                          {address.streetName} / {address.streetNo}
                        </span>
                      </li>
                      <li className='flex justify-between items-center mb-2'>
                        <span className='font-semibold'>{t("Phone Number")}</span>
                        <span>{address.phoneNumber}</span>
                      </li>
                      <li className='flex justify-between items-center mb-2'>
                        <span className='font-semibold'>{t("Country / City")}</span>
                        <span>{`${address.country.name} (${address.country.code}) / ${address.city.name}(${address.city.code})`}</span>
                      </li>
                      <li className='flex justify-between items-center mb-2'>
                        <span className='font-semibold'>{t("Is Default Address")}</span>
                        <span>
                          <Badge variant={address.isDefault ? "success" : "default"}>{address.isDefault ? "Yes" : "No"}</Badge>
                        </span>
                      </li>
                      <p>{address.notes}</p>
                    </ul>
                  ))}
                </div>
              ) : (
                <NoDataLabel label={t("No addresses found")} />
              )}
            </div>
          )}
        </div>
      </div>

      <div>
        <p className='text-lg font-bold'>{t("User Orders")}</p>
        <UserOrdersTable searchParams={searchParams} />
      </div>
    </div>
  )
}
