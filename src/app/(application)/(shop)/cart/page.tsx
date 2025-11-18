import { DefaultContainer } from "@/shared/components/common/default-container"
import { ViewCartContainer } from "@/shared/components/widgets/user/cart/view-cart-container"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cart",
  description: "Your shopping cart"
}

export default async function CartPage() {
  return (
    <DefaultContainer>
      <ViewCartContainer />
    </DefaultContainer>
  )
}
