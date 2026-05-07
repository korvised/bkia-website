"use client";

import { Search, X, Loader2, PackageSearch } from "lucide-react";
import type { Lang } from "@/types/language";
import { t } from "./lost-found.constants";

interface LostFoundHeroProps {
  lang: Lang;
  query: string;
  searching: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onChange: (q: string) => void;
  onClear: () => void;
}

export function LostFoundHero({
  lang,
  query,
  searching,
  inputRef,
  onChange,
  onClear,
}: LostFoundHeroProps) {
  return (
    <section className="relative overflow-hidden bg-primary-800 px-4 py-16 md:py-24">
      {/* Decorative rings */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-28 -top-28 h-96 w-96 rounded-full border border-white/5" />
        <div className="absolute -right-14 -top-14 h-64 w-64 rounded-full border border-white/5" />
        <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-primary-900/40 to-transparent" />
      </div>

      <div className="container relative text-center">
        <p className="lf-up lf-d1 mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80">
          <PackageSearch className="h-3.5 w-3.5" />
          Lost & Found
        </p>
        <h1 className="lf-up lf-d2 mb-3 text-3xl font-bold text-white md:text-5xl">
          {t("pageTitle", lang)}
        </h1>
        <p className="lf-up lf-d3 mx-auto mb-10 max-w-2xl text-base text-white/70 md:text-lg">
          {t("heroSubtitle", lang)}
        </p>

        {/* Search bar */}
        <div className="lf-up lf-d4 mx-auto max-w-2xl">
          <div className="relative">
            {searching ? (
              <Loader2 className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-white/50" />
            ) : (
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
            )}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => onChange(e.target.value)}
              placeholder={t("searchPlaceholderMain", lang)}
              className="w-full rounded-2xl border border-white/20 bg-white/10 py-4 pl-12 pr-12 text-white placeholder-white/40 outline-none backdrop-blur-sm transition focus:border-white/40 focus:bg-white/15 focus:ring-2 focus:ring-white/20"
            />
            {query && (
              <button
                onClick={onClear}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/50 transition hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
