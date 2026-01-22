import Image from "next/image";
import { AlertCircle } from "lucide-react";
import { Lang } from "@/types/language";
import { createArrivalGuideI18n } from "@/data/i18n/guide";

interface ExitCustomsContentProps {
  lang: Lang;
}

export function ExitCustomsContent({ lang }: ExitCustomsContentProps) {
  const { exitCustoms: t } = createArrivalGuideI18n(lang);

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
        <div className="flex justify-center lg:w-96 lg:flex-none">
          <div className="relative h-72 w-full max-w-lg lg:h-[400px] lg:max-w-none">
            <Image
              src="/images/guides/exit-customs.png"
              alt="Final Customs Inspection"
              fill
              className="object-contain object-top"
              priority
              sizes="(max-width: 1024px) 100vw, 400px"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 space-y-8">
          {/* Two Exit Channels */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              {t.channelsTitle}
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {/* Green Channel */}
              <div className="rounded-xl border-l-4 border-green-500 bg-green-50 p-5">
                <h4 className="mb-3 text-base font-semibold text-green-900">
                  {t.greenChannelTitle}
                </h4>
                <p className="mb-3 text-sm text-green-800">
                  {t.greenChannelDesc}
                </p>
                <ul className="space-y-2 text-sm text-green-800">
                  <li>• {t.greenItem1}</li>
                  <li>• {t.greenItem2}</li>
                  <li>• {t.greenItem3}</li>
                  <li>• {t.greenItem4}</li>
                </ul>
                <p className="mt-3 text-xs font-semibold text-green-700">
                  {t.greenNote}
                </p>
              </div>

              {/* Red Channel */}
              <div className="rounded-xl border-l-4 border-red-500 bg-red-50 p-5">
                <h4 className="mb-3 text-base font-semibold text-red-900">
                  {t.redChannelTitle}
                </h4>
                <p className="mb-3 text-sm text-red-800">{t.redChannelDesc}</p>
                <ul className="space-y-2 text-sm text-red-800">
                  <li>• {t.redItem1}</li>
                  <li>• {t.redItem2}</li>
                  <li>• {t.redItem3}</li>
                  <li>• {t.redItem4}</li>
                </ul>
                <p className="mt-3 text-xs font-semibold text-red-700">
                  {t.redNote}
                </p>
              </div>
            </div>
          </div>

          {/* Random Inspections */}
          <div className="border-l-4 border-amber-400 bg-amber-50 p-4">
            <div className="flex gap-3">
              <AlertCircle className="h-6 w-6 flex-shrink-0 text-amber-600" />
              <div>
                <h4 className="mb-2 text-base font-semibold text-amber-900">
                  {t.randomInspectionTitle}
                </h4>
                <p className="mb-2 text-sm text-amber-800">
                  {t.randomInspectionDesc}
                </p>
                <ul className="space-y-1 text-sm text-amber-800">
                  <li>• {t.randomItem1}</li>
                  <li>• {t.randomItem2}</li>
                  <li>• {t.randomItem3}</li>
                  <li>• {t.randomItem4}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* What Officers Look For */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              {t.officersLookTitle}
            </h3>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 font-bold text-red-600">!</span>
                  <span>{t.lookNarcotics}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 font-bold text-orange-600">!</span>
                  <span>{t.lookCurrency}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 font-bold text-orange-600">!</span>
                  <span>{t.lookTobaccoAlcohol}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 font-bold text-orange-600">!</span>
                  <span>{t.lookCommercial}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 font-bold text-orange-600">!</span>
                  <span>{t.lookProhibited}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Penalties */}
          <div className="border-l-4 border-red-500 bg-red-50 p-4">
            <h4 className="mb-2 text-base font-semibold text-red-900">
              {t.penaltiesTitle}
            </h4>
            <ul className="space-y-2 text-sm text-red-800">
              <li>• {t.penaltyFines}</li>
              <li>• {t.penaltyConfiscation}</li>
              <li>• {t.penaltyCriminal}</li>
              <li>• {t.penaltyDeportation}</li>
              <li>• {t.penaltyBan}</li>
            </ul>
            <p className="mt-3 text-xs font-semibold text-red-800">
              {t.penaltyNote}
            </p>
          </div>

          {/* After Clearance */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              {t.afterClearanceTitle}
            </h3>
            <div className="rounded-xl bg-blue-50 p-5">
              <p className="mb-2 text-base text-gray-800">
                {t.afterClearanceDesc}
              </p>
              <ul className="ml-4 space-y-1 text-sm text-gray-700">
                <li>• {t.afterItem1}</li>
                <li>• {t.afterItem2}</li>
                <li>• {t.afterItem3}</li>
                <li>• {t.afterItem4}</li>
                <li>• {t.afterItem5}</li>
              </ul>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="border-primary-500 border-l-4 bg-blue-50 p-4">
            <p className="text-sm text-gray-800">{t.proTip}</p>
          </div>

          {/* Assistance */}
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="mb-2 text-sm font-semibold text-gray-900">
              {t.assistanceTitle}
            </p>
            <div className="space-y-1 text-xs text-gray-600">
              <p>{t.assistanceOffice}</p>
              <p>{t.assistancePhone}</p>
              <p>{t.assistanceAvailability}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
