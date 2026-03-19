import type { Metadata } from "next";
import type { Lang } from "@/types/language";
import { createProfileI18n } from "@/data/i18n/about/profile";
import { ProfileContent } from "@/components/about/profile";

interface ProfilePageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { lang } = await params;
  const { t } = createProfileI18n(lang as Lang);
  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { lang } = await params;
  return <ProfileContent lang={lang as Lang} />;
}
