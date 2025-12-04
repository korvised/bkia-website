import Image from "next/image";
import { CheckCircle, AlertCircle } from "lucide-react";
import { MdOutlineSecurity } from "react-icons/md";
import { TbAlertTriangle } from "react-icons/tb";
import { Lang } from "@/types/language";
import { createPassengerGuideI18n } from "@/data/i18n/guide";

interface SecurityContentProps {
  lang: Lang;
}

export function SecurityContent({ lang }: SecurityContentProps) {
  const { security: t } = createPassengerGuideI18n(lang);

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
        <div className="lg:w-96 lg:flex-none">
          <div className="relative h-72 w-full max-w-lg lg:mt-4 lg:h-[500px] lg:max-w-none">
            <Image
              src="/images/guides/security.png"
              alt="security screening at bkia"
              fill
              className="object-contain object-top"
              priority
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 space-y-8">
          {/* Prepare & Screening Methods - Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Prepare for Screening */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-primary-100 flex h-10 w-10 items-center justify-center rounded-lg">
                  <CheckCircle className="text-primary-600 h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {t.prepareTitle}
                </h3>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">
                {t.prepareDesc}
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">
                    {t.prepareMetalItems}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">
                    {t.prepareLaptops}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">
                    {t.prepareJackets}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">
                    {t.prepareTrays}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">
                    {t.prepareBoardingPass}
                  </span>
                </li>
              </ul>
            </div>

            {/* Screening Methods */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <MdOutlineSecurity className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {t.screeningMethodsTitle}
                </h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-primary-500 mt-1.5 h-2 w-2 shrink-0 rounded-full" />
                  <span className="text-sm text-gray-700">
                    {t.screeningMetalDetector}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary-500 mt-1.5 h-2 w-2 shrink-0 rounded-full" />
                  <span className="text-sm text-gray-700">
                    {t.screeningXray}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary-500 mt-1.5 h-2 w-2 shrink-0 rounded-full" />
                  <span className="text-sm text-gray-700">
                    {t.screeningHandheld}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary-500 mt-1.5 h-2 w-2 shrink-0 rounded-full" />
                  <span className="text-sm text-gray-700">
                    {t.screeningPhysical}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary-500 mt-1.5 h-2 w-2 shrink-0 rounded-full" />
                  <span className="text-sm text-gray-700">
                    {t.screeningBodyScan}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Liquid Restrictions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="text-primary-600 h-6 w-6" />
              <h3 className="text-xl font-bold text-gray-900">
                {t.liquidTitle}
              </h3>
            </div>
            <p className="text-base leading-relaxed text-gray-600">
              {t.liquidDesc}
            </p>

            <div className="border-primary-200 bg-primary-50 rounded-xl border p-5">
              <ul className="mb-4 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-primary-500 mt-1.5 h-2 w-2 shrink-0 rounded-full" />
                  <span className="text-sm text-gray-700">
                    {t.liquidMax100ml}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary-500 mt-1.5 h-2 w-2 shrink-0 rounded-full" />
                  <span className="text-sm text-gray-700">
                    {t.liquidClearBag}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary-500 mt-1.5 h-2 w-2 shrink-0 rounded-full" />
                  <span className="text-sm text-gray-700">
                    {t.liquidOneBag}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary-500 mt-1.5 h-2 w-2 shrink-0 rounded-full" />
                  <span className="text-sm text-gray-700">
                    {t.liquidRemoveBag}
                  </span>
                </li>
              </ul>

              <div className="rounded-lg bg-white p-4">
                <p className="mb-2 text-sm font-medium text-gray-900">
                  {t.liquidIncludes}
                </p>
                <p className="text-xs text-gray-600">{t.liquidExamples}</p>
              </div>

              <div className="mt-3 rounded-lg bg-green-50 p-4">
                <p className="mb-2 text-sm font-medium text-green-900">
                  {t.liquidExceptions}
                </p>
                <ul className="space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-3 w-3 shrink-0 text-green-600" />
                    <span className="text-xs text-green-800">
                      {t.liquidBabyFormula}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-3 w-3 shrink-0 text-green-600" />
                    <span className="text-xs text-green-800">
                      {t.liquidMedication}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-3 w-3 shrink-0 text-green-600" />
                    <span className="text-xs text-green-800">
                      {t.liquidDutyFree}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Important Reminders */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TbAlertTriangle className="h-6 w-6 text-amber-600" />
              <h3 className="text-xl font-bold text-gray-900">
                {t.remindersTitle}
              </h3>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-medium text-amber-800">
                    1
                  </span>
                  <span className="text-sm text-gray-700">
                    {t.reminderArriveEarly}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-medium text-amber-800">
                    2
                  </span>
                  <span className="text-sm text-gray-700">
                    {t.reminderCooperate}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-medium text-amber-800">
                    3
                  </span>
                  <span className="text-sm text-gray-700">
                    {t.reminderConfiscated}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-medium text-amber-800">
                    4
                  </span>
                  <span className="text-sm text-gray-700">
                    {t.reminderRandomScreening}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-medium text-amber-800">
                    5
                  </span>
                  <span className="text-sm text-gray-700">
                    {t.reminderNoJokes}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-medium text-amber-800">
                    6
                  </span>
                  <span className="text-sm text-gray-700">
                    {t.reminderNoStrangers}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* After Security */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-bold text-gray-900">
                {t.afterSecurityTitle}
              </h3>
            </div>
            <p className="text-base leading-relaxed text-gray-600">
              {t.afterSecurityDesc}
            </p>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary-500 mt-0.5 h-4 w-4 shrink-0" />
                  <span className="text-sm text-gray-700">
                    {t.afterDutyFree}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary-500 mt-0.5 h-4 w-4 shrink-0" />
                  <span className="text-sm text-gray-700">
                    {t.afterLounges}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary-500 mt-0.5 h-4 w-4 shrink-0" />
                  <span className="text-sm text-gray-700">
                    {t.afterWaiting}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary-500 mt-0.5 h-4 w-4 shrink-0" />
                  <span className="text-sm text-gray-700">
                    {t.afterMonitor}
                  </span>
                </li>
              </ul>
              <p className="mt-4 text-xs text-gray-500 italic">{t.afterNote}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
