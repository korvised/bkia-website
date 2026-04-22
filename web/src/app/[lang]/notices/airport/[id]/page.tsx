import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Lang } from "@/types/language";
import {
  NoticeDetail,
  NoticeDetailSkeleton,
} from "@/components/support/notice";
import { getNoticeById } from "@/services/notice";

interface NoticeDetailPageProps {
  params: Promise<{ lang: string; id: string }>;
}

export async function generateMetadata({
  params,
}: NoticeDetailPageProps): Promise<Metadata> {
  const { lang, id } = await params;

  try {
    const notice = await getNoticeById(id);

    return {
      title: notice?.title[lang as Lang],
      description: notice?.description[lang as Lang],
    };
  } catch {
    return {
      title: "Notice Not Found | Bokeo International Airport",
    };
  }
}

async function NoticeDetailContent({ lang, id }: { lang: Lang; id: string }) {
  const notice = await getNoticeById(id);

  if (!notice) {
    notFound();
  }

  return <NoticeDetail lang={lang} notice={notice} />;
}

export default async function NoticeDetailPage({
  params,
}: NoticeDetailPageProps) {
  const { lang, id } = await params;

  return (
    <Suspense fallback={<NoticeDetailSkeleton />}>
      <NoticeDetailContent lang={lang as Lang} id={id} />
    </Suspense>
  );
}
