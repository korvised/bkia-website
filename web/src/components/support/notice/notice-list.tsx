import { Bell, Calendar, ChevronRight, Clock } from "lucide-react";
import Link from "next/link";
import { Lang } from "@/types/language";
import { ImportantPriority } from "@/types/enum";
import { INotice } from "@/types/notice";
import { cn, fmtDate } from "@/lib";
import { IPaginationMeta } from "@/types/pagination";
import { createSupportI18n } from "@/data/i18n/support";
import { NoticePagination } from "./notice-pagination";

interface NoticeListProps {
  lang: Lang;
  notices: INotice[];
  searchQuery?: string;
  meta: IPaginationMeta;
  searchParams: Record<string, string | undefined>;
}

const priorityConfig: Record<
  ImportantPriority,
  {
    border: string;
    hoverBg: string;
    labelColor: string;
    tagBg: string;
  }
> = {
  [ImportantPriority.URGENT]: {
    border: "border-red-500",
    hoverBg: "hover:bg-red-50/40",
    labelColor: "text-red-600",
    tagBg: "bg-red-50 text-red-700",
  },
  [ImportantPriority.HIGH]: {
    border: "border-orange-400",
    hoverBg: "hover:bg-orange-50/40",
    labelColor: "text-orange-600",
    tagBg: "bg-orange-50 text-orange-700",
  },
  [ImportantPriority.NORMAL]: {
    border: "border-[#00AAAC]",
    hoverBg: "hover:bg-[#f0fbfc]/60",
    labelColor: "text-[#00AAAC]",
    tagBg: "bg-[#f0fbfc] text-[#008e90]",
  },
};

export function NoticeList({
  lang,
  notices,
  searchQuery,
  meta,
  searchParams,
}: NoticeListProps) {
  const t = createSupportI18n(lang).notices;

  if (notices.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <Bell className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          {searchQuery ? t.noResultsFound : t.noNoticesAvailable}
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
          {searchQuery ? t.noResultsMessage : t.noNoticesMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Notice rows */}
      <div className="divide-y divide-gray-100">
        {notices.map((notice) => {
          const config = priorityConfig[notice.priority];

          return (
            <Link
              key={notice.id}
              href={`/${lang}/support/notices/${notice.id}`}
              className={cn(
                "group flex items-start gap-4 border-l-4 bg-white px-5 py-5 transition-colors",
                config.border,
                config.hoverBg,
              )}
            >
              <div className="min-w-0 flex-1 space-y-1.5">
                {/* Priority + date */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span
                    className={cn(
                      "text-xs font-bold uppercase tracking-wide",
                      config.labelColor,
                    )}
                  >
                    {notice.priority}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    <time dateTime={notice.publishDate}>
                      {fmtDate(new Date(notice.publishDate), lang)}
                    </time>
                  </div>
                  {notice.effectiveDate && (
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {t.effectiveFrom}:{" "}
                        {fmtDate(new Date(notice.effectiveDate), lang)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="line-clamp-1 font-bold text-gray-900 transition-colors group-hover:text-[#00AAAC]">
                  {notice.title[lang]}
                </h3>

                {/* Description */}
                <p className="line-clamp-2 text-sm text-gray-500">
                  {notice.description[lang]}
                </p>

                {/* Tags */}
                {notice.tags && notice.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    {notice.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                          config.tagBg,
                        )}
                      >
                        {tag[lang]}
                      </span>
                    ))}
                    {notice.tags.length > 3 && (
                      <span className="text-xs text-gray-400">
                        +{notice.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-[#00AAAC]" />
            </Link>
          );
        })}
      </div>

      {/* Pagination */}
      {meta.pages > 1 && (
        <NoticePagination lang={lang} meta={meta} searchParams={searchParams} />
      )}
    </div>
  );
}
