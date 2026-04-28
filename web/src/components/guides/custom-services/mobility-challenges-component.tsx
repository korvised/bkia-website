"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  Accessibility,
  ChevronLeft,
  CheckCircle,
  ClipboardList,
  Building2,
  Phone,
  MapPin,
} from "lucide-react";
import { Lang } from "@/types/language";
import { createCustomServicesI18n } from "@/data/i18n/guides";
import { useInView } from "@/hooks/useInView";

interface Props {
  lang: Lang;
}

// ── Image URLs ────────────────────────────────────────────────────────────────
const HERO_IMAGES = [
  "https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/mobility-challenges-1.jpg",
  "https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/mobility-challenges-2.jpg",
  "https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/mobility-challenges-3.jpg",
  "https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/mobility-challenges-4.jpg",
] as const;

const SERVICE_IMAGE =
  "https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/mobility-challenges.jpg";

// ── Component ─────────────────────────────────────────────────────────────────
export const MobilityChallengesComponent = ({ lang }: Props) => {
  const { mobilityGuideline: t } = createCustomServicesI18n(lang);

  // ── Hero slideshow ──────────────────────────────────────────────────────────
  const [slide, setSlide] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setSlide((s) => (s + 1) % HERO_IMAGES.length),
      4500,
    );
  };
  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [heroRef,   heroIn  ] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [svcRef,    svcIn   ] = useInView<HTMLDivElement>({ threshold: 0.05 });
  const [reqRef,    reqIn   ] = useInView<HTMLDivElement>({ threshold: 0.05 });
  const [facRef,    facIn   ] = useInView<HTMLDivElement>({ threshold: 0.05 });
  const [tipRef,    tipIn   ] = useInView<HTMLDivElement>({ threshold: 0.05 });

  const services = [
    {
      icon: Accessibility,
      title: t.service1Title,
      desc: t.service1Desc,
      iconColor: "text-[#00AAAC]",
      iconBg: "bg-[#e6f7f8]",
    },
    {
      icon: ClipboardList,
      title: t.service2Title,
      desc: t.service2Desc,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
    },
    {
      icon: Building2,
      title: t.service3Title,
      desc: t.service3Desc,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
    },
  ];

  const requirements = [t.req1, t.req2, t.req3, t.req4];
  const facilities   = [t.facility1, t.facility2, t.facility3, t.facility4, t.facility5];
  const tips         = [t.tip1, t.tip2, t.tip3, t.tip4];

  return (
    <>
      <style>{`
        @keyframes mob-fade-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes mob-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mob-anim { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      {/* ── 1. Hero ────────────────────────────────────────────────────────────── */}
      <section className="bg-[#003d3e]">
        <div
          ref={heroRef}
          className="container grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-16 lg:py-18"
        >
          {/* Text column */}
          <div>
            <Link
              href={`/${lang}/guides/custom-services`}
              className="mob-anim group mb-8 inline-flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-[#00AAAC]"
              style={heroIn ? { animation: "mob-fade-up 0.5s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              {t.backButton}
            </Link>

            <p
              className="mob-anim mb-3 text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#00AAAC]"
              style={heroIn ? { animation: "mob-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 60ms both" } : { opacity: 0 }}
            >
              {t.categoryLabel}
            </p>

            <h1
              className="mob-anim text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-5xl"
              style={heroIn ? { animation: "mob-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 120ms both" } : { opacity: 0 }}
            >
              {t.title}
            </h1>

            <p
              className="mob-anim mt-4 max-w-md text-sm leading-relaxed text-white/55 sm:text-base"
              style={heroIn ? { animation: "mob-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 180ms both" } : { opacity: 0 }}
            >
              {t.subtitle}
            </p>

            {/* Disclaimer */}
            <div
              className="mob-anim mt-6 flex gap-3 rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-3.5"
              style={heroIn ? { animation: "mob-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 240ms both" } : { opacity: 0 }}
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <p className="text-xs leading-relaxed text-white/65 sm:text-sm">
                {t.disclaimer}
              </p>
            </div>
          </div>

          {/* Hero slideshow */}
          <div
            className="mob-anim relative overflow-hidden rounded-2xl"
            style={heroIn ? { animation: "mob-fade-in 0.8s cubic-bezier(0.22,1,0.36,1) 100ms both" } : { opacity: 0 }}
          >
            <div className="relative aspect-[4/3] w-full bg-[#00AAAC]/20">
              {HERO_IMAGES.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={`${t.title} ${i + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-opacity duration-1000 ease-in-out"
                  style={{ opacity: i === slide ? 1 : 0 }}
                  priority={i === 0}
                />
              ))}
              {/* subtle teal overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#003d3e]/60 to-transparent" />
              {/* Dot indicators */}
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5">
                {HERO_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Slide ${i + 1}`}
                    onClick={() => { setSlide(i); startTimer(); }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === slide ? "w-5 bg-white" : "w-1.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#00AAAC]/30 to-transparent" />

      {/* ── 2. Airport Assistance Services ───────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-18">
        <div className="container">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_420px] lg:gap-16">

            {/* Services list */}
            <div ref={svcRef}>
              <p
                className="mob-anim mb-1 text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#00AAAC]"
                style={svcIn ? { animation: "mob-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
              >
                Services
              </p>
              <h2
                className="mob-anim mb-8 text-2xl font-bold text-gray-900 sm:text-3xl"
                style={svcIn ? { animation: "mob-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 60ms both" } : { opacity: 0 }}
              >
                {t.airportServicesTitle}
              </h2>

              <div className="space-y-5">
                {services.map(({ icon: Icon, title, desc, iconColor, iconBg }, i) => (
                  <div
                    key={i}
                    className="mob-anim flex gap-5 rounded-2xl border border-gray-100 bg-gray-50/60 p-5 transition-shadow hover:shadow-sm"
                    style={svcIn ? { animation: `mob-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) ${120 + i * 80}ms both` } : { opacity: 0 }}
                  >
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
                      <Icon className={`h-5 w-5 ${iconColor}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service image */}
            <div
              className="mob-anim sticky top-24 overflow-hidden rounded-2xl"
              style={svcIn ? { animation: "mob-fade-in 0.7s cubic-bezier(0.22,1,0.36,1) 200ms both" } : { opacity: 0 }}
            >
              <div className="relative aspect-[3/4] w-full bg-gray-100 lg:aspect-auto lg:h-[460px]">
                <Image
                  src={SERVICE_IMAGE}
                  alt={t.airportServicesTitle}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                />
                {/* Caption bar */}
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/70 to-transparent px-5 pb-5 pt-10">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[#00AAAC]" />
                  <span className="text-xs font-medium text-white/80">
                    Bokeo International Airport
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ── 3. Requirements ──────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-14 sm:py-16">
        <div ref={reqRef} className="container">
          <p
            className="mob-anim mb-1 text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#00AAAC]"
            style={reqIn ? { animation: "mob-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
          >
            Requirements
          </p>
          <h2
            className="mob-anim mb-8 text-2xl font-bold text-gray-900 sm:text-3xl"
            style={reqIn ? { animation: "mob-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 60ms both" } : { opacity: 0 }}
          >
            {t.requirementsTitle}
          </h2>

          <div className="space-y-3">
            {requirements.map((req, i) => (
              <div
                key={i}
                className="mob-anim flex gap-4 overflow-hidden rounded-xl border border-[#00AAAC]/15 bg-white p-4 shadow-sm"
                style={reqIn ? { animation: `mob-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) ${120 + i * 70}ms both` } : { opacity: 0 }}
              >
                {/* Step number */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00AAAC] text-sm font-bold text-white">
                  {i + 1}
                </div>
                <p className="self-center text-sm leading-relaxed text-gray-600">{req}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ── 4. Accessible Facilities ─────────────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-16">
        <div ref={facRef} className="container">
          <p
            className="mob-anim mb-1 text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#00AAAC]"
            style={facIn ? { animation: "mob-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
          >
            Facilities
          </p>
          <h2
            className="mob-anim mb-8 text-2xl font-bold text-gray-900 sm:text-3xl"
            style={facIn ? { animation: "mob-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 60ms both" } : { opacity: 0 }}
          >
            {t.facilitiesTitle}
          </h2>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility, i) => (
              <div
                key={i}
                className="mob-anim flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-3.5"
                style={facIn ? { animation: `mob-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) ${120 + i * 60}ms both` } : { opacity: 0 }}
              >
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <p className="text-sm leading-relaxed text-gray-700">{facility}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ── 5. Travel Tips ───────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-14 sm:py-16">
        <div ref={tipRef} className="container">
          <p
            className="mob-anim mb-1 text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#00AAAC]"
            style={tipIn ? { animation: "mob-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
          >
            Tips
          </p>
          <h2
            className="mob-anim mb-8 text-2xl font-bold text-gray-900 sm:text-3xl"
            style={tipIn ? { animation: "mob-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 60ms both" } : { opacity: 0 }}
          >
            {t.tipsTitle}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {tips.map((tip, i) => (
              <div
                key={i}
                className="mob-anim flex gap-4 rounded-xl border border-amber-100 bg-white p-4"
                style={tipIn ? { animation: `mob-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) ${120 + i * 70}ms both` } : { opacity: 0 }}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-xs font-bold text-amber-700">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-gray-600">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Contact CTA ───────────────────────────────────────────────────── */}
      <section className="bg-[#00AAAC] py-12">
        <div className="container flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-lg font-bold text-white">
              Need special assistance?
            </p>
            <p className="mt-1 text-sm text-white/70">
              Our team is available to help. Contact us before your journey.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/${lang}/about/contact`}
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-[#00AAAC] transition-opacity hover:opacity-90"
            >
              <Phone className="h-4 w-4" />
              Contact Airport
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
