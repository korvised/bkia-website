import { Bell, Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Lang } from "@/types/language";
import { ImportantNotice } from "@/data/important-notices";
import { cn } from "@/lib";

interface ImportantNoticeListProps {
  lang: Lang;
  notices: ImportantNotice[];
  searchQuery?: string;
}

export function ImportantNoticeList({
  lang,
  notices,
  searchQuery,
}: ImportantNoticeListProps) {
  // Filter notices by priority
  const urgentNotices = notices.filter((n) => n.priority === "urgent");
  const highNotices = notices.filter((n) => n.priority === "high");
  const normalNotices = notices.filter((n) => n.priority === "normal");

  const priorityStyles = {
    urgent: "bg-red-50 border-red-200 hover:border-red-300",
    high: "bg-orange-50 border-orange-200 hover:border-orange-300",
    normal: "bg-white border-gray-200 hover:border-gray-300",
  };

  const priorityBadgeStyles = {
    urgent: "bg-red-100 text-red-700 border-red-200",
    high: "bg-orange-100 text-orange-700 border-orange-200",
    normal: "bg-blue-100 text-blue-700 border-blue-200",
  };

  const priorityLabels = {
    urgent: { en: "Urgent", lo: "Urgent", zh: "Urgent" },
    high: { en: "Important", lo: "Important", zh: "Important" },
    normal: { en: "Notice", lo: "Notice", zh: "Notice" },
  };

  const renderNoticeCard = (notice: ImportantNotice) => {
    return (
      <Link
        key={notice.id}
        href={`/${lang}/notices/important/${notice.id}`}
        className={cn(
          "block rounded-lg border-2 p-6 transition-all duration-200 hover:shadow-md",
          priorityStyles[notice.priority],
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            {/* Header with badge and date */}
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
                  priorityBadgeStyles[notice.priority],
                )}
              >
                <Bell className="h-3.5 w-3.5" />
                {priorityLabels[notice.priority][lang]}
              </span>

              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <time dateTime={notice.publishDate}>
                  {new Date(notice.publishDate).toLocaleDateString(
                    lang === "zh" ? "zh-CN" : lang === "lo" ? "lo-LA" : "en-US",
                    { year: "numeric", month: "short", day: "numeric" },
                  )}
                </time>
              </div>
            </div>

            {/* Title */}
            <h3 className="line-clamp-2 text-lg font-semibold text-gray-900">
              {notice.title[lang]}
            </h3>

            {/* Description */}
            <p className="line-clamp-2 text-sm text-gray-600">
              {notice.description[lang]}
            </p>

            {/* Tags */}
            {notice.tags && notice.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {notice.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700"
                  >
                    {tag[lang]}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Arrow icon */}
          <ChevronRight className="h-5 w-5 flex-shrink-0 text-gray-400" />
        </div>
      </Link>
    );
  };

  // Empty state
  if (notices.length === 0) {
    return (
      <div className="py-12 text-center">
        <Bell className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          {searchQuery ? "No results found" : "No notices available"}
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          {searchQuery
            ? `Try adjusting your search terms or browse all notices.`
            : "Check back later for updates"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Urgent Notices */}
      {urgentNotices.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-red-700">
            <Bell className="h-6 w-6" />
            Urgent Notices
          </h2>
          <div className="space-y-4">{urgentNotices.map(renderNoticeCard)}</div>
        </section>
      )}

      {/* High Priority Notices */}
      {highNotices.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-orange-700">
            <Bell className="h-6 w-6" />
            Important Notices
          </h2>
          <div className="space-y-4">{highNotices.map(renderNoticeCard)}</div>
        </section>
      )}

      {/* Normal Notices */}
      {normalNotices.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-700">
            <Bell className="h-6 w-6" />
            General Notices
          </h2>
          <div className="space-y-4">{normalNotices.map(renderNoticeCard)}</div>
        </section>
      )}
    </div>
  );
}
