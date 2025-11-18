import { LoginForm } from "@/features/auth/ui/login-form"
import { adminRoutes } from "@/shared/config/routes"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Login"
}

export default function AdminLoginPage() {
  return (
    <div className='flex items-center justify-center h-screen p-4'>
      <div className='p-4 rounded-md shadow-md mx-auto bg-white w-4xl'>
        <img src='/defaults/icons/security2.svg' className='mx-auto size-28 py-2' />
        <h1 className='text-3xl font-bold mb-6 text-center'>Login As Admin</h1>
        <LoginForm hideForgetPassword={true} type='admin' redirectUrl={adminRoutes.dashboard} />
      </div>
    </div>
  )
}
