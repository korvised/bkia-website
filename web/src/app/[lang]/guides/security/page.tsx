import { Lang } from "@/types/language";
import { AirportSecurity } from "@/components/guides/security";
import { Metadata } from "next";
import { createDepartureGuideI18n } from "@/data/i18n/guide";

interface SecurityPageProps {
  params: Promise<{ lang: Lang }>;
}

export async function generateMetadata({
  params,
}: SecurityPageProps): Promise<Metadata> {
  const { lang } = await params;
  const { airportSecurity: t } = createDepartureGuideI18n(lang);

  return {
    title: t.title,
    description: t.intro,
  };
}

interface AirportSecurityPageProps {
  params: Promise<{ lang: Lang }>;
}

export default async function AirportSecurityPage({
  params,
}: AirportSecurityPageProps) {
  const { lang } = await params;

  return <AirportSecurity lang={lang} />;
}
