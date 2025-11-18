import { deliveryRoutes } from "@/shared/config/routes/delivery.routes"

import { LoginForm } from "@/features/auth/ui/login-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Delivery Company Login"
}

export default function DeliveryCompanyLoginPage() {
  return (
    <div className='flex items-center justify-center h-screen p-4'>
      <div className='p-4 rounded-md shadow-md mx-auto bg-white w-4xl'>
        <img src='/defaults/icons/delivery.svg' className='mx-auto size-28 py-2' />
        <h1 className='text-3xl font-bold mb-6 text-center'>Login As Delivery Company</h1>
        <LoginForm hideForgetPassword={true} type='deliveryCompany' redirectUrl={deliveryRoutes.dashboard} />
      </div>
    </div>
  )
}
