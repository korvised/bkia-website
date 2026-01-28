import Image from "next/image";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { Lang } from "@/types/language";
import { createArrivalGuideI18n } from "@/data/i18n/guide";

interface CustomsInspectionContentProps {
  lang: Lang;
}

export function CustomsInspectionContent({
  lang,
}: CustomsInspectionContentProps) {
  const { customsInspection: t } = createArrivalGuideI18n(lang);

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
              src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/customs-inspection.png"
              alt="Customs Declaration"
              fill
              className="object-contain object-top"
              priority
              sizes="(max-width: 1024px) 100vw, 400px"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 space-y-8">
          {/* Declaration Requirements */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              {t.declarationTitle}
            </h3>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-1 h-6 w-6 flex-shrink-0 text-amber-500" />
                <div>
                  <p className="mb-3 text-base font-semibold text-gray-900">
                    {t.mustDeclare}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-primary-500 mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span>{t.declareCurrency}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-primary-500 mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span>{t.declareLaoKip}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-primary-500 mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span>{t.declareGold}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-primary-500 mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span>{t.declareCommercial}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-primary-500 mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span>{t.declareRestricted}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Duty-Free Allowances */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              {t.dutyFreeTitle}
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {/* Tobacco */}
              <div className="rounded-xl bg-green-50 p-4">
                <h4 className="mb-3 text-base font-semibold text-gray-900">
                  {t.tobaccoTitle}
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>{t.tobacco1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>{t.tobacco2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>{t.tobacco3}</span>
                  </li>
                </ul>
              </div>

              {/* Alcohol */}
              <div className="rounded-xl bg-green-50 p-4">
                <h4 className="mb-3 text-base font-semibold text-gray-900">
                  {t.alcoholTitle}
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>{t.alcohol1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>{t.alcohol2}</span>
                  </li>
                </ul>
              </div>

              {/* Personal Items */}
              <div className="rounded-xl bg-green-50 p-4">
                <h4 className="mb-3 text-base font-semibold text-gray-900">
                  {t.personalTitle}
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>{t.personal1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>{t.personal2}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Prohibited Items */}
          <div className="border-l-4 border-red-500 bg-red-50 p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-6 w-6 flex-shrink-0 text-red-600" />
              <div>
                <h4 className="mb-2 text-base font-semibold text-red-900">
                  {t.prohibitedTitle}
                </h4>
                <p className="mb-3 text-sm text-red-800">{t.prohibitedDesc}</p>
                <ul className="space-y-2 text-sm text-red-800">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">×</span>
                    <span>{t.prohibitedNarcotics}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">×</span>
                    <span>{t.prohibitedWeapons}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">×</span>
                    <span>{t.prohibitedPornographic}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">×</span>
                    <span>{t.prohibitedCounterfeit}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">×</span>
                    <span>{t.prohibitedEndangered}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Special Import Rules */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              {t.specialRulesTitle}
            </h3>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <p className="mb-1 text-base font-semibold text-gray-900">
                    {t.medicationsTitle}
                  </p>
                  <p>{t.medicationsDesc}</p>
                </div>
                <div>
                  <p className="mb-1 text-base font-semibold text-gray-900">
                    {t.foodItemsTitle}
                  </p>
                  <p>{t.foodItemsDesc}</p>
                </div>
                <div>
                  <p className="mb-1 text-base font-semibold text-gray-900">
                    {t.plantsTitle}
                  </p>
                  <p>{t.plantsDesc}</p>
                </div>
                <div>
                  <p className="mb-1 text-base font-semibold text-gray-900">
                    {t.electronicsTitle}
                  </p>
                  <p>{t.electronicsDesc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="border-primary-500 border-l-4 bg-blue-50 p-4">
            <p className="text-sm text-gray-800">{t.proTip}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
