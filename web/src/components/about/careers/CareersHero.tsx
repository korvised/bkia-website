"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { asset } from "@/lib";
import type { ICareerActivity } from "@/types/careers";
import type { Lang } from "@/types/language";

interface CareersHeroProps {
  activities: ICareerActivity[];
  lang: Lang;
  title: string;
  subtitle: string;
}

const CAREERS_LABEL: Record<Lang, string> = {
  en: "Careers",
  lo: "ຮ່ວມງານກັບພວກເຮົາ",
  zh: "人才招聘",
};

// ── Text overlay + scroll indicator ──────────────────────────────────────────
function HeroOverlay({
  title,
  subtitle,
  lang,
}: {
  title: string;
  subtitle: string;
  lang: Lang;
}) {
  const label = CAREERS_LABEL[lang];

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-end px-6 sm:px-10"
      style={{
        background:
          "linear-gradient(to bottom, transparent 0%, transparent 45%, rgba(10,20,40,0.78) 72%, rgba(10,20,40,0.96) 100%)",
      }}
    >
      {/* ── Title / subtitle ── */}
      <div className="pb-8 sm:pb-12">
        <p
          className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#00AAAC]"
          style={{
            animation: "hero-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0.15s both",
          }}
        >
          BKIA — {label}
        </p>
        <h2
          className="max-w-2xl text-2xl font-bold leading-tight text-white sm:text-4xl"
          style={{
            animation: "hero-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.28s both",
          }}
        >
          {title}
        </h2>
        <p
          className="mt-2 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base"
          style={{
            animation: "hero-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.42s both",
          }}
        >
          {subtitle}
        </p>
      </div>

      <style>{`
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="hero-fade-up"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

// ── Fallback (0 images) ───────────────────────────────────────────────────────
function HeroFallback({
  title,
  subtitle,
  lang,
}: {
  title: string;
  subtitle: string;
  lang: Lang;
}) {
  return (
    <div className="relative h-full overflow-hidden bg-[#1a2c5b]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 top-0 h-full w-1/2 bg-[#00AAAC]/5 [transform:skewX(-8deg)]" />
        <div className="absolute -right-10 top-0 h-full w-1/3 bg-[#00AAAC]/4 [transform:skewX(-8deg)]" />
      </div>
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "52px 52px",
        }}
      />
      <div className="absolute inset-0 flex select-none items-center justify-center overflow-hidden">
        <span className="text-[150px] font-black leading-none tracking-tighter text-white/[0.025] sm:text-[230px]">
          BKIA
        </span>
      </div>
      <HeroOverlay title={title} subtitle={subtitle} lang={lang} />
    </div>
  );
}

// ── Single image ──────────────────────────────────────────────────────────────
function HeroSingle({
  activity,
  title,
  subtitle,
  lang,
}: {
  activity: ICareerActivity;
  title: string;
  subtitle: string;
  lang: Lang;
}) {
  return (
    <div className="relative h-full overflow-hidden bg-[#0a1428]">
      <div className="absolute inset-y-0 left-1/2 w-full max-w-5xl -translate-x-1/2">
        <Image
          src={asset(activity.image.path)}
          alt={activity.caption?.en ?? "Company activity"}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
          priority
        />
      </div>
      <HeroOverlay title={title} subtitle={subtitle} lang={lang} />
    </div>
  );
}

// ── Two-image split ───────────────────────────────────────────────────────────
function HeroDouble({
  activities,
  title,
  subtitle,
  lang,
}: {
  activities: ICareerActivity[];
  title: string;
  subtitle: string;
  lang: Lang;
}) {
  return (
    <div className="relative h-full overflow-hidden bg-[#0a1428]">
      <div className="grid h-full grid-cols-2 gap-1">
        {activities.slice(0, 2).map((act) => (
          <div key={act.id} className="relative overflow-hidden">
            <Image
              src={asset(act.image.path)}
              alt={act.caption?.en ?? ""}
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <HeroOverlay title={title} subtitle={subtitle} lang={lang} />
    </div>
  );
}

// ── Carousel (3+ images): prev peek | centre MAIN | next peek ─────────────────
function HeroCarousel({
  activities,
  title,
  subtitle,
  lang,
}: {
  activities: ICareerActivity[];
  title: string;
  subtitle: string;
  lang: Lang;
}) {
  const total = activities.length;
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const prevIndex = (active - 1 + total) % total;
  const nextIndex = (active + 1) % total;

  const goTo = (i: number) => { if (i !== active) setActive(i); };
  const goNext = () => setActive((a) => (a + 1) % total);
  const goPrev = () => setActive((a) => (a - 1 + total) % total);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(goNext, 5000);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const handlePrev = () => { goPrev(); resetTimer(); };
  const handleNext = () => { goNext(); resetTimer(); };

  return (
    <div className="relative h-full overflow-hidden bg-[#0a1428]">

      {/* Left peek — PREV image */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/4 overflow-hidden">
        {activities.map((act, i) => (
          <div
            key={act.id}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: i === prevIndex ? 1 : 0 }}
          >
            <Image src={asset(act.image.path)} alt="" fill sizes="25vw" className="object-cover object-right" />
          </div>
        ))}
        <div className="absolute inset-0 bg-[#0a1428]/60" />
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0a1428] to-transparent" />
      </div>

      {/* Centre MAIN — crossfade */}
      <div className="absolute inset-y-0 left-1/4 right-1/4 z-10 overflow-hidden">
        {activities.map((act, i) => (
          <div
            key={act.id}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}
          >
            <Image
              src={asset(act.image.path)}
              alt={act.caption?.en ?? "Company activity"}
              fill
              sizes="50vw"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Right peek — NEXT image */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-1/4 overflow-hidden">
        {activities.map((act, i) => (
          <div
            key={act.id}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: i === nextIndex ? 1 : 0 }}
          >
            <Image src={asset(act.image.path)} alt="" fill sizes="25vw" className="object-cover object-left" />
          </div>
        ))}
        <div className="absolute inset-0 bg-[#0a1428]/60" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0a1428] to-transparent" />
      </div>

      {/* Panel dividers */}
      <div className="pointer-events-none absolute inset-y-0 left-1/4 z-20 w-px bg-white/10" />
      <div className="pointer-events-none absolute inset-y-0 right-1/4 z-20 w-px bg-white/10" />

      {/* Prev / Next buttons */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous image"
        className="absolute left-[26%] top-1/2 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/55 sm:h-9 sm:w-9"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={handleNext}
        aria-label="Next image"
        className="absolute right-[26%] top-1/2 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/55 sm:h-9 sm:w-9"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators — tucked at the very bottom edge */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 sm:bottom-8">
        {activities.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => { goTo(i); resetTimer(); }}
            aria-label={`Image ${i + 1}`}
            className={`h-0.5 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-white" : "w-2 bg-white/35"
            }`}
          />
        ))}
      </div>

      <HeroOverlay title={title} subtitle={subtitle} lang={lang} />
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function CareersHero({ activities, lang, title, subtitle }: CareersHeroProps) {
  const count = activities.length;
  if (count === 0) return <HeroFallback title={title} subtitle={subtitle} lang={lang} />;
  if (count === 1) return <HeroSingle activity={activities[0]} title={title} subtitle={subtitle} lang={lang} />;
  if (count === 2) return <HeroDouble activities={activities} title={title} subtitle={subtitle} lang={lang} />;
  return <HeroCarousel activities={activities} title={title} subtitle={subtitle} lang={lang} />;
}
