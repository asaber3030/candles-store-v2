import z from "zod";
import { CreateProductSchema, CreateProductColorSchema, CreateProductReviewSchema, CreateProductSizeSchema } from "./product.schema";
import { ProductColor, ProductSize, Product, Category, ProductPicture, ProductReview, User, ProductAttribute } from "@prisma/client";
import { TDefaultUser } from "@/entities/auth/model/auth";

type TCreateProductPayload = z.infer<typeof CreateProductSchema>;
type TCreateProductSizePayload = z.infer<typeof CreateProductSizeSchema>;
type TCreateProductColorPayload = z.infer<typeof CreateProductColorSchema>;
type TCreateProductReviewPayload = z.infer<typeof CreateProductReviewSchema>;

type ProductWithCategory = Product & {
  category: Category;
};

type FullProduct = ProductWithCategory & {
  sizes: ProductSize[];
  colors: ProductColor[];
  attributes: ProductAttribute[];
  pictures: ProductPicture[];
  reviews: (ProductReview & { user: TDefaultUser })[];
};
