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

// ── Text overlay ──────────────────────────────────────────────────────────────
function HeroTextOverlay({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-[#0a1428]/90 via-[#0a1428]/20 to-transparent px-6 pb-8 sm:px-10 sm:pb-12">
      <p
        className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#00AAAC]"
        style={{ animation: "hero-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0.15s both" }}
      >
        BKIA — Careers
      </p>
      <h2
        className="max-w-2xl text-2xl font-bold leading-tight text-white sm:text-4xl"
        style={{ animation: "hero-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.28s both" }}
      >
        {title}
      </h2>
      <p
        className="mt-2 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base"
        style={{ animation: "hero-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.42s both" }}
      >
        {subtitle}
      </p>
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
function HeroFallback({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="relative h-56 overflow-hidden bg-[#1a2c5b] sm:h-72 md:h-80">
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
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-14 sm:gap-24">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-8 w-0.5 rounded-full bg-[#00AAAC]/25 sm:h-12" />
        ))}
      </div>
      <HeroTextOverlay title={title} subtitle={subtitle} />
    </div>
  );
}

// ── Single image ──────────────────────────────────────────────────────────────
function HeroSingle({
  activity,
  title,
  subtitle,
}: {
  activity: ICareerActivity;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="relative h-56 overflow-hidden bg-[#0a1428] sm:h-72 md:h-80">
      {/* Image constrained to max-w-5xl, centered */}
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
      <HeroTextOverlay title={title} subtitle={subtitle} />
    </div>
  );
}

// ── Two-image split ───────────────────────────────────────────────────────────
function HeroDouble({
  activities,
  title,
  subtitle,
}: {
  activities: ICareerActivity[];
  title: string;
  subtitle: string;
}) {
  return (
    <div className="relative h-56 overflow-hidden bg-[#0a1428] sm:h-72 md:h-80">
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
      <HeroTextOverlay title={title} subtitle={subtitle} />
    </div>
  );
}

// ── 3-up carousel (3+ images): prev peek | center MAIN | next peek ────────────
function HeroCarousel({
  activities,
  title,
  subtitle,
}: {
  activities: ICareerActivity[];
  title: string;
  subtitle: string;
}) {
  const total = activities.length;
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const prevIndex = (active - 1 + total) % total;
  const nextIndex = (active + 1) % total;

  const goTo = (i: number) => {
    if (i === active) return;
    setActive(i);
  };

  const goNext = () => setActive((a) => (a + 1) % total);
  const goPrev = () => setActive((a) => (a - 1 + total) % total);

  // Auto-advance — reset timer on manual nav
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
    <div className="relative h-56 overflow-hidden bg-[#0a1428] sm:h-72 md:h-80">

      {/* ── Left peek — shows PREV image ── */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/4 overflow-hidden">
        {activities.map((act, i) => (
          <div
            key={act.id}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: i === prevIndex ? 1 : 0 }}
          >
            <Image
              src={asset(act.image.path)}
              alt=""
              fill
              sizes="25vw"
              className="object-cover object-right"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-[#0a1428]/60" />
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0a1428] to-transparent" />
      </div>

      {/* ── Center MAIN — pure crossfade, no keyframes ── */}
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

      {/* ── Right peek — shows NEXT image ── */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-1/4 overflow-hidden">
        {activities.map((act, i) => (
          <div
            key={act.id}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: i === nextIndex ? 1 : 0 }}
          >
            <Image
              src={asset(act.image.path)}
              alt=""
              fill
              sizes="25vw"
              className="object-cover object-left"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-[#0a1428]/60" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0a1428] to-transparent" />
      </div>

      {/* ── Thin dividers between panels ── */}
      <div className="pointer-events-none absolute inset-y-0 left-1/4 z-20 w-px bg-white/10" />
      <div className="pointer-events-none absolute inset-y-0 right-1/4 z-20 w-px bg-white/10" />

      {/* ── Prev / Next arrow buttons ── */}
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

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 sm:bottom-6">
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

      {/* ── Text overlay — rendered above all images ── */}
      <HeroTextOverlay title={title} subtitle={subtitle} />
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function CareersHero({
  activities,
  lang: _lang,
  title,
  subtitle,
}: CareersHeroProps) {
  const count = activities.length;
  if (count === 0) return <HeroFallback title={title} subtitle={subtitle} />;
  if (count === 1)
    return <HeroSingle activity={activities[0]} title={title} subtitle={subtitle} />;
  if (count === 2)
    return <HeroDouble activities={activities} title={title} subtitle={subtitle} />;
  return <HeroCarousel activities={activities} title={title} subtitle={subtitle} />;
}
