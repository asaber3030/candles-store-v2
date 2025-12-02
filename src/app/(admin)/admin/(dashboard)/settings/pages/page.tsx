import { getTranslations } from "next-intl/server";

import { PageTitle } from "@/shared/components/common/page-title";
import { PagesTable } from "@/features/admin/settings/pages/table";

export const metadata = {
  title: "Pages Settings",
};

export default async function PagesSettingsPage() {
  const t = await getTranslations();

  return (
    <div>
      <PageTitle title={t("Pages Settings")}></PageTitle>

      <div className="space-y-4">
        <PagesTable />
      </div>
    </div>
  );
}
