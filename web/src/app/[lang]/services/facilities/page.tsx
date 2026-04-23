import type { Metadata } from "next";
import type { Lang } from "@/types/language";
import { createDepartureGuideI18n } from "@/data/i18n/guides";
import { FacilitiesContent } from "./FacilitiesContent";

interface Props {
  params: Promise<{ lang: Lang }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const { facilities: t } = createDepartureGuideI18n(lang);
  return {
    title:       t.title,
    description: t.subtitle,
  };
}

export default async function AirportFacilitiesPage({ params }: Props) {
  const { lang } = await params;
  return <FacilitiesContent lang={lang} />;
}
