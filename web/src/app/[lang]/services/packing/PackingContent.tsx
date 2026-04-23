"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Package,
  Flame,
  Zap,
  Scissors,
  Apple,
  Bomb,
  ChevronRight,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";
import type { Lang } from "@/types/language";
import { createPackingI18n } from "@/data/i18n/services/packing";

// ── Slideshow images ──────────────────────────────────────────────────────────
// Edit this array to change/add images
const PACKING_IMAGES = [
  "https://bkia-website.s3.ap-southeast-7.amazonaws.com/services/packing/packing-1.jpg",
  "https://bkia-website.s3.ap-southeast-7.amazonaws.com/services/packing/packing-2.jpg",
] as const;

// ── Prohibited item icon list (order matches per-lang arrays) ─────────────────
const PROHIBITED_ICONS = [Flame, Bomb, Zap, Scissors, Apple] as const;

// ── Pricing sizes ─────────────────────────────────────────────────────────────
const SIZE_COLORS = [
  {
    bg: "bg-primary-50",
    border: "border-primary/20",
    label: "text-primary",
    price: "text-primary-800",
    icon: "bg-primary/10 text-primary",
  },
  {
    bg: "bg-amber-50",
    border: "border-amber-200",
    label: "text-amber-600",
    price: "text-amber-800",
    icon: "bg-amber-100 text-amber-600",
  },
  {
    bg: "bg-primary-50",
    border: "border-primary/20",
    label: "text-primary",
    price: "text-primary-800",
    icon: "bg-primary/10 text-primary",
  },
] as const;

