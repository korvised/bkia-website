import Image from "next/image";
import { AlertCircle, Info, Phone } from "lucide-react";
import { Lang } from "@/types/language";
import { createArrivalGuideI18n } from "@/data/i18n/guide";

interface ArrivalAirportContentProps {
  lang: Lang;
}

export function ArrivalAirportContent({ lang }: ArrivalAirportContentProps) {
  const { arrivalAirport: t } = createArrivalGuideI18n(lang);

  return (
    <>
      {/* ── Header + Image + Notice ─────────────────────────── */}
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
                  src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/arrival.png"
                  alt="Arrival at Bokeo International Airport"
                  fill
                  className="object-contain object-top"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Important notice + first steps */}
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{t.importantTitle}</p>
                <div className="flex items-start gap-3 border-l-4 border-[#00AAAC] bg-[#f0fbfc] px-4 py-3 rounded-r-lg">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#00AAAC]" />
                  <p className="text-sm text-gray-600">{t.importantDesc}</p>
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{t.firstStepsTitle}</p>
                <p className="mb-4 text-sm text-gray-500">{t.firstStepsDesc}</p>
                <div className="space-y-3">
                  {[t.healthScreening, t.immigrationControl, t.baggageClaim, t.customsCheckpoint].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f7f8] text-xs font-bold text-[#00AAAC]">{i + 1}</span>
                      <p className="text-sm text-gray-700">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Disembarkation + Processing Time ──────────────── */}
      <section className="bg-white py-10">
        <div className="container space-y-10">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{t.disembarkationTitle}</p>
            <div className="space-y-3">
              {[t.disembarkStep1, t.disembarkStep2, t.disembarkStep3, t.disembarkStep4].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">{i + 1}</span>
                  <p className="text-sm text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-3 border-l-4 border-amber-500 bg-amber-50 px-4 py-3 rounded-r-lg">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-amber-700">{t.processingTimeTitle} </span>
              {t.processingTimeDesc}
            </p>
          </div>
        </div>
      </section>

      {/* ── Facilities + Emergency ─────────────────────────── */}
      <section className="bg-gray-50 py-10">
        <div className="container space-y-10">
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{t.facilitiesTitle}</p>
            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <p className="mb-4 text-sm font-bold text-gray-700">{t.availableServices}</p>
                <div className="space-y-2">
                  {[t.currencyExchange, t.atmMachines, t.freeWifi, t.infoDesks, t.restrooms, t.waterStations].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-0.5 shrink-0 font-bold text-[#00AAAC]">✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-4 text-sm font-bold text-gray-700">{t.assistanceAvailable}</p>
                <div className="space-y-2">
                  {[t.wheelchairService, t.porterServices, t.medicalFirstAid, t.lostFound, t.airportPolice].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-0.5 shrink-0 font-bold text-[#00AAAC]">✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-r-lg border-l-4 border-red-500 bg-red-50 px-5 py-4">
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-600">
              <Phone className="h-3.5 w-3.5" />
              {t.emergencyContact}
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium text-red-800">{t.airportInfo}</p>
              <p className="text-sm font-medium text-red-800">{t.emergencyServices}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
