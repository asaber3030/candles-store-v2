export const deliveryRoutes = {
  dashboard: "/delivery-companies",
  login: "/delivery-companies/login",
  profile: "/delivery-companies/profile",
  changePassword: "/delivery-companies/profile/update-password",

  orders: {
    index: "/delivery-companies/orders",
    delivered: "/delivery-companies/orders?status=Delivered",
    undelivered: "/delivery-companies/orders?notDelivered=yes",
    details: (id: number) => `/delivery-companies/orders/${id}`,
    withStatus: (status?: string) => (status ? `/admin/orders?status=${status}` : "/admin/orders")
  },
  users: {
    index: "/delivery-companies/users",
    details: (id: number) => `/delivery-companies/users/${id}`
  }
} as const
