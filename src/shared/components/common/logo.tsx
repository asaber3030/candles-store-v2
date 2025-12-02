"use client";

import Link from "next/link";

import { useContext } from "react";

import { defaultPictures } from "@/shared/config/defaults";
import { cn } from "@/shared/lib/cn";

import { AppSettingsContext } from "@/shared/providers/settings.provider";

type Props = {
  href?: string;
  className?: string;
  logo?: string;
  width?: number;
  height?: number;
};

export default function AppLogo({ href = "/", logo, className, width = 500, height = 500 }: Props) {
  const settings = useContext(AppSettingsContext);
  const logoUrl = settings?.logo ? settings.logo : defaultPictures.logo;

  return (
    <Link href={href}>
      <img src={logoUrl} alt="Logo" className={cn("w-24", className)} width={width} height={height} />
    </Link>
  );
}
