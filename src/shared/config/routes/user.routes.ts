export const userRoutes = {
  home: "/",
  shop: "/products",
  login: "/login",
  register: "/register",
  about: "/about",
  contact: "/contact",
  favourites: "/favourites",
  offers: "/categories/offers",
  profile: {
    index: `/profile`,
    single: (section: "orders" | "addresses" | "settings" | "favourites") => `/profile/${section}`,
    viewOrder: (orderId: number) => `/profile/orders/${orderId}`,
  },
  categories: {
    index: `/categories`,
    single: (categoryId: number) => `/categories/${categoryId}`,
  },
  products: {
    index: `/products`,
    single: (productId: number) => `/products/${productId}`,
    viewBySlug: (slug: string) => `/products/${slug}`,
  },
  cart: `/cart`,
} as const;
