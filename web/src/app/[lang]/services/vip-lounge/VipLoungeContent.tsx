"use client";

import Image from "next/image";
import {
  Wifi,
  Wind,
  Coffee,
  UserCheck,
  VolumeX,
  Phone,
  Check,
  Star,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useInView } from "@/hooks/useInView";
import type { Lang } from "@/types/language";
import { createVipLoungeI18n, VIP_ROOM_IMAGES } from "@/data/i18n/services/vip-lounge";

// ── UI-only config (icons + accent styles, not i18n) ─────────────────────────
const AMENITY_ICONS = [UserCheck, Wind, VolumeX, Coffee, Wifi] as const;

const ACCENT = {
  slate: {
    badge: "bg-slate-100 text-slate-500",
    price: "text-slate-600",
    priceUnit: "text-slate-400",
    border: "border-slate-200",
    check: "text-slate-400",
    ring: "",
  },
  teal: {
    badge: "bg-primary-50 text-primary",
    price: "text-primary",
    priceUnit: "text-primary/50",
    border: "border-primary/25",
    check: "text-primary",
    ring: "",
  },
  gold: {
    badge: "bg-amber-50 text-amber-600",
    price: "text-amber-600",
    priceUnit: "text-amber-400",
    border: "border-amber-300",
    check: "text-amber-500",
    ring: "ring-2 ring-amber-200/60 ring-offset-2",
  },
} as const;

