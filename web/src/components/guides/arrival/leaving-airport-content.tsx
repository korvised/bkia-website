import Image from "next/image";
import { Car, Smartphone, AlertCircle, Info } from "lucide-react";
import { Lang } from "@/types/language";
import { createArrivalGuideI18n } from "@/data/i18n/guide";

interface LeavingAirportContentProps {
  lang: Lang;
}

export function LeavingAirportContent({ lang }: LeavingAirportContentProps) {
  const { leavingAirport: t } = createArrivalGuideI18n(lang);

  return (
    <>
      {/* ── Header + Image + Transport Options ──────────────── */}
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
                  src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/leaving-airport.png"
                  alt="Leaving the Airport"
                  fill
                  className="object-contain object-top"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Location note + transport */}
            <div className="space-y-6">
              <div className="flex items-start gap-3 border-l-4 border-[#00AAAC] bg-[#f0fbfc] px-4 py-3 rounded-r-lg">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#00AAAC]" />
                <p className="text-sm text-gray-600">{t.locationNote}</p>
              </div>

              <div>
                <p className="mb-5 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{t.transportationTitle}</p>
                <div className="space-y-6">
                  {/* Taxi */}
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <Car className="h-4 w-4 text-[#00AAAC]" />
                      <p className="text-sm font-bold text-gray-800">{t.taxiTitle}</p>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>{t.taxiLocation}</p>
                      <p>{t.taxiPayment}</p>
                      <p className="font-medium text-gray-700">{t.taxiFaresTitle}</p>
                      <div className="space-y-0.5 pl-3">
                        {[t.taxiFare1, t.taxiFare2, t.taxiFare3].map((f, i) => (
                          <p key={i}>{f}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Ride-hailing */}
                  <div className="border-t border-[#d4f2f3] pt-5">
                    <div className="mb-2 flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-[#00AAAC]" />
                      <p className="text-sm font-bold text-gray-800">{t.rideHailingTitle}</p>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>{t.rideAvailable}</p>
                      <p>{t.rideRequirements}</p>
                      <p>{t.rideBenefits}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Hotel Shuttle + Car Rental + Safety ─────────────── */}
      <section className="bg-white py-10">
        <div className="container space-y-10">
          {/* Hotel shuttle + car rental */}
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Car className="h-4 w-4 text-[#00AAAC]" />
                <p className="text-sm font-bold text-gray-800">{t.hotelShuttleTitle}</p>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>{t.hotelPreArranged}</p>
                <p>{t.hotelBooking}</p>
                <p>{t.hotelMeeting}</p>
                <p>{t.hotelTip}</p>
              </div>
            </div>
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Car className="h-4 w-4 text-[#00AAAC]" />
                <p className="text-sm font-bold text-gray-800">{t.carRentalTitle}</p>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>{t.carCounters}</p>
                <p>{t.carRequirements}</p>
                <p>{t.carCompanies}</p>
                <p>{t.carNote}</p>
              </div>
            </div>
          </div>

          {/* Safety tips */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <p className="text-xs font-bold uppercase tracking-widest text-amber-600">{t.safetyTipsTitle}</p>
            </div>
            <div className="space-y-2 border-l-4 border-amber-500 bg-amber-50 px-4 py-3 rounded-r-lg">
              {[t.safetyTip1, t.safetyTip2, t.safetyTip3, t.safetyTip4, t.safetyTip5].map((tip, i) => (
                <p key={i} className="text-sm text-gray-600">{tip}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Essential Services + Orientation + Welcome ─────── */}
      <section className="bg-gray-50 py-10">
        <div className="container space-y-10">
          {/* Essential services */}
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{t.servicesTitle}</p>
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-sm font-bold text-gray-700">{t.simCardsTitle}</p>
                <div className="space-y-1">
                  {[t.simService1, t.simService2, t.simService3, t.simService4].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-0.5 shrink-0 font-bold text-[#00AAAC]">✓</span>{item}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-sm font-bold text-gray-700">{t.currencyTitle}</p>
                <div className="space-y-1">
                  {[t.currencyService1, t.currencyService2, t.currencyService3, t.currencyService4].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-0.5 shrink-0 font-bold text-[#00AAAC]">✓</span>{item}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-sm font-bold text-gray-700">{t.touristInfoTitle}</p>
                <div className="space-y-1">
                  {[t.touristInfo1, t.touristInfo2, t.touristInfo3, t.touristInfo4].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-0.5 shrink-0 font-bold text-[#00AAAC]">✓</span>{item}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-sm font-bold text-gray-700">{t.otherServicesTitle}</p>
                <div className="space-y-1">
                  {[t.otherService1, t.otherService2, t.otherService3, t.otherService4].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-0.5 shrink-0 font-bold text-[#00AAAC]">✓</span>{item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Orientation + helpful tips + need help */}
          <div className="grid gap-8 sm:grid-cols-2 border-t border-gray-200 pt-6">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{t.orientationTitle}</p>
              <p className="mb-3 text-sm font-semibold text-gray-800">{t.orientationWelcome}</p>
              <div className="space-y-1 text-sm text-gray-600">
                <p>{t.orientationTimezone}</p>
                <p>{t.orientationCurrency}</p>
                <p>{t.orientationLanguage}</p>
                <p>{t.orientationWeather}</p>
                <p>{t.orientationEmergency}</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-600">{t.helpfulTipsTitle}</p>
                <div className="space-y-2 border-l-4 border-emerald-500 bg-emerald-50 px-4 py-3 rounded-r-lg">
                  {[t.tip1, t.tip2, t.tip3, t.tip4, t.tip5, t.tip6].map((tip, i) => (
                    <p key={i} className="text-sm text-gray-600">{tip}</p>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">{t.moreHelpTitle}</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>{t.helpDesk}</p>
                  <p>{t.helpTourism}</p>
                  <p>{t.helpWebsite}</p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 text-center">
                <p className="text-sm font-semibold text-gray-800">{t.enjoyStay}</p>
                <p className="mt-1 text-sm text-gray-500">{t.welcome}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
