import { Suspense } from "react";
import type { Metadata } from "next";
import { Lang } from "@/types/language";
import { NoticeFilters, NoticeList } from "@/components/support/notice";
import { listNotices, toNoticeQuery } from "@/services/notice";
import type { NoticePageProps, QueryNotice } from "@/types/notice";
import { createSupportI18n } from "@/data/i18n/support";

export async function generateMetadata({
  params,
}: NoticePageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = createSupportI18n(lang as Lang).notices;

  return {
    title: `${t.pageTitle} | Bokeo International Airport`,
    description: t.pageDescription,
  };
}

function NoticeListSkeleton() {
  return (
    <div className="container space-y-6 py-8">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-10 w-64 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-6 w-96 animate-pulse rounded-lg bg-gray-200" />
      </div>

      {/* Filters skeleton */}
      <div className="space-y-4">
        <div className="h-12 w-full max-w-md animate-pulse rounded-lg bg-gray-200" />
        <div className="flex gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 w-32 animate-pulse rounded-lg bg-gray-200"
            />
          ))}
        </div>
      </div>

      {/* List skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-40 w-full animate-pulse rounded-lg bg-gray-200"
          />
        ))}
      </div>
    </div>
  );
}

async function NoticesPageContent({
  lang,
  query,
  searchParams,
}: {
  lang: Lang;
  query: QueryNotice;
  searchParams: Record<string, string | undefined>;
}) {
  const { data, meta } = await listNotices(query);
  const t = createSupportI18n(lang).notices;

  return (
    <div className="container space-y-8 py-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
          {t.pageTitle}
        </h1>
        <p className="text-lg text-gray-600">{t.pageDescription}</p>
      </div>

      {/* Filters */}
      <NoticeFilters
        lang={lang}
        query={query.search}
        selectedPriority={query.priority}
        resultsCount={query.search ? meta.total : undefined}
      />

      {/* Notice List with Pagination */}
      <NoticeList
        lang={lang}
        notices={data}
        searchQuery={query.search}
        meta={meta}
        searchParams={searchParams}
      />
    </div>
  );
}

export default async function NoticesPage({
  params,
  searchParams,
}: NoticePageProps) {
  const { lang } = await params;
  const filters = await searchParams;
  const query = toNoticeQuery(filters);

  return (
    <Suspense fallback={<NoticeListSkeleton />}>
      <NoticesPageContent
        lang={lang as Lang}
        query={query}
        searchParams={filters}
      />
    </Suspense>
  );
}
