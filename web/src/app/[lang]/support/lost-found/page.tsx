import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PackageSearch, Plus } from "lucide-react";
import { Lang } from "@/types/language";
import {
  LostFoundFilters,
  LostFoundList,
} from "@/components/support/lost-found";
import { listLostFound, toLostFoundQuery } from "@/services/lost-found";
import { createSupportI18n } from "@/data/i18n/support";
import type { LostFoundPageProps } from "@/types/lost-found";

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
      <div className="flex items-center justify-between gap-4">
        <div className="h-10 w-full max-w-lg animate-pulse rounded-full bg-gray-200" />
      </div>
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-9 w-20 animate-pulse rounded-full bg-gray-200" />
        ))}
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-8 w-24 animate-pulse rounded-full bg-gray-200" />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-64 animate-pulse rounded bg-gray-200" />
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

  return (
    <>
      {/* Header */}
      <section className="bg-[#f0fbfc] py-10">
        <div className="container flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#00AAAC]">
              <PackageSearch className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                Support
              </p>
              <h1 className="text-2xl font-bold text-gray-900 lg:text-4xl">
                {t.pageTitle}
              </h1>
              <p className="mt-2 max-w-xl text-sm text-gray-500 lg:text-base">
                {t.pageDescription}
              </p>
            </div>
          </div>

          <Link
            href={`/${lang}/support/lost-found/report`}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#00AAAC] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#008e90]"
          >
            <Plus className="h-4 w-4" />
            {t.reportLost}
          </Link>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="bg-gray-50 py-10">
        <div className="container space-y-6">
          <Suspense fallback={<LostFoundSkeleton />}>
            <LostFoundContent lang={lang as Lang} searchParams={filters} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
