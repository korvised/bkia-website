import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Lang } from "@/types/language";
import { createCommonI18n } from "@/data/i18n/common";
import { IPaginationMeta } from "@/types/pagination";

interface LostFoundPaginationProps {
  lang: Lang;
  meta: IPaginationMeta;
  searchParams: Record<string, string | undefined>;
}

export function LostFoundPagination({
  lang,
  meta,
  searchParams,
}: LostFoundPaginationProps) {
  const t = createCommonI18n(lang).pagination;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([k, v]) => {
      if (v && k !== "page") params.set(k, v);
    });
    params.set("page", page.toString());
    return `/${lang}/support/lost-found?${params.toString()}`;
  };

  const start = (meta.page - 1) * meta.limit + 1;
  const end = Math.min(meta.page * meta.limit, meta.total);

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
      <div className="text-sm text-gray-600">
        {t.showing} <span className="font-semibold text-gray-900">{start}</span>
        -<span className="font-semibold text-gray-900">{end}</span> {t.of}{" "}
        <span className="font-semibold text-gray-900">{meta.total}</span>
      </div>
      <div className="flex items-center gap-2">
        {meta.page > 1 ? (
          <Link
            href={createPageUrl(meta.page - 1)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">{t.previous}</span>
          </Link>
        ) : (
          <div className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-400">
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">{t.previous}</span>
          </div>
        )}
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm">
          <span className="font-medium text-gray-900">{meta.page}</span>
          <span className="text-gray-500">{t.of}</span>
          <span className="font-medium text-gray-900">{meta.pages}</span>
        </div>
        {meta.page < meta.pages ? (
          <Link
            href={createPageUrl(meta.page + 1)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <span className="hidden sm:inline">{t.next}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <div className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-400">
            <span className="hidden sm:inline">{t.next}</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        )}
      </div>
    </div>
  );
}
