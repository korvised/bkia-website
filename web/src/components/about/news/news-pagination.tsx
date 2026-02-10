import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Lang } from "@/types/language";
import { createCommonI18n } from "@/data/i18n/common";

interface NewsPaginationProps {
  lang: Lang;
  meta: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
  searchParams: Record<string, string | undefined>;
}

export function NewsPagination({
  lang,
  meta,
  searchParams,
}: NewsPaginationProps) {
  const t = createCommonI18n(lang).pagination;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== "page") {
        params.set(key, value);
      }
    });

    params.set("page", page.toString());

    return `/${lang}/about/news?${params.toString()}`;
  };

  const startResult = (meta.page - 1) * meta.limit + 1;
  const endResult = Math.min(meta.page * meta.limit, meta.total);

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
      {/* Results info */}
      <div className="text-sm text-gray-600">
        {t.showing}{" "}
        <span className="font-semibold text-gray-900">{startResult}</span>-
        <span className="font-semibold text-gray-900">{endResult}</span> {t.of}{" "}
        <span className="font-semibold text-gray-900">{meta.total}</span>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* Previous */}
        {meta.page > 1 ? (
          <Link
            href={createPageUrl(meta.page - 1)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
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

        {/* Page info */}
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-4 py-2">
          <span className="text-sm font-medium text-gray-900">{meta.page}</span>
          <span className="text-sm text-gray-500">{t.of}</span>
          <span className="text-sm font-medium text-gray-900">
            {meta.pages}
          </span>
        </div>

        {/* Next */}
        {meta.page < meta.pages ? (
          <Link
            href={createPageUrl(meta.page + 1)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
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
