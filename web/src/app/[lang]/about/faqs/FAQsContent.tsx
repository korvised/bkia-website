"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  X,
  ChevronDown,
  ArrowRight,
  PlaneTakeoff,
  Luggage,
  ShieldCheck,
  Building2,
  Car,
  Phone,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";
import type { Lang } from "@/types/language";
import { faqs, faqData, type FAQCategory } from "@/data/i18n/about/faqs";

interface Props {
  lang: Lang;
}

// ── Category config ────────────────────────────────────────────────────────

type CategoryConfig = {
  id: FAQCategory;
  icon: LucideIcon;
  labelKey: keyof typeof faqs;
};

const CATEGORIES: CategoryConfig[] = [
  { id: "flights",   icon: PlaneTakeoff, labelKey: "catFlights"   },
  { id: "checkin",   icon: Luggage,      labelKey: "catCheckin"   },
  { id: "security",  icon: ShieldCheck,  labelKey: "catSecurity"  },
  { id: "services",  icon: Building2,    labelKey: "catServices"  },
  { id: "transport", icon: Car,          labelKey: "catTransport" },
];

// ── Helpers ────────────────────────────────────────────────────────────────

function t(key: keyof typeof faqs, lang: Lang): string {
  return faqs[key][lang] ?? faqs[key].en;
}

