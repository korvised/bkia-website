import Image from "next/image";
import { AlertCircle, Clock, FileText } from "lucide-react";
import { Lang } from "@/types/language";
import { createArrivalGuideI18n } from "@/data/i18n/guide";

interface BorderInspectionContentProps {
  lang: Lang;
}

export function BorderInspectionContent({
  lang,
}: BorderInspectionContentProps) {
  const { borderInspection: t } = createArrivalGuideI18n(lang);

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
              src="/images/guides/border-inspection.png"
              alt="Immigration Border Control"
              fill
              className="object-contain object-top"
              priority
              sizes="(max-width: 1024px) 100vw, 400px"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 space-y-8">
          {/* Wait Time */}
          <div className="border-l-4 border-amber-400 bg-amber-50 p-4">
            <div className="flex gap-3">
              <Clock className="h-6 w-6 flex-shrink-0 text-amber-600" />
              <div>
                <p className="mb-2 text-sm font-semibold text-amber-900">
                  {t.waitTimeTitle}
                </p>
                <ul className="space-y-1 text-sm text-amber-800">
                  <li>• {t.waitOffPeak}</li>
                  <li>• {t.waitPeak}</li>
                  <li>• {t.waitAdvice}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Required Documents */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              {t.documentsTitle}
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {/* Lao Citizens */}
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-3 flex items-center gap-2">
                  <FileText className="text-primary-500 h-5 w-5" />
                  <h4 className="text-base font-semibold text-gray-900">
                    {t.laoCitizensTitle}
                  </h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500">•</span>
                    <span>{t.laoDoc1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500">•</span>
                    <span>{t.laoDoc2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500">•</span>
                    <span>{t.laoDoc3}</span>
                  </li>
                </ul>
              </div>

              {/* Foreign Nationals */}
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-3 flex items-center gap-2">
                  <FileText className="text-primary-500 h-5 w-5" />
                  <h4 className="text-base font-semibold text-gray-900">
                    {t.foreignNationalsTitle}
                  </h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500">•</span>
                    <span>{t.foreignDoc1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500">•</span>
                    <span>{t.foreignDoc2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500">•</span>
                    <span>{t.foreignDoc3}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500">•</span>
                    <span>{t.foreignDoc4}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Visa on Arrival */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">{t.voaTitle}</h3>
            <div className="border-primary-500 border-l-4 bg-blue-50 p-4">
              <p className="mb-3 text-sm text-gray-800">
                <strong>{t.voaAvailable}</strong>
              </p>
              <div className="space-y-2 text-sm text-gray-800">
                <p>{t.voaFee}</p>
                <p>{t.voaProcessing}</p>
                <p>{t.voaValidity}</p>
                <p className="font-semibold">{t.voaDocuments}</p>
                <ul className="ml-6 space-y-1">
                  <li>• {t.voaDoc1}</li>
                  <li>• {t.voaDoc2}</li>
                  <li>• {t.voaDoc3}</li>
                  <li>• {t.voaDoc4}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Interview Questions */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              {t.interviewTitle}
            </h3>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="mb-3 text-base text-gray-700">{t.interviewDesc}</p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li>
                  <strong>{t.q1}</strong>
                  <br />
                  <span className="text-xs text-gray-600">{t.a1}</span>
                </li>
                <li>
                  <strong>{t.q2}</strong>
                  <br />
                  <span className="text-xs text-gray-600">{t.a2}</span>
                </li>
                <li>
                  <strong>{t.q3}</strong>
                  <br />
                  <span className="text-xs text-gray-600">{t.a3}</span>
                </li>
                <li>
                  <strong>{t.q4}</strong>
                  <br />
                  <span className="text-xs text-gray-600">{t.a4}</span>
                </li>
              </ul>
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
                  <li>• {t.reminder5}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* After Clearance */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              {t.afterClearanceTitle}
            </h3>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-base text-gray-700">{t.afterClearanceDesc}</p>
            </div>
          </div>

          {/* Assistance */}
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="mb-2 text-sm font-semibold text-gray-900">
              {t.assistanceTitle}
            </p>
            <div className="space-y-1 text-xs text-gray-600">
              <p>{t.assistanceDesk}</p>
              <p>{t.assistanceEmergency}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
