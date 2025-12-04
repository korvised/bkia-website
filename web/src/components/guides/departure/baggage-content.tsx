import Image from "next/image";
import {
  MdOutlineLuggage,
  MdOutlineWarning,
  MdOutlineDiamond,
} from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { TbAlertTriangle } from "react-icons/tb";
import { Lang } from "@/types/language";
import { createPassengerGuideI18n } from "@/data/i18n/guide";

interface BaggageContentProps {
  lang: Lang;
}

export function BaggageContent({ lang }: BaggageContentProps) {
  const { baggage: t } = createPassengerGuideI18n(lang);

  return (
    <div className="space-y-8">
      {/* Title Section - Full Width */}
      <div>
        <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl">
          {t.title}
        </h2>
        <p className="text-lg leading-relaxed text-gray-700">{t.intro}</p>
      </div>

      {/* Main Content with Image */}
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
        {/* Left side - Illustration (aligned to start, not centered) */}
        <div className="lg:w-96 lg:flex-none">
          <div className="relative h-72 w-full max-w-lg lg:h-[500px] lg:max-w-none">
            <Image
              src="/images/guides/baggage.png"
              alt="baggage information at bkia"
              fill
              className="object-contain object-top"
              priority
              sizes="(max-width: 1024px) 100vw, 400px"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 space-y-8">
          {/* Baggage Types - Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Checked Baggage */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-primary-100 flex h-10 w-10 items-center justify-center rounded-lg">
                  <BsBoxSeam className="text-primary-600 h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {t.checkedBaggageTitle}
                </h3>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">
                {t.checkedBaggageDesc}
              </p>

              <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    {t.weightAllowance}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {t.weightAllowanceVal}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    {t.maxDimensions}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {t.maxDimensionsVal}
                  </span>
                </div>
              </div>
            </div>

            {/* Cabin Baggage */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <MdOutlineLuggage className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {t.cabinBaggageTitle}
                </h3>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">
                {t.cabinBaggageDesc}
              </p>

              <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    {t.weightAllowance}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {t.cabinWeightVal}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    {t.maxDimensions}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {t.cabinDimensionsVal}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">{t.personalItem}:</span>{" "}
                    {t.personalItemDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Prohibited Items */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MdOutlineWarning className="h-6 w-6 text-red-600" />
              <h3 className="text-xl font-bold text-gray-900">
                {t.prohibitedTitle}
              </h3>
            </div>
            <p className="text-base leading-relaxed text-gray-600">
              {t.prohibitedDesc}
            </p>

            <div className="rounded-xl border border-red-200 bg-red-50 p-5">
              <ul className="grid gap-3 sm:grid-cols-2">
                <li className="flex items-start gap-2">
                  <TbAlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  <span className="text-sm text-gray-700">
                    {t.prohibitedExplosives}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <TbAlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  <span className="text-sm text-gray-700">
                    {t.prohibitedWeapons}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <TbAlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  <span className="text-sm text-gray-700">
                    {t.prohibitedChemicals}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <TbAlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  <span className="text-sm text-gray-700">
                    {t.prohibitedBatteries}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Cabin Restrictions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TbAlertTriangle className="h-6 w-6 text-amber-600" />
              <h3 className="text-xl font-bold text-gray-900">
                {t.cabinRestrictedTitle}
              </h3>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                  <span className="text-sm text-gray-700">
                    {t.cabinRestrictedLiquids}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                  <span className="text-sm text-gray-700">
                    {t.cabinRestrictedSharp}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                  <span className="text-sm text-gray-700">
                    {t.cabinRestrictedSports}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Valuables */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MdOutlineDiamond className="h-6 w-6 text-purple-600" />
              <h3 className="text-xl font-bold text-gray-900">
                {t.valuablesTitle}
              </h3>
            </div>
            <p className="text-base leading-relaxed text-gray-600">
              {t.valuablesDesc}
            </p>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <ul className="grid gap-3 sm:grid-cols-2">
                <li className="flex items-start gap-2">
                  <span className="bg-primary-500 mt-1.5 h-2 w-2 shrink-0 rounded-full" />
                  <span className="text-sm text-gray-700">
                    {t.valuableElectronics}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary-500 mt-1.5 h-2 w-2 shrink-0 rounded-full" />
                  <span className="text-sm text-gray-700">
                    {t.valuableJewelry}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary-500 mt-1.5 h-2 w-2 shrink-0 rounded-full" />
                  <span className="text-sm text-gray-700">
                    {t.valuableMedication}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary-500 mt-1.5 h-2 w-2 shrink-0 rounded-full" />
                  <span className="text-sm text-gray-700">
                    {t.valuableKeys}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Excess Baggage & Liability */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-blue-50 p-5">
              <h3 className="mb-2 text-base font-semibold text-gray-900">
                {t.excessTitle}
              </h3>
              <p className="mb-3 text-sm text-gray-700">{t.excessDesc}</p>
              <p className="text-primary-600 text-sm font-medium">
                {t.excessContact}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-100 p-5">
              <p className="text-xs leading-relaxed text-gray-600">
                {t.liabilityNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
