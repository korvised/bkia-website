import Image from "next/image";
import {
  AlertCircle,
  Clock,
  Search,
  Tag,
  Eye,
  Package,
  Truck,
} from "lucide-react";
import { Lang } from "@/types/language";
import { createArrivalGuideI18n } from "@/data/i18n/guides";

interface BaggageClaimContentProps {
  lang: Lang;
}

export function BaggageClaimContent({ lang }: BaggageClaimContentProps) {
  const { baggageClaim: t } = createArrivalGuideI18n(lang);

  const waitTimes = [
    { label: t.firstBagsLabel, value: t.firstBagsValue },
    { label: t.mostBagsLabel, value: t.mostBagsValue },
    { label: t.priorityBagsLabel, value: t.priorityBagsValue },
  ];

  const collectSteps = [
    t.collectStep1,
    t.collectStep2,
    t.collectStep3,
    t.collectStep4,
    t.collectStep5,
  ];

  const reminders = [
    { icon: Tag, label: t.reminder1Label, desc: t.reminder1Desc },
    { icon: Eye, label: t.reminder2Label, desc: t.reminder2Desc },
    { icon: Package, label: t.reminder3Label, desc: t.reminder3Desc },
    { icon: Truck, label: t.reminder4Label, desc: t.reminder4Desc },
  ];

  const missingSteps = [
    t.missingStep1,
    t.missingStep2,
    t.missingStep3,
    t.missingStep4,
    t.missingStep5,
    t.missingStep6,
  ];

  const damagedSteps = [
    t.damagedStep1,
    t.damagedStep2,
    t.damagedStep3,
    t.damagedStep4,
    t.damagedStep5,
  ];

  return (
    <>
      {/* ── Section 1: Header + Image + Wait Times ──────────── */}
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
                  src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/baggage-claim.png"
                  alt="Baggage Claim"
                  fill
                  className="object-contain object-top"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Wait times — stat-style rows */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#00AAAC]" />
                <p className="text-xs font-bold tracking-widest text-[#00AAAC] uppercase">
                  {t.waitTimesTitle}
                </p>
              </div>
              <div className="divide-y divide-[#d4f2f3] overflow-hidden rounded-xl bg-white">
                {waitTimes.map(({ label, value }, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-3"
                  >
                    <span className="text-sm text-gray-500">{label}</span>
                    <span className="text-sm font-bold text-gray-900">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Steps + Reminders ────────────────────── */}
      <section className="bg-white py-10">
        <div className="container space-y-10">
          {/* Collecting steps */}
          <div>
            <p className="mb-5 text-xs font-bold tracking-widest text-[#00AAAC] uppercase">
              {t.collectingTitle}
            </p>
            <div className="space-y-4">
              {collectSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f7f8] text-xs font-bold text-[#00AAAC]">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reminders — 2×2 labeled card grid */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <p className="text-xs font-bold tracking-widest text-amber-600 uppercase">
                {t.remindersTitle}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {reminders.map(({ icon: Icon, label, desc }, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100">
                    <Icon className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="mb-0.5 text-xs font-bold text-amber-800">
                      {label}
                    </p>
                    <p className="text-xs text-gray-600">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Lost/Damaged + Contact ───────────────── */}
      <section className="bg-gray-50 py-10">
        <div className="container space-y-10">
          {/* Lost / Damaged */}
          <div>
            <p className="mb-6 text-xs font-bold tracking-widest text-[#00AAAC] uppercase">
              {t.lostDamagedTitle}
            </p>
            <div className="grid gap-8 sm:grid-cols-2">
              {/* Missing baggage — numbered steps */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Search className="h-4 w-4 text-red-500" />
                  <p className="text-sm font-bold text-gray-800">
                    {t.missingBaggageTitle}
                  </p>
                </div>
                <p className="mb-4 text-sm text-gray-500">
                  {t.missingBaggageDesc}
                </p>
                <div className="space-y-3">
                  {missingSteps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-[10px] font-bold text-red-600">
                        {i + 1}
                      </span>
                      <p className="text-sm text-gray-600">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Damaged baggage — numbered steps */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <p className="text-sm font-bold text-gray-800">
                    {t.damagedBaggageTitle}
                  </p>
                </div>
                <p className="mb-4 text-sm text-gray-500">
                  {t.damagedBaggageDesc}
                </p>
                <div className="space-y-3">
                  {damagedSteps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[10px] font-bold text-orange-600">
                        {i + 1}
                      </span>
                      <p className="text-sm text-gray-600">{step}</p>
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
