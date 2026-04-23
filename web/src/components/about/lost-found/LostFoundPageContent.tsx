"use client";

import { useState, useEffect, useRef, useCallback, useId } from "react";
import Link from "next/link";
import {
  Search,
  X,
  Package,
  PackageSearch,
  PackageCheck,
  ScanSearch,
  Smartphone,
  Luggage,
  Shirt,
  FileText,
  Gem,
  KeyRound,
  Banknote,
  Gamepad2,
  PlaneTakeoff,
  MapPin,
  CalendarDays,
  ChevronRight,
  CheckCircle2,
  Phone,
  Mail,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";
import type { Lang } from "@/types/language";
import type { ILostFoundItem } from "@/types/lost-found";
import { LostFoundCategory } from "@/types/enum";
import { lostFound, type LostFoundKey } from "@/data/i18n/about/lost-found";
import { listLostFound, submitClaim } from "@/services/lost-found";

// ── Types ──────────────────────────────────────────────────────────────────

interface Props {
  lang: Lang;
  stats: { total: number; open: number; matched: number; returned: number };
}

// ── Category icons map ─────────────────────────────────────────────────────

const CATEGORY_ICONS: Record<LostFoundCategory, LucideIcon> = {
  [LostFoundCategory.ELECTRONICS]: Smartphone,
  [LostFoundCategory.BAGGAGE]:     Luggage,
  [LostFoundCategory.CLOTHING]:    Shirt,
  [LostFoundCategory.DOCUMENTS]:   FileText,
  [LostFoundCategory.JEWELRY]:     Gem,
  [LostFoundCategory.KEYS]:        KeyRound,
  [LostFoundCategory.CASH]:        Banknote,
  [LostFoundCategory.TOYS]:        Gamepad2,
  [LostFoundCategory.OTHER]:       Package,
};

// ── Helpers ────────────────────────────────────────────────────────────────

function t(key: LostFoundKey, lang: Lang): string {
  return lostFound[key][lang] ?? lostFound[key].en;
}

function formatDate(iso: string, lang: Lang) {
  return new Date(iso).toLocaleDateString(
    lang === "lo" ? "lo-LA" : lang === "zh" ? "zh-CN" : "en-US",
    { year: "numeric", month: "short", day: "numeric" },
  );
}

// ── Empty claim form ───────────────────────────────────────────────────────

const emptyForm = () => ({
  ownershipProof: "",
  flightNumber:   "",
  seatNumber:     "",
  claimantName:   "",
  claimantPhone:  "",
  claimantEmail:  "",
  files: [] as File[],
});

// ── Main component ─────────────────────────────────────────────────────────

export function LostFoundPageContent({ lang, stats }: Props) {
  const formId = useId();

  // search state
  const [query,      setQuery]      = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [results,    setResults]    = useState<ILostFoundItem[]>([]);
  const [searching,  setSearching]  = useState(false);

  // claim state
  const [selectedItem, setSelectedItem] = useState<ILostFoundItem | null>(null);
  const [form,         setForm]         = useState(emptyForm());
  const [submitting,   setSubmitting]   = useState(false);
  const [submitError,  setSubmitError]  = useState("");
  const [claimDone,    setClaimDone]    = useState(false);

  const claimRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 300 ms debounce — use "timer" to avoid shadowing the `t` translator
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQ(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  // fetch on debounced query change; also close claim form
  useEffect(() => {
    setSelectedItem(null);
    setClaimDone(false);
    setSubmitError("");
    if (!debouncedQ.trim()) { setResults([]); return; }
    let cancelled = false;
    setSearching(true);
    listLostFound({ search: debouncedQ, limit: 12 }, lang)
      .then(({ data }) => { if (!cancelled) setResults(data); })
      .catch(()       => { if (!cancelled) setResults([]); })
      .finally(()     => { if (!cancelled) setSearching(false); });
    return () => { cancelled = true; };
  }, [debouncedQ, lang]);

  // scroll claim form into view when opened
  useEffect(() => {
    if (!selectedItem) return;
    const tid = setTimeout(() => {
      claimRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => clearTimeout(tid);
  }, [selectedItem]);

  const handleSelect = useCallback((item: ILostFoundItem) => {
    setSelectedItem(item);
    setClaimDone(false);
    setSubmitError("");
    setForm(emptyForm());
  }, []);

  const handleCancel = useCallback(() => {
    setSelectedItem(null);
    setClaimDone(false);
    setSubmitError("");
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedItem) return;
      setSubmitting(true);
      setSubmitError("");
      try {
        const fd = new FormData();
        fd.append("claimantName",  form.claimantName);
        fd.append("claimantPhone", form.claimantPhone);
        if (form.claimantEmail) fd.append("claimantEmail", form.claimantEmail);
        if (form.flightNumber)  fd.append("flightNumber",  form.flightNumber);
        if (form.seatNumber)    fd.append("seatNumber",    form.seatNumber);
        fd.append("ownershipProof", form.ownershipProof);
        form.files.forEach((f) => fd.append("images", f));
        await submitClaim(selectedItem.id, fd);
        setClaimDone(true);
      } catch {
        setSubmitError(t("errorGeneric", lang));
      } finally {
        setSubmitting(false);
      }
    },
    [selectedItem, form, lang],
  );

  // InView refs for below-fold sections only (hero is always visible)
  const [statsRef, statsIn] = useInView<HTMLElement>({ threshold: 0.05 });
  const [howRef,   howIn]   = useInView<HTMLElement>({ threshold: 0.1  });
  const [ctaRef,   ctaIn]   = useInView<HTMLElement>({ threshold: 0.1  });

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <>
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
        .lf-up     { animation: lf-up    0.6s cubic-bezier(0.22,1,0.36,1) both; }
        .lf-in     { animation: lf-in    0.45s ease both; }
        .lf-scale  { animation: lf-scale 0.5s  cubic-bezier(0.22,1,0.36,1) both; }
        .lf-d1  { animation-delay: 0.08s; }
        .lf-d2  { animation-delay: 0.18s; }
        .lf-d3  { animation-delay: 0.28s; }
        .lf-d4  { animation-delay: 0.38s; }
        .lf-d5  { animation-delay: 0.48s; }
        @media (prefers-reduced-motion: reduce) {
          .lf-up, .lf-in, .lf-scale { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      {/* ── Hero (always rendered — animation fires on load) ──────────── */}
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
            {t("pageTitle", lang)}
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
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("searchPlaceholderMain", lang)}
                className="w-full rounded-2xl border border-white/20 bg-white/10 py-4 pl-12 pr-12 text-white placeholder-white/40 outline-none backdrop-blur-sm transition focus:border-white/40 focus:bg-white/15 focus:ring-2 focus:ring-white/20"
              />
              {query && (
                <button
                  onClick={() => { setQuery(""); setResults([]); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/50 transition hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────── */}
      <section
        ref={statsRef}
        className="border-b border-gray-100 bg-white py-10 md:py-14"
      >
        <div className="container">
          <p
            className={`mb-6 text-center text-xs font-semibold uppercase tracking-widest text-gray-400 transition-all duration-500 ${
              statsIn ? "opacity-100" : "opacity-0"
            }`}
          >
            {t("statsTitle", lang)}
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {(
              [
                { icon: Package,       key: "statTotal"    as LostFoundKey, value: stats.total,    color: "text-gray-700",    bg: "bg-gray-100"    },
                { icon: PackageSearch, key: "statOpen"     as LostFoundKey, value: stats.open,     color: "text-primary",     bg: "bg-primary/10"  },
                { icon: ScanSearch,    key: "statMatched"  as LostFoundKey, value: stats.matched,  color: "text-amber-600",   bg: "bg-amber-50"    },
                { icon: PackageCheck,  key: "statReturned" as LostFoundKey, value: stats.returned, color: "text-emerald-600", bg: "bg-emerald-50"  },
              ] as const
            ).map(({ icon: Icon, key, value, color, bg }, i) => (
              <div
                key={key}
                className={`flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm transition-all duration-700 md:p-6 ${
                  statsIn ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${bg}`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <span className="text-3xl font-bold text-gray-900">{value}</span>
                <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  {t(key, lang)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Search results + Claim form ───────────────────────────────── */}
      {debouncedQ && (
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
                onClick={() => { setQuery(""); setResults([]); handleCancel(); inputRef.current?.focus(); }}
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
                  return (
                    <div
                      key={item.id}
                      className={`border-b border-gray-100 last:border-0 transition-colors ${
                        isSelected ? "bg-primary/5" : "hover:bg-gray-50/60"
                      }`}
                    >
                      {/* Row */}
                      <div className="flex items-center gap-3 px-5 py-4">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                            isSelected ? "bg-primary/15 text-primary" : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          <Icon className="h-[18px] w-[18px]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-gray-900">{item.itemName}</p>
                          <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-gray-400">
                            <span>
                              {item.category.charAt(0) + item.category.slice(1).toLowerCase()}
                            </span>
                            <span className="flex items-center gap-1">
                              <CalendarDays className="h-3 w-3" />
                              {formatDate(item.incidentDate, lang)}
                            </span>
                            {item.flightNumber && (
                              <span className="flex items-center gap-1">
                                <PlaneTakeoff className="h-3 w-3" />
                                {item.flightNumber}
                              </span>
                            )}
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
                          className={`ml-2 flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                            isSelected
                              ? "bg-gray-200 text-gray-600 hover:bg-gray-300"
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
                          <div className="border-t border-primary/10 bg-primary/[0.03] px-5 py-6">
                            {claimDone && selectedItem?.id === item.id ? (
                              /* ── Success state ── */
                              <div className="lf-scale flex flex-col items-center gap-3 py-6 text-center">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                                  <CheckCircle2 className="h-7 w-7 text-emerald-600" />
                                </div>
                                <p className="font-semibold text-gray-900">{t("claimSuccess", lang)}</p>
                                <button
                                  onClick={handleCancel}
                                  className="mt-1 text-sm text-primary underline-offset-2 hover:underline"
                                >
                                  {t("backToList", lang)}
                                </button>
                              </div>
                            ) : (
                              /* ── Claim form ── */
                              <form
                                id={`${formId}-${item.id}`}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                              >
                                {/* Header */}
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                                    {t("claimItemLabel", lang)}
                                  </span>
                                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                    {item.itemName}
                                  </span>
                                </div>

                                {/* Section 1 — Describe */}
                                <ClaimSection title={t("claimSectionDescribe", lang)} number={1}>
                                  <label className="block">
                                    <span className="label-text">
                                      {t("ownershipProof", lang)} <Required />
                                    </span>
                                    <textarea
                                      required
                                      minLength={10}
                                      maxLength={2000}
                                      value={form.ownershipProof}
                                      onChange={(e) =>
                                        setForm((f) => ({ ...f, ownershipProof: e.target.value }))
                                      }
                                      placeholder={t("ownershipProofHint", lang)}
                                      rows={3}
                                      className="mt-1 w-full resize-none rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                    />
                                  </label>
                                </ClaimSection>

                                {/* Section 2 — Flight */}
                                <ClaimSection title={t("claimSectionFlight", lang)} number={2}>
                                  <div className="grid gap-3 sm:grid-cols-2">
                                    <label className="block">
                                      <span className="label-text">{t("claimFlightNumber", lang)}</span>
                                      <input
                                        type="text"
                                        maxLength={20}
                                        value={form.flightNumber}
                                        onChange={(e) =>
                                          setForm((f) => ({ ...f, flightNumber: e.target.value }))
                                        }
                                        placeholder="QV 201"
                                        className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                      />
                                      <span className="hint-text">{t("claimFlightHint", lang)}</span>
                                    </label>
                                    <label className="block">
                                      <span className="label-text">{t("claimSeatNumber", lang)}</span>
                                      <input
                                        type="text"
                                        maxLength={20}
                                        value={form.seatNumber}
                                        onChange={(e) =>
                                          setForm((f) => ({ ...f, seatNumber: e.target.value }))
                                        }
                                        placeholder="14A"
                                        className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                      />
                                      <span className="hint-text">{t("claimSeatHint", lang)}</span>
                                    </label>
                                  </div>
                                </ClaimSection>

                                {/* Section 3 — Proof files */}
                                <ClaimSection title={t("claimSectionProof", lang)} number={3}>
                                  <label className="block">
                                    <span className="label-text">{t("proofPhotos", lang)}</span>
                                    <div className="mt-1 rounded-xl border border-dashed border-gray-200 bg-white px-4 py-4 text-center transition hover:border-primary/40">
                                      <input
                                        type="file"
                                        accept="image/*,.pdf"
                                        multiple
                                        className="sr-only"
                                        id={`${formId}-files-${item.id}`}
                                        onChange={(e) => {
                                          const picked = Array.from(e.target.files ?? []);
                                          setForm((f) => ({
                                            ...f,
                                            files: [...f.files, ...picked].slice(0, 5),
                                          }));
                                        }}
                                      />
                                      <label
                                        htmlFor={`${formId}-files-${item.id}`}
                                        className="cursor-pointer text-xs font-medium text-primary hover:underline"
                                      >
                                        {form.files.length === 0
                                          ? t("proofPhotosHint", lang)
                                          : `${form.files.length} file(s) selected`}
                                      </label>
                                    </div>
                                    {form.files.length > 0 && (
                                      <ul className="mt-1.5 space-y-0.5">
                                        {form.files.map((f, fi) => (
                                          <li
                                            key={fi}
                                            className="flex items-center justify-between rounded-lg bg-white px-3 py-1.5 text-xs"
                                          >
                                            <span className="truncate text-gray-600">{f.name}</span>
                                            <button
                                              type="button"
                                              onClick={() =>
                                                setForm((prev) => ({
                                                  ...prev,
                                                  files: prev.files.filter((_, j) => j !== fi),
                                                }))
                                              }
                                              className="ml-2 shrink-0 text-gray-400 hover:text-red-500"
                                            >
                                              <X className="h-3.5 w-3.5" />
                                            </button>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </label>
                                </ClaimSection>

                                {/* Section 4 — Contact */}
                                <ClaimSection title={t("claimSectionContact", lang)} number={4}>
                                  <div className="grid gap-3 sm:grid-cols-2">
                                    <label className="block">
                                      <span className="label-text">
                                        {t("claimantName", lang)} <Required />
                                      </span>
                                      <input
                                        type="text"
                                        required
                                        minLength={2}
                                        value={form.claimantName}
                                        onChange={(e) =>
                                          setForm((f) => ({ ...f, claimantName: e.target.value }))
                                        }
                                        className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                      />
                                    </label>
                                    <label className="block">
                                      <span className="label-text">
                                        {t("claimantPhone", lang)} <Required />
                                      </span>
                                      <input
                                        type="tel"
                                        required
                                        value={form.claimantPhone}
                                        onChange={(e) =>
                                          setForm((f) => ({ ...f, claimantPhone: e.target.value }))
                                        }
                                        className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                      />
                                    </label>
                                    <label className="block sm:col-span-2">
                                      <span className="label-text">{t("claimantEmail", lang)}</span>
                                      <input
                                        type="email"
                                        value={form.claimantEmail}
                                        onChange={(e) =>
                                          setForm((f) => ({ ...f, claimantEmail: e.target.value }))
                                        }
                                        className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                      />
                                    </label>
                                  </div>
                                </ClaimSection>

                                {/* Error */}
                                {submitError && (
                                  <div className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3">
                                    <p className="flex-1 text-sm text-red-600">{submitError}</p>
                                    <button
                                      type="button"
                                      onClick={() => setSubmitError("")}
                                      className="mt-0.5 shrink-0 text-red-400 hover:text-red-600"
                                    >
                                      <X className="h-4 w-4" />
                                    </button>
                                  </div>
                                )}

                                {/* Submit row */}
                                <div className="flex items-center gap-3">
                                  <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-600 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-60"
                                  >
                                    {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                                    {submitting ? t("submitting", lang) : t("submitClaim", lang)}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-500 transition hover:border-gray-300 hover:text-gray-700"
                                  >
                                    {t("cancelClaim", lang)}
                                  </button>
                                </div>
                              </form>
                            )}
                          </div>
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
                <p className="mt-0.5 text-sm text-gray-400">{t("cantFindDesc", lang)}</p>
              </div>
              <Link
                href={`/${lang}/about/contact`}
                className="ml-4 shrink-0 rounded-xl border border-primary/30 px-4 py-2 text-xs font-semibold text-primary transition hover:border-primary hover:bg-primary/5"
              >
                {t("contactStaff", lang)}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── How it works ─────────────────────────────────────────────── */}
      <section ref={howRef} className="bg-white py-14 md:py-20">
        <div className="container max-w-4xl">
          <p
            className={`mb-10 text-center text-xs font-semibold uppercase tracking-widest text-primary transition-all duration-500 ${
              howIn ? "opacity-100" : "opacity-0"
            }`}
          >
            {t("howItWorks", lang)}
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { n: "01", title: t("howStep1Title", lang), desc: t("howStep1Desc", lang), icon: Search       },
              { n: "02", title: t("howStep2Title", lang), desc: t("howStep2Desc", lang), icon: PackageSearch },
              { n: "03", title: t("howStep3Title", lang), desc: t("howStep3Desc", lang), icon: Phone        },
            ].map(({ n, title, desc, icon: Icon }, i) => (
              <div
                key={n}
                className={`relative rounded-2xl border border-gray-100 bg-gray-50 p-6 transition-all duration-700 ${
                  howIn ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="select-none text-xl font-black text-gray-100">{n}</span>
                </div>
                <h3 className="mb-2 font-bold text-gray-900">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ───────────────────────────────────────────────── */}
      <section ref={ctaRef} className="bg-primary-50 py-14 md:py-20">
        <div
          className={`container max-w-2xl text-center transition-all duration-700 ${
            ctaIn ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
            <Phone className="h-5 w-5 text-primary" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
            {t("stillNeedHelp", lang)}
          </h2>
          <p className="mb-8 text-gray-500">{t("ctaSubtitle", lang)}</p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="tel:+85684260179"
              className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-600 hover:shadow-lg hover:shadow-primary/20 sm:w-auto"
            >
              <Phone className="h-4 w-4" />
              {t("callUs", lang)}
              <span className="opacity-80">· +856 84 260 179</span>
            </Link>
            <Link
              href="mailto:info@bokeointernationalairport.com"
              className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-primary/30 bg-white px-6 py-3.5 text-sm font-semibold text-primary transition-all hover:border-primary hover:shadow-md sm:w-auto"
            >
              <Mail className="h-4 w-4" />
              {t("emailUs", lang)}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Shared label / hint styles ─────────────────────────────────── */}
      <style>{`
        .label-text { font-size: 0.75rem; font-weight: 500; color: #374151; }
        .hint-text  { display: block; font-size: 0.7rem; color: #9ca3af; margin-top: 0.25rem; }
      `}</style>
    </>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────

function ClaimSection({
  title,
  number,
  children,
}: {
  title: string;
  number: number;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2.5">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
          {number}
        </span>
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <div className="h-px flex-1 bg-gray-100" />
      </div>
      {children}
    </div>
  );
}

function Required() {
  return <span className="text-red-500"> *</span>;
}
