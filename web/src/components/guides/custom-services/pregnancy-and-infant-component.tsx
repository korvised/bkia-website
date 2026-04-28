"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  Baby,
  CheckCircle,
  ChevronLeft,
  FileText,
  MapPin,
  Phone,
  XCircle,
} from "lucide-react";
import { Lang } from "@/types/language";
import { createCustomServicesI18n } from "@/data/i18n/guides";
import { useInView } from "@/hooks/useInView";

interface Props {
  lang: Lang;
}

// ── Image URLs ────────────────────────────────────────────────────────────────
const HERO_IMAGES = [
  "https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/pregnancy-1.jpg",
  "https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/pregnancy-2.jpg",
  "https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/pregnancy-3.jpg",
] as const;

// ── Component ─────────────────────────────────────────────────────────────────
export const PregnancyAndInfantComponent = ({ lang }: Props) => {
  const { pregnancyGuideline: t } = createCustomServicesI18n(lang);

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

  // ── Scroll animations ───────────────────────────────────────────────────────
  const [heroRef,  heroIn ] = useInView<HTMLDivElement>({ threshold: 0.1  });
  const [pregRef,  pregIn ] = useInView<HTMLDivElement>({ threshold: 0.05 });
  const [infRef,   infIn  ] = useInView<HTMLDivElement>({ threshold: 0.05 });
  const [nurRef,   nurIn  ] = useInView<HTMLDivElement>({ threshold: 0.05 });
  const [tipRef,   tipIn  ] = useInView<HTMLDivElement>({ threshold: 0.05 });

  const pregnancyRows = [
    { stage: t.pregUpTo28, info: t.pregUpTo28Info, status: "ok"   as const },
    { stage: t.preg29To32, info: t.preg29To32Info, status: "warn" as const },
    { stage: t.preg33To35, info: t.preg33To35Info, status: "no"   as const },
  ];

  const infantRows = [t.infantGeneral, t.infantAirlines, t.infantTicket, t.infantDoc];
  const tips = [t.tip1, t.tip2, t.tip3, t.tip4];

  const additionalReqItems = t.additionalReqList
    .split("\n")
    .map((line) => line.replace(/^•\s*/, "").trim())
    .filter(Boolean);

  const statusConfig = {
    ok: {
      icon: CheckCircle,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50/70",
      borderColor: "border-emerald-200",
      badgeBg: "bg-emerald-100",
      badgeText: "text-emerald-700",
    },
    warn: {
      icon: AlertTriangle,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50/70",
      borderColor: "border-amber-200",
      badgeBg: "bg-amber-100",
      badgeText: "text-amber-700",
    },
    no: {
      icon: XCircle,
      iconColor: "text-rose-500",
      bgColor: "bg-rose-50/70",
      borderColor: "border-rose-200",
      badgeBg: "bg-rose-100",
      badgeText: "text-rose-700",
    },
  };

  return (
    <>
      <style>{`
        @keyframes preg-fade-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes preg-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .preg-anim { animation: none !important; opacity: 1 !important; }
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
              className="preg-anim group mb-8 inline-flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-[#00AAAC]"
              style={heroIn ? { animation: "preg-fade-up 0.5s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              {t.backButton}
            </Link>

            <p
              className="preg-anim mb-3 text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#00AAAC]"
              style={heroIn ? { animation: "preg-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 60ms both" } : { opacity: 0 }}
            >
              {t.categoryLabel}
            </p>

            <h1
              className="preg-anim text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-5xl"
              style={heroIn ? { animation: "preg-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 120ms both" } : { opacity: 0 }}
            >
              {t.title}
            </h1>

            <p
              className="preg-anim mt-4 max-w-md text-sm leading-relaxed text-white/55 sm:text-base"
              style={heroIn ? { animation: "preg-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 180ms both" } : { opacity: 0 }}
            >
              {t.subtitle}
            </p>

            {/* Disclaimer */}
            <div
              className="preg-anim mt-6 flex gap-3 rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-3.5"
              style={heroIn ? { animation: "preg-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 240ms both" } : { opacity: 0 }}
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <p className="text-xs leading-relaxed text-white/65 sm:text-sm">
                {t.disclaimer}
              </p>
            </div>
          </div>

          {/* Hero slideshow */}
          <div
            className="preg-anim relative overflow-hidden rounded-2xl"
            style={heroIn ? { animation: "preg-fade-in 0.8s cubic-bezier(0.22,1,0.36,1) 100ms both" } : { opacity: 0 }}
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

      {/* ── 2. Pregnant Women Guidelines ──────────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-18">
        <div className="container">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_420px] lg:gap-16">

            {/* Guidelines list */}
            <div ref={pregRef}>
              <p
                className="preg-anim mb-1 text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#00AAAC]"
                style={pregIn ? { animation: "preg-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
              >
                Guidelines
              </p>
              <h2
                className="preg-anim mb-8 text-2xl font-bold text-gray-900 sm:text-3xl"
                style={pregIn ? { animation: "preg-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 60ms both" } : { opacity: 0 }}
              >
                {t.catPregnant}
              </h2>

              <div className="space-y-4">
                {pregnancyRows.map(({ stage, info, status }, i) => {
                  const cfg = statusConfig[status];
                  const Icon = cfg.icon;
                  return (
                    <div
                      key={i}
                      className={`preg-anim overflow-hidden rounded-2xl border ${cfg.borderColor} ${cfg.bgColor}`}
                      style={pregIn ? { animation: `preg-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) ${120 + i * 80}ms both` } : { opacity: 0 }}
                    >
                      <div className="flex items-center gap-3 px-5 py-3.5">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${cfg.badgeBg}`}>
                          <Icon className={`h-4 w-4 ${cfg.iconColor}`} />
                        </div>
                        <p className="font-semibold text-gray-800">{stage}</p>
                      </div>
                      <div className={`border-t ${cfg.borderColor} bg-white/60 px-5 py-3.5`}>
                        <p className="text-sm leading-relaxed text-gray-600">{info}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Additional conditions */}
              <div
                className="preg-anim mt-8 rounded-2xl border border-[#00AAAC]/20 bg-[#e6f7f8] p-5"
                style={pregIn ? { animation: "preg-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 400ms both" } : { opacity: 0 }}
              >
                <div className="mb-4 flex items-center gap-2.5">
                  <FileText className="h-4 w-4 text-[#00AAAC]" />
                  <p className="font-semibold text-gray-900">{t.additionalReqTitle}</p>
                </div>
                <div className="space-y-3">
                  {additionalReqItems.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00AAAC] text-[10px] font-bold text-white">
                        {i + 1}
                      </span>
                      <p className="text-sm leading-relaxed text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Nursery image — sticky */}
            <div
              className="preg-anim sticky top-24 overflow-hidden rounded-2xl"
              style={pregIn ? { animation: "preg-fade-in 0.7s cubic-bezier(0.22,1,0.36,1) 200ms both" } : { opacity: 0 }}
            >
              <div className="relative lg:h-[520px] aspect-[3/4] w-full bg-gray-100 lg:aspect-auto">
                <Image
                  src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/Nursery-and-Breastfeeding-Room.jpeg"
                  alt={t.nurseryTitle}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                />
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

      {/* ── 3. Infants ────────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-14 sm:py-16">
        <div ref={infRef} className="container">
          <p
            className="preg-anim mb-1 text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#00AAAC]"
            style={infIn ? { animation: "preg-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
          >
            Infants
          </p>
          <h2
            className="preg-anim mb-8 text-2xl font-bold text-gray-900 sm:text-3xl"
            style={infIn ? { animation: "preg-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 60ms both" } : { opacity: 0 }}
          >
            {t.catInfants}
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            {infantRows.map((info, i) => (
              <div
                key={i}
                className="preg-anim flex items-start gap-3 rounded-xl border border-[#00AAAC]/15 bg-white p-4 shadow-sm"
                style={infIn ? { animation: `preg-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) ${120 + i * 70}ms both` } : { opacity: 0 }}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e6f7f8]">
                  <Baby className="h-4 w-4 text-[#00AAAC]" />
                </div>
                <p className="self-center text-sm leading-relaxed text-gray-600">{info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ── 4. Nursery & Breastfeeding Room ──────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-16">
        <div ref={nurRef} className="container">
          <p
            className="preg-anim mb-1 text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#00AAAC]"
            style={nurIn ? { animation: "preg-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
          >
            Facility
          </p>
          <h2
            className="preg-anim mb-8 text-2xl font-bold text-gray-900 sm:text-3xl"
            style={nurIn ? { animation: "preg-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 60ms both" } : { opacity: 0 }}
          >
            {t.nurseryTitle}
          </h2>

          <div
            className="preg-anim overflow-hidden rounded-2xl border border-gray-100 shadow-sm lg:grid lg:grid-cols-2"
            style={nurIn ? { animation: "preg-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) 120ms both" } : { opacity: 0 }}
          >
            <div className="relative min-h-60 bg-gray-100 lg:min-h-72">
              <Image
                src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/Nursery-and-Breastfeeding-Room.jpeg"
                alt={t.nurseryTitle}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-5 bg-gray-50 p-6 lg:p-8">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e6f7f8]">
                  <MapPin className="h-4 w-4 text-[#00AAAC]" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#00AAAC]">
                    Location
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {t.nurseryLoc}
                  </p>
                </div>
              </div>
              <div className="h-px bg-gray-200" />
              <p className="text-sm leading-relaxed text-gray-500 italic">
                {t.nurseryDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ── 5. Travel Tips ───────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-14 sm:py-16">
        <div ref={tipRef} className="container">
          <p
            className="preg-anim mb-1 text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#00AAAC]"
            style={tipIn ? { animation: "preg-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
          >
            Tips
          </p>
          <h2
            className="preg-anim mb-8 text-2xl font-bold text-gray-900 sm:text-3xl"
            style={tipIn ? { animation: "preg-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 60ms both" } : { opacity: 0 }}
          >
            {t.tipsTitle}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {tips.map((tip, i) => (
              <div
                key={i}
                className="preg-anim flex gap-4 rounded-xl border border-amber-100 bg-white p-4"
                style={tipIn ? { animation: `preg-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) ${120 + i * 70}ms both` } : { opacity: 0 }}
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
