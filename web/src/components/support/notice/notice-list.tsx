import { Bell, Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Lang } from "@/types/language";
import { ImportantPriority } from "@/types/enum";
import { INotice } from "@/types/notice";
import { cn, fmtDate } from "@/lib";
import { createSupportI18n } from "@/data/i18n/support";

interface NoticeListProps {
  lang: Lang;
  notices: INotice[];
  searchQuery?: string;
}

export function NoticeList({ lang, notices, searchQuery }: NoticeListProps) {
  const t = createSupportI18n(lang).notices;

  const priorityConfig: Record<
    ImportantPriority,
    {
      badge: string;
      badgeText: string;
    }
  > = {
    [ImportantPriority.URGENT]: {
      badge: "bg-red-600",
      badgeText: "text-red-700",
    },
    [ImportantPriority.HIGH]: {
      badge: "bg-orange-500",
      badgeText: "text-orange-700",
    },
    [ImportantPriority.NORMAL]: {
      badge: "bg-blue-500",
      badgeText: "text-blue-700",
    },
  };

  if (notices.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <Bell className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">
          {searchQuery ? t.noResultsFound : t.noNoticesAvailable}
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-gray-600">
          {searchQuery ? t.noResultsMessage : t.noNoticesMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notices.map((notice) => {
        const config = priorityConfig[notice.priority];

        return (
          <Link
            key={notice.id}
            href={`/${lang}/support/notices/${notice.id}`}
            className="group block rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-gray-300 hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              {/* Content */}
              <div className="min-w-0 flex-1 space-y-2">
                {/* Header: Priority Label & Date */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span
                    className={cn(
                      "text-xs font-semibold uppercase",
                      config.badgeText,
                    )}
                  >
                    {notice.priority}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock className="h-3.5 w-3.5" />
                    <time dateTime={notice.publishDate}>
                      {fmtDate(new Date(notice.publishDate), lang)}
                    </time>
                  </div>
                </div>

                {/* Title */}
                <h3 className="group-hover:text-primary-600 line-clamp-1 text-base font-semibold text-gray-900 transition-colors">
                  {notice.title[lang]}
                </h3>

                {/* Description */}
                <p className="line-clamp-2 text-sm text-gray-600">
                  {notice.description[lang]}
                </p>

                {/* Footer: Tags & Effective Date */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {notice.effectiveDate && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {t.effectiveFrom}:{" "}
                        {fmtDate(new Date(notice.effectiveDate), lang)}
                      </span>
                    </div>
                  )}

                  {notice.tags && notice.tags.length > 0 && (
                    <>
                      {notice.effectiveDate && (
                        <span className="text-gray-300">•</span>
                      )}
                      {notice.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                        >
                          {tag[lang]}
                        </span>
                      ))}
                      {notice.tags.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{notice.tags.length - 3}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Arrow Icon */}
              <div className="flex-shrink-0 self-center">
                <ArrowRight className="group-hover:text-primary-600 h-5 w-5 text-gray-400 transition-all group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
