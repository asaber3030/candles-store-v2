import Link from "next/link";
import { adminRoutes } from "@/shared/config/routes";
import { getTranslations } from "next-intl/server";
import { ImageIcon, Link2Icon, Settings2, TableIcon, UserIcon } from "lucide-react";

export default async function SettingsLayout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations();

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar (vertical tabs) */}
        <aside className="col-span-12 md:col-span-3">
          <div className="rounded-lg border bg-white">
            <nav className="flex md:flex-col divide-y md:divide-y-0 md:divide-x-0">
              <Link
                href={adminRoutes.accountSettings}
                className="md:block px-4 py-3 hover:bg-muted/40 border-b md:border-b-0 md:border-b-transparent flex gap-4"
              >
                <UserIcon className="inline-block mx-4 h-5 w-5 mb-1" />
                {t("Account Settings")}
              </Link>
              <Link href={adminRoutes.settings} className="md:block px-4 py-3 hover:bg-muted/40 border-b md:border-b-0 flex gap-4">
                <Settings2 className="inline-block mx-4 h-5 w-5 mb-1" />
                {t("General Settings")}
              </Link>
              <Link href={adminRoutes.popupSettings} className="md:block px-4 py-3 hover:bg-muted/40 border-b md:border-b-0 flex gap-4">
                <TableIcon className="inline-block mx-4 h-5 w-5 mb-1" />
                {t("Popup Settings")}
              </Link>
              <Link href={adminRoutes.bannerSettings} className="md:block px-4 py-3 hover:bg-muted/40 border-b md:border-b-0 flex gap-4">
                <ImageIcon className="inline-block mx-4 h-5 w-5 mb-1" />
                {t("Banner Settings")}
              </Link>
              <Link href={adminRoutes.pagesSettings} className="md:block px-4 py-3 hover:bg-muted/40 flex gap-4">
                <Link2Icon className="inline-block mx-4 h-5 w-5 mb-1" />
                {t("Pages Settings")}
              </Link>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="col-span-12 md:col-span-9">{children}</main>
      </div>
    </div>
  );
}
