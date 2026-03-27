import Image from "next/image";
import {
  AlertCircle,
  AlertTriangle,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";
import { Lang } from "@/types/language";
import { createArrivalGuideI18n } from "@/data/i18n/guide";

interface ExitCustomsContentProps {
  lang: Lang;
}

export function ExitCustomsContent({ lang }: ExitCustomsContentProps) {
  const { exitCustoms: t } = createArrivalGuideI18n(lang);

  const officerItems = [
    { label: t.lookNarcoticsLabel, desc: t.lookNarcoticsDesc, color: "bg-red-50 text-red-700 border-red-200" },
    { label: t.lookCurrencyLabel, desc: t.lookCurrencyDesc, color: "bg-orange-50 text-orange-700 border-orange-200" },
    { label: t.lookTobaccoLabel, desc: t.lookTobaccoDesc, color: "bg-orange-50 text-orange-700 border-orange-200" },
    { label: t.lookCommercialLabel, desc: t.lookCommercialDesc, color: "bg-amber-50 text-amber-700 border-amber-200" },
    { label: t.lookProhibitedLabel, desc: t.lookProhibitedDesc, color: "bg-amber-50 text-amber-700 border-amber-200" },
  ];

  const penaltyItems = [
    { label: t.penaltyFinesLabel, desc: t.penaltyFinesDesc },
    { label: t.penaltyConfiscationLabel, desc: t.penaltyConfiscationDesc },
    { label: t.penaltyCriminalLabel, desc: t.penaltyCriminalDesc },
    { label: t.penaltyDeportationLabel, desc: t.penaltyDeportationDesc },
    { label: t.penaltyBanLabel, desc: t.penaltyBanDesc },
  ];

  const assistanceRows = [
    { icon: MapPin, label: t.assistanceOfficeLabel, value: t.assistanceOfficeValue },
    { icon: Phone, label: t.assistancePhoneLabel, value: t.assistancePhoneValue },
    { icon: Clock, label: t.assistanceAvailability, value: null },
  ];

  const afterItems = [
    t.afterItem1, t.afterItem2, t.afterItem3, t.afterItem4, t.afterItem5,
  ];

  const randomItems = [
    t.randomItem1, t.randomItem2, t.randomItem3, t.randomItem4,
  ];

  return (
    <>
      {/* ── Section 1: Header + Image + Channels ────────────── */}
      <section className="bg-[#f0fbfc] py-10">
        <div className="container space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              {t.title}
            </h2>
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

            {/* Channels */}
            <div className="space-y-5">
              <p className="text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                {t.channelsTitle}
              </p>

              {/* Green channel */}
              <div className="rounded-xl bg-white p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-bold text-white">
                    {t.greenChannelTitle}
                  </span>
                  <span className="text-xs font-medium text-emerald-700">
                    — {t.greenChannelBadge}
                  </span>
                </div>
                <p className="mb-2 text-xs text-gray-500">{t.greenChannelDesc}</p>
                <div className="space-y-1.5 rounded-r-lg border-l-4 border-emerald-500 bg-emerald-50 px-4 py-3">
                  {[t.greenItem1, t.greenItem2, t.greenItem3, t.greenItem4].map(
                    (item, i) => (
                      <p key={i} className="text-sm text-gray-600">
                        {item}
                      </p>
                    ),
                  )}
                  <p className="mt-1 text-xs font-semibold text-emerald-700">
                    ✓ {t.greenNote}
                  </p>
                </div>
              </div>

              {/* Red channel */}
              <div className="rounded-xl bg-white p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-bold text-white">
                    {t.redChannelTitle}
                  </span>
                  <span className="text-xs font-medium text-red-700">
                    — {t.redChannelBadge}
                  </span>
                </div>
                <p className="mb-2 text-xs text-gray-500">{t.redChannelDesc}</p>
                <div className="space-y-1.5 rounded-r-lg border-l-4 border-red-500 bg-red-50 px-4 py-3">
                  {[t.redItem1, t.redItem2, t.redItem3, t.redItem4].map(
                    (item, i) => (
                      <p key={i} className="text-sm text-gray-600">
                        {item}
                      </p>
                    ),
                  )}
                  <p className="mt-1 text-xs font-semibold text-red-700">
                    {t.redNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Random Inspections + What Officers Look For ── */}
      <section className="bg-white py-10">
        <div className="container space-y-10">
          {/* Random inspections */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <p className="text-xs font-bold uppercase tracking-widest text-amber-600">
                {t.randomInspectionTitle}
              </p>
            </div>
            <p className="mb-3 text-sm text-gray-500">{t.randomInspectionDesc}</p>
            <div className="space-y-2 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 px-4 py-3">
              {randomItems.map((item, i) => (
                <p key={i} className="text-sm text-gray-600">
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* What officers look for — label badge + description */}
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
              {t.officersLookTitle}
            </p>
            <div className="space-y-3">
              {officerItems.map(({ label, desc, color }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-bold ${color}`}
                  >
                    {label}
                  </span>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Penalties + After Clearance + Assistance ─ */}
      <section className="bg-gray-50 py-10">
        <div className="container space-y-10">
          {/* Penalties — label badge + description */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <p className="text-xs font-bold uppercase tracking-widest text-red-600">
                {t.penaltiesTitle}
              </p>
            </div>
            <div className="space-y-3 rounded-r-lg border-l-4 border-red-500 bg-red-50 px-4 py-4">
              {penaltyItems.map(({ label, desc }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="shrink-0 rounded-full border border-red-200 bg-white px-2.5 py-0.5 text-xs font-bold text-red-700">
                    {label}
                  </span>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              ))}
              <p className="border-t border-red-200 pt-3 text-xs font-semibold text-red-700">
                {t.penaltyNote}
              </p>
            </div>
          </div>

          {/* After clearance + pro tip + assistance */}
          <div className="grid gap-8 border-t border-gray-200 pt-6 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                {t.afterClearanceTitle}
              </p>
              <p className="mb-4 text-sm text-gray-500">{t.afterClearanceDesc}</p>
              <div className="space-y-2">
                {afterItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span className="mt-0.5 shrink-0 font-bold text-[#00AAAC]">
                      ✓
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              {/* Pro tip */}
              <div className="rounded-r-lg border-l-4 border-[#00AAAC] bg-[#f0fbfc] px-4 py-3">
                <p className="text-sm text-gray-600">{t.proTip}</p>
              </div>

              {/* Assistance — labeled rows, no colons */}
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
                  {t.assistanceTitle}
                </p>
                <div className="space-y-3">
                  {assistanceRows.map(({ icon: Icon, label, value }, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#f0fbfc]">
                        <Icon className="h-3.5 w-3.5 text-[#00AAAC]" />
                      </div>
                      <div>
                        <p className="mb-0.5 text-xs font-semibold uppercase tracking-wide text-gray-400">
                          {label}
                        </p>
                        {value && (
                          <p className="text-sm text-gray-700">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
