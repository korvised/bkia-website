import { Suspense } from "react";
import type { Metadata } from "next";
import { Lang } from "@/types/language";
import { NewsFilters, NewsList } from "@/components/support";
import { listNews, toNewsQuery } from "@/services/news";
import type { NewsPageProps, QueryNews } from "@/types/news";
import { createNewsI18n } from "@/data/i18n/support";

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = createNewsI18n(lang as Lang).news;

  return {
    title: t.pageTitle,
    description: t.pageDescription,
  };
}

function NewsListSkeleton() {
  return (
    <div className="container space-y-8 py-8">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-10 w-64 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-6 w-96 animate-pulse rounded-lg bg-gray-200" />
      </div>

      {/* Filters skeleton */}
      <div className="space-y-4">
        <div className="h-12 w-full max-w-xl animate-pulse rounded-lg bg-gray-200" />
        <div className="flex gap-2 overflow-x-auto">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-10 w-32 flex-shrink-0 animate-pulse rounded-lg bg-gray-200"
            />
          ))}
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-video w-full animate-pulse rounded-lg bg-gray-200" />
            <div className="h-6 w-3/4 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-4 w-full animate-pulse rounded-lg bg-gray-200" />
            <div className="h-4 w-2/3 animate-pulse rounded-lg bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}

async function NewsPageContent({
  lang,
  query,
}: {
  lang: Lang;
  query: QueryNews;
}) {
  const { data, meta } = await listNews(query);
  const t = createNewsI18n(lang).news;

  return (
    <div className="container space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
          {t.pageTitle}
        </h1>
        <p className="text-lg text-gray-600">{t.pageDescription}</p>
      </div>

      {/* Filters */}
      <NewsFilters
        lang={lang}
        query={query.search}
        selectedCategory={query.category}
        resultsCount={query.search ? meta.total : undefined}
      />

      {/* News Grid */}
      <NewsList lang={lang} news={data} searchQuery={query.search} />
    </div>
  );
}

export default async function NewsPage({
  params,
  searchParams,
}: NewsPageProps) {
  const { lang } = await params;
  const filters = await searchParams;
  const query = toNewsQuery(filters);

  return (
    <Suspense fallback={<NewsListSkeleton />}>
      <NewsPageContent lang={lang as Lang} query={query} />
    </Suspense>
  );
}
