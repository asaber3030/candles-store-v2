import AppLogo from "@/shared/components/common/logo";
import Link from "next/link";

import { getTranslations } from "next-intl/server";

import { DefaultContainer } from "@/shared/components/common/default-container";
import { Metadata } from "next";
import { userRoutes } from "@/shared/config/routes";
import { RegisterForm } from "@/features/auth/ui/register-form";

import { getPageWithSEO } from "@/entities/page/api/page.api";
import { defaultMetadata, generatePageMetadata } from "@/shared/lib/metadata";
import { getLocale } from "next-intl/server";

export async function generateMetadata() {
  const locale = await getLocale();
  const page = await getPageWithSEO("login");
  const seo = page?.seoList?.find((seo) => seo.locale === locale);
  if (!page || !seo) return defaultMetadata;
  return generatePageMetadata(seo, page);
}

export default async function RegisterPage() {
  const t = await getTranslations();

  return (
    <DefaultContainer className="py-10">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md border border-gray-200">
        <AppLogo className="mx-auto mb-4 w-32 h-32" />
        <h1 className="text-2xl font-semibold text-center mb-6">{t("Create New Account")}</h1>
        <RegisterForm />
        <Link href={userRoutes.login} className="block text-center mt-4 text-primary hover:underline">
          {t("Already have an account? Login")}
        </Link>
      </div>
    </DefaultContainer>
  );
}
