import Image from "next/image";
import { AlertCircle } from "lucide-react";
import { Lang } from "@/types/language";
import { createTransferGuideI18n } from "@/data/i18n/guide";

interface TransferPageProps {
  params: Promise<{ lang: Lang }>;
}

export default async function TransferPage({ params }: TransferPageProps) {
  const { lang } = await params;
  const { transferMain: t } = createTransferGuideI18n(lang as Lang);

  return (
    <div className="container py-8 lg:py-12">
      <div className="space-y-8">
        {/* Title Section - Full Width */}
        <div>
          <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl">
            {t.pageTitle}
          </h1>
          <p className="text-lg leading-relaxed text-gray-700">{t.pageIntro}</p>
        </div>

        {/* Main Content with Image */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
          {/* Left side - Illustration */}
          <div className="flex justify-center lg:w-96 lg:flex-none">
            <div className="relative h-72 w-full max-w-lg lg:h-[400px] lg:max-w-none">
              <Image
                src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/transfer.png"
                alt="Airport Transfer"
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
                  <p className="mt-1 text-sm text-gray-700">
                    {t.importantDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* Transfer Process */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">
                {t.processTitle}
              </h2>

              {/* Step 1 */}
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-2 flex items-start gap-3">
                  <span className="bg-primary-100 text-primary-700 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                    1
                  </span>
                  <h3 className="text-base font-semibold text-gray-900">
                    {t.step1Title}
                  </h3>
                </div>
                <p className="ml-11 text-sm text-gray-700">{t.step1Desc}</p>
              </div>

              {/* Step 2 */}
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-2 flex items-start gap-3">
                  <span className="bg-primary-100 text-primary-700 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                    2
                  </span>
                  <h3 className="text-base font-semibold text-gray-900">
                    {t.step2Title}
                  </h3>
                </div>
                <p className="mb-3 ml-11 text-sm text-gray-700">
                  {t.step2Desc}
                </p>
                <div className="ml-11">
                  <p className="mb-2 text-sm font-semibold text-gray-900">
                    {t.documentsNeededTitle}
                  </p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• {t.doc1}</li>
                    <li>• {t.doc2}</li>
                    <li>• {t.doc3}</li>
                    <li>• {t.doc4}</li>
                  </ul>
                </div>
              </div>

              {/* Step 3 */}
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-2 flex items-start gap-3">
                  <span className="bg-primary-100 text-primary-700 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                    3
                  </span>
                  <h3 className="text-base font-semibold text-gray-900">
                    {t.step3Title}
                  </h3>
                </div>
                <p className="mb-3 ml-11 text-sm text-gray-700">
                  {t.step3Desc}
                </p>
                <ul className="ml-11 space-y-1 text-sm text-gray-700">
                  <li>• {t.securityItem1}</li>
                  <li>• {t.securityItem2}</li>
                  <li>• {t.securityItem3}</li>
                  <li>• {t.securityItem4}</li>
                </ul>
              </div>

              {/* Step 4 */}
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-2 flex items-start gap-3">
                  <span className="bg-primary-100 text-primary-700 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                    4
                  </span>
                  <h3 className="text-base font-semibold text-gray-900">
                    {t.step4Title}
                  </h3>
                </div>
                <p className="mb-3 ml-11 text-sm text-gray-700">
                  {t.step4Desc}
                </p>
                <ul className="ml-11 space-y-1 text-sm text-gray-700">
                  <li>• {t.gateInfo1}</li>
                  <li>• {t.gateInfo2}</li>
                  <li>• {t.gateInfo3}</li>
                  <li>• {t.gateInfo4}</li>
                </ul>
              </div>
            </div>

            {/* Baggage Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">
                {t.baggageTitle}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {/* Through-Checked */}
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <h3 className="mb-2 text-base font-semibold text-gray-900">
                    {t.throughCheckedTitle}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {t.throughCheckedDesc}
                  </p>
                </div>

                {/* Separate Tickets */}
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <h3 className="mb-2 text-base font-semibold text-gray-900">
                    {t.separateTicketsTitle}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {t.separateTicketsDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* MCT Table */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">{t.mctTitle}</h2>
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <p className="mb-3 text-sm text-gray-600">{t.mctEffective}</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                          {t.transferType}
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                          {t.sameTerminal}
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                          {t.differentTerminal}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {t.domesticToDomestic}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {t.minutes60}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {t.minutes90}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {t.intlToDomestic}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {t.minutes90}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {t.minutes120}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {t.domesticToIntl}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {t.minutes90}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {t.minutes120}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {t.intlToIntl}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {t.minutes120}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {t.minutes150}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 border-l-4 border-amber-400 bg-amber-50 p-3">
                  <p className="text-sm text-amber-900">
                    <strong>{t.mctImportant}</strong> {t.mctNote}
                  </p>
                </div>
              </div>
            </div>

            {/* Help & Contact */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">
                {t.needAssistance}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {/* Transfer Counter */}
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <h3 className="mb-2 text-base font-semibold text-gray-900">
                    {t.transferCounterTitle}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>{t.transferCounterLocation}</p>
                    <p>{t.transferCounterHours}</p>
                  </div>
                </div>

                {/* Airport Information */}
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <h3 className="mb-2 text-base font-semibold text-gray-900">
                    {t.airportInfoTitle}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p>{t.airportInfo247}</p>
                    <p>{t.multilingualStaff}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
