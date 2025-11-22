export const queryKeys = {
  currentUser: ["current-user"],
  settings: {
    single: (id: number) => ["admin", "settings", id]
  },
  products: {
    index: (sp: TObject = {}) => ["admin", "products", "paginated", sp],
    single: (id: number) => ["admin", "products", id],
    hasReview: (id: number) => ["admin", "products", id, "has-review"]
  },
  categories: {
    index: (sp: TObject = {}) => ["admin", "categories", "paginated", sp],
    all: (sp: TObject = {}) => ["admin", "categories", "all", sp],
    single: (id: number) => ["admin", "categories", id],
    products: (id: number, sp: TObject = {}) => ["admin", "categories", id, "products", sp]
  },
  coupons: {
    index: (sp: TObject = {}) => ["admin", "coupons", "paginated", sp],
    all: (sp: TObject = {}) => ["admin", "coupons", "all", sp],
    single: (id: number) => ["admin", "coupons", id]
  },
  countries: {
    index: (sp: TObject = {}) => ["admin", "countries", "paginated", sp],
    all: (sp: TObject = {}) => ["admin", "countries", "all", sp],
    single: (id: number) => ["admin", "countries", id],
    cities: (id: number) => ["admin", "countries", id, "cities"]
  },
  cities: {
    index: (sp: TObject = {}) => ["admin", "cities", "paginated", sp],
    all: (sp: TObject = {}) => ["admin", "cities", "all", sp],
    single: (id: number) => ["admin", "cities", id]
  },
  orders: {
    index: (sp: TObject = {}) => ["admin", "orders", "paginated", sp],
    single: (id: number) => ["admin", "orders", id],
    userOrders: (userId: number, sp: TObject = {}) => ["admin", "users", userId, "orders", sp],
    currentCompanyOrders: (sp: TObject = {}) => ["admin", "companies", "orders", sp]
  },
  cart: {
    current: (sp: TObject = {}) => ["admin", "cart", "current", sp],
    total: () => ["admin", "cart", "total"]
  },
  users: {
    index: (sp: TObject = {}) => ["admin", "users", "paginated", sp],
    all: (sp: TObject = {}) => ["admin", "users", "all", sp],
    single: (id: number) => ["admin", "users", id],
    userOrders: (userId: number, sp: TObject = {}) => ["admin", "users", userId, "orders", sp],
    userAddresses: (userId: number, sp: TObject = {}) => ["admin", "users", userId, "addresses"],
    currentUserAddresses: (sp: TObject = {}) => ["admin", "users", "current", "addresses"],
    userReviews: (userId: number, sp: TObject = {}) => ["admin", "users", userId, "reviews", sp]
  }
} as const
