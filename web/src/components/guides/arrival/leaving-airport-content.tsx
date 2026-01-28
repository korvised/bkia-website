import Image from "next/image";
import { Car, Smartphone, AlertCircle } from "lucide-react";
import { Lang } from "@/types/language";
import { createArrivalGuideI18n } from "@/data/i18n/guide";

interface LeavingAirportContentProps {
  lang: Lang;
}

export function LeavingAirportContent({ lang }: LeavingAirportContentProps) {
  const { leavingAirport: t } = createArrivalGuideI18n(lang);

  return (
    <div className="space-y-8">
      {/* Title Section - Full Width */}
      <div>
        <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl">
          {t.title}
        </h2>
        <p className="text-lg leading-relaxed text-gray-700">{t.intro}</p>
      </div>

      {/* Main Content with Image */}
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
        {/* Left side - Illustration */}
        <div className="flex justify-center lg:mt-8 lg:w-96 lg:flex-none">
          <div className="relative h-72 w-full max-w-lg lg:h-[400px] lg:max-w-none">
            <Image
              src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/leaving-airport.png"
              alt="Leaving the Airport"
              fill
              className="object-contain object-top"
              priority
              sizes="(max-width: 1024px) 100vw, 400px"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 space-y-8">
          {/* Location Note */}
          <div className="border-primary-500 border-l-4 bg-blue-50 p-4">
            <p className="text-sm text-gray-800">{t.locationNote}</p>
          </div>

          {/* Transportation Options */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              {t.transportationTitle}
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {/* Airport Taxi */}
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Car className="text-primary-500 h-5 w-5" />
                  <h4 className="text-base font-semibold text-gray-900">
                    {t.taxiTitle}
                  </h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <strong>{t.taxiLocation}</strong>
                  </li>
                  <li>
                    <strong>{t.taxiPayment}</strong>
                  </li>
                  <li>
                    <strong>{t.taxiFaresTitle}</strong>
                    <ul className="mt-1 ml-4 space-y-1">
                      <li>• {t.taxiFare1}</li>
                      <li>• {t.taxiFare2}</li>
                      <li>• {t.taxiFare3}</li>
                    </ul>
                  </li>
                  <li>
                    <strong>{t.taxiTip}</strong>
                  </li>
                </ul>
              </div>

              {/* Ride-Hailing */}
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Smartphone className="text-primary-500 h-5 w-5" />
                  <h4 className="text-base font-semibold text-gray-900">
                    {t.rideHailingTitle}
                  </h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    <strong>{t.rideAvailable}</strong>
                  </li>
                  <li>
                    <strong>{t.rideRequirements}</strong>
                  </li>
                  <li>
                    <strong>{t.rideBenefits}</strong>
                  </li>
                  <li>
                    <strong>{t.rideNote}</strong>
                  </li>
                </ul>
              </div>

              {/* Hotel Shuttle */}
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Car className="text-primary-500 h-5 w-5" />
                  <h4 className="text-base font-semibold text-gray-900">
                    {t.hotelShuttleTitle}
                  </h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    <strong>{t.hotelPreArranged}</strong>
                  </li>
                  <li>
                    <strong>{t.hotelBooking}</strong>
                  </li>
                  <li>
                    <strong>{t.hotelMeeting}</strong>
                  </li>
                  <li>
                    <strong>{t.hotelTip}</strong>
                  </li>
                </ul>
              </div>

              {/* Car Rental */}
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Car className="text-primary-500 h-5 w-5" />
                  <h4 className="text-base font-semibold text-gray-900">
                    {t.carRentalTitle}
                  </h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    <strong>{t.carCounters}</strong>
                  </li>
                  <li>
                    <strong>{t.carRequirements}</strong>
                  </li>
                  <li>
                    <strong>{t.carCompanies}</strong>
                  </li>
                  <li>
                    <strong>{t.carNote}</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Safety Tips */}
          <div className="border-l-4 border-amber-400 bg-amber-50 p-4">
            <div className="flex gap-3">
              <AlertCircle className="h-6 w-6 flex-shrink-0 text-amber-600" />
              <div>
                <h4 className="mb-2 text-base font-semibold text-amber-900">
                  {t.safetyTipsTitle}
                </h4>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li>• {t.safetyTip1}</li>
                  <li>• {t.safetyTip2}</li>
                  <li>• {t.safetyTip3}</li>
                  <li>• {t.safetyTip4}</li>
                  <li>• {t.safetyTip5}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Essential Services */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              {t.servicesTitle}
            </h3>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="grid gap-4 md:grid-cols-2">
                {/* SIM Cards */}
                <div>
                  <h4 className="mb-2 text-base font-semibold text-gray-900">
                    {t.simCardsTitle}
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• {t.simService1}</li>
                    <li>• {t.simService2}</li>
                    <li>• {t.simService3}</li>
                    <li>• {t.simService4}</li>
                  </ul>
                </div>

                {/* Currency */}
                <div>
                  <h4 className="mb-2 text-base font-semibold text-gray-900">
                    {t.currencyTitle}
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• {t.currencyService1}</li>
                    <li>• {t.currencyService2}</li>
                    <li>• {t.currencyService3}</li>
                    <li>• {t.currencyService4}</li>
                  </ul>
                </div>

                {/* Tourist Info */}
                <div>
                  <h4 className="mb-2 text-base font-semibold text-gray-900">
                    {t.touristInfoTitle}
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• {t.touristInfo1}</li>
                    <li>• {t.touristInfo2}</li>
                    <li>• {t.touristInfo3}</li>
                    <li>• {t.touristInfo4}</li>
                  </ul>
                </div>

                {/* Other Services */}
                <div>
                  <h4 className="mb-2 text-base font-semibold text-gray-900">
                    {t.otherServicesTitle}
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• {t.otherService1}</li>
                    <li>• {t.otherService2}</li>
                    <li>• {t.otherService3}</li>
                    <li>• {t.otherService4}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Orientation Guide */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              {t.orientationTitle}
            </h3>
            <div className="rounded-xl bg-blue-50 p-5">
              <p className="mb-3 text-base font-semibold text-gray-800">
                {t.orientationWelcome}
              </p>
              <div className="space-y-2 text-sm text-gray-700">
                <p>{t.orientationTimezone}</p>
                <p>{t.orientationCurrency}</p>
                <p>{t.orientationLanguage}</p>
                <p>{t.orientationWeather}</p>
                <p>{t.orientationEmergency}</p>
              </div>
            </div>
          </div>

          {/* Helpful Tips */}
          <div className="border-l-4 border-green-500 bg-green-50 p-4">
            <h4 className="mb-2 text-base font-semibold text-green-900">
              {t.helpfulTipsTitle}
            </h4>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• {t.tip1}</li>
              <li>• {t.tip2}</li>
              <li>• {t.tip3}</li>
              <li>• {t.tip4}</li>
              <li>• {t.tip5}</li>
              <li>• {t.tip6}</li>
            </ul>
          </div>

          {/* Need Help */}
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="mb-2 text-sm font-semibold text-gray-900">
              {t.moreHelpTitle}
            </p>
            <div className="space-y-1 text-xs text-gray-600">
              <p>{t.helpDesk}</p>
              <p>{t.helpTourism}</p>
              <p>{t.helpWebsite}</p>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="bg-primary-50 rounded-xl p-5 text-center">
            <p className="mb-2 text-lg font-semibold text-gray-900">
              {t.enjoyStay}
            </p>
            <p className="text-base text-gray-700">{t.welcome}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
