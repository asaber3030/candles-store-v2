"use client";

import appConfig from "@/shared/config/defaults/app";

import Link from "next/link";

import { useLocale, useTranslations } from "next-intl";
import { useContext } from "react";

import { userRoutes } from "@/shared/config/routes";

import { Facebook, Instagram, Locate, MailIcon, MapPin, PhoneIcon } from "lucide-react";
import { AppSettingsContext } from "@/shared/providers/settings.provider";
import { DefaultContainer } from "@/shared/components/common/default-container";
import Image from "next/image";
import { SocialLogos } from "@/shared/config/defaults";

export function AppFooter() {
  const t = useTranslations();
  const settings = useContext(AppSettingsContext);
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-card border-t border-border">
      <DefaultContainer className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-12">
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t("footer.links")}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("Home")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("About")}
                </Link>
              </li>
              <li>
                <Link href={userRoutes.login} className="text-muted-foreground hover:text-primary transition-colors">
                  {t("Login")}
                </Link>
              </li>
              <li>
                <Link href={userRoutes.register} className="text-muted-foreground hover:text-primary transition-colors">
                  {t("Register")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">{settings?.siteName || appConfig.appName}</h4>
            <ul className="space-y-2">
              <li>
                <p className="text-muted-foreground text-sm">
                  {locale == "ar" ? settings?.arDescription || appConfig.appDescription : settings?.description || appConfig.appDescription}
                </p>
              </li>
              <li>
                <p className="text-muted-foreground text-sm flex gap-2 items-center">
                  <MailIcon className="size-4" /> {settings?.email || appConfig.defaultEmail}
                </p>
              </li>
              <li>
                <p className="text-muted-foreground text-sm flex gap-2 items-center">
                  <PhoneIcon className="size-4" /> {settings?.phoneNumber || appConfig.defaultNumber}
                </p>
              </li>
              <li>
                <p className="text-muted-foreground text-sm flex gap-2 items-center">
                  <MapPin className="size-4" /> {settings?.address || appConfig.defaultAddress}
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">{t("Follow Us")}</h4>
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-4">
              {settings?.instagram && (
                <a
                  target="_blank"
                  href={settings?.instagram || "#"}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Image src={SocialLogos.instagram} width={20} height={20} alt="Instagram" className="h-4 w-4" />
                  Instagram
                </a>
              )}

              {settings?.facebook && (
                <a
                  target="_blank"
                  href={settings?.facebook || "#"}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Image src={SocialLogos.facebook} width={20} height={20} alt="Instagram" className="h-4 w-4" />
                  Facebook
                </a>
              )}

              {settings?.twitter && (
                <a
                  target="_blank"
                  href={settings?.twitter || "#"}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Image src={SocialLogos.twitter} width={20} height={20} alt="Instagram" className="h-4 w-4" />
                  Twitter
                </a>
              )}

              {settings?.tiktok && (
                <a
                  target="_blank"
                  href={settings?.tiktok || "#"}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Image src={SocialLogos.tiktok} width={20} height={20} alt="Instagram" className="h-4 w-4" />
                  Tiktok
                </a>
              )}

              {settings?.youtube && (
                <a
                  target="_blank"
                  href={settings?.youtube || "#"}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Image src={SocialLogos.youtube} width={20} height={20} alt="Instagram" className="h-4 w-4" />
                  Youtube
                </a>
              )}

              {settings?.snapchat && (
                <a
                  target="_blank"
                  href={settings?.snapchat || "#"}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Image src={SocialLogos.snapchat} width={20} height={20} alt="Instagram" className="h-4 w-4" />
                  Snapchat
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {settings?.siteName || appConfig.appName}. {t("footer.copyright")}.
          </p>
        </div>
      </DefaultContainer>
    </footer>
  );
}
