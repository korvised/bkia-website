"use client";

import Image from "next/image";
import { asset } from "@/lib";
import {
  createCareersI18n,
  careersDocsList,
  careersBenefitsShort,
  careersBenefitsList,
} from "@/data/i18n/about/careers";
import { useInView } from "@/hooks/useInView";
import type { Lang } from "@/types/language";

const HR005_QR_PATH = "career/form/job+application+form_+QR.jpeg";

interface ApplicationInfoProps {
  lang: Lang;
}

// ── Benefit icons ─────────────────────────────────────────────────────────────
const BenefitIcon = ({ name }: { name: string }) => {
  const icons: Record<string, React.ReactNode> = {
    home: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M3 10L12 3l9 7v10a1 1 0 01-1 1H4a1 1 0 01-1-1V10z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
    clock: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 15" />
        <path d="M5 3l1.5 1.5M19 3l-1.5 1.5" />
      </svg>
    ),
    meal: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
        <path d="M7 2v20M21 15V2a5 5 0 00-5 5v6h3.5l-.5 11" />
      </svg>
    ),
    plane: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.18 9.18a19.79 19.79 0 01-3.04-8.72A2 2 0 012.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.72a16 16 0 006.29 6.29l1.08-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    ticket: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M2 9a3 3 0 010 6v2a2 2 0 002 2h16a2 2 0 002-2v-2a3 3 0 000-6V7a2 2 0 00-2-2H4a2 2 0 00-2 2v2z" />
        <line x1="13" y1="5" x2="13" y2="19" strokeDasharray="3 3" />
      </svg>
    ),
    flag: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    heart: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    calendar: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
    star: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <polyline points="9 15 11 17 15 13" />
      </svg>
    ),
  };
  return <>{icons[name] ?? icons.calendar}</>;
};

const BENEFIT_ICON_KEYS = [
  "home",
  "clock",
  "meal",
  "plane",
  "ticket",
  "flag",
  "shield",
  "heart",
  "calendar",
  "star",
] as const;

