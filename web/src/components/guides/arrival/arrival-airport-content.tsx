import Image from "next/image";
import { AlertCircle, Info, Phone, ShieldAlert, Stethoscope } from "lucide-react";
import { Lang } from "@/types/language";
import { createArrivalGuideI18n } from "@/data/i18n/guide";

interface ArrivalAirportContentProps {
  lang: Lang;
}

export function ArrivalAirportContent({ lang }: ArrivalAirportContentProps) {
  const { arrivalAirport: t } = createArrivalGuideI18n(lang);

  const services = [
    t.currencyExchange,
    t.atmMachines,
    t.freeWifi,
    t.infoDesks,
    t.restrooms,
    t.waterStations,
  ];

  const assistance = [
    t.wheelchairService,
    t.porterServices,
    t.medicalFirstAid,
    t.lostFound,
    t.airportPolice,
  ];

  const firstSteps = [
    t.healthScreening,
    t.immigrationControl,
    t.baggageClaim,
    t.customsCheckpoint,
  ];

  const disembarkSteps = [
    t.disembarkStep1,
    t.disembarkStep2,
    t.disembarkStep3,
    t.disembarkStep4,
  ];

  return (
    <>
      {/* ── Section 1: Header + Image + Important + First Steps ── */}
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
              {/* Important notice */}
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                  {t.importantTitle}
                </p>
                <div className="flex items-start gap-3 rounded-r-lg border-l-4 border-[#00AAAC] bg-white px-4 py-3">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#00AAAC]" />
                  <p className="text-sm text-gray-600">{t.importantDesc}</p>
                </div>
              </div>

              {/* First steps — numbered */}
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                  {t.firstStepsTitle}
                </p>
                <p className="mb-4 text-sm text-gray-500">{t.firstStepsDesc}</p>
                <div className="space-y-3">
                  {firstSteps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e6f7f8] text-xs font-bold text-[#00AAAC]">
                        {i + 1}
                      </span>
                      <p className="text-sm text-gray-700">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Disembarkation + Processing Time ────────── */}
      <section className="bg-white py-10">
        <div className="container space-y-8">
          {/* Disembarkation steps */}
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
              {t.disembarkationTitle}
            </p>
            <div className="space-y-3">
              {disembarkSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Processing time */}
          <div className="flex items-start gap-3 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 px-4 py-3">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
            <div>
              <p className="mb-0.5 text-xs font-bold uppercase tracking-wide text-amber-700">
                {t.processingTimeTitle}
              </p>
              <p className="text-sm text-gray-600">{t.processingTimeDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Facilities + Emergency Contact ──────────── */}
      <section className="bg-gray-50 py-10">
        <div className="container space-y-8">
          {/* Facilities */}
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
              {t.facilitiesTitle}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Available services */}
              <div className="rounded-xl bg-white p-5">
                <p className="mb-4 text-sm font-bold text-gray-800">
                  {t.availableServices}
                </p>
                <div className="space-y-2">
                  {services.map((item, i) => (
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

              {/* Assistance available */}
              <div className="rounded-xl bg-white p-5">
                <p className="mb-4 text-sm font-bold text-gray-800">
                  {t.assistanceAvailable}
                </p>
                <div className="space-y-2">
                  {assistance.map((item, i) => (
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
            </div>
          </div>

          {/* Emergency numbers — pill cards row */}
          <div className="border-t border-gray-200 pt-6">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-red-500">
              {t.emergencyContact}
            </p>
            <div className="flex flex-wrap gap-3">
              {/* Airport info */}
              <a
                href={`tel:${t.airportInfoValue.replace(/\s/g, "")}`}
                className="flex items-center gap-3 rounded-xl border border-red-100 bg-white px-4 py-3 transition-colors hover:border-red-300 hover:bg-red-50"
              >
                <Phone className="h-4 w-4 shrink-0 text-red-400" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-400">{t.airportInfoLabel}</p>
                  <p className="text-sm font-black text-red-600">
                    {t.airportInfoValue}
                  </p>
                </div>
              </a>

              {/* Police */}
              <a
                href={`tel:${t.emergencyPoliceValue}`}
                className="flex items-center gap-3 rounded-xl border border-red-100 bg-white px-4 py-3 transition-colors hover:border-red-300 hover:bg-red-50"
              >
                <ShieldAlert className="h-4 w-4 shrink-0 text-red-400" />
                <div>
                  <p className="text-xs text-gray-400">
                    {t.emergencyPoliceLabel}
                  </p>
                  <p className="text-xl font-black text-red-600">
                    {t.emergencyPoliceValue}
                  </p>
                </div>
              </a>

              {/* Medical */}
              <a
                href={`tel:${t.emergencyMedicalValue}`}
                className="flex items-center gap-3 rounded-xl border border-red-100 bg-white px-4 py-3 transition-colors hover:border-red-300 hover:bg-red-50"
              >
                <Stethoscope className="h-4 w-4 shrink-0 text-red-400" />
                <div>
                  <p className="text-xs text-gray-400">
                    {t.emergencyMedicalLabel}
                  </p>
                  <p className="text-xl font-black text-red-600">
                    {t.emergencyMedicalValue}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
