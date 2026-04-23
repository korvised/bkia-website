"use client";

import { Building2, MapPin } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import type { Lang } from "@/types/language";
import { facilitiesServices } from "@/data/guide";
import { getLocalizedText } from "@/lib";
import { createDepartureGuideI18n } from "@/data/i18n/guides";

// ── Icon color map (bg + text per facility.color) ─────────────────────────────
const ICON_COLORS: Record<string, { bg: string; text: string }> = {
  indigo:    { bg: "bg-indigo-50",   text: "text-indigo-600"  },
  blue:      { bg: "bg-sky-50",      text: "text-sky-600"     },
  cyan:      { bg: "bg-cyan-50",     text: "text-cyan-600"    },
  teal:      { bg: "bg-teal-50",     text: "text-teal-600"    },
  primary:   { bg: "bg-primary/10",  text: "text-primary"     },
  secondary: { bg: "bg-primary/10",  text: "text-primary"     },
  violet:    { bg: "bg-violet-50",   text: "text-violet-600"  },
  purple:    { bg: "bg-purple-50",   text: "text-purple-600"  },
  rose:      { bg: "bg-rose-50",     text: "text-rose-600"    },
  pink:      { bg: "bg-pink-50",     text: "text-pink-600"    },
  fuchsia:   { bg: "bg-fuchsia-50",  text: "text-fuchsia-600" },
  amber:     { bg: "bg-amber-50",    text: "text-amber-600"   },
  yellow:    { bg: "bg-yellow-50",   text: "text-yellow-600"  },
  orange:    { bg: "bg-orange-50",   text: "text-orange-600"  },
  emerald:   { bg: "bg-emerald-50",  text: "text-emerald-600" },
  green:     { bg: "bg-green-50",    text: "text-green-600"   },
  lime:      { bg: "bg-lime-50",     text: "text-lime-600"    },
  slate:     { bg: "bg-slate-100",   text: "text-slate-500"   },
  gray:      { bg: "bg-gray-100",    text: "text-gray-500"    },
};
const DEFAULT_COLOR = { bg: "bg-primary/10", text: "text-primary" };

// ── Component ─────────────────────────────────────────────────────────────────
export function FacilitiesContent({ lang }: { lang: Lang }) {
  const { facilities: t } = createDepartureGuideI18n(lang);

  const [heroRef, heroIn] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [gridRef, gridIn] = useInView<HTMLDivElement>({ threshold: 0.03 });

  return (
    <>
      <style>{`
        @keyframes fac-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .fac-anim { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="bg-primary-700">
        <div
          ref={heroRef}
          className="container py-14 lg:py-20"
        >
          <p
            className="fac-anim mb-3 text-[10px] font-extrabold uppercase tracking-[0.32em] text-primary-300"
            style={heroIn ? { animation: "fac-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
          >
            {t.eyebrow}
          </p>
          <h1
            className="fac-anim text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-5xl"
            style={heroIn ? { animation: "fac-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 80ms both" } : { opacity: 0 }}
          >
            {t.title}
          </h1>
          <p
            className="fac-anim mt-4 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base"
            style={heroIn ? { animation: "fac-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 160ms both" } : { opacity: 0 }}
          >
            {t.subtitle}
          </p>
          <div
            className="fac-anim mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/70"
            style={heroIn ? { animation: "fac-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 240ms both" } : { opacity: 0 }}
          >
            <Building2 className="h-3.5 w-3.5" />
            {facilitiesServices.length} {t.facilitiesCount}
          </div>
        </div>
      </section>

      <div className="via-primary/30 h-px bg-gradient-to-r from-transparent to-transparent" />

      {/* ── Grid ──────────────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-14 sm:py-18">
        <div ref={gridRef} className="container">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facilitiesServices.map((facility, i) => {
              const Icon = facility.icon;
              const name        = getLocalizedText(facility.name,             lang);
              const shortDesc   = getLocalizedText(facility.shortDescription, lang);
              const description = getLocalizedText(facility.description,      lang);
              const c           = ICON_COLORS[facility.color] ?? DEFAULT_COLOR;

              // Build single-line location strings — area · floor · nearBy
              const locations = (facility.location ?? []).map((loc) => {
                const parts: string[] = [getLocalizedText(loc.area, lang)];
                if (loc.floor)  parts.push(getLocalizedText(loc.floor,  lang));
                if (loc.nearBy) parts.push(getLocalizedText(loc.nearBy, lang));
                return parts.join(" · ");
              });

              return (
                <div
                  key={facility.id}
                  className="fac-anim flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  style={
                    gridIn
                      ? { animation: `fac-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 70}ms both` }
                      : { opacity: 0 }
                  }
                >
                  {/* Icon badge */}
                  <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${c.bg}`}>
                    <Icon className={`h-5 w-5 ${c.text}`} />
                  </div>

                  {/* Name + short description */}
                  <h3 className="font-bold text-gray-900">{name}</h3>
                  <p className="mt-0.5 text-xs font-medium text-gray-400">{shortDesc}</p>

                  {/* Description */}
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-500">{description}</p>

                  {/* Location — one row per entry, area · floor · nearBy inline */}
                  {locations.length > 0 && (
                    <div className="mt-4 space-y-1.5 border-t border-gray-50 pt-4">
                      {locations.map((loc, li) => (
                        <span
                          key={li}
                          className="flex items-center gap-1.5 text-xs text-gray-400"
                        >
                          <MapPin className="h-3 w-3 shrink-0 text-primary/50" />
                          {loc}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
