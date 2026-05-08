"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Package,
  PackageSearch,
  Clock,
  CalendarDays,
  MapPin,
  ChevronRight,
  X,
} from "lucide-react";
import type { Lang } from "@/types/language";
import type { ILostFoundItem } from "@/types/lost-found";
import { LostFoundStatus } from "@/types/enum";
import {
  t,
  formatDate,
  CATEGORY_ICONS,
  CATEGORY_KEYS,
} from "./lost-found.constants";
import { LostFoundClaimForm } from "./LostFoundClaimForm";

interface LostFoundResultsProps {
  lang: Lang;
  results: ILostFoundItem[];
  debouncedQ: string;
  searching: boolean;
  onClearSearch: () => void;
  onReportClick?: () => void;
}

export function LostFoundResults({
  lang,
  results,
  debouncedQ,
  searching,
  onClearSearch,
  onReportClick,
}: LostFoundResultsProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const claimRef = useRef<HTMLDivElement>(null);

  // Derive the active selection — automatically collapses when the item is no
  // longer present in the current results (e.g. after a new search), without
  // needing a setState call inside an effect.
  const selectedItem = useMemo(
    () => results.find((r) => r.id === selectedId) ?? null,
    [results, selectedId],
  );

  // Scroll claim form into view when an item is selected
  useEffect(() => {
    if (!selectedItem) return;
    const tid = setTimeout(() => {
      claimRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => clearTimeout(tid);
  }, [selectedItem]);

  const handleSelect = (item: ILostFoundItem) => setSelectedId(item.id);
  const handleCancel = () => setSelectedId(null);

  return (
    <section className="bg-gray-50 py-10 md:py-14">
      <div className="container max-w-3xl">

        {/* Results header */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{results.length}</span>{" "}
            {t("searchResultsCount", lang)}{" "}
            <span className="font-semibold text-primary">&ldquo;{debouncedQ}&rdquo;</span>
          </p>
          <button
            onClick={onClearSearch}
            className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-500 transition hover:border-primary hover:text-primary"
          >
            <X className="h-3 w-3" />
            {t("clearSearch", lang)}
          </button>
        </div>

        {/* Empty state */}
        {results.length === 0 && !searching && (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white py-14 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <PackageSearch className="h-7 w-7 text-gray-400" />
            </div>
            <p className="mb-1 font-semibold text-gray-800">{t("noResultsFound", lang)}</p>
            <p className="mx-auto max-w-xs text-sm text-gray-400">{t("noResultsHint", lang)}</p>
          </div>
        )}

        {/* Result rows */}
        {results.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
            {results.map((item) => {
              const Icon = CATEGORY_ICONS[item.category] ?? Package;
              const isSelected = selectedItem?.id === item.id;
              const isMatched = item.status === LostFoundStatus.MATCHED;

              return (
                <div
                  key={item.id}
                  className={`border-b border-gray-100 last:border-0 transition-colors ${
                    isSelected ? "bg-primary/5" : "hover:bg-gray-50/60"
                  }`}
                >
                  {/* Row */}
                  <div className="flex items-start gap-3 px-5 py-4">
                    <div
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        isSelected ? "bg-primary/15 text-primary" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate font-semibold text-gray-900">{item.itemName}</p>
                        {isMatched && (
                          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600 ring-1 ring-amber-200">
                            <Clock className="h-2.5 w-2.5" />
                            {t("statusMatched", lang)}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-gray-500">
                          {item.description}
                        </p>
                      )}
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-gray-400">
                        <span>{t(CATEGORY_KEYS[item.category] ?? "categoryOther", lang)}</span>
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" />
                          {formatDate(item.incidentDate, lang)}
                        </span>
                        {item.location && (
                          <span className="flex items-center gap-1 truncate">
                            <MapPin className="h-3 w-3 shrink-0" />
                            {item.location}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => (isSelected ? handleCancel() : handleSelect(item))}
                      className={`ml-2 mt-0.5 flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                        isSelected
                          ? "bg-gray-200 text-gray-600 hover:bg-gray-300"
                          : isMatched
                            ? "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                            : "bg-primary text-white hover:bg-primary-600 hover:shadow-md hover:shadow-primary/20"
                      }`}
                    >
                      {isSelected ? (
                        t("cancelClaim", lang)
                      ) : (
                        <>
                          {t("claimThisItem", lang)}
                          <ChevronRight className="h-3 w-3" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Inline claim form — smooth grid-row expand */}
                  <div
                    ref={isSelected ? claimRef : undefined}
                    style={{
                      display: "grid",
                      gridTemplateRows: isSelected ? "1fr" : "0fr",
                      transition: "grid-template-rows 0.4s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    <div className="overflow-hidden">
                      {isSelected && (
                        <div className="border-t border-primary/10 bg-primary/[0.03] px-5 py-6">
                          <LostFoundClaimForm
                            item={item}
                            lang={lang}
                            onSuccess={() => {/* success state handled inside form */}}
                            onCancel={handleCancel}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Can't find item CTA */}
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-dashed border-gray-200 bg-white px-5 py-4">
          <div>
            <p className="font-semibold text-gray-800">{t("cantFindItem", lang)}</p>
            <p className="mt-0.5 text-sm text-gray-400">{t("reportSubtitle", lang)}</p>
          </div>
          {onReportClick ? (
            <button
              onClick={onReportClick}
              className="ml-4 shrink-0 rounded-xl border border-primary/30 px-4 py-2 text-xs font-semibold text-primary transition hover:border-primary hover:bg-primary/5"
            >
              {t("reportButton", lang)}
            </button>
          ) : (
            <Link
              href={`/${lang}/about/contact`}
              className="ml-4 shrink-0 rounded-xl border border-primary/30 px-4 py-2 text-xs font-semibold text-primary transition hover:border-primary hover:bg-primary/5"
            >
              {t("contactStaff", lang)}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
