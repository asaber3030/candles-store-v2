export const adminRoutes = {
  dashboard: "/admin",
  login: "/admin/login",
  profile: "/admin/profile",
  changePassword: "/admin/profile/update-password",
  settings: "/admin/settings",
  products: {
    index: "/admin/products",
    create: "/admin/products/create",
    view: (id: number) => `/admin/products/${id}`,
    update: (id: number) => `/admin/products/${id}/update`
  },
  categories: {
    index: "/admin/categories",
    create: "/admin/categories/create",
    edit: (id: number) => `/admin/categories/edit/${id}`,
    products: (id: number) => `/admin/categories/${id}/products`
  },
  admins: {
    index: "/admin/admins",
    create: "/admin/admins/create",
    edit: (id: number) => `/admin/admins/edit/${id}`
  },
  orders: {
    index: "/admin/orders",
    details: (id: number) => `/admin/orders/${id}`,
    undelivered: "/admin/orders/undelivered",
    unassigned: "/admin/orders/unassigned",
    withStatus: (status?: string) => (status ? `/admin/orders?status=${status}` : "/admin/orders")
  },
  users: {
    index: "/admin/users",
    details: (id: number) => `/admin/users/${id}`
  },
  deliveryCompanies: {
    index: "/admin/delivery-companies",
    create: "/admin/delivery-companies/create",
    edit: (id: number) => `/admin/delivery-companies/edit/${id}`
  },
  coupons: {
    index: "/admin/coupons",
    create: "/admin/coupons/create",
    edit: (id: number) => `/admin/coupons/edit/${id}`
  },
  giftBoxes: {
    index: "/admin/gift-boxes",
    create: "/admin/gift-boxes/create",
    edit: (id: number) => `/admin/gift-boxes/edit/${id}`
  },
  countries: {
    index: "/admin/countries",
    create: "/admin/countries/create",
    edit: (id: number) => `/admin/countries/edit/${id}`
  },
  cities: {
    index: "/admin/cities",
    create: "/admin/cities/create",
    edit: (id: number) => `/admin/cities/edit/${id}`
  }
} as const
