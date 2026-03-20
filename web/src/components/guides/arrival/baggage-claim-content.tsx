import Image from "next/image";
import { AlertCircle, Clock, Search } from "lucide-react";
import { Lang } from "@/types/language";
import { createArrivalGuideI18n } from "@/data/i18n/guide";

interface BaggageClaimContentProps {
  lang: Lang;
}

export function BaggageClaimContent({ lang }: BaggageClaimContentProps) {
  const { baggageClaim: t } = createArrivalGuideI18n(lang);

  return (
    <>
      {/* ── Header + Image + Wait Times ─────────────────────── */}
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
                  src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/baggage-claim.png"
                  alt="Baggage Claim"
                  fill
                  className="object-contain object-top"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Wait times */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#00AAAC]" />
                <p className="text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{t.waitTimesTitle}</p>
              </div>
              <div className="space-y-2 border-l-4 border-[#00AAAC] bg-[#f0fbfc] px-4 py-3 rounded-r-lg">
                {[t.firstBags, t.mostBags, t.priorityBags].map((item, i) => (
                  <p key={i} className="text-sm text-gray-600">{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Collecting + Reminders ──────────────────────────── */}
      <section className="bg-white py-10">
        <div className="container space-y-10">
          {/* Steps */}
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{t.collectingTitle}</p>
            <div className="space-y-4">
              {[t.collectStep1, t.collectStep2, t.collectStep3, t.collectStep4, t.collectStep5].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f7f8] text-xs font-bold text-[#00AAAC]">{i + 1}</span>
                  <p className="text-sm text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reminders */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <p className="text-xs font-bold uppercase tracking-widest text-amber-600">{t.remindersTitle}</p>
            </div>
            <div className="space-y-2 border-l-4 border-amber-500 bg-amber-50 px-4 py-3 rounded-r-lg">
              {[t.reminder1, t.reminder2, t.reminder3, t.reminder4].map((item, i) => (
                <p key={i} className="text-sm text-gray-600">{item}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Lost/Damaged + Services Office + Contact ─────────── */}
      <section className="bg-gray-50 py-10">
        <div className="container space-y-10">
          {/* Lost / Damaged */}
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{t.lostDamagedTitle}</p>
            <div className="grid gap-10 sm:grid-cols-2">
              {/* Missing */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Search className="h-4 w-4 text-red-500" />
                  <p className="text-sm font-bold text-gray-700">{t.missingBaggageTitle}</p>
                </div>
                <p className="mb-3 text-sm text-gray-500">{t.missingBaggageDesc}</p>
                <div className="space-y-2 border-l-4 border-red-500 bg-red-50 px-4 py-3 rounded-r-lg">
                  {[t.missingStep1, t.missingStep2, t.missingStep3, t.missingStep4, t.missingStep5, t.missingStep6].map((step, i) => (
                    <p key={i} className="text-sm text-gray-600">{step}</p>
                  ))}
                </div>
              </div>

              {/* Damaged */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <p className="text-sm font-bold text-gray-700">{t.damagedBaggageTitle}</p>
                </div>
                <p className="mb-3 text-sm text-gray-500">{t.damagedBaggageDesc}</p>
                <div className="space-y-2 border-l-4 border-orange-400 bg-orange-50 px-4 py-3 rounded-r-lg">
                  {[t.damagedStep1, t.damagedStep2, t.damagedStep3, t.damagedStep4, t.damagedStep5, t.damagedStep6].map((step, i) => (
                    <p key={i} className="text-sm text-gray-600">{step}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Services office + contact */}
          <div className="grid gap-8 sm:grid-cols-2 border-t border-gray-200 pt-6">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{t.servicesOfficeTitle}</p>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-semibold text-gray-800">{t.servicesLocation}</span></p>
                <p><span className="font-semibold text-gray-800">{t.servicesHours}</span></p>
              </div>
              <p className="mt-4 mb-2 text-sm font-semibold text-gray-700">{t.servicesProvided}</p>
              <div className="space-y-1">
                {[t.serviceLostTracking, t.serviceDamageClaims, t.serviceDelayedDelivery, t.serviceOversized].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-0.5 shrink-0 font-bold text-[#00AAAC]">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="border-l-4 border-[#00AAAC] bg-[#f0fbfc] px-4 py-3 rounded-r-lg">
                <p className="text-sm text-gray-600">{t.proTip}</p>
              </div>
              <div className="pt-2">
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">{t.contactTitle}</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>{t.contactPhone}</p>
                  <p>{t.contactEmail}</p>
                  <p>{t.contactAirline}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