function highlight(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-primary/20 text-primary-700 rounded-sm px-0.5 font-medium not-italic">
        {part}
      </mark>
    ) : part
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export function FAQsContent({ lang }: Props) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<FAQCategory>("flights");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const sectionRefs = useRef<Record<FAQCategory, HTMLElement | null>>({
    flights: null, checkin: null, security: null, services: null, transport: null,
  });
  const navRef = useRef<HTMLDivElement>(null);

  // Filtered items
  const q = query.trim().toLowerCase();
  const filtered = q
    ? faqData.filter(
        (item) =>
          item.q[lang].toLowerCase().includes(q) ||
          item.a[lang].toLowerCase().includes(q)
      )
    : faqData;

  // Grouped for display
  const grouped = CATEGORIES.map((cat) => ({
    ...cat,
    items: filtered.filter((f) => f.cat === cat.id),
  })).filter((g) => g.items.length > 0);

  // Intersection observer → sync active category tab when scrolling
  useEffect(() => {
    if (query) return;
    const observers: IntersectionObserver[] = [];
    CATEGORIES.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveCategory(id); },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [query]);

  const scrollToCategory = useCallback((id: FAQCategory) => {
    setQuery("");
    setActiveCategory(id);
    setTimeout(() => {
      const el = sectionRefs.current[id];
      if (!el) return;
      const navHeight = navRef.current?.offsetHeight ?? 64;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 24;
      window.scrollTo({ top, behavior: "smooth" });
    }, 50);
  }, []);

  // Entrance animations
  const [heroRef, heroIn]    = useInView({ threshold: 0.1 });
  const [bodyRef, bodyIn]    = useInView({ threshold: 0.05 });
  const [ctaRef, ctaIn]      = useInView({ threshold: 0.1 });

  return (
    <>
      <style>{`
        @keyframes fq-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fq-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .fq-up  { animation: fq-up  0.65s cubic-bezier(0.22,1,0.36,1) both; }
        .fq-in  { animation: fq-in  0.5s  ease both; }
        .fq-d1  { animation-delay: 0.1s; }
        .fq-d2  { animation-delay: 0.2s; }
        .fq-d3  { animation-delay: 0.3s; }
        .fq-d4  { animation-delay: 0.4s; }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        ref={heroRef as React.RefObject<HTMLElement>}
        className="relative overflow-hidden bg-primary-800 px-4 py-16 md:py-24"
      >
        {/* decorative arcs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/5" />
          <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full border border-white/5" />
          <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-primary-900/40 to-transparent" />
        </div>

        <div className="container relative text-center">
          {heroIn && (
            <>
              <p className="fq-up fq-d1 mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80">
                FAQ
              </p>
              <h1 className="fq-up fq-d2 mb-3 text-3xl font-bold text-white md:text-5xl">
                {t("heroTitle", lang)}
              </h1>
              <p className="fq-up fq-d3 mx-auto mb-10 max-w-xl text-base text-white/70 md:text-lg">
                {t("heroSubtitle", lang)}
              </p>

              {/* Search */}
              <div className="fq-up fq-d4 mx-auto max-w-xl">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t("searchPlaceholder", lang)}
                    className="w-full rounded-2xl border border-white/20 bg-white/10 py-4 pl-12 pr-12 text-white placeholder-white/40 outline-none backdrop-blur-sm transition focus:border-white/40 focus:bg-white/15 focus:ring-2 focus:ring-white/20"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/50 transition hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Sticky category nav ───────────────────────────────────────── */}
      {!query && (
        <nav
          ref={navRef}
          className="sticky top-0 z-20 border-b border-gray-100 bg-white shadow-sm"
        >
          <div className="container">
            <div className="-mb-px flex gap-1 overflow-x-auto scrollbar-hide">
              {CATEGORIES.map(({ id, icon: Icon, labelKey }) => (
                <button
                  key={id}
                  onClick={() => scrollToCategory(id)}
                  className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-4 text-sm font-medium transition-colors ${
                    activeCategory === id
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-800"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{t(labelKey, lang)}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* ── FAQ body ──────────────────────────────────────────────────── */}
      <section
        ref={bodyRef as React.RefObject<HTMLElement>}
        className="bg-white py-10 md:py-16"
      >
        <div className="container max-w-3xl">

          {/* Search results header */}
          {query && (
            <div className={`mb-8 flex items-center justify-between transition-opacity duration-300 ${bodyIn ? "opacity-100" : "opacity-0"}`}>
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-800">{filtered.length}</span>{" "}
                {t("searchResults", lang)}{" "}
                <span className="font-semibold text-primary">"{query}"</span>
              </p>
              <button
                onClick={() => setQuery("")}
                className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500 transition hover:border-primary hover:text-primary"
              >
                <X className="h-3 w-3" />
                {t("clearSearch", lang)}
              </button>
            </div>
          )}

          {/* No results */}
          {filtered.length === 0 && (
            <div className={`py-16 text-center transition-opacity duration-500 ${bodyIn ? "opacity-100" : "opacity-0"}`}>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <Search className="h-7 w-7 text-gray-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800">{t("noResults", lang)}</h3>
              <p className="text-sm text-gray-500">{t("noResultsHint", lang)}</p>
            </div>
          )}

          {/* Grouped sections */}
          <div className="space-y-14">
            {grouped.map(({ id, icon: Icon, labelKey, items }, gIdx) => (
              <div
                key={id}
                ref={(el) => { sectionRefs.current[id] = el; }}
                className={`transition-all duration-700 ${bodyIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${gIdx * 80}ms` }}
              >
                {/* Section header */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{t(labelKey, lang)}</h2>
                  <div className="ml-2 h-px flex-1 bg-gray-100" />
                </div>

                {/* Q&A items */}
                <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100">
                  {items.map((faq) => {
                    const isOpen = query ? true : expanded.has(faq.id);
                    return (
                      <div key={faq.id} className="group transition-colors hover:bg-gray-50/60">
                        {/* Question row — clickable */}
                        <button
                          onClick={() => toggle(faq.id)}
                          className="flex w-full items-start gap-4 px-6 py-5 text-left"
                        >
                          <div className="mt-0.5 shrink-0">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                              Q
                            </span>
                          </div>
                          <p className="flex-1 font-semibold leading-snug text-gray-900">
                            {highlight(faq.q[lang], query)}
                          </p>
                          <ChevronDown
                            className={`mt-0.5 h-4 w-4 shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        {/* Answer — animated expand */}
                        <div
                          style={{
                            display: "grid",
                            gridTemplateRows: isOpen ? "1fr" : "0fr",
                            transition: "grid-template-rows 0.35s cubic-bezier(0.22,1,0.36,1)",
                          }}
                        >
                          <div className="overflow-hidden">
                            <div className="pb-5 pl-16 pr-6">
                              <p className="text-sm leading-relaxed text-gray-500">
                                {highlight(faq.a[lang], query)}
                              </p>
                              {faq.links && faq.links.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {faq.links.map((link) => (
                                    <Link
                                      key={link.href}
                                      href={`/${lang}${link.href}`}
                                      className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-xs font-medium text-primary transition-all hover:border-primary/50 hover:bg-primary/10"
                                    >
                                      {link.label[lang]}
                                      <ArrowRight className="h-3 w-3" />
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ───────────────────────────────────────────────── */}
      <section
        ref={ctaRef as React.RefObject<HTMLElement>}
        className="bg-primary-50 py-14 md:py-20"
      >
        <div className={`container max-w-2xl text-center transition-all duration-700 ${ctaIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
            <Phone className="h-5 w-5 text-primary" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
            {t("stillHaveQuestions", lang)}
          </h2>
          <p className="mb-8 text-gray-500">{t("contactSubtitle", lang)}</p>
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
    </>
  );
}
