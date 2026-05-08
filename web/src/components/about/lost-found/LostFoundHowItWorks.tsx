"use client";

import { Fragment } from "react";
import Link from "next/link";
import { Search, FileEdit, PhoneCall, Phone, Mail } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import type { Lang } from "@/types/language";
import { t } from "./lost-found.constants";

interface LostFoundHowItWorksProps {
  lang: Lang;
}

export function LostFoundHowItWorks({ lang }: LostFoundHowItWorksProps) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 });

  const steps = [
    {
      n: "1",
      title: t("howStep1Title", lang),
      desc: t("howStep1Desc", lang),
      icon: Search,
    },
    {
      n: "2",
      title: t("howStep2Title", lang),
      desc: t("howStep2Desc", lang),
      icon: FileEdit,
    },
    {
      n: "3",
      title: t("howStep3Title", lang),
      desc: t("howStep3Desc", lang),
      icon: PhoneCall,
    },
  ];

  return (
    <section ref={ref} className="bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4">
        {/* ── Header ──────────────────────────────────────────────── */}
        <div
          className={`mb-14 text-center transition-all duration-600 ${
            inView
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            {t("howItWorks", lang)}
          </h2>
        </div>

        {/* ── Desktop: horizontal flow ────────────────────────────── */}
        <div className="hidden md:block">
          <div className="flex items-start">
            {steps.map((step, i) => (
              <Fragment key={step.n}>
                {/* Step card */}
                <div
                  className={`flex flex-1 flex-col items-center text-center transition-all duration-700 ${
                    inView
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${i * 150 + 100}ms` }}
                >
                  {/* Icon circle with step number */}
                  <div className="relative mb-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm shadow-gray-200/80 ring-1 ring-gray-100">
                      <step.icon className="h-7 w-7 text-primary" />
                    </div>
                    <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white shadow-sm">
                      {step.n}
                    </span>
                  </div>

                  <h3 className="mb-2 text-base font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="max-w-[220px] text-sm leading-relaxed text-gray-500">
                    {step.desc}
                  </p>
                </div>

                {/* Connector between steps */}
                {i < steps.length - 1 && (
                  <div
                    className={`mt-8 flex w-20 shrink-0 items-center transition-all duration-500 ${
                      inView ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: `${i * 150 + 250}ms` }}
                  >
                    <div className="h-0 w-full border-t-2 border-dashed border-primary/25" />
                    <div className="ml-[-6px] h-0 w-0 shrink-0 border-y-[5px] border-l-[7px] border-y-transparent border-l-primary/30" />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>

        {/* ── Mobile: vertical timeline ───────────────────────────── */}
        <div className="md:hidden">
          <div className="relative ml-5">
            {/* Vertical connecting line */}
            <div
              className={`absolute bottom-4 left-[18px] top-4 w-0.5 bg-primary/15 transition-all duration-700 ${
                inView ? "opacity-100" : "opacity-0"
              }`}
            />

            <div className="space-y-8">
              {steps.map((step, i) => (
                <div
                  key={step.n}
                  className={`relative flex gap-5 transition-all duration-600 ${
                    inView
                      ? "translate-x-0 opacity-100"
                      : "translate-x-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${i * 120 + 80}ms` }}
                >
                  {/* Icon circle */}
                  <div className="relative z-10 shrink-0">
                    <div className="flex h-[38px] w-[38px] items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                      <step.icon className="h-[18px] w-[18px] text-primary" />
                    </div>
                    <span className="absolute -right-1 -top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">
                      {step.n}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="pt-1.5">
                    <h3 className="mb-1 text-sm font-bold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-500">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Contact CTA (same section) ─────────────────────────── */}
        <div
          className={`mx-auto mt-16 max-w-xl text-center transition-all duration-700 ${
            inView
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <h3 className="mb-2 text-xl font-bold text-gray-900 md:text-2xl">
            {t("stillNeedHelp", lang)}
          </h3>
          <p className="mb-8 text-sm text-gray-500">
            {t("ctaSubtitle", lang)}
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              href="tel:+85684260179"
              className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4 text-left transition-all hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Phone className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-gray-400">
                  {t("callUs", lang)}
                </p>
                <p className="truncate font-semibold text-gray-900">
                  +856 84 260 179
                </p>
              </div>
            </Link>

            <Link
              href="mailto:info@bokeointernationalairport.com"
              className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4 text-left transition-all hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Mail className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-gray-400">
                  {t("emailUs", lang)}
                </p>
                <p className="truncate text-sm font-semibold text-gray-900">
                  info@bokeointernationalairport.com
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
