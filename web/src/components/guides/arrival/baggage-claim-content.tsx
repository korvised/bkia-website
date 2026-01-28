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
              src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/baggage-claim.png"
              alt="Baggage Claim"
              fill
              className="object-contain object-top"
              priority
              sizes="(max-width: 1024px) 100vw, 400px"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 space-y-8">
          {/* Wait Times */}
          <div className="border-primary-500 border-l-4 bg-blue-50 p-4">
            <div className="flex gap-3">
              <Clock className="text-primary-600 h-6 w-6 flex-shrink-0" />
              <div>
                <p className="mb-2 text-sm font-semibold text-gray-800">
                  {t.waitTimesTitle}
                </p>
                <ul className="space-y-1 text-sm text-gray-800">
                  <li>• {t.firstBags}</li>
                  <li>• {t.mostBags}</li>
                  <li>• {t.priorityBags}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Collecting Luggage */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              {t.collectingTitle}
            </h3>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <ol className="space-y-3 text-base text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="bg-primary-100 text-primary-700 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                    1
                  </span>
                  <span>{t.collectStep1}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary-100 text-primary-700 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                    2
                  </span>
                  <span>{t.collectStep2}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary-100 text-primary-700 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                    3
                  </span>
                  <span>{t.collectStep3}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary-100 text-primary-700 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                    4
                  </span>
                  <span>{t.collectStep4}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary-100 text-primary-700 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                    5
                  </span>
                  <span>{t.collectStep5}</span>
                </li>
              </ol>
            </div>
          </div>

          {/* Important Reminders */}
          <div className="border-l-4 border-amber-400 bg-amber-50 p-4">
            <div className="flex gap-3">
              <AlertCircle className="h-6 w-6 flex-shrink-0 text-amber-600" />
              <div>
                <h4 className="mb-2 text-base font-semibold text-amber-900">
                  {t.remindersTitle}
                </h4>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li>• {t.reminder1}</li>
                  <li>• {t.reminder2}</li>
                  <li>• {t.reminder3}</li>
                  <li>• {t.reminder4}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Lost/Damaged Baggage */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              {t.lostDamagedTitle}
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {/* Missing Baggage */}
              <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Search className="h-5 w-5 text-red-600" />
                  <h4 className="text-base font-semibold text-red-900">
                    {t.missingBaggageTitle}
                  </h4>
                </div>
                <p className="mb-3 text-sm text-red-800">
                  {t.missingBaggageDesc}
                </p>
                <ul className="space-y-2 text-sm text-red-800">
                  <li>• {t.missingStep1}</li>
                  <li>• {t.missingStep2}</li>
                  <li>• {t.missingStep3}</li>
                  <li>• {t.missingStep4}</li>
                  <li>• {t.missingStep5}</li>
                  <li>• {t.missingStep6}</li>
                </ul>
              </div>

              {/* Damaged Baggage */}
              <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <h4 className="text-base font-semibold text-orange-900">
                    {t.damagedBaggageTitle}
                  </h4>
                </div>
                <p className="mb-3 text-sm text-orange-800">
                  {t.damagedBaggageDesc}
                </p>
                <ul className="space-y-2 text-sm text-orange-800">
                  <li>• {t.damagedStep1}</li>
                  <li>• {t.damagedStep2}</li>
                  <li>• {t.damagedStep3}</li>
                  <li>• {t.damagedStep4}</li>
                  <li>• {t.damagedStep5}</li>
                  <li>• {t.damagedStep6}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Baggage Services Office */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              {t.servicesOfficeTitle}
            </h3>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="mb-3 text-base text-gray-700">
                <strong>{t.servicesLocation}</strong>
              </p>
              <p className="mb-3 text-base text-gray-700">
                <strong>{t.servicesHours}</strong>
              </p>
              <p className="mb-2 text-base font-semibold text-gray-900">
                {t.servicesProvided}
              </p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• {t.serviceLostTracking}</li>
                <li>• {t.serviceDamageClaims}</li>
                <li>• {t.serviceDelayedDelivery}</li>
                <li>• {t.serviceOversized}</li>
              </ul>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="border-primary-500 border-l-4 bg-blue-50 p-4">
            <p className="text-sm text-gray-800">{t.proTip}</p>
          </div>

          {/* Contact */}
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="mb-2 text-sm font-semibold text-gray-900">
              {t.contactTitle}
            </p>
            <div className="space-y-1 text-xs text-gray-600">
              <p>{t.contactPhone}</p>
              <p>{t.contactEmail}</p>
              <p>{t.contactAirline}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
