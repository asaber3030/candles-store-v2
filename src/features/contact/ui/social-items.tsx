"use client"

import Image from "next/image"

import { useContext } from "react"
import { useLocale } from "next-intl"

import { AppSettingsContext } from "@/shared/providers/settings.provider"
import { FullSection } from "@/entities/section/model/section"
import { SocialLogos } from "@/shared/config/defaults"

export function ContactSocialLinks({ section }: { section: FullSection }) {
  const locale = useLocale()
  const settings = useContext(AppSettingsContext)
  const usedTranslation = section.translations.find((translation) => translation.locale === locale)

  if (!usedTranslation) return null

  return (
    <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-20 md:py-28 px-4 bg-white border-t border-b">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center">{usedTranslation.title}</h2>
        <p className="text-center text-muted-foreground mb-16 text-lg max-w-2xl mx-auto">{usedTranslation.content}</p>

        <div className="flex flex-wrap justify-center gap-6">
          {settings?.facebook && (
            <a
              key={settings.facebook + `-social-item-facebook`}
              href={settings.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-16 h-16 rounded-full bg-card border border-border hover:bg-primary hover:border-primary transition-all duration-300"
            >
              <Image src={SocialLogos.facebook} width={50} height={50} className="w-7 h-7 text-muted-foreground group-hover:text-primary-foreground transition-colors" alt={"Facebook"} />
            </a>
          )}

          {settings?.twitter && (
            <a
              key={settings.twitter + `-social-item-twitter`}
              href={settings.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-16 h-16 rounded-full bg-card border border-border hover:bg-primary hover:border-primary transition-all duration-300"
            >
              <Image src={SocialLogos.twitter} width={50} height={50} className="w-7 h-7 text-muted-foreground group-hover:text-primary-foreground transition-colors" alt={"Twitter"} />
            </a>
          )}

          {settings?.instagram && (
            <a
              key={settings.instagram + `-social-item-instagram`}
              href={settings.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-16 h-16 rounded-full bg-card border border-border hover:bg-primary hover:border-primary transition-all duration-300"
            >
              <Image src={SocialLogos.instagram} width={50} height={50} className="w-7 h-7 text-muted-foreground group-hover:text-primary-foreground transition-colors" alt={"Instagram"} />
            </a>
          )}

          {settings?.snapchat && (
            <a
              key={settings.snapchat + `-social-item-snapchat`}
              href={settings.snapchat}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-16 h-16 rounded-full bg-card border border-border hover:bg-primary hover:border-primary transition-all duration-300"
            >
              <Image src={SocialLogos.snapchat} width={50} height={50} className="w-7 h-7 text-muted-foreground group-hover:text-primary-foreground transition-colors" alt={"Snapchat"} />
            </a>
          )}

          {settings?.tiktok && (
            <a
              key={settings.tiktok + `-social-item-tiktok`}
              href={settings.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-16 h-16 rounded-full bg-card border border-border hover:bg-primary hover:border-primary transition-all duration-300"
            >
              <Image src={SocialLogos.tiktok} width={50} height={50} className="w-7 h-7 text-muted-foreground group-hover:text-primary-foreground transition-colors" alt={"Tiktok"} />
            </a>
          )}

          {settings?.youtube && (
            <a
              key={settings.youtube + `-social-item-youtube`}
              href={settings.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-16 h-16 rounded-full bg-card border border-border hover:bg-primary hover:border-primary transition-all duration-300"
            >
              <Image src={SocialLogos.youtube} width={50} height={50} className="w-7 h-7 text-muted-foreground group-hover:text-primary-foreground transition-colors" alt={"Youtube"} />
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
