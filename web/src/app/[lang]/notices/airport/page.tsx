import { Suspense } from "react";
import type { Metadata } from "next";
import { Bell } from "lucide-react";
import { Lang } from "@/types/language";
import { NoticeFilters, NoticeList, NoticesCrossNav } from "@/components/support/notice";
import { listNotices, toNoticeQuery } from "@/services/notice";
import type { NoticePageProps, QueryNotice, INotice } from "@/types/notice";
import type { IPaginationMeta } from "@/types/pagination";
import { createAirportNoticesI18n } from "@/data/i18n/notices/airport";

export async function generateMetadata({
  params,
}: NoticePageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = createAirportNoticesI18n(lang as Lang).notices;
  return { title: t.pageTitle, description: t.pageDescription };
}

function NoticeListSkeleton() {
  return (
    <>
      <section className="bg-[#f0fbfc] py-10">
        <div className="container space-y-3">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-10 w-64 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-96 animate-pulse rounded bg-gray-200" />
        </div>
      </section>
      <section className="bg-white py-10">
        <div className="container space-y-6">
          <div className="h-12 w-full max-w-lg animate-pulse rounded bg-gray-200" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-9 w-28 animate-pulse rounded-full bg-gray-200" />
            ))}
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 w-full animate-pulse rounded bg-gray-200" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function NoticeFiltersSkeleton() {
  return (
    <div className="space-y-5">
      <div className="h-12 w-full max-w-lg animate-pulse rounded-full bg-gray-200" />
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-9 w-28 animate-pulse rounded-full bg-gray-200" />
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
  const t = createAirportNoticesI18n(lang).notices;

  // Gracefully handle API failures — show an empty state rather than crashing
  let data: INotice[] = [];
  let meta: IPaginationMeta = {
    total: 0,
    page: 1,
    limit: query.limit ?? 5,
    pages: 0,
  };

  try {
    const result = await listNotices(query);
    data = result.data;
    meta = result.meta;
  } catch {
    // API unavailable — fall through to empty state below
  }

  return (
    <>
      {/* Header */}
      <section className="bg-[#f0fbfc] py-10">
        <div className="container flex items-start gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#00AAAC]">
            <Bell className="h-7 w-7 text-white" />
          </div>
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
              Announcements
            </p>
            <h1 className="text-2xl font-bold text-gray-900 lg:text-4xl">
              {t.pageTitle}
            </h1>
            <p className="mt-2 max-w-xl text-sm text-gray-500 lg:text-base">
              {t.pageDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Filters + List */}
      <section className="bg-white py-10">
        <div className="container space-y-8">
          {/* NoticeFilters uses useSearchParams() — wrap in its own Suspense
              so Next.js 15 can SSR the rest of the page without blocking */}
          <Suspense fallback={<NoticeFiltersSkeleton />}>
            <NoticeFilters
              lang={lang}
              query={query.search}
              selectedPriority={query.priority}
            />
          </Suspense>
          <NoticeList
            lang={lang}
            notices={data}
            searchQuery={query.search}
            meta={meta}
            searchParams={searchParams}
          />
        </div>
      </section>

      {/* Cross navigation to other sections */}
      <NoticesCrossNav lang={lang} current="airport" />
    </>
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
