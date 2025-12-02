import { AdminPopupViewer } from "@/features/admin/settings/popup/popup-viewer";
import { getPopupData } from "@/entities/popup/api/popup.api";
import { TogglePopupButton } from "@/features/admin/settings/popup/trigger-popup-image-button";
import { PopupForm } from "@/features/admin/settings/popup/update-popup-form";
import { NoDataLabel } from "@/shared/components/common/no-data-label";
import { PageTitle } from "@/shared/components/common/page-title";
import { getTranslations } from "next-intl/server";
import { AddImagePopupForm } from "@/features/admin/settings/popup/add-popup-image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";

export default async function PopupPage() {
  const t = await getTranslations();

  const popup = await getPopupData();
  if (!popup) return <NoDataLabel label={t("No Popup found!")} />;

  return (
    <div>
      <PageTitle title={t("Popup Settings")}>
        <TogglePopupButton status={popup.isActive} />
        <AddImagePopupForm />
      </PageTitle>

      <Tabs defaultValue="form">
        <TabsList>
          <TabsTrigger value="form">{t("Update Popup")}</TabsTrigger>
          <TabsTrigger value="view">{t("View Popup")}</TabsTrigger>
        </TabsList>
        <TabsContent value="form">
          <PopupForm popup={popup} />
        </TabsContent>
        <TabsContent value="view">
          <AdminPopupViewer popup={popup} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
