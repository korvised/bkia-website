import Image from "next/image";
import {
  Car,
  Info,
  MapPin,
  AlertTriangle,
  Clock,
  DollarSign,
  Languages,
  CloudSun,
  Phone,
} from "lucide-react";
import { Lang } from "@/types/language";
import { createArrivalGuideI18n } from "@/data/i18n/guides";

interface LeavingAirportContentProps {
  lang: Lang;
}

export function LeavingAirportContent({ lang }: LeavingAirportContentProps) {
  const { leavingAirport: t } = createArrivalGuideI18n(lang);

  const orientationRows = [
    {
      icon: Clock,
      label: t.orientationTimezoneLabel,
      value: t.orientationTimezoneValue,
    },
    {
      icon: DollarSign,
      label: t.orientationCurrencyLabel,
      value: t.orientationCurrencyValue,
    },
    {
      icon: Languages,
      label: t.orientationLanguageLabel,
      value: t.orientationLanguageValue,
    },
    {
      icon: CloudSun,
      label: t.orientationWeatherLabel,
      value: t.orientationWeatherValue,
    },
  ];

  const emergencyServices = [
    { label: t.emergencyPoliceLabel, number: "1191" },
    { label: t.emergencyMedicalLabel, number: "1195" },
    { label: t.emergencyFireLabel, number: "1190" },
  ];

  const safetyTips = [t.safetyTip1, t.safetyTip2, t.safetyTip3, t.safetyTip4];

  const culturalTips = [t.tip1, t.tip2, t.tip3, t.tip4, t.tip5, t.tip6];

  const touristInfoItems = [
    t.touristInfo1,
    t.touristInfo2,
    t.touristInfo3,
    t.touristInfo4,
  ];

  const otherServiceItems = [
    t.otherService1,
    t.otherService2,
    t.otherService3,
    t.otherService4,
  ];

  return (
    <>
      {/* ── Section 1: Hero + Transport ─────────────────────── */}
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
                  src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/leaving-airport.png"
                  alt="Leaving the Airport"
                  fill
                  className="object-contain object-top"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Transport info */}
            <div className="space-y-6">
              {/* Location callout */}
              <div className="flex items-start gap-3 rounded-r-lg border-l-4 border-[#00AAAC] bg-white px-4 py-3">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#00AAAC]" />
                <p className="text-sm text-gray-600">{t.locationNote}</p>
              </div>

              {/* Transportation */}
              <div>
                <p className="mb-4 text-xs font-bold tracking-widest text-[#00AAAC] uppercase">
                  {t.transportationTitle}
                </p>
                <div className="rounded-xl bg-white p-4">
                  {/* Taxi header */}
                  <div className="mb-3 flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f0fbfc]">
                      <Car className="h-4 w-4 text-[#00AAAC]" />
                    </div>
                    <p className="font-bold text-gray-800">{t.taxiTitle}</p>
                  </div>
                  {/* Location row — label separate from value */}
                  <div className="flex items-start gap-3 border-t border-gray-100 pt-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                    <div>
                      <p className="mb-0.5 text-xs font-semibold tracking-wide text-gray-400 uppercase">
                        {t.taxiLocationLabel}
                      </p>
                      <p className="text-sm text-gray-700">
                        {t.taxiLocationValue}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Safety tips */}
              <div>
                <p className="mb-3 text-xs font-bold tracking-widest text-amber-600 uppercase">
                  {t.safetyTipsTitle}
                </p>
                <div className="space-y-2 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 px-4 py-3">
                  {safetyTips.map((tip, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Arrivals Hall Services ───────────────── */}
      <section className="bg-white py-10">
        <div className="container">
          <p className="mb-6 text-xs font-bold tracking-widest text-[#00AAAC] uppercase">
            {t.servicesTitle}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Tourist information */}
            <div className="rounded-xl bg-gray-50 p-5">
              <p className="mb-4 text-sm font-bold text-gray-800">
                {t.touristInfoTitle}
              </p>
              <div className="space-y-2">
                {touristInfoItems.map((item, i) => (
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

            {/* Other services */}
            <div className="rounded-xl bg-gray-50 p-5">
              <p className="mb-4 text-sm font-bold text-gray-800">
                {t.otherServicesTitle}
              </p>
              <div className="space-y-2">
                {otherServiceItems.map((item, i) => (
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
      </section>

      {/* ── Section 3: Orientation + Cultural Tips ──────────── */}
      <section className="bg-gray-50 py-10">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Orientation quick guide */}
            <div>
              <p className="mb-1 text-xs font-bold tracking-widest text-[#00AAAC] uppercase">
                {t.orientationTitle}
              </p>
              <p className="mb-6 text-xl font-bold text-gray-900">
                {t.orientationWelcome}
              </p>

              {/* Labeled rows — no colons */}
              <div className="space-y-4">
                {orientationRows.map(({ icon: Icon, label, value }, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#f0fbfc]">
                      <Icon className="h-3.5 w-3.5 text-[#00AAAC]" />
                    </div>
                    <div>
                      <p className="mb-0.5 text-xs font-semibold tracking-wide text-gray-400 uppercase">
                        {label}
                      </p>
                      <p className="text-sm text-gray-700">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Emergency numbers */}
              <div className="mt-6">
                <p className="mb-3 text-xs font-semibold tracking-wide text-gray-400 uppercase">
                  {t.emergencyLabel}
                </p>
                <div className="flex flex-wrap gap-2">
                  {emergencyServices.map(({ label, number }) => (
                    <div
                      key={number}
                      className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2"
                    >
                      <Phone className="h-3.5 w-3.5 text-red-500" />
                      <span className="text-xs text-red-600">{label}</span>
                      <span className="font-bold text-red-700">{number}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cultural tips + welcome */}
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-xs font-bold tracking-widest text-emerald-600 uppercase">
                  {t.helpfulTipsTitle}
                </p>
                <div className="space-y-2 rounded-r-lg border-l-4 border-emerald-500 bg-emerald-50 px-4 py-4">
                  {culturalTips.map((tip, i) => (
                    <p key={i} className="text-sm text-gray-600">
                      {tip}
                    </p>
                  ))}
                </div>
              </div>

              {/* Welcome sign-off */}
              <div className="rounded-r-lg border-l-4 border-[#00AAAC] bg-[#f0fbfc] px-4 py-4">
                <p className="font-semibold text-gray-800">{t.enjoyStay}</p>
                <p className="mt-1 text-sm font-medium text-[#00AAAC]">
                  {t.welcome}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
