"use client";

import { createCareersI18n, careersValuesData } from "@/data/i18n/about/careers";
import { useInView } from "@/hooks/useInView";
import type { Lang } from "@/types/language";

interface CultureSectionProps {
  lang: Lang;
}

export function CultureSection({ lang }: CultureSectionProps) {
  const { careers: t } = createCareersI18n(lang);
  const values = careersValuesData[lang];
  const [headRef, headInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [valuesRef, valuesInView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="bg-[#1a2c5b] py-14 sm:py-20">
      <style>{`
        @keyframes culture-fade-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .culture-animated { animation: none !important; opacity: 1 !important; }
        }
      `}</style>
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          {/* Left: label + headline + body */}
          <div ref={headRef} className="lg:col-span-2">
            <p
              className="culture-animated mb-4 text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#00AAAC]"
              style={headInView ? { animation: "culture-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
            >
              {t.cultureLabel}
            </p>
            <h2
              className="culture-animated text-3xl font-bold leading-[1.15] text-white sm:text-4xl"
              style={headInView ? { animation: "culture-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) 100ms both" } : { opacity: 0 }}
            >
              {t.cultureHeadline.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </h2>
            <p
              className="culture-animated mt-5 text-sm leading-relaxed text-white/55 sm:text-base"
              style={headInView ? { animation: "culture-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) 200ms both" } : { opacity: 0 }}
            >
              {t.cultureBody}
            </p>
          </div>

          {/* Right: three value pillars */}
          <div ref={valuesRef} className="flex flex-col justify-center gap-0 lg:col-span-3">
            {values.map((value, i) => (
              <div
                key={i}
                className="culture-animated flex items-start gap-5 border-b border-white/8 py-6 first:pt-0 last:border-b-0 last:pb-0"
                style={valuesInView ? { animation: `culture-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 110}ms both` } : { opacity: 0 }}
              >
                {/* Large decorative index */}
                <span className="mt-0.5 w-9 shrink-0 text-right text-3xl font-black leading-none text-[#00AAAC]/18 sm:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-bold text-white sm:text-lg">
                    {value.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                    {value.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
