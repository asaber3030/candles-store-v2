"use server";

import prisma from "@/shared/api/prisma";

import { PageSEOSchema } from "../model/page.schema";
import { FullPage } from "../model/page";

import { getErrorMessage } from "@/shared/lib/functions";
import { actionResponse } from "@/shared/lib/api";
import { z } from "zod";
import { uploadToCloudinary } from "@/shared/api/cloudinary";

export async function getPage(id: number) {
  try {
    const page = await prisma.page.findUnique({
      where: { id },
      include: {
        seoList: true,
      },
    });
    return page;
  } catch (error) {
    return null;
  }
}

export async function getPageSEO(name: string) {
  try {
    const seo = await prisma.pageSEO.findMany({
      where: {
        page: {
          name,
        },
      },
    });
    return seo;
  } catch (error) {
    return [];
  }
}

export async function getFullPage(key: string) {
  try {
    const page = await prisma.page.findUnique({
      where: { name: key },
      include: {
        seoList: true,
        sections: {
          include: {
            translations: true,
          },
        },
      },
    });
    return page;
  } catch (error) {
    return null;
  }
}

export async function getFullPageById(id: number) {
  try {
    const page = await prisma.page.findUnique({
      where: { id },
      include: {
        seoList: true,
        _count: {
          select: { sections: true },
        },
        sections: {
          include: {
            translations: true,
          },
        },
      },
    });
    return page;
  } catch (error) {
    return null;
  }
}

export async function getFullSection(id: number) {
  try {
    const section = await prisma.section.findUnique({
      where: {
        id,
      },
      include: {
        translations: true,
      },
    });
    return section;
  } catch (error) {
    console.log(error);
    throw new Error(getErrorMessage(error, "Failed to get section"));
  }
}

export async function getPageTranslation(pageId: number, locale: string) {
  try {
    const translation = await prisma.pageSEO.findFirst({
      where: {
        pageId,
        locale,
      },
    });
    return translation;
  } catch (error) {
    console.log(error);
    throw new Error(getErrorMessage(error, "Failed to get page translation"));
  }
}

export async function getPages(): Promise<FullPage[]> {
  try {
    const pages = await prisma.page.findMany({
      include: {
        seoList: true,
        _count: {
          select: { sections: true },
        },
      },
      orderBy: { name: "asc" },
    });

    return pages;
  } catch (error) {
    console.log(error);
    throw new Error(getErrorMessage(error, "Failed to get pages"));
  }
}

export async function updatePageTranslationAction(pageId: number, data: z.infer<typeof PageSEOSchema>, image: File | null) {
  try {
    const en = prisma.pageSEO.findFirst({
      where: { pageId, locale: "en" },
    });
    const ar = prisma.pageSEO.findFirst({
      where: { pageId, locale: "en" },
    });

    const [enTranslation, arTranslation] = await Promise.all([en, ar]);

    let imageUrl = enTranslation?.ogImage || arTranslation?.ogImage || null;

    if (!enTranslation) {
      if (image) {
        imageUrl = (await uploadToCloudinary(image)).url;
      }
      await prisma.pageSEO.create({
        data: {
          ...data.en,
          ogImage: imageUrl,
          pageId,
          locale: "en",
        },
      });
    } else {
      if (image) imageUrl = (await uploadToCloudinary(image)).url;
      await prisma.pageSEO.update({
        where: { id: enTranslation.id },
        data: {
          ...data.en,
          ogImage: imageUrl,
        },
      });
    }

    if (!arTranslation) {
      if (image) imageUrl = (await uploadToCloudinary(image)).url;
      await prisma.pageSEO.create({
        data: {
          ...data.ar,
          ogImage: imageUrl,
          pageId,
          locale: "ar",
        },
      });
    } else {
      if (image) imageUrl = (await uploadToCloudinary(image)).url;
      await prisma.pageSEO.update({
        where: { id: arTranslation.id },
        data: {
          ...data.ar,
          ogImage: imageUrl,
        },
      });
    }
    return actionResponse({
      status: 200,
      message: "Page SEO updated successfully",
    });
  } catch (error) {
    console.log(error);
    return actionResponse({
      status: 500,
      message: "An error occurred while updating page SEO",
    });
  }
}

export async function getPageSections(pageId: number) {
  try {
    const sections = await prisma.section.findMany({
      where: { pageId },
      include: {
        translations: true,
      },
    });
    return sections;
  } catch (error) {
    console.log(error);
    throw new Error(getErrorMessage(error, "Failed to get page sections"));
  }
}

export async function getPageSectionsByName(name: string) {
  try {
    const sections = await prisma.section.findMany({
      where: { page: { name } },
      include: {
        translations: true,
      },
    });
    return sections;
  } catch (error) {
    console.log(error);
    throw new Error(getErrorMessage(error, "Failed to get page sections"));
  }
}

export async function getPageWithSEO(name: string) {
  try {
    const page = await prisma.page.findUnique({
      where: { name },
      include: { seoList: true },
    });
    return page;
  } catch (error) {
    console.log(error);
    throw new Error(getErrorMessage(error, "Failed to get page with seo"));
  }
}
