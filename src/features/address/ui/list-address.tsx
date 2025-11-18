"use client"

import { useCurrentUserAddresses } from "@/entities/user/hooks/useUsers"
import { Badge } from "@/shared/components/ui/badge"
import { UpdateUserAddressModal } from "./update-modal"
import { DeleteModal } from "@/shared/components/common/delete-modal"
import { deleteUserAddressAction, restoreUserAddressAction } from "@/entities/user/api/user.api"
import { RestoreModal } from "@/shared/components/common/restore-modal"

export const ListUserAddresses = () => {
  const { addresses, isAddressesLoading } = useCurrentUserAddresses()

  return (
    <div className='space-y-3'>
      {isAddressesLoading ? (
        <p className='text-gray-500'>Loading addresses...</p>
      ) : addresses && addresses.length > 0 ? (
        <ul className='space-y-2'>
          {addresses.map((address) => (
            <li key={address.id} className='p-4 border rounded-lg shadow-sm bg-white'>
              <div className='space-y-1'>
                <p className='font-medium text-gray-800'>
                  {address.streetName} {address.streetNo} / <b>{address.phoneNumber}</b>
                </p>
                <p className='text-gray-600 text-sm'>
                  {address.city?.name}, {address.country?.name}
                </p>
                {address.notes && <p className='text-gray-500 text-sm italic'>Notes: {address.notes}</p>}

                <div className='flex justify-between mt-4 w-full items-center'>
                  {address.isDefault && (
                    <Badge variant='secondary' className='h-fit'>
                      Default
                    </Badge>
                  )}
                  {address.deletedAt && (
                    <Badge variant='destructive' className='h-fit'>
                      Deleted
                    </Badge>
                  )}

                  <div className='flex gap-2'>
                    <UpdateUserAddressModal address={address} />
                    {address.deletedAt ? <RestoreModal action={restoreUserAddressAction} id={address.id} /> : <DeleteModal action={deleteUserAddressAction} id={address.id} />}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-gray-500'>No addresses found.</p>
      )}
    </div>
  )
}
