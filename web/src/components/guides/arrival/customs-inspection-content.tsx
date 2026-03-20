import Image from "next/image";
import { AlertTriangle } from "lucide-react";
import { Lang } from "@/types/language";
import { createArrivalGuideI18n } from "@/data/i18n/guide";

interface CustomsInspectionContentProps {
  lang: Lang;
}

export function CustomsInspectionContent({
  lang,
}: CustomsInspectionContentProps) {
  const { customsInspection: t } = createArrivalGuideI18n(lang);

  return (
    <>
      {/* ── Header + Image + Declaration ────────────────────── */}
      <section className="bg-[#f0fbfc] py-10">
        <div className="container space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">{t.title}</h2>
            <p className="max-w-2xl text-gray-500 lg:text-lg">{t.intro}</p>
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <div className="overflow-hidden rounded-2xl bg-white">
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[420px]">
                <Image
                  src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/customs-inspection.png"
                  alt="Customs Declaration"
                  fill
                  className="object-contain object-top"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Declaration requirements */}
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{t.declarationTitle}</p>
              <div className="flex items-start gap-3 border-l-4 border-amber-500 bg-amber-50 px-4 py-3 rounded-r-lg">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <p className="text-sm font-semibold text-gray-700">{t.mustDeclare}</p>
              </div>
              <div className="space-y-2">
                {[t.declareCurrency, t.declareLaoKip, t.declareGold, t.declareCommercial, t.declareRestricted].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-0.5 shrink-0 font-bold text-[#00AAAC]">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Duty-Free Allowances ────────────────────────────── */}
      <section className="bg-white py-10">
        <div className="container">
          <p className="mb-6 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{t.dutyFreeTitle}</p>
          <div className="grid gap-8 sm:grid-cols-3">
            {/* Tobacco */}
            <div>
              <p className="mb-3 text-sm font-bold text-gray-700">{t.tobaccoTitle}</p>
              <div className="space-y-2">
                {[t.tobacco1, t.tobacco2, t.tobacco3].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-0.5 shrink-0 font-bold text-emerald-500">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Alcohol */}
            <div>
              <p className="mb-3 text-sm font-bold text-gray-700">{t.alcoholTitle}</p>
              <div className="space-y-2">
                {[t.alcohol1, t.alcohol2].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-0.5 shrink-0 font-bold text-emerald-500">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Personal Items */}
            <div>
              <p className="mb-3 text-sm font-bold text-gray-700">{t.personalTitle}</p>
              <div className="space-y-2">
                {[t.personal1, t.personal2].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-0.5 shrink-0 font-bold text-emerald-500">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Prohibited + Special Rules + Pro Tip ─────────────── */}
      <section className="bg-gray-50 py-10">
        <div className="container space-y-10">
          {/* Prohibited items */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <p className="text-xs font-bold uppercase tracking-widest text-red-600">{t.prohibitedTitle}</p>
            </div>
            <p className="mb-4 text-sm text-gray-500">{t.prohibitedDesc}</p>
            <div className="space-y-2 border-l-4 border-red-500 bg-red-50 px-4 py-3 rounded-r-lg">
              {[t.prohibitedNarcotics, t.prohibitedWeapons, t.prohibitedPornographic, t.prohibitedCounterfeit, t.prohibitedEndangered].map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="mt-0.5 shrink-0 font-bold text-red-500">×</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Special import rules */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{t.specialRulesTitle}</p>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                { title: t.medicationsTitle, desc: t.medicationsDesc },
                { title: t.foodItemsTitle, desc: t.foodItemsDesc },
                { title: t.plantsTitle, desc: t.plantsDesc },
                { title: t.electronicsTitle, desc: t.electronicsDesc },
              ].map(({ title, desc }, i) => (
                <div key={i}>
                  <p className="mb-1 text-sm font-semibold text-gray-800">{title}</p>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pro tip */}
          <div className="border-l-4 border-[#00AAAC] bg-[#f0fbfc] px-4 py-3 rounded-r-lg">
            <p className="text-sm text-gray-600">{t.proTip}</p>
          </div>
        </div>
      </section>
    </>
  );
}
