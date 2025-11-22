export const deliveryRoutes = {
  dashboard: "/delivery-companies",
  login: "/delivery-companies/login",
  profile: "/delivery-companies/profile",
  changePassword: "/delivery-companies/profile/update-password",

  orders: {
    index: "/delivery-companies/orders",
    details: (id: number) => `/delivery-companies/orders/${id}`
  },
  users: {
    index: "/delivery-companies/users",
    details: (id: number) => `/delivery-companies/users/${id}`
  }
} as const
