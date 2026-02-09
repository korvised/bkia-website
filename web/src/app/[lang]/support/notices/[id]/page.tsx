import { notFound } from "next/navigation";
import { Lang } from "@/types/language";
import { ImportantNoticeDetail } from "@/components/support/notice";
import { importantNotices } from "@/data/notice/important-notices";

interface NoticeDetailPageProps {
  params: Promise<{ lang: string; id: string }>;
}

export default async function NoticeDetailPage({
  params,
}: NoticeDetailPageProps) {
  const { lang, id } = await params;

  // Find the notice by ID
  const notice = importantNotices.find((n) => n.id === id);

  // If notice not found, show 404
  if (!notice) {
    notFound();
  }

  return <ImportantNoticeDetail lang={lang as Lang} notice={notice} />;
}
