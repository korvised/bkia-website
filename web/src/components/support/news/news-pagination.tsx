import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Lang } from "@/types/language";

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
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();

    // Preserve existing search params
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== "page") {
        params.set(key, value);
      }
    });

    // Set page
    params.set("page", page.toString());

    return `/${lang}/support/news?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous Button */}
      {meta.page > 1 ? (
        <Link
          href={createPageUrl(meta.page - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
      ) : (
        <div className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-lg border border-gray-200 bg-gray-100 text-gray-400">
          <ChevronLeft className="h-5 w-5" />
        </div>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {Array.from({ length: meta.pages }, (_, i) => i + 1).map((page) => {
          // Show first page, last page, current page, and pages around current
          const showPage =
            page === 1 ||
            page === meta.pages ||
            (page >= meta.page - 1 && page <= meta.page + 1);

          // Show ellipsis
          const showEllipsis =
            (page === meta.page - 2 && meta.page > 3) ||
            (page === meta.page + 2 && meta.page < meta.pages - 2);

          if (showEllipsis) {
            return (
              <span
                key={page}
                className="flex h-10 w-10 items-center justify-center text-gray-400"
              >
                ...
              </span>
            );
          }

          if (!showPage) return null;

          if (page === meta.page) {
            return (
              <div
                key={page}
                className="border-primary-600 bg-primary-600 flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium text-white"
              >
                {page}
              </div>
            );
          }

          return (
            <Link
              key={page}
              href={createPageUrl(page)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              {page}
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      {meta.page < meta.pages ? (
        <Link
          href={createPageUrl(meta.page + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-50"
        >
          <ChevronRight className="h-5 w-5" />
        </Link>
      ) : (
        <div className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-lg border border-gray-200 bg-gray-100 text-gray-400">
          <ChevronRight className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}
