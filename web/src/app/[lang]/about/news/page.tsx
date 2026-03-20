import { Suspense } from "react";
import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { Lang } from "@/types/language";
import { NewsFilters, NewsList } from "@/components/about";
import { listNews, toNewsQuery } from "@/services/news";
import type { NewsPageProps, QueryNews } from "@/types/news";
import { createNewsI18n } from "@/data/i18n/about";

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
    <>
      {/* Hero skeleton */}
      <section className="bg-[#f0fbfc] py-10">
        <div className="container">
          <div className="flex items-start gap-5">
            <div className="h-14 w-14 shrink-0 animate-pulse rounded-xl bg-[#00AAAC]/30" />
            <div className="space-y-2 pt-1">
              <div className="h-3 w-16 animate-pulse rounded bg-[#00AAAC]/30" />
              <div className="h-9 w-64 animate-pulse rounded-lg bg-gray-300" />
              <div className="h-5 w-96 animate-pulse rounded-lg bg-gray-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Filters + grid skeleton */}
      <section className="bg-gray-50 py-10">
        <div className="container space-y-6">
          {/* Search */}
          <div className="h-11 w-full max-w-2xl animate-pulse rounded-full bg-gray-200" />
          {/* Pill row */}
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-9 w-28 animate-pulse rounded-full bg-gray-200" />
            ))}
          </div>
          {/* Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-video w-full animate-pulse rounded-xl bg-gray-200" />
                <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

async function NewsPageContent({
  lang,
  query,
  searchParams,
}: {
  lang: Lang;
  query: QueryNews;
  searchParams: Record<string, string | undefined>;
}) {
  const { data, meta } = await listNews(query);
  const t = createNewsI18n(lang).news;

  return (
    <>
      {/* Hero */}
      <section className="bg-[#f0fbfc] py-10">
        <div className="container">
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#00AAAC]">
              <Newspaper className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                About
              </p>
              <h1 className="text-2xl font-bold text-gray-900 lg:text-4xl">
                {t.pageTitle}
              </h1>
              <p className="mt-2 max-w-xl text-sm text-gray-500 lg:text-base">
                {t.pageDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + News Grid */}
      <section className="bg-gray-50 py-10">
        <div className="container space-y-6">
          <NewsFilters
            lang={lang}
            query={query.search}
            selectedCategory={query.category}
          />
          <NewsList
            lang={lang}
            news={data}
            searchQuery={query.search}
            meta={meta}
            searchParams={searchParams}
          />
        </div>
      </section>
    </>
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
      <NewsPageContent
        lang={lang as Lang}
        query={query}
        searchParams={filters}
      />
    </Suspense>
  );
}
