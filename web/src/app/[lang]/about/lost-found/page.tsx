import type { Metadata } from "next";
import type { Lang } from "@/types/language";
import { createLostFoundI18n } from "@/data/i18n/about/lost-found";
import { getLostFoundStats } from "@/services/lost-found";
import { LostFoundPageContent } from "@/components/about/lost-found";

interface Props {
  params: Promise<{ lang: Lang }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = createLostFoundI18n(lang).lostFound;
  return { title: t.pageTitle, description: t.pageDescription };
}

export default async function LostFoundPage({ params }: Props) {
  const { lang } = await params;

  // Fetch stats server-side; fall back to zeros on error
  let stats = { total: 0, open: 0, matched: 0, returned: 0 };
  try {
    stats = await getLostFoundStats();
  } catch {
    // silently fall back — UI still renders with 0s
  }

  return <LostFoundPageContent lang={lang} stats={stats} />;
}
