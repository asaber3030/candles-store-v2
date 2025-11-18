export const deliveryRoutes = {
  dashboard: "/delivery-companies",
  login: "/delivery-companies/login",
  profile: "/delivery-companies/profile",

  products: {
    index: "/delivery-companies/products",
    create: "/delivery-companies/products/create",
    view: (id: number) => `/delivery-companies/products/${id}`,
    update: (id: number) => `/delivery-companies/products/${id}/update`
  },
  categories: {
    index: "/delivery-companies/categories",
    create: "/delivery-companies/categories/create",
    edit: (id: number) => `/delivery-companies/categories/edit/${id}`,
    products: (id: number) => `/delivery-companies/categories/${id}/products`
  },
  admins: {
    index: "/delivery-companies/delivery-companiess",
    create: "/delivery-companies/delivery-companiess/create",
    edit: (id: number) => `/delivery-companies/delivery-companiess/edit/${id}`
  },
  orders: {
    index: "/delivery-companies/orders",
    details: (id: number) => `/delivery-companies/orders/${id}`
  },
  users: {
    index: "/delivery-companies/users",
    details: (id: number) => `/delivery-companies/users/${id}`
  },
  deliveryCompanies: {
    index: "/delivery-companies/delivery-companies",
    create: "/delivery-companies/delivery-companies/create",
    edit: (id: number) => `/delivery-companies/delivery-companies/edit/${id}`
  },
  coupons: {
    index: "/delivery-companies/coupons",
    create: "/delivery-companies/coupons/create",
    edit: (id: number) => `/delivery-companies/coupons/edit/${id}`
  },
  giftBoxes: {
    index: "/delivery-companies/gift-boxes",
    create: "/delivery-companies/gift-boxes/create",
    edit: (id: number) => `/delivery-companies/gift-boxes/edit/${id}`
  },
  countries: {
    index: "/delivery-companies/countries",
    create: "/delivery-companies/countries/create",
    edit: (id: number) => `/delivery-companies/countries/edit/${id}`
  },
  cities: {
    index: "/delivery-companies/cities",
    create: "/delivery-companies/cities/create",
    edit: (id: number) => `/delivery-companies/cities/edit/${id}`
  }
} as const
