import Image from "next/image";
import { MdOutlineLuggage, MdOutlineDiamond } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { TbAlertTriangle } from "react-icons/tb";
import { Lang } from "@/types/language";
import { createDepartureGuideI18n } from "@/data/i18n/guide";

interface BaggageContentProps {
  lang: Lang;
}

export function BaggageContent({ lang }: BaggageContentProps) {
  const { baggage: t } = createDepartureGuideI18n(lang);

  return (
    <>
      {/* ── Hero + Baggage Types ─────────────────────────────── */}
      <section className="bg-[#f0fbfc] py-12">
        <div className="container">
          {/* Title */}
          <div className="mb-10 space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              {t.title}
            </h2>
            <p className="max-w-2xl text-gray-500 lg:text-lg">{t.intro}</p>
          </div>

          {/* Image + Specs */}
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-72 w-full lg:h-[500px]">
              <Image
                src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/baggage.png"
                alt="baggage information at bkia"
                fill
                className="object-contain object-top"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="space-y-10">
              {/* Checked baggage */}
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <BsBoxSeam className="h-4 w-4 text-[#00AAAC]" />
                  <p className="text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                    {t.checkedBaggageTitle}
                  </p>
                </div>
                <p className="mb-3 text-sm text-gray-600">
                  {t.checkedBaggageDesc}
                </p>
                <div className="divide-y divide-[#c8ecee]">
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-gray-500">
                      {t.weightAllowance}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {t.weightAllowanceVal}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-gray-500">
                      {t.maxDimensions}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {t.maxDimensionsVal}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cabin baggage */}
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <MdOutlineLuggage className="h-4 w-4 text-sky-500" />
                  <p className="text-xs font-bold uppercase tracking-widest text-sky-600">
                    {t.cabinBaggageTitle}
                  </p>
                </div>
                <p className="mb-3 text-sm text-gray-600">
                  {t.cabinBaggageDesc}
                </p>
                <div className="divide-y divide-[#c8ecee]">
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-gray-500">
                      {t.weightAllowance}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {t.cabinWeightVal}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-gray-500">
                      {t.maxDimensions}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {t.cabinDimensionsVal}
                    </span>
                  </div>
                  <div className="py-3">
                    <span className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">
                        {t.personalItem}:{" "}
                      </span>
                      {t.personalItemDesc}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Prohibited + Cabin Restrictions + Valuables ──────── */}
      <section className="bg-white py-12">
        <div className="container space-y-14">
          {/* Prohibited items */}
          <div>
            <div className="mb-5 flex items-start gap-3 border-l-4 border-red-500 bg-red-50 px-4 py-3 rounded-r-lg">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-red-600">
                  {t.prohibitedTitle}
                </p>
                <p className="text-sm text-gray-600">{t.prohibitedDesc}</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                t.prohibitedExplosives,
                t.prohibitedWeapons,
                t.prohibitedChemicals,
                t.prohibitedBatteries,
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <TbAlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cabin restrictions + Valuables */}
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-amber-600">
                {t.cabinRestrictedTitle}
              </p>
              <div className="space-y-3 border-l-4 border-amber-500 bg-amber-50 px-4 py-3 rounded-r-lg">
                {[
                  t.cabinRestrictedLiquids,
                  t.cabinRestrictedSharp,
                  t.cabinRestrictedSports,
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2">
                <MdOutlineDiamond className="h-4 w-4 text-violet-500" />
                <p className="text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                  {t.valuablesTitle}
                </p>
              </div>
              <p className="mb-4 text-sm text-gray-600">{t.valuablesDesc}</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  t.valuableElectronics,
                  t.valuableJewelry,
                  t.valuableMedication,
                  t.valuableKeys,
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#00AAAC]" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Excess + Liability ───────────────────────────────── */}
      <section className="bg-gray-50 py-10">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
              {t.excessTitle}
            </p>
            <p className="mb-2 text-sm text-gray-600">{t.excessDesc}</p>
            <p className="text-sm font-medium text-[#00AAAC]">
              {t.excessContact}
            </p>
          </div>
          <div className="flex items-start gap-3 border-l-2 border-gray-300 pl-4">
            <p className="text-xs leading-relaxed text-gray-500">
              {t.liabilityNote}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
