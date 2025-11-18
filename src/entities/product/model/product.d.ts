import z from "zod"
import { CreateProductSchema, CreateProductColorSchema, CreateProductReviewSchema, CreateProductSizeSchema } from "./product.schema"
import { ProductColor, ProductSize, Product, Category, ProductPicture, ProductReview, User } from "@prisma/client"

type TCreateProductPayload = z.infer<typeof CreateProductSchema>
type TCreateProductSizePayload = z.infer<typeof CreateProductSizeSchema>
type TCreateProductColorPayload = z.infer<typeof CreateProductColorSchema>
type TCreateProductReviewPayload = z.infer<typeof CreateProductReviewSchema>

type ProductWithCategory = Product & {
  category: Category
}

type FullProduct = ProductWithCategory & {
  sizes: ProductSize[]
  colors: ProductColor[]
  pictures: ProductPicture[]
  reviews: (ProductReview & { user: User })[]
}
