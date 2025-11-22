import { getCurrentUserAddresses, getCurrentUserDefaultAddress } from "@/entities/user/api/user.api"
import { getCurrentUser } from "@/entities/auth/api/auth.api"
import { redirect } from "next/navigation"

import { DefaultContainer } from "@/shared/components/common/default-container"
import { Metadata } from "next"
import { CartItemsTable } from "@/shared/components/widgets/cart/cart-items-table"
import { CheckoutHandler } from "@/features/checkout/ui/checkout-handler"

export const metadata: Metadata = {
  title: "Checkout",
  description: "Proceed to checkout and complete your purchase."
}

export default async function CheckoutPage() {
  const user = await getCurrentUser()
  if (!user) redirect("/login?redirect=/checkout")

  const addresses = await getCurrentUserAddresses()
  const defaultAddress = await getCurrentUserDefaultAddress()

  return (
    <DefaultContainer className='py-8'>
      <div className='grid xl:grid-cols-7 grid-cols-1 gap-6'>
        <div className='xl:col-span-3'>
          <CheckoutHandler addresses={addresses} defaultAddress={defaultAddress} />
        </div>
        <div className='xl:col-span-4'>
          <CartItemsTable />
        </div>
      </div>
    </DefaultContainer>
  )
}
7
