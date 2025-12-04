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
      {/* Header with illustration */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
        <div className="flex justify-center lg:w-64 lg:shrink-0">
          <div className="bg-primary-50 flex h-48 w-48 items-center justify-center rounded-2xl">
            <MdOutlineLuggage className="text-primary-500 h-24 w-24" />
          </div>
        </div>

        <div className="flex-1">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 lg:text-3xl">
            {t.title}
          </h2>
          <p className="text-base leading-relaxed text-gray-600">{t.intro}</p>
        </div>
      </div>

      {/* Baggage Types */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Checked Baggage */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="bg-primary-100 flex h-12 w-12 items-center justify-center rounded-xl">
              <BsBoxSeam className="text-primary-600 h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {t.checkedBaggageTitle}
            </h3>
          </div>
          <p className="mb-4 text-sm leading-relaxed text-gray-600">
            {t.checkedBaggageDesc}
          </p>

          <div className="space-y-3 rounded-lg bg-gray-50 p-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">{t.weightAllowance}</span>
              <span className="text-sm font-medium text-gray-900">
                {t.weightAllowanceVal}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">{t.maxDimensions}</span>
              <span className="text-sm font-medium text-gray-900">
                {t.maxDimensionsVal}
              </span>
            </div>
          </div>
        </div>

        {/* Cabin Baggage */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <MdOutlineLuggage className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {t.cabinBaggageTitle}
            </h3>
          </div>
          <p className="mb-4 text-sm leading-relaxed text-gray-600">
            {t.cabinBaggageDesc}
          </p>

          <div className="space-y-3 rounded-lg bg-gray-50 p-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">{t.weightAllowance}</span>
              <span className="text-sm font-medium text-gray-900">
                {t.cabinWeightVal}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">{t.maxDimensions}</span>
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
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
            <MdOutlineWarning className="h-5 w-5 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {t.prohibitedTitle}
          </h3>
        </div>
        <p className="mb-4 text-sm text-gray-700">{t.prohibitedDesc}</p>

        <ul className="grid gap-2 sm:grid-cols-2">
          <li className="flex items-start gap-2">
            <TbAlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
            <span className="text-sm text-gray-700">
              {t.prohibitedExplosives}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <TbAlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
            <span className="text-sm text-gray-700">{t.prohibitedWeapons}</span>
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

      {/* Cabin Restrictions */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
            <TbAlertTriangle className="h-5 w-5 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {t.cabinRestrictedTitle}
          </h3>
        </div>

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

      {/* Valuables */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
            <MdOutlineDiamond className="h-5 w-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {t.valuablesTitle}
          </h3>
        </div>
        <p className="mb-4 text-sm text-gray-600">{t.valuablesDesc}</p>

        <ul className="grid gap-2 sm:grid-cols-2">
          <li className="flex items-start gap-2">
            <span className="bg-primary-500 mt-1.5 h-2 w-2 shrink-0 rounded-full" />
            <span className="text-sm text-gray-700">
              {t.valuableElectronics}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-primary-500 mt-1.5 h-2 w-2 shrink-0 rounded-full" />
            <span className="text-sm text-gray-700">{t.valuableJewelry}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-primary-500 mt-1.5 h-2 w-2 shrink-0 rounded-full" />
            <span className="text-sm text-gray-700">
              {t.valuableMedication}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-primary-500 mt-1.5 h-2 w-2 shrink-0 rounded-full" />
            <span className="text-sm text-gray-700">{t.valuableKeys}</span>
          </li>
        </ul>
      </div>

      {/* Excess Baggage & Liability */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-blue-50 p-6">
          <h3 className="mb-2 text-base font-semibold text-gray-900">
            {t.excessTitle}
          </h3>
          <p className="mb-3 text-sm text-gray-700">{t.excessDesc}</p>
          <p className="text-primary-600 text-sm font-medium">
            {t.excessContact}
          </p>
        </div>

        <div className="rounded-xl bg-gray-100 p-6">
          <p className="text-xs leading-relaxed text-gray-600">
            {t.liabilityNote}
          </p>
        </div>
      </div>
    </div>
  );
}