// ── Component ─────────────────────────────────────────────────────────────────
export function VipLoungeContent({ lang }: { lang: Lang }) {
  const { vipLounge: t, amenities, packages } = createVipLoungeI18n(lang);

  const [introRef, introInView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  // ── Room slideshow ──────────────────────────────────────────────────────────
  const [slide, setSlide] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (VIP_ROOM_IMAGES.length <= 1) return;
    timerRef.current = setInterval(
      () => setSlide((s) => (s + 1) % VIP_ROOM_IMAGES.length),
      4500,
    );
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);
  const [pkgRef, pkgInView] = useInView<HTMLDivElement>({ threshold: 0.05 });
  const [ctaRef, ctaInView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <>
      <style>{`
        @keyframes vip-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes vip-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vip-anim { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      {/* ── 1. Intro — dark navy split ──────────────────────────────────────── */}
      <section className="bg-primary-700">
        <div
          ref={introRef}
          className="container grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20"
        >
          {/* Left: text */}
          <div>
            <p
              className="vip-anim text-primary-300 mb-3 text-[10px] font-extrabold tracking-[0.32em] uppercase"
              style={
                introInView
                  ? {
                      animation:
                        "vip-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both",
                    }
                  : { opacity: 0 }
              }
            >
              {t.eyebrow}
            </p>
            <h1
              className="vip-anim text-3xl leading-[1.15] font-bold text-white sm:text-4xl lg:text-5xl"
              style={
                introInView
                  ? {
                      animation:
                        "vip-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 80ms both",
                    }
                  : { opacity: 0 }
              }
            >
              {t.title}
            </h1>
            <p
              className="vip-anim mt-4 max-w-md text-sm leading-relaxed text-white/55 sm:text-base"
              style={
                introInView
                  ? {
                      animation:
                        "vip-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 160ms both",
                    }
                  : { opacity: 0 }
              }
            >
              {t.subtitle}
            </p>

            {/* Amenities list */}
            <div
              className="vip-anim mt-8 space-y-3"
              style={
                introInView
                  ? {
                      animation:
                        "vip-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) 260ms both",
                    }
                  : { opacity: 0 }
              }
            >
              <p className="text-[10px] font-bold tracking-[0.28em] text-white/30 uppercase">
                {t.amenitiesLabel}
              </p>
              {amenities.map((a, i) => {
                const Icon = AMENITY_ICONS[i];
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="bg-primary/15 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg">
                      <Icon className="text-primary-300 h-3.5 w-3.5" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white/90">
                        {a.label}
                      </span>
                      <span className="ml-2 text-xs text-white/35">
                        {a.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: room slideshow */}
          <div
            className="vip-anim relative overflow-hidden rounded-2xl"
            style={
              introInView
                ? {
                    animation:
                      "vip-fade-in 0.8s cubic-bezier(0.22,1,0.36,1) 100ms both",
                  }
                : { opacity: 0 }
            }
          >
            {/* Star badge */}
            <div className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            </div>

            {/* Crossfade slides */}
            <div className="relative aspect-[4/3]">
              {VIP_ROOM_IMAGES.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt="VIP Lounge"
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
                <p className="text-xs font-semibold text-white/80">
                  {t.eyebrow}
                </p>
                {VIP_ROOM_IMAGES.length > 1 && (
                  <div className="flex items-center gap-1.5">
                    {VIP_ROOM_IMAGES.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setSlide(i);
                          if (timerRef.current) clearInterval(timerRef.current);
                          timerRef.current = setInterval(
                            () =>
                              setSlide((s) => (s + 1) % VIP_ROOM_IMAGES.length),
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

      {/* ── Divider accent ──────────────────────────────────────────────────── */}
      <div className="via-primary/30 h-px bg-gradient-to-r from-transparent to-transparent" />

      {/* ── 2. Packages ─────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-14 sm:py-18">
        <div className="container">
          {/* Header */}
          <div ref={pkgRef}>
            <p
              className="vip-anim text-primary mb-1 text-[10px] font-extrabold tracking-[0.32em] uppercase"
              style={
                pkgInView
                  ? {
                      animation:
                        "vip-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both",
                    }
                  : { opacity: 0 }
              }
            >
              {t.packagesLabel}
            </p>
            <h2
              className="vip-anim text-primary-800 text-2xl font-bold sm:text-3xl"
              style={
                pkgInView
                  ? {
                      animation:
                        "vip-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 70ms both",
                    }
                  : { opacity: 0 }
              }
            >
              {t.packagesTitle}
            </h2>
            <p
              className="vip-anim mt-1.5 text-sm text-gray-400"
              style={
                pkgInView
                  ? {
                      animation:
                        "vip-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 140ms both",
                    }
                  : { opacity: 0 }
              }
            >
              {t.packagesNote}
            </p>
          </div>

          {/* Cards grid */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg, i) => {
              const ac = ACCENT[pkg.accent];
              return (
                <div
                  key={pkg.key}
                  className={`vip-anim relative flex flex-col overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-lg ${ac.border} ${pkg.featured ? ac.ring : ""}`}
                  style={
                    pkgInView
                      ? {
                          animation: `vip-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) ${220 + i * 100}ms both`,
                        }
                      : { opacity: 0 }
                  }
                >
                  {/* Featured badge */}
                  {pkg.badge && (
                    <div className="absolute top-3 right-3 z-10">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold tracking-wide uppercase shadow-sm ${ac.badge}`}
                      >
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  {/* Package image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {/* Color overlay tint */}
                    <div
                      className={`absolute inset-0 opacity-[0.08] ${
                        pkg.accent === "gold"
                          ? "bg-amber-400"
                          : pkg.accent === "teal"
                            ? "bg-primary"
                            : "bg-slate-400"
                      }`}
                    />
                  </div>

                  {/* Card body */}
                  <div className="flex flex-1 flex-col p-5">
                    {/* Tier name */}
                    <p
                      className={`mb-3 text-[11px] font-extrabold tracking-[0.22em] uppercase ${ac.price}`}
                    >
                      {pkg.name}
                    </p>

                    {/* Price */}
                    <div className="mb-4 flex items-baseline gap-1.5">
                      <span
                        className={`text-4xl leading-none font-black ${ac.price}`}
                      >
                        {pkg.price}
                      </span>
                      <div className="flex flex-col">
                        <span className={`text-xs font-bold ${ac.priceUnit}`}>
                          {t.currency}
                        </span>
                        <span className={`text-[10px] ${ac.priceUnit}`}>
                          {t.perPerson}
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div
                      className={`mb-4 h-px ${pkg.accent === "gold" ? "bg-amber-100" : pkg.accent === "teal" ? "bg-primary/10" : "bg-slate-100"}`}
                    />

                    {/* Features */}
                    <ul className="flex-1 space-y-2">
                      {pkg.features.map((f, fi) => (
                        <li
                          key={fi}
                          className="flex items-start gap-2.5 text-sm text-gray-600"
                        >
                          <Check
                            className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${ac.check}`}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. Contact ──────────────────────────────────────────────────────── */}
      <section className="bg-primary-50 py-14 sm:py-16">
        <div ref={ctaRef} className="container">
          <div
            className="vip-anim mx-auto max-w-2xl text-center"
            style={
              ctaInView
                ? {
                    animation:
                      "vip-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) 0ms both",
                  }
                : { opacity: 0 }
            }
          >
            <p className="text-primary mb-2 text-[10px] font-extrabold tracking-[0.32em] uppercase">
              {t.contactLabel}
            </p>
            <h2 className="text-primary-800 text-2xl font-bold sm:text-3xl">
              {t.contactTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              {t.contactDesc}
            </p>

            {/* Phone CTA */}
            <a
              href={`tel:${t.phone.replace(/\s/g, "")}`}
              className="border-primary/20 bg-primary-50 hover:border-primary/40 hover:bg-primary-100 mt-8 inline-flex items-center gap-3 rounded-2xl border px-7 py-4 transition-all duration-200 active:scale-[0.98]"
            >
              <div className="bg-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                <Phone className="h-4 w-4 text-white" />
              </div>
              <div className="text-left">
                <p className="text-primary/50 text-[10px] font-bold tracking-[0.22em] uppercase">
                  {t.phoneLabel}
                </p>
                <p className="text-primary-800 text-lg font-bold tracking-wide">
                  {t.phone}
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
