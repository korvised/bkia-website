import type { Metadata } from "next";
import type { Lang } from "@/types/language";
import { createPackingI18n } from "@/data/i18n/services/packing";
import { PackingContent } from "./PackingContent";

interface Props {
  params: Promise<{ lang: Lang }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const { packing: t } = createPackingI18n(lang as Lang);
  return {
    title: t.metaTitle,
    description: t.metaDescription,
  };
}

export default async function PackingPage({ params }: Props) {
  const { lang } = await params;
  return <PackingContent lang={lang as Lang} />;
}
