import * as z from "zod";

export const PageSEOSchema = z.object({
  en: z.object({
    title: z.string("Required").min(1, { message: "Title is required" }),
    description: z.string("Required").min(1, { message: "Description is required" }),
    keywords: z.string("Required").min(1, { message: "Keywords is required" }),
    ogTitle: z.string("Required").min(1, { message: "OG Title is required" }),
    ogDescription: z.string("Required").min(1, { message: "OG Description is required" }),
    ogType: z.string("Required").min(1, { message: "OG Type is required" }),
    ogSiteName: z.string("Required").min(1, { message: "OG Site Name is required" }),
  }),
  ar: z.object({
    title: z.string("Required").min(1, { message: "Title is required" }),
    description: z.string("Required").min(1, { message: "Description is required" }),
    keywords: z.string("Required").min(1, { message: "Keywords is required" }),
    ogTitle: z.string("Required").min(1, { message: "OG Title is required" }),
    ogDescription: z.string("Required").min(1, { message: "OG Description is required" }),
    ogType: z.string("Required").min(1, { message: "OG Type is required" }),
    ogSiteName: z.string("Required").min(1, { message: "OG Site Name is required" }),
  }),
});
