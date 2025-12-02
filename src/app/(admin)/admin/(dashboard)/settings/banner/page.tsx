import { getTranslations } from "next-intl/server";
import { getBannerImages } from "@/entities/banner/api/banner.api";

import { CreateBannerImageModal } from "@/features/admin/settings/banner/add-banner-image-modal";
import { AdminBannerImagesList } from "@/features/admin/settings/banner/images-list";
import { NoDataLabel } from "@/shared/components/common/no-data-label";
import { PageTitle } from "@/shared/components/common/page-title";

export default async function PopupPage() {
  const t = await getTranslations();
  const images = await getBannerImages();

  return (
    <div>
      <PageTitle title={t("Banner Settings")}>
        <CreateBannerImageModal />
      </PageTitle>
      {images.length === 0 ? <NoDataLabel label={t("No Banner Images found!")} /> : <AdminBannerImagesList images={images} />}
    </div>
  );
}
