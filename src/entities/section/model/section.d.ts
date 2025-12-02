import { Section, SectionTranslation } from "@prisma/client";

export type SectionListItem = {
  title: string;
  subTitle?: string;
  description: string;
  icon: string;
};

export type SectionList = SectionListItem[];

export type FullSection = Section & { translations: SectionTranslation[] };
