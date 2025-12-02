import { Page, PageSEO } from "@prisma/client";

export type FullPage = Page & {
  seoList: PageSEO[];
  _count: {
    sections: number;
  };
};
