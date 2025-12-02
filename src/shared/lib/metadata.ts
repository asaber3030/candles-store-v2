import { Page, PageSEO } from "@prisma/client";
import { Metadata } from "next";
import { defaultPictures } from "../config/defaults";
import { toTitleCase } from "./strings";

export const defaultMetadata = {
  title: "Sharkia Candles",
  description: "Sharkia Candles",
  keywords: "Sharkia Candles",
  openGraph: {
    title: "Sharkia Candles",
    description: "Sharkia Candles",
    type: "website",
    siteName: "Sharkia Candles",
    images: [
      {
        url: defaultPictures.logo,
        width: 1200,
        height: 630,
        alt: "Sharkia Candles",
      },
    ],
  },
};

export function generatePageMetadata(seo: PageSEO | null | undefined, page: Page | null | undefined) {
  return {
    title: seo?.title || defaultMetadata.title,
    description: seo?.description || defaultMetadata.description,
    keywords: seo?.keywords || defaultMetadata.keywords,
    openGraph: {
      title: seo?.ogTitle ?? defaultMetadata.title,
      description: seo?.ogDescription ?? defaultMetadata.description,
      type: seo?.ogType || defaultMetadata.openGraph?.type,
      siteName: seo?.ogSiteName || defaultMetadata.openGraph?.siteName,
      images: [
        {
          url: seo?.ogImage || defaultPictures.logo,
          width: 1200,
          height: 630,
          alt: seo?.ogTitle || defaultMetadata.title,
        },
      ],
    },
  };
}
