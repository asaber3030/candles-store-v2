"use client";

import AppLogo from "@/shared/components/common/logo";

import { useLocale, useTranslations } from "next-intl";
import { useFavouritesStore } from "@/features/favourites/model/favourite.store";
import { useCurrentUser } from "@/entities/auth/hooks/useAuth";
import { useContext } from "react";

import { userRoutes } from "@/shared/config/routes";
import { cn } from "@/shared/lib/cn";

import { NavbarUserDropdown } from "./user-dropdown";
import { AppSettingsContext } from "@/shared/providers/settings.provider";
import { NavbarGuestLinks } from "./navbar-guest-links";
import { DefaultContainer } from "@/shared/components/common/default-container";
import { LanguageSwitcher } from "@/shared/components/common/language-switcher";
import { NavbarItem } from "./navbar-item";
import { CartDrawer } from "@/features/cart/ui/drawer";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { LinkBtn } from "@/shared/components/common/link-button";
import { HeartIcon } from "lucide-react";
import { NavbarItems } from "@/shared/config/defaults";
import { NavbarSearch } from "./search-bar";

export const AppNavbar = () => {
  const settings = useContext(AppSettingsContext);
  const locale = useLocale();
  const t = useTranslations();

  const { user, isUserLoading } = useCurrentUser();
  const { favourites } = useFavouritesStore();

  return (
    <nav className="w-full border-b py-2 shadow-md bg-white hidden xl:block">
      <DefaultContainer className="flex items-center px-4 gap-4 justify-between ">
        <AppLogo logo={settings?.logo} />

        <ul className="flex gap-2 items-center list-none">
          {NavbarItems.map((item) => (
            <NavbarItem key={item.href} url={item.href} label={t(item.name)} />
          ))}
          <NavbarSearch />
        </ul>

        <div className="flex gap-2 items-center">
          <LanguageSwitcher />
          <div className={cn("relative")}>
            <LinkBtn href={userRoutes.favourites} size="icon" icon={HeartIcon} variant="destructive" className="size-10 rounded-full text-white" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {favourites.length}
            </span>
          </div>

          <CartDrawer />

          {isUserLoading ? (
            <LoadingButtons />
          ) : !user ? (
            <div className={cn("px-2 space-x-2", locale == "ar" ? "border-r" : "border-l")}>
              <NavbarGuestLinks />
            </div>
          ) : (
            <div className={cn("px-2 space-x-2", locale == "ar" ? "border-r" : "border-l")}>
              <NavbarUserDropdown />
            </div>
          )}
        </div>
      </DefaultContainer>
    </nav>
  );
};

const LoadingButtons = () => {
  return (
    <div className="px-2 border-l space-x-2 flex gap-2">
      <Skeleton className="w-22 h-9" />
      <Skeleton className="w-26 h-9" />
    </div>
  );
};
