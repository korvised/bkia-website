"use client";

import { Package, PackageSearch, PackageCheck, ScanSearch } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import type { Lang } from "@/types/language";
import { t } from "./lost-found.constants";

interface LostFoundStatsProps {
  lang: Lang;
  stats: { total: number; open: number; matched: number; returned: number };
  isSearching: boolean;
}

const STAT_CARDS = [
  { icon: Package,       key: "statTotal"    as const, valueKey: "total"    as const, color: "text-gray-700",    bg: "bg-gray-100"    },
  { icon: PackageSearch, key: "statOpen"     as const, valueKey: "open"     as const, color: "text-primary",     bg: "bg-primary/10"  },
  { icon: ScanSearch,    key: "statMatched"  as const, valueKey: "matched"  as const, color: "text-amber-600",   bg: "bg-amber-50"    },
  { icon: PackageCheck,  key: "statReturned" as const, valueKey: "returned" as const, color: "text-emerald-600", bg: "bg-emerald-50"  },
] as const;

const CHIP_COLORS = [
  "bg-gray-100 text-gray-600",
  "bg-primary/10 text-primary",
  "bg-amber-50 text-amber-600",
  "bg-emerald-50 text-emerald-600",
] as const;

export function LostFoundStats({ lang, stats, isSearching }: LostFoundStatsProps) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.05 });

  return (
    <section ref={ref} className="bg-white">

      {/* Full cards — visible when NOT searching */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: isSearching ? "0fr" : "1fr",
          transition: "grid-template-rows 0.45s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="overflow-hidden">
          <div className="border-b border-gray-100 py-10 md:py-14">
            <div className="container">
              <p
                className={`mb-6 text-center text-xs font-semibold uppercase tracking-widest text-gray-400 transition-all duration-500 ${
                  inView ? "opacity-100" : "opacity-0"
                }`}
              >
                {t("statsTitle", lang)}
              </p>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {STAT_CARDS.map(({ icon: Icon, key, valueKey, color, bg }, i) => (
                  <div
                    key={key}
                    className={`flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm transition-all duration-700 md:p-6 ${
                      inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                    style={{ transitionDelay: `${i * 70}ms` }}
                  >
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${bg}`}>
                      <Icon className={`h-5 w-5 ${color}`} />
                    </div>
                    <span className="text-3xl font-bold text-gray-900">{stats[valueKey]}</span>
                    <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      {t(key, lang)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact chip strip — visible when searching */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: isSearching ? "1fr" : "0fr",
          transition: "grid-template-rows 0.45s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="overflow-hidden">
          <div className="border-b border-gray-100">
            <div className="container flex flex-wrap items-center gap-x-1 gap-y-1.5 py-2.5">
              <span className="mr-1 text-[11px] font-medium text-gray-400">
                {t("statsTitle", lang)}:
              </span>
              {STAT_CARDS.map(({ icon: Icon, key, valueKey }, i) => (
                <span
                  key={key}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${CHIP_COLORS[i]}`}
                >
                  <Icon className="h-3 w-3" />
                  <span>{stats[valueKey]}</span>
                  <span className="font-normal opacity-75">{t(key, lang)}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
