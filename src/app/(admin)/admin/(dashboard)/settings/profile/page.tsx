import { UpdateUserInformationForm } from "@/features/auth/ui/update-information-form";
import { AdminProfileContainer } from "@/features/admin/settings/profile/container";
import { PageTitle } from "@/shared/components/common/page-title";
import { Metadata } from "next";

import { getCurrentUser } from "@/entities/auth/api/auth.api";
import { getTranslations } from "next-intl/server";
import { userRoutes } from "@/shared/config/routes";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin | Profile",
  description: "This is the profile page.",
};

export default async function ProfilePage() {
  const t = await getTranslations();
  const user = await getCurrentUser();

  if (!user) redirect(userRoutes.login);

  return (
    <div>
      <PageTitle title={t("Profile")} />
      <AdminProfileContainer>
        <h1 className="text-2xl font-bold mb-4">{t("Profile")}</h1>
        <UpdateUserInformationForm user={user} />
      </AdminProfileContainer>
    </div>
  );
}
