import * as z from "zod";

export const CreateProductSchema = z.object({
  name: z.string("Required").min(1, { message: "Name is required" }).max(5000, { message: "Cannot be more than 5000 characters" }),
  nameAr: z.string("Required").min(1, { message: "Arabic Name is required" }).max(5000, { message: "Cannot be more than 5000 characters" }),
  description: z.string("Required").min(1, { message: "Description is required" }).max(2048, { message: "Cannot be more than 2048 characters" }),
  descriptionAr: z.string("Required").min(1, { message: "Arabic Description is required" }).max(2048, { message: "Cannot be more than 2048 characters" }),
  longDescription: z.string("Required").min(1, { message: "Long description is required" }),
  price: z.number("Required").min(1),
  offerPrice: z.number("Required").min(1),
  categoryId: z.number("Required").nonoptional("Category is required"),
  quantity: z.number("Required").min(0),
});

export const CreateProductColorSchema = z.object({
  color: z.string().min(1, { message: "Color is required" }),
});

export const CreateProductSizeSchema = z.object({
  label: z.string().min(1, { message: "Label is required" }),
  isCircle: z.boolean().optional(),
  radius: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  length: z.number().optional(),
  price: z.number().min(0),
});

export const CreateProductAttributeSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(100, { message: "Cannot be more than 100 characters" }),
  nameAr: z.string().min(1, { message: "Arabic Name is required" }).max(100, { message: "Cannot be more than 100 characters" }),
  value: z.string().min(1, { message: "Value is required" }).max(255, { message: "Cannot be more than 255 characters" }),
  valueAr: z.string().min(1, { message: "Arabic Value is required" }).max(255, { message: "Cannot be more than 255 characters" }),
});

export const CreateProductReviewSchema = z.object({
  rate: z.number().min(1, { message: "Rating is required" }).max(5, { message: "Rating cannot be more than 5" }),
  review: z.string().min(1, { message: "Review is required" }).max(1000, { message: "Review cannot be more than 1000 characters" }),
});
