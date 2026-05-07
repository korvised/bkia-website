"use client";

import { useState, useEffect, useRef } from "react";
import type { Lang } from "@/types/language";
import type { ILostFoundItem } from "@/types/lost-found";
import { listLostFound } from "@/services/lost-found";
import { LostFoundHero } from "./LostFoundHero";
import { LostFoundStats } from "./LostFoundStats";
import { LostFoundResults } from "./LostFoundResults";
import { LostFoundHowItWorks } from "./LostFoundHowItWorks";
import { LostFoundContactCta } from "./LostFoundContactCta";

interface Props {
  lang: Lang;
  stats: { total: number; open: number; matched: number; returned: number };
}

export function LostFoundPageContent({ lang, stats }: Props) {
  const [query,      setQuery]      = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");

  // Pair results with the query that produced them so `searching` can be
  // derived — avoids synchronous setState calls inside the effect body.
  const [{ results, forQuery }, setFetchState] = useState<{
    results: ILostFoundItem[];
    forQuery: string;
  }>({ results: [], forQuery: "" });

  // `searching` is true while a non-empty debounced query is pending fetch
  const searching = debouncedQ.trim() !== "" && forQuery !== debouncedQ;

  const inputRef = useRef<HTMLInputElement>(null);

  // 300 ms debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQ(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Fetch when debounced query changes.
  // All setState calls are inside async callbacks (.then / .catch), so they
  // are not synchronous setState-in-effect calls and satisfy the linter.
  useEffect(() => {
    if (!debouncedQ.trim()) return;
    let cancelled = false;
    listLostFound({ search: debouncedQ, limit: 12 }, lang)
      .then(({ data }) => { if (!cancelled) setFetchState({ results: data, forQuery: debouncedQ }); })
      .catch(()       => { if (!cancelled) setFetchState({ results: [],    forQuery: debouncedQ }); });
    return () => { cancelled = true; };
  }, [debouncedQ, lang]);

  const handleClearSearch = () => {
    setQuery("");
    setFetchState({ results: [], forQuery: "" });
    inputRef.current?.focus();
  };

  const isSearching = query.trim().length > 0;

  return (
    <>
      {/* Page-level animation keyframes */}
      <style>{`
        @keyframes lf-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes lf-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes lf-scale {
          0%   { opacity: 0; transform: scale(0.94); }
          60%  { transform: scale(1.02); }
          100% { opacity: 1; transform: scale(1); }
        }
        .lf-up    { animation: lf-up    0.6s cubic-bezier(0.22,1,0.36,1) both; }
        .lf-in    { animation: lf-in    0.45s ease both; }
        .lf-scale { animation: lf-scale 0.5s  cubic-bezier(0.22,1,0.36,1) both; }
        .lf-d1 { animation-delay: 0.08s; }
        .lf-d2 { animation-delay: 0.18s; }
        .lf-d3 { animation-delay: 0.28s; }
        .lf-d4 { animation-delay: 0.38s; }
        .lf-d5 { animation-delay: 0.48s; }
        @media (prefers-reduced-motion: reduce) {
          .lf-up, .lf-in, .lf-scale { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      <LostFoundHero
        lang={lang}
        query={query}
        searching={searching}
        inputRef={inputRef}
        onChange={setQuery}
        onClear={handleClearSearch}
      />

      <LostFoundStats
        lang={lang}
        stats={stats}
        isSearching={isSearching}
      />

      {debouncedQ && (
        <LostFoundResults
          lang={lang}
          results={results}
          debouncedQ={debouncedQ}
          searching={searching}
          onClearSearch={handleClearSearch}
        />
      )}

      <LostFoundHowItWorks lang={lang} />

      <LostFoundContactCta lang={lang} />
    </>
  );
}
