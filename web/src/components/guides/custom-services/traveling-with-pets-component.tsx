"use client";

import Link from "next/link";
import {
  AlertCircle,
  ChevronLeft,
  FileText,
  PawPrint,
  Package,
  ShieldAlert,
} from "lucide-react";
import { Lang } from "@/types/language";
import { createCustomServicesI18n } from "@/data/i18n/guide";

interface Props {
  lang: Lang;
}

export const TravelingWithPetsComponent = ({ lang }: Props) => {
  const { petsGuideline: t } = createCustomServicesI18n(lang);

  const generalRules = [t.general1, t.general2, t.general3, t.general4];

  const avihRules = [t.avih1, t.avih2, t.avih3];

  const documents = [
    {
      icon: FileText,
      title: t.doc1Title,
      desc: t.doc1Desc,
      color: "text-primary-500",
      bg: "bg-primary-50",
    },
    {
      icon: FileText,
      title: t.doc2Title,
      desc: t.doc2Desc,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
  ];

  const carrierRules = [t.carrier1, t.carrier2];
  const tips = [t.tip1, t.tip2];

  return (
    <div className="bg-gray-50 py-8">
      <div className="container space-y-4">
        {/* Back + Header */}
        <div className="space-y-4">
          <Link
            href={`/${lang}/guides/custom-services`}
            className="group hover:text-primary-600 inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            {t.backButton}
          </Link>
          <div className="space-y-1.5">
            <h1 className="text-3xl leading-tight font-bold text-gray-900 lg:text-4xl">
              {t.title}
            </h1>
            <p className="text-base text-gray-500">{t.subtitle}</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex gap-3 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
          <p className="text-sm leading-relaxed text-amber-700">
            {t.disclaimer}
          </p>
        </div>

        {/* General Rules + AVIH side by side on lg */}
        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          {/* General Rules */}
          <div className="rounded-2xl bg-white p-5">
            <h2 className="mb-4 text-base font-bold text-gray-900">
              {t.generalTitle}
            </h2>
            <div className="space-y-2">
              {generalRules.map((rule, i) => (
                <div
                  key={i}
                  className="border-primary-300 flex gap-3 border-l-4 bg-gray-50 px-4 py-3"
                >
                  <PawPrint className="text-primary-400 mt-0.5 h-4 w-4 shrink-0" />
                  <p className="text-sm leading-relaxed text-gray-600">
                    {rule}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AVIH Special Requirements */}
          <div className="rounded-2xl bg-white p-5">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-50">
                <ShieldAlert className="h-3.5 w-3.5 text-rose-500" />
              </div>
              <h2 className="text-base font-bold text-gray-900">
                {t.avihTitle}
              </h2>
            </div>
            <div className="space-y-2">
              {avihRules.map((rule, i) => (
                <div
                  key={i}
                  className="flex gap-3 rounded-xl bg-gray-50 px-4 py-3"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-500">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {rule}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Documents + Carrier side by side on lg */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Required Documents */}
          <div className="rounded-2xl bg-white p-5">
            <h2 className="mb-4 text-base font-bold text-gray-900">
              {t.documentsTitle}
            </h2>
            <div className="space-y-2">
              {documents.map(({ icon: Icon, title, desc, color, bg }, i) => (
                <div
                  key={i}
                  className="flex gap-4 rounded-xl bg-gray-50 px-4 py-3"
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${bg}`}
                  >
                    <Icon className={`h-4 w-4 ${color}`} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-gray-800">
                      {title}
                    </p>
                    <p className="text-sm leading-relaxed text-gray-500">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carrier Requirements */}
          <div className="rounded-2xl bg-white p-5">
            <h2 className="mb-4 text-base font-bold text-gray-900">
              {t.carrierTitle}
            </h2>
            <div className="space-y-2">
              {carrierRules.map((rule, i) => (
                <div
                  key={i}
                  className="flex gap-3 rounded-xl bg-gray-50 px-4 py-3"
                >
                  <Package className="text-secondary-400 mt-0.5 h-4 w-4 shrink-0" />
                  <p className="text-sm leading-relaxed text-gray-600">
                    {rule}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Travel Tips */}
        <div className="rounded-2xl bg-white p-5">
          <h2 className="mb-4 text-base font-bold text-gray-900">
            {t.tipsTitle}
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {tips.map((tip, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-xl bg-gray-50 px-4 py-3"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-xs font-bold text-amber-500">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-gray-500">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
