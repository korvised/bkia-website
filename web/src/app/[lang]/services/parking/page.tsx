import type { Metadata } from "next";
import type { Lang } from "@/types/language";
import { createParkingI18n } from "@/data/i18n/services/parking";
import { ParkingContent } from "./ParkingContent";

interface Props {
  params: Promise<{ lang: Lang }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const { parking: t } = createParkingI18n(lang as Lang);
  return {
    title: t.metaTitle,
    description: t.metaDescription,
  };
}

export default async function ParkingPage({ params }: Props) {
  const { lang } = await params;
  return <ParkingContent lang={lang as Lang} />;
}
