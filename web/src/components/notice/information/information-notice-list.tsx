import { Calendar, ChevronRight, Info } from "lucide-react";
import Link from "next/link";
import { Lang } from "@/types/language";
import {
  InformationNotice,
  noticeInforCategories,
} from "@/data/notice/information-notices";
import { cn, fmtDate } from "@/lib";
import { InformationCategoryFilter } from "./information-category-filter";

interface InformationNoticeListProps {
  lang: Lang;
  notices: InformationNotice[];
  searchQuery?: string;
  selectedCategory?: string;
}

export function InformationNoticeList({
  lang,
  notices,
  searchQuery,
  selectedCategory,
}: InformationNoticeListProps) {
  const categoryConfig = {
    "airport-info": {
      label: "Airport Information",
      color: "bg-blue-50 border-blue-200 hover:border-blue-300",
      badgeColor: "bg-blue-100 text-blue-700",
    },
    services: {
      label: "Services",
      color: "bg-green-50 border-green-200 hover:border-green-300",
      badgeColor: "bg-green-100 text-green-700",
    },
    facilities: {
      label: "Facilities",
      color: "bg-purple-50 border-purple-200 hover:border-purple-300",
      badgeColor: "bg-purple-100 text-purple-700",
    },
    "travel-tips": {
      label: "Travel Tips",
      color: "bg-yellow-50 border-yellow-200 hover:border-yellow-300",
      badgeColor: "bg-yellow-100 text-yellow-700",
    },
    regulations: {
      label: "Regulations",
      color: "bg-red-50 border-red-200 hover:border-red-300",
      badgeColor: "bg-red-100 text-red-700",
    },
  };

  // Group notices by category
  const groupedNotices = notices.reduce(
    (acc, notice) => {
      if (!acc[notice.category]) {
        acc[notice.category] = [];
      }
      acc[notice.category].push(notice);
      return acc;
    },
    {} as Record<string, InformationNotice[]>,
  );

  const renderNoticeCard = (notice: InformationNotice) => {
    const config = categoryConfig[notice.category];

    return (
      <Link
        key={notice.id}
        href={`/${lang}/notices/information/${notice.id}`}
        className={cn(
          "block rounded-lg border-2 p-6 transition-all duration-200 hover:shadow-md",
          config.color,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            {/* Header with category badge and date */}
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
                  config.badgeColor,
                )}
              >
                <Info className="h-3.5 w-3.5" />
                {config.label}
              </span>

              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <time dateTime={notice.publishDate}>
                  {fmtDate(new Date(notice.publishDate), lang)}
                </time>
              </div>

              {notice.lastUpdated && (
                <span className="text-xs text-gray-500">
                  Updated: {fmtDate(new Date(notice.lastUpdated), lang)}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="line-clamp-2 text-lg font-semibold text-gray-900">
              {notice.title}
            </h3>

            {/* Description */}
            <p className="line-clamp-2 text-sm text-gray-600">
              {notice.description}
            </p>

            {/* Tags */}
            {notice.tags && notice.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {notice.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
                {notice.tags.length > 3 && (
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-500">
                    +{notice.tags.length - 3} more
                  </span>
                )}
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
        <Info className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          {searchQuery ? "No results found" : "No information available"}
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          {searchQuery
            ? `Try adjusting your search terms or browse all information.`
            : "Check back later for updates"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <InformationCategoryFilter lang={lang} selectedCategory={selectedCategory} />

      {/* Notices by Category */}
      <div className="space-y-8">
        {Object.entries(groupedNotices).map(([category, categoryNotices]) => {
          const config =
            categoryConfig[category as keyof typeof categoryConfig];
          const IconComponent = noticeInforCategories.find(
            (c) => c.id === category,
          )?.icon;

          return (
            <section key={category}>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                {IconComponent && <IconComponent className="h-6 w-6" />}
                {config.label}
              </h2>
              <div className="space-y-4">
                {categoryNotices.map(renderNoticeCard)}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