// ── Component ─────────────────────────────────────────────────────────────────
export function PackingContent({ lang }: { lang: Lang }) {
  const { packing: t, benefits, sizes, prohibited } = createPackingI18n(lang);

  // ── Slideshow ───────────────────────────────────────────────────────────────
  const [slide, setSlide] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (PACKING_IMAGES.length <= 1) return;
    timerRef.current = setInterval(
      () => setSlide((s) => (s + 1) % PACKING_IMAGES.length),
      4500,
    );
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const [heroRef, heroInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [priceRef, priceInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [prohibRef, prohibInView] = useInView<HTMLDivElement>({
    threshold: 0.05,
  });
  const [locationRef, locationInView] = useInView<HTMLDivElement>({
    threshold: 0.15,
  });

  return (
    <>
      <style>{`
        @keyframes pk-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pk-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pk-anim { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      {/* ── 1. Hero — dark split ──────────────────────────────────────────────── */}
      <section className="bg-primary-700">
        <div
          ref={heroRef}
          className="container grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20"
        >
          {/* Left: text + benefits */}
          <div>
            <p
              className="pk-anim text-primary-300 mb-3 text-[10px] font-extrabold tracking-[0.32em] uppercase"
              style={
                heroInView
                  ? {
                      animation:
                        "pk-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both",
                    }
                  : { opacity: 0 }
              }
            >
              {t.eyebrow}
            </p>
            <h1
              className="pk-anim text-3xl leading-[1.15] font-bold text-white sm:text-4xl lg:text-5xl"
              style={
                heroInView
                  ? {
                      animation:
                        "pk-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 80ms both",
                    }
                  : { opacity: 0 }
              }
            >
              {t.title}
            </h1>
            <p
              className="pk-anim mt-4 max-w-md text-sm leading-relaxed text-white/55 sm:text-base"
              style={
                heroInView
                  ? {
                      animation:
                        "pk-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 160ms both",
                    }
                  : { opacity: 0 }
              }
            >
              {t.subtitle}
            </p>

            {/* Benefits */}
            <div
              className="pk-anim mt-8 space-y-3"
              style={
                heroInView
                  ? {
                      animation:
                        "pk-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) 260ms both",
                    }
                  : { opacity: 0 }
              }
            >
              {benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="bg-primary/15 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg">
                    <CheckCircle2 className="text-primary-300 h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white/90">
                      {b.label}
                    </span>
                    <span className="ml-2 text-xs text-white/35">{b.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image */}
          <div
            className="pk-anim relative overflow-hidden rounded-2xl"
            style={
              heroInView
                ? {
                    animation:
                      "pk-fade-in 0.8s cubic-bezier(0.22,1,0.36,1) 100ms both",
                  }
                : { opacity: 0 }
            }
          >
            {/* Shield badge */}
            <div className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
              <Shield className="text-primary-300 h-4 w-4" />
            </div>

            {/* Crossfade slides */}
            <div className="relative aspect-[4/3]">
              {PACKING_IMAGES.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt="Luggage wrapping service"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-opacity duration-1000 ease-in-out"
                  style={{ opacity: i === slide ? 1 : 0 }}
                  priority={i === 0}
                />
              ))}
            </div>

            {/* Bottom strip: caption + dots */}
            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/60 to-transparent px-5 py-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-white/80">{t.eyebrow}</p>
                {PACKING_IMAGES.length > 1 && (
                  <div className="flex items-center gap-1.5">
                    {PACKING_IMAGES.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setSlide(i);
                          if (timerRef.current) clearInterval(timerRef.current);
                          timerRef.current = setInterval(
                            () => setSlide((s) => (s + 1) % PACKING_IMAGES.length),
                            4500,
                          );
                        }}
                        aria-label={`Slide ${i + 1}`}
                        className={`h-0.5 rounded-full transition-all duration-300 ${i === slide ? "w-5 bg-white" : "w-1.5 bg-white/40"}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="via-primary/30 h-px bg-gradient-to-r from-transparent to-transparent" />

      {/* ── 2. Pricing ───────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-14 sm:py-18">
        <div className="container">
          <div ref={priceRef}>
            <p
              className="pk-anim text-primary mb-1 text-[10px] font-extrabold tracking-[0.32em] uppercase"
              style={
                priceInView
                  ? {
                      animation:
                        "pk-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both",
                    }
                  : { opacity: 0 }
              }
            >
              {t.pricingLabel}
            </p>
            <h2
              className="pk-anim text-primary-800 text-2xl font-bold sm:text-3xl"
              style={
                priceInView
                  ? {
                      animation:
                        "pk-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 70ms both",
                    }
                  : { opacity: 0 }
              }
            >
              {t.pricingTitle}
            </h2>
            <p
              className="pk-anim mt-1.5 text-sm text-gray-400"
              style={
                priceInView
                  ? {
                      animation:
                        "pk-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 140ms both",
                    }
                  : { opacity: 0 }
              }
            >
              {t.pricingNote}
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {sizes.map((sz, i) => {
              const c = SIZE_COLORS[i];
              return (
                <div
                  key={sz.key}
                  className={`pk-anim flex flex-col items-center rounded-2xl border ${c.bg} ${c.border} px-6 py-8 text-center transition-shadow hover:shadow-md`}
                  style={
                    priceInView
                      ? {
                          animation: `pk-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) ${220 + i * 100}ms both`,
                        }
                      : { opacity: 0 }
                  }
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${c.icon}`}
                  >
                    <Package className="h-6 w-6" />
                  </div>
                  <p
                    className={`text-xs font-extrabold tracking-[0.22em] uppercase ${c.label}`}
                  >
                    {sz.label}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">{sz.sublabel}</p>
                  <div className="my-4 h-px w-10 bg-current opacity-10" />
                  <p className="text-xs text-gray-400">{t.startingFrom}</p>
                  <p className={`mt-0.5 text-3xl font-black leading-none ${c.price}`}>
                    {sz.lak}
                  </p>
                  <p className={`mt-0.5 text-[10px] font-bold tracking-widest uppercase ${c.label} opacity-60`}>
                    {t.lakUnit}
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-2.5 text-[11px] text-gray-400">
                    <span>
                      <span className="font-semibold text-gray-600">{sz.thb}</span>
                      {" "}{t.thbUnit}
                    </span>
                    <span className="text-gray-300">·</span>
                    <span>
                      <span className="font-semibold text-gray-600">{sz.cny}</span>
                      {" "}{t.cnyUnit}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ── 3. Prohibited items ──────────────────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-18">
        <div className="container">
          <div ref={prohibRef}>
            <p
              className="pk-anim mb-1 text-[10px] font-extrabold tracking-[0.32em] text-amber-500 uppercase"
              style={
                prohibInView
                  ? {
                      animation:
                        "pk-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both",
                    }
                  : { opacity: 0 }
              }
            >
              {t.prohibitedLabel}
            </p>
            <h2
              className="pk-anim text-2xl font-bold text-gray-900 sm:text-3xl"
              style={
                prohibInView
                  ? {
                      animation:
                        "pk-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 70ms both",
                    }
                  : { opacity: 0 }
              }
            >
              {t.prohibitedTitle}
            </h2>
            <p
              className="pk-anim mt-2 max-w-2xl text-sm leading-relaxed text-gray-400"
              style={
                prohibInView
                  ? {
                      animation:
                        "pk-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 140ms both",
                    }
                  : { opacity: 0 }
              }
            >
              {t.prohibitedNote}
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {prohibited.map((item, i) => {
              const Icon = PROHIBITED_ICONS[i];
              return (
                <div
                  key={i}
                  className="pk-anim flex items-start gap-4 rounded-xl border border-amber-100 bg-amber-50 p-4 transition-shadow hover:shadow-sm"
                  style={
                    prohibInView
                      ? {
                          animation: `pk-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) ${200 + i * 70}ms both`,
                        }
                      : { opacity: 0 }
                  }
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100">
                    <Icon className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-amber-800">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-amber-600/70">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Read more link */}
          <div
            className="pk-anim mt-6 flex items-center gap-2"
            style={
              prohibInView
                ? {
                    animation:
                      "pk-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 600ms both",
                  }
                : { opacity: 0 }
            }
          >
            <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
            <Link
              href={`/${lang}/guides/departures?tab=baggage`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 underline-offset-2 hover:underline"
            >
              {t.readMoreLabel}
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ── 4. Location ──────────────────────────────────────────────────────── */}
      <section className="bg-primary-50 py-14 sm:py-16">
        <div ref={locationRef} className="container">
          <div
            className="pk-anim mx-auto max-w-2xl"
            style={
              locationInView
                ? {
                    animation:
                      "pk-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) 0ms both",
                  }
                : { opacity: 0 }
            }
          >
            <p className="text-primary mb-2 text-[10px] font-extrabold tracking-[0.32em] uppercase">
              {t.locationLabel}
            </p>
            <h2 className="text-primary-800 text-2xl font-bold sm:text-3xl">
              {t.locationTitle}
            </h2>

            <div className="border-primary/15 mt-6 flex items-start gap-4 rounded-2xl border bg-white px-6 py-5 shadow-sm">
              <div className="bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-primary-800 font-bold">
                  {t.locationBuilding}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">
                  {t.locationDesc}
                </p>
                <p className="text-primary/60 mt-2 text-xs">{t.locationNote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