// ── Main export ───────────────────────────────────────────────────────────────
export function ApplicationInfo({ lang }: ApplicationInfoProps) {
  const { careers: t } = createCareersI18n(lang);
  const benefitsShort = careersBenefitsShort[lang];
  const benefitsList = careersBenefitsList[lang];
  const docs = careersDocsList[lang];

  const [benefitsHeadRef, benefitsHeadInView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [gridRef, gridInView] = useInView<HTMLDivElement>({ threshold: 0.05 });
  const [docsRef, docsInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [contactRef, contactInView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <>
      <style>{`
        @keyframes appinfo-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .appinfo-animated { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      {/* ── I. Benefits ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0d1b3e] py-16 sm:py-24">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-[#00AAAC]/10 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-[#00AAAC]/6 blur-2xl" aria-hidden />

        <div className="container relative">
          {/* Section header */}
          <div ref={benefitsHeadRef} className="mb-12">
            <p
              className="appinfo-animated mb-2 text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#00AAAC]"
              style={benefitsHeadInView ? { animation: "appinfo-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
            >
              {t.benefitsLabel}
            </p>
            <h2
              className="appinfo-animated text-2xl font-bold text-white sm:text-3xl"
              style={benefitsHeadInView ? { animation: "appinfo-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 100ms both" } : { opacity: 0 }}
            >
              {t.benefitsTitle}
            </h2>
          </div>

          {/* Benefits matrix */}
          <div ref={gridRef} className="grid grid-cols-1 gap-px bg-white/[0.07] sm:grid-cols-2">
            {benefitsShort.map((label, i) => (
              <div
                key={i}
                className="appinfo-animated group flex gap-4 bg-[#0d1b3e] p-6 transition-colors duration-200 hover:bg-[#00AAAC]/[0.07] sm:p-8"
                style={gridInView ? { animation: `appinfo-fade-up 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 45}ms both` } : { opacity: 0 }}
              >
                {/* Icon */}
                <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00AAAC]/10 text-[#00AAAC] transition-colors duration-200 group-hover:bg-[#00AAAC]/20">
                  <BenefitIcon name={BENEFIT_ICON_KEYS[i]} />
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <p className="font-semibold leading-snug text-white">
                    {label}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                    {benefitsList[i]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── II. Required Documents ─────────────────────────────────────────── */}
      <section className="border-t border-gray-100 bg-[#f8f9fc] py-14 sm:py-20">
        <div ref={docsRef} className="container">
          <div
            className="appinfo-animated mb-10"
            style={docsInView ? { animation: "appinfo-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
          >
            <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#00AAAC]">
              {t.docsLabel}
            </p>
            <h2 className="text-2xl font-bold text-[#0f1e3d] sm:text-3xl">
              {t.docsTitle}
            </h2>
          </div>

          <div className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {docs.map((doc, i) => (
              <div
                key={i}
                className="appinfo-animated flex items-start gap-4"
                style={docsInView ? { animation: `appinfo-fade-up 0.5s cubic-bezier(0.22,1,0.36,1) ${80 + i * 35}ms both` } : { opacity: 0 }}
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00AAAC]/10 text-[11px] font-bold text-[#00AAAC]">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-gray-700">{doc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── III. Contact ────────────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 bg-white py-14 sm:py-20">
        <div ref={contactRef} className="container">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:gap-16">

            {/* ── Left: header + contact cards ── */}
            <div className="flex-1">
              <div
                className="appinfo-animated mb-8"
                style={contactInView ? { animation: "appinfo-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
              >
                <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#00AAAC]">
                  {t.contactLabel}
                </p>
                <h2 className="text-2xl font-bold text-[#0f1e3d] sm:text-3xl">
                  {t.contactTitle}
                </h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-500">
                  {t.contactCta}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                {/* Email */}
                <a
                  href="mailto:Hr@bokeointernationalairport.com"
                  className="appinfo-animated group flex items-center gap-4 rounded-2xl border border-gray-100 bg-[#f8f9fc] px-6 py-4 transition-all hover:border-[#00AAAC]/30 hover:bg-[#f0fbfc]"
                  style={contactInView ? { animation: "appinfo-fade-up 0.5s cubic-bezier(0.22,1,0.36,1) 120ms both" } : { opacity: 0 }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00AAAC]/10 text-[#00AAAC]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email</p>
                    <p className="text-sm font-semibold text-[#0f1e3d] transition-colors group-hover:text-[#00AAAC]">
                      Hr@bokeointernationalairport.com
                    </p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/85620517499999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="appinfo-animated group flex items-center gap-4 rounded-2xl border border-gray-100 bg-[#f8f9fc] px-6 py-4 transition-all hover:border-[#25D366]/30 hover:bg-[#f0fbf3]"
                  style={contactInView ? { animation: "appinfo-fade-up 0.5s cubic-bezier(0.22,1,0.36,1) 200ms both" } : { opacity: 0 }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366]">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.558 4.116 1.535 5.842L0 24l6.303-1.516A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.001-1.371l-.358-.213-3.742.9.937-3.638-.233-.375A9.818 9.818 0 1112 21.818z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">WhatsApp</p>
                    <p className="text-sm font-semibold text-[#0f1e3d]">+856 20 51 749 999</p>
                  </div>
                </a>

                {/* TikTok */}
                <div
                  className="appinfo-animated group flex items-center gap-4 rounded-2xl border border-gray-100 bg-[#f8f9fc] px-6 py-4 transition-all hover:border-[#0f0f0f]/20 hover:bg-[#0f0f0f]/[0.03]"
                  style={contactInView ? { animation: "appinfo-fade-up 0.5s cubic-bezier(0.22,1,0.36,1) 280ms both" } : { opacity: 0 }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0f0f0f]/8 text-[#0f0f0f]">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34v-7.1a8.26 8.26 0 004.83 1.53V6.29a4.84 4.84 0 01-1.06-.6z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">TikTok</p>
                    <p className="text-sm font-semibold text-[#0f1e3d]">HRD of BKIA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right: QR code ── */}
            <div
              className="appinfo-animated shrink-0 self-start lg:self-end"
              style={contactInView ? { animation: "appinfo-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 360ms both" } : { opacity: 0 }}
            >
              <div className="inline-flex items-center gap-6 rounded-2xl border border-gray-100 bg-[#f8f9fc] px-6 py-5">
                <div className="shrink-0 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
                  <Image
                    src={asset(HR005_QR_PATH)}
                    alt="BKIA-HR-005 QR Code"
                    width={104}
                    height={104}
                    className="block"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#00AAAC]">
                    BKIA-HR-005
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-[#0f1e3d]">
                    {t.formQrLabel}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">{t.formQrSub}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
