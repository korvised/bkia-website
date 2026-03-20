import Image from "next/image";
import { AlertCircle, AlertTriangle } from "lucide-react";
import { Lang } from "@/types/language";
import { createArrivalGuideI18n } from "@/data/i18n/guide";

interface ExitCustomsContentProps {
  lang: Lang;
}

export function ExitCustomsContent({ lang }: ExitCustomsContentProps) {
  const { exitCustoms: t } = createArrivalGuideI18n(lang);

  return (
    <>
      {/* ── Header + Image + Channels ───────────────────────── */}
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
                  src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/exit-customs.png"
                  alt="Final Customs Inspection"
                  fill
                  className="object-contain object-top"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Exit channels */}
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{t.channelsTitle}</p>

              {/* Green channel */}
              <div className="space-y-2">
                <p className="text-sm font-bold text-green-700">{t.greenChannelTitle}</p>
                <p className="text-sm text-gray-500">{t.greenChannelDesc}</p>
                <div className="space-y-1.5 border-l-4 border-emerald-500 bg-emerald-50 px-4 py-3 rounded-r-lg">
                  {[t.greenItem1, t.greenItem2, t.greenItem3, t.greenItem4].map((item, i) => (
                    <p key={i} className="text-sm text-gray-600">{item}</p>
                  ))}
                  <p className="text-xs font-semibold text-green-700">{t.greenNote}</p>
                </div>
              </div>

              {/* Red channel */}
              <div className="space-y-2">
                <p className="text-sm font-bold text-red-700">{t.redChannelTitle}</p>
                <p className="text-sm text-gray-500">{t.redChannelDesc}</p>
                <div className="space-y-1.5 border-l-4 border-red-500 bg-red-50 px-4 py-3 rounded-r-lg">
                  {[t.redItem1, t.redItem2, t.redItem3, t.redItem4].map((item, i) => (
                    <p key={i} className="text-sm text-gray-600">{item}</p>
                  ))}
                  <p className="text-xs font-semibold text-red-700">{t.redNote}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Random Inspections + What Officers Look For ─────── */}
      <section className="bg-white py-10">
        <div className="container space-y-10">
          {/* Random inspections */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <p className="text-xs font-bold uppercase tracking-widest text-amber-600">{t.randomInspectionTitle}</p>
            </div>
            <p className="mb-4 text-sm text-gray-500">{t.randomInspectionDesc}</p>
            <div className="space-y-2 border-l-4 border-amber-500 bg-amber-50 px-4 py-3 rounded-r-lg">
              {[t.randomItem1, t.randomItem2, t.randomItem3, t.randomItem4].map((item, i) => (
                <p key={i} className="text-sm text-gray-600">{item}</p>
              ))}
            </div>
          </div>

          {/* What officers look for */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{t.officersLookTitle}</p>
            <div className="space-y-3">
              {[
                { color: "text-red-600", text: t.lookNarcotics },
                { color: "text-orange-600", text: t.lookCurrency },
                { color: "text-orange-600", text: t.lookTobaccoAlcohol },
                { color: "text-orange-600", text: t.lookCommercial },
                { color: "text-orange-600", text: t.lookProhibited },
              ].map(({ color, text }, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className={`mt-0.5 shrink-0 font-bold ${color}`}>!</span>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Penalties + After Clearance + Assistance ─────────── */}
      <section className="bg-gray-50 py-10">
        <div className="container space-y-10">
          {/* Penalties */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <p className="text-xs font-bold uppercase tracking-widest text-red-600">{t.penaltiesTitle}</p>
            </div>
            <div className="space-y-2 border-l-4 border-red-500 bg-red-50 px-4 py-3 rounded-r-lg">
              {[t.penaltyFines, t.penaltyConfiscation, t.penaltyCriminal, t.penaltyDeportation, t.penaltyBan].map((item, i) => (
                <p key={i} className="text-sm text-gray-600">{item}</p>
              ))}
              <p className="text-xs font-semibold text-red-700">{t.penaltyNote}</p>
            </div>
          </div>

          {/* After clearance + pro tip + assistance */}
          <div className="grid gap-8 sm:grid-cols-2 border-t border-gray-200 pt-6">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{t.afterClearanceTitle}</p>
              <p className="mb-3 text-sm text-gray-600">{t.afterClearanceDesc}</p>
              <div className="space-y-1.5">
                {[t.afterItem1, t.afterItem2, t.afterItem3, t.afterItem4, t.afterItem5].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-0.5 shrink-0 font-bold text-[#00AAAC]">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="border-l-4 border-[#00AAAC] bg-[#f0fbfc] px-4 py-3 rounded-r-lg">
                <p className="text-sm text-gray-600">{t.proTip}</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">{t.assistanceTitle}</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>{t.assistanceOffice}</p>
                  <p>{t.assistancePhone}</p>
                  <p>{t.assistanceAvailability}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
