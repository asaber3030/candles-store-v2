"use client";

import localeConfig from "@/shared/config/services/locale.config";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

import { setCookie } from "cookies-next";

import { GlobeIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const handleChangeLanguage = () => {
    setCookie(localeConfig.cookieName, locale == "ar" ? "en" : "ar");
    router.refresh();
  };

  return (
    <div className="relative">
      <Button
        onClick={handleChangeLanguage}
        variant="outline"
        size="icon"
        icon={GlobeIcon}
        className="px-2 py-1 rounded-full border flex items-center gap-1 size-10"
      />
      <Badge variant="secondary" className="absolute -top-1 -right-1 size-5 rounded-full flex items-center text-xs justify-center">
        {locale.toUpperCase()}
      </Badge>
    </div>
  );
}
