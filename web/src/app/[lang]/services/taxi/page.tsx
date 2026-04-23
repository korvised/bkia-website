import type { Metadata } from "next";
import type { Lang } from "@/types/language";
import { createTaxiI18n } from "@/data/i18n/services/taxi";
import { TaxiContent } from "./TaxiContent";

interface Props {
  params: Promise<{ lang: Lang }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const { taxi: t } = createTaxiI18n(lang as Lang);
  return {
    title: t.metaTitle,
    description: t.metaDescription,
  };
}

export default async function TaxiPage({ params }: Props) {
  const { lang } = await params;
  return <TaxiContent lang={lang as Lang} />;
}
