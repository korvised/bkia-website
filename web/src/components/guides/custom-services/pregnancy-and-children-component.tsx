"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle,
  AlertTriangle,
  Baby,
  CheckCircle,
  ChevronLeft,
  MapPin,
  XCircle,
} from "lucide-react";
import { Lang } from "@/types/language";
import { createCustomServicesI18n } from "@/data/i18n/guide";

interface Props {
  lang: Lang;
}

export const PregnancyAndChildrenComponent = ({ lang }: Props) => {
  const { pregnancyGuideline: t } = createCustomServicesI18n(lang);

  const pregnancyRows = [
    { stage: t.pregUnder32, info: t.pregUnder32Info, status: "ok" as const },
    { stage: t.preg32to36, info: t.preg32to36Info, status: "warn" as const },
    { stage: t.pregOver36, info: t.pregOver36Info, status: "no" as const },
  ];

  const infantRows = [
    t.infantGeneral,
    t.infantAirlines,
    t.infantTicket,
    t.infantDoc,
  ];

  const tips = [t.tip1, t.tip2, t.tip3, t.tip4];

  const statusConfig = {
    ok: {
      icon: CheckCircle,
      iconColor: "text-emerald-500",
      border: "border-l-emerald-400",
      bg: "bg-white",
    },
    warn: {
      icon: AlertTriangle,
      iconColor: "text-amber-500",
      border: "border-l-amber-400",
      bg: "bg-white",
    },
    no: {
      icon: XCircle,
      iconColor: "text-rose-500",
      border: "border-l-rose-400",
      bg: "bg-white",
    },
  };

  return (
    <div className="container space-y-12">
      {/* Back + Header */}
      <div className="space-y-5">
        <Link
          href={`/${lang}/guides/custom-services`}
          className="group hover:text-primary-600 inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          {t.backButton}
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
          <div className="space-y-3">
            <h1 className="text-3xl leading-tight font-bold text-gray-900 lg:text-4xl">
              {t.title}
            </h1>
            <p className="max-w-xl text-base text-gray-500">{t.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="flex gap-3 border border-amber-100 bg-amber-50 px-5 py-4">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
        <p className="text-sm leading-relaxed text-amber-700">{t.disclaimer}</p>
      </div>

      {/* Pregnant Women */}
      <section className="space-y-5">
        <h2 className="text-lg font-bold text-gray-900">{t.catPregnant}</h2>

        <div className="space-y-3">
          {pregnancyRows.map(({ stage, info, status }, i) => {
            const cfg = statusConfig[status];
            const Icon = cfg.icon;
            return (
              <div
                key={i}
                className={`grid gap-0 overflow-hidden rounded-xl border border-l-4 border-gray-100 ${cfg.border} ${cfg.bg} shadow-sm lg:grid-cols-[1fr_1.4fr]`}
              >
                <div className="flex items-start gap-3 px-5 py-4">
                  <Icon
                    className={`mt-0.5 h-4 w-4 shrink-0 ${cfg.iconColor}`}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {stage}
                  </span>
                </div>
                <div className="border-t border-gray-100 px-5 py-4 lg:border-t-0 lg:border-l">
                  <p className="text-sm leading-relaxed text-gray-500">
                    {info}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Infants */}
      <section className="space-y-5">
        <h2 className="text-lg font-bold text-gray-900">{t.catInfants}</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {infantRows.map((info, i) => (
            <div
              key={i}
              className="flex gap-3 rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <Baby className="text-secondary-400 mt-0.5 h-4 w-4 shrink-0" />
              <p className="text-sm leading-relaxed text-gray-500">{info}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Nursery & Breastfeeding Room */}
      <section className="space-y-5">
        <h2 className="text-lg font-bold text-gray-900">{t.nurseryTitle}</h2>

        <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm lg:grid lg:grid-cols-2">
          <div className="relative min-h-64 bg-gray-100 lg:min-h-full">
            <Image
              src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/Nursery-and-Breastfeeding-Room.jpeg"
              alt={t.nurseryTitle}
              fill
              className="object-cover"
            />
          </div>
          <div className="bg-primary-50 flex flex-col justify-center gap-4 p-7 lg:p-9">
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                <MapPin className="text-primary-500 h-4 w-4" />
              </div>
              <div>
                <p className="text-primary-400 text-xs font-semibold tracking-wide uppercase">
                  Location
                </p>
                <p className="mt-0.5 text-sm font-medium text-gray-700">
                  {t.nurseryLoc}
                </p>
              </div>
            </div>
            <div className="bg-primary-100 h-px" />
            <p className="text-sm leading-relaxed text-gray-500">
              {t.nurseryDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="space-y-5">
        <h2 className="text-lg font-bold text-gray-900">{t.tipsTitle}</h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {tips.map((tip, i) => (
            <div
              key={i}
              className="group flex gap-3 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-colors hover:border-amber-200"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-xs font-bold text-amber-500 transition-colors group-hover:bg-amber-100">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-gray-500">{tip}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
