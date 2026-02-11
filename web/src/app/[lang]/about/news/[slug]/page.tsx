import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Lang } from "@/types/language";
import { NewsDetail, NewsDetailSkeleton } from "@/components/about";
import { getNewsBySlug } from "@/services/news";

interface NewsDetailPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { lang, slug } = await params;

  try {
    const news = await getNewsBySlug(slug);

    if (!news) {
      return {
        title: "News Not Found | Bokeo International Airport",
      };
    }

    return {
      title: news.title[lang as Lang],
      description:
        news.metaDescription?.[lang as Lang] || news.excerpt[lang as Lang],
    };
  } catch {
    return {
      title: "News Not Found | Bokeo International Airport",
    };
  }
}

async function NewsDetailContent({ lang, slug }: { lang: Lang; slug: string }) {
  const news = await getNewsBySlug(slug);

  if (!news) {
    notFound();
  }

  return <NewsDetail lang={lang} news={news} />;
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { lang, slug } = await params;

  return (
    <Suspense fallback={<NewsDetailSkeleton />}>
      <NewsDetailContent lang={lang as Lang} slug={slug} />
    </Suspense>
  );
}
