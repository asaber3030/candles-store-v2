import { getLocale, getTranslations } from "next-intl/server";
import { getFullPageById } from "@/entities/page/api/page.api";
import { notFound } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { UpdateSectionForm } from "@/features/admin/settings/pages/update-section";
import { UpdatePageSEO } from "@/features/admin/settings/pages/update-seo";
import { PageTitle } from "@/shared/components/common/page-title";
import { cn } from "@/shared/lib/cn";

export const metadata = {
  title: "Page Settings",
};

export type Props = {
  params: Promise<{ pageId: string }>;
};

export default async function PageSettingsPage({ params }: Props) {
  const t = await getTranslations();
  const pageId = (await params).pageId;
  const page = await getFullPageById(+pageId);
  const locale = await getLocale();

  if (!page) notFound();
  if (isNaN(+pageId)) notFound();

  const title = (
    <>
      {t("Page Settings")} - <b className="capitalize font-extrabold">{page.name}</b>
    </>
  );

  return (
    <div>
      <PageTitle title={title} />

      <div className="space-y-4">
        <Tabs defaultValue="sections" className="w-full">
          <TabsList className={cn("w-full bg-white shadow-md border")}>
            <TabsTrigger className="hover:bg-gray-50" value="sections">
              {t("Sections")}
            </TabsTrigger>
            <TabsTrigger className="hover:bg-gray-50" value="seo">
              {t("SEO")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="seo">
            <UpdatePageSEO page={page} />
          </TabsContent>
          <TabsContent value="sections" className="space-y-4">
            {page.sections.map((section) => (
              <UpdateSectionForm key={section.id} section={section} translations={section.translations} />
            ))}

            {page.sections.length === 0 && <p className="text-center text-gray-500">No sections found</p>}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
