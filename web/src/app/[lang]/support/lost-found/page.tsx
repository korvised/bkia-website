import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Lang } from "@/types/language";
import {
  LostFoundFilters,
  LostFoundList,
} from "@/components/support/lost-found";
import { listLostFound, toLostFoundQuery } from "@/services/lost-found";
import { createSupportI18n } from "@/data/i18n/support";
import type { LostFoundPageProps } from "@/types/lost-found";
import { cn } from "@/lib";

export async function generateMetadata({
  params,
}: LostFoundPageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = createSupportI18n(lang as Lang).lostFound;
  return { title: t.pageTitle, description: t.pageDescription };
}

function LostFoundSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="h-12 w-full max-w-2xl animate-pulse rounded-lg bg-gray-200" />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-9 w-24 animate-pulse rounded-full bg-gray-200"
            />
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-64 animate-pulse rounded-xl bg-gray-200" />
        ))}
      </div>
    </div>
  );
}

async function LostFoundContent({
  lang,
  searchParams,
}: {
  lang: Lang;
  searchParams: Record<string, string | undefined>;
}) {
  const query = toLostFoundQuery(searchParams);
  const { data, meta } = await listLostFound(query, lang);

  return (
    <>
      <LostFoundFilters
        lang={lang}
        query={searchParams.q}
        selectedType={searchParams.type}
        selectedCategory={searchParams.category}
      />
      <LostFoundList
        lang={lang}
        items={data}
        meta={meta}
        searchParams={searchParams}
      />
    </>
  );
}

export default async function LostFoundPage({
  params,
  searchParams,
}: LostFoundPageProps) {
  const { lang } = await params;
  const filters = await searchParams;
  const t = createSupportI18n(lang as Lang).lostFound;

  const tabs = [
    { id: "browse", label: t.tabAll, href: `/${lang}/support/lost-found` },
    {
      id: "report",
      label: t.tabReport,
      href: `/${lang}/support/lost-found/report`,
    },
  ];

  return (
    <div className="container space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 lg:text-4xl">
          {t.pageTitle}
        </h1>
        <p className="text-base text-gray-600">{t.pageDescription}</p>
      </div>

      {/* Top tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-1">
          {tabs.map((tab) => {
            const isActive = tab.id === "browse";
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={cn(
                  "inline-flex items-center gap-2 border-b-2 px-6 py-3 text-sm font-medium whitespace-nowrap transition-all",
                  isActive
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <Suspense fallback={<LostFoundSkeleton />}>
        <LostFoundContent lang={lang as Lang} searchParams={filters} />
      </Suspense>
    </div>
  );
}
