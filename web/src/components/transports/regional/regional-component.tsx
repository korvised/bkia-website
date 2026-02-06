"use client";

import { TH, MM } from "country-flag-icons/react/1x1";
import { Lang } from "@/types/language";
import { createRegionalTransportI18n } from "@/data/i18n/transport/regional";

interface Props {
  lang: Lang;
}

export const RegionalComponent = ({ lang }: Props) => {
  const { toThailand: tTH, toMyanmar: tMM } = createRegionalTransportI18n(lang);

  return (
    <div className="py-8">
      <div className="container space-y-12">
        {/* To Thailand Section */}
        <section className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-blue-200">
              <TH className="h-16 w-16" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl">
                {tTH.title}
              </h2>
              <p className="text-gray-600">{tTH.intro}</p>
            </div>
          </div>

          {/* Main Info Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Distance */}
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <span>📍</span>
                {tTH.distanceTitle}
              </h3>
              <p className="whitespace-pre-line text-gray-700">
                {tTH.distance}
              </p>
            </div>

            {/* Transport */}
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <span>🚕</span>
                {tTH.transportTitle}
              </h3>
              <p className="text-gray-700">{tTH.taxi}</p>
            </div>

            {/* Crossing Methods */}
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <span>⛵</span>
                {tTH.crossingTitle}
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-2">
                  <span>•</span>
                  <span className="font-medium text-blue-700">{tTH.ferry}</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>{tTH.bridge}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Hours & Visa */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-4">
              <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                <span>⏰</span>
                {tTH.hoursTitle}
              </h4>
              <p className="text-sm text-gray-700">{tTH.hours}</p>
            </div>
            <div className="rounded-lg bg-green-50 p-4">
              <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                <span>📋</span>
                {tTH.visaTitle}
              </h4>
              <p className="text-sm text-gray-700">{tTH.visa}</p>
            </div>
          </div>

          {/* Tips */}
          <div className="rounded-lg bg-yellow-50 p-5">
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
              <span>💡</span>
              {tTH.tipsTitle}
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-2">
                <span>•</span>
                <span>{tTH.tip1}</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>{tTH.tip2}</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t-2 border-gray-200"></div>

        {/* To Myanmar Section */}
        <section className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-red-200">
              <MM className="h-16 w-16" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl">
                {tMM.title}
              </h2>
              <p className="text-gray-600">{tMM.intro}</p>
            </div>
          </div>

          {/* Warning Banner */}
          <div className="rounded-lg bg-red-50 p-5">
            <h3 className="mb-2 flex items-center gap-2 font-bold text-red-900">
              <span>⚠️</span>
              {tMM.warningTitle}
            </h3>
            <p className="text-sm text-red-800">{tMM.warning}</p>
          </div>

          {/* Main Info Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Distance */}
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <span>📍</span>
                {tMM.distanceTitle}
              </h3>
              <p className="text-gray-700">{tMM.distance}</p>
            </div>

            {/* Crossing */}
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <span>⛵</span>
                {tMM.crossingTitle}
              </h3>
              <p className="text-gray-700">{tMM.crossing}</p>
            </div>

            {/* Alternative Routes */}
            <div className="rounded-lg bg-green-50 p-4">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-green-900">
                <span>✅</span>
                {tMM.alternativeTitle}
              </h3>
              <ul className="space-y-2 text-sm text-green-800">
                <li className="flex gap-2">
                  <span>•</span>
                  <span>{tMM.alt1}</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>{tMM.alt2}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Hours & Visa */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-4">
              <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                <span>⏰</span>
                {tMM.hoursTitle}
              </h4>
              <p className="text-sm text-gray-700">{tMM.hours}</p>
            </div>
            <div className="rounded-lg bg-yellow-50 p-4">
              <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                <span>📋</span>
                {tMM.visaTitle}
              </h4>
              <p className="text-sm text-gray-700">{tMM.visa}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
