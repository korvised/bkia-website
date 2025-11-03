import { notFound } from "next/navigation";
import { Lang } from "@/types/language";
import { InformationNoticeDetail } from "@/components/notice";
import { informationNotices } from "@/data/notice/information-notices";

interface InformationDetailPageProps {
  params: Promise<{ lang: string; id: string }>;
}

export default async function InformationDetailPage({
  params,
}: InformationDetailPageProps) {
  const { lang, id } = await params;

  // Find the notice by ID
  const notice = informationNotices.find((n) => n.id === id);

  // If notice not found, show 404
  if (!notice) {
    notFound();
  }

  return <InformationNoticeDetail lang={lang as Lang} notice={notice} />;
}
