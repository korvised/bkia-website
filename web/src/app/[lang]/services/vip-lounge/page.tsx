import type { Metadata } from "next";
import type { Lang } from "@/types/language";
import { createVipLoungeI18n } from "@/data/i18n/services/vip-lounge";
import { VipLoungeContent } from "./VipLoungeContent";

interface Props {
  params: Promise<{ lang: Lang }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const { vipLounge: t } = createVipLoungeI18n(lang as Lang);
  return {
    title: t.metaTitle,
    description: t.metaDescription,
  };
}

export default async function VipLoungePage({ params }: Props) {
  const { lang } = await params;
  return <VipLoungeContent lang={lang as Lang} />;
}
