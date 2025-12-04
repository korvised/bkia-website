import Image from "next/image";
import { FaPassport } from "react-icons/fa";
import { MdOutlineFlag, MdOutlinePublic } from "react-icons/md";
import { TbAlertTriangle } from "react-icons/tb";
import { CheckCircle } from "lucide-react";
import { Lang } from "@/types/language";
import { createPassengerGuideI18n } from "@/data/i18n/guide";

interface ImmigrationContentProps {
  lang: Lang;
}

export function ImmigrationContent({ lang }: ImmigrationContentProps) {
  const { immigration: t } = createPassengerGuideI18n(lang);

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
              src="/images/guides/immigration.png"
              alt="immigration control at bkia"
              fill
              className="object-contain object-top"
              priority
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 space-y-8">
          {/* Travel Documents Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FaPassport className="text-primary-600 h-6 w-6" />
              <h3 className="text-xl font-bold text-gray-900">
                {t.documentsTitle}
              </h3>
            </div>
            <p className="text-base leading-relaxed text-gray-600">
              {t.documentsDesc}
            </p>
          </div>

          {/* Lao Nationals & Foreigners - Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Lao Nationals */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-primary-100 flex h-10 w-10 items-center justify-center rounded-lg">
                  <MdOutlineFlag className="text-primary-600 h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {t.laoNationalsTitle}
                </h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">{t.laoPassport}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">{t.laoIdCard}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">
                    {t.laoHouseholdReg}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">
                    {t.laoBirthCert}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">
                    {t.laoResidence}
                  </span>
                </li>
              </ul>
            </div>

            {/* Foreigners */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <MdOutlinePublic className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {t.foreignersTitle}
                </h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">
                    {t.foreignPassport}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">
                    {t.foreignDeparture}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">
                    {t.foreignLossReport}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Immigration Process */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FaPassport className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">
                {t.processTitle}
              </h3>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="bg-primary-100 text-primary-700 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-medium">
                    1
                  </span>
                  <span className="text-sm text-gray-700">
                    {t.processStep1}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary-100 text-primary-700 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-medium">
                    2
                  </span>
                  <span className="text-sm text-gray-700">
                    {t.processStep2}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary-100 text-primary-700 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-medium">
                    3
                  </span>
                  <span className="text-sm text-gray-700">
                    {t.processStep3}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary-100 text-primary-700 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-medium">
                    4
                  </span>
                  <span className="text-sm text-gray-700">
                    {t.processStep4}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary-100 text-primary-700 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-medium">
                    5
                  </span>
                  <span className="text-sm text-gray-700">
                    {t.processStep5}
                  </span>
                </li>
              </ol>
            </div>
          </div>

          {/* Important Notes */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TbAlertTriangle className="h-6 w-6 text-amber-600" />
              <h3 className="text-xl font-bold text-gray-900">
                {t.notesTitle}
              </h3>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                  <span className="text-sm text-gray-700">
                    {t.notePassportValidity}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                  <span className="text-sm text-gray-700">{t.noteVisa}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                  <span className="text-sm text-gray-700">
                    {t.noteQuestions}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                  <span className="text-sm text-gray-700">
                    {t.noteProhibited}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Immigration Counters */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
              <div className="bg-primary-100 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                <MdOutlineFlag className="text-primary-600 h-6 w-6" />
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {t.counterLao}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <MdOutlinePublic className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {t.counterForeign}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <FaPassport className="h-5 w-5 text-purple-600" />
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {t.counterDiplomatic}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
