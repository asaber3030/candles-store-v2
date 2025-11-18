import { getCurrentUser } from "@/entities/auth/api/auth.api"

export default async function DeliveryDashboard() {
  const user = await getCurrentUser()
  return <div>{JSON.stringify(user)}</div>
}
