import Image from "next/image";
import { AlertCircle } from "lucide-react";
import { Lang } from "@/types/language";
import { createArrivalGuideI18n } from "@/data/i18n/guide";

interface ArrivalAirportContentProps {
  lang: Lang;
}

export function ArrivalAirportContent({ lang }: ArrivalAirportContentProps) {
  const { arrivalAirport: t } = createArrivalGuideI18n(lang);

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
        <div className="flex justify-center lg:mt-12 lg:w-96 lg:flex-none">
          <div className="relative h-72 w-full max-w-lg lg:h-[400px] lg:max-w-none">
            <Image
              src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/arrival.png"
              alt="Arrival at Bokeo International Airport"
              fill
              className="object-contain object-top"
              priority
              sizes="(max-width: 1024px) 100vw, 400px"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 space-y-8">
          {/* Important Notice */}
          <div className="border-primary-500 border-l-4 bg-blue-50 p-4">
            <div className="flex gap-2">
              <AlertCircle className="text-primary-600 mt-0.5 h-5 w-5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {t.importantTitle}
                </p>
                <p className="mt-1 text-sm text-gray-700">{t.importantDesc}</p>
              </div>
            </div>
          </div>

          {/* Disembarkation Process */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              {t.disembarkationTitle}
            </h3>
            <ol className="list-inside list-decimal space-y-2 text-base text-gray-700">
              <li>{t.disembarkStep1}</li>
              <li>{t.disembarkStep2}</li>
              <li>{t.disembarkStep3}</li>
              <li>{t.disembarkStep4}</li>
              <li>{t.disembarkStep5}</li>
            </ol>
          </div>

          {/* First Steps After Landing */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              {t.firstStepsTitle}
            </h3>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="mb-3 text-base text-gray-700">{t.firstStepsDesc}</p>
              <ul className="space-y-2 text-base text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-1 font-bold">→</span>
                  <span>{t.healthScreening}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-1 font-bold">→</span>
                  <span>{t.immigrationControl}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-1 font-bold">→</span>
                  <span>{t.baggageClaim}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-1 font-bold">→</span>
                  <span>{t.customsCheckpoint}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Processing Time */}
          <div className="border-l-4 border-amber-400 bg-amber-50 p-4">
            <p className="text-sm text-amber-900">
              <strong>{t.processingTimeTitle}</strong> {t.processingTimeDesc}
            </p>
          </div>

          {/* Airport Facilities */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              {t.facilitiesTitle}
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h4 className="mb-3 text-base font-semibold text-gray-900">
                  {t.availableServices}
                </h4>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  <li>• {t.currencyExchange}</li>
                  <li>• {t.atmMachines}</li>
                  <li>• {t.freeWifi}</li>
                  <li>• {t.infoDesks}</li>
                  <li>• {t.restrooms}</li>
                  <li>• {t.waterStations}</li>
                </ul>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h4 className="mb-3 text-base font-semibold text-gray-900">
                  {t.assistanceAvailable}
                </h4>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  <li>• {t.wheelchairService}</li>
                  <li>• {t.porterServices}</li>
                  <li>• {t.medicalFirstAid}</li>
                  <li>• {t.lostFound}</li>
                  <li>• {t.airportPolice}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="mb-2 text-sm font-semibold text-gray-900">
              {t.emergencyContact}
            </p>
            <div className="space-y-1 text-xs text-gray-600">
              <p>{t.airportInfo}</p>
              <p>{t.emergencyServices}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
