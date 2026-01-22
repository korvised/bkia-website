import Image from "next/image";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import {
  MdOutlineFlightTakeoff,
  MdOutlineAirlineSeatReclineNormal,
} from "react-icons/md";
import { TbAlertTriangle, TbSpeakerphone } from "react-icons/tb";
import { BsPersonCheck } from "react-icons/bs";
import { Lang } from "@/types/language";
import { createPassengerGuideI18n } from "@/data/i18n/guide";

interface BoardingContentProps {
  lang: Lang;
}

export function BoardingContent({ lang }: BoardingContentProps) {
  const { boarding: t } = createPassengerGuideI18n(lang);

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
          <div className="relative h-72 w-full max-w-lg lg:mt-4 lg:h-[500px] lg:max-w-none">
            <Image
              src="/images/guides/boarding.png"
              alt="boarding at bkia"
              fill
              className="object-contain object-top"
              priority
              sizes="(max-width: 1024px) 100vw, 400px"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 space-y-8">
          {/* Boarding Time Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="text-primary-600 h-6 w-6" />
              <h3 className="text-xl font-bold text-gray-900">
                {t.boardingTimeTitle}
              </h3>
            </div>
            <p className="text-base leading-relaxed text-gray-600">
              {t.boardingTimeDesc}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {t.boardingBegins}
                  </span>
                  <span className="text-primary-600 bg-primary-50 rounded-lg px-3 py-1 text-sm font-medium">
                    {t.boardingBeginsTime}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{t.gateCloses}</span>
                  <span className="rounded-lg bg-red-50 px-3 py-1 text-sm font-medium text-red-600">
                    {t.gateClosesTime}
                  </span>
                </div>
              </div>

              <div className="flex items-center rounded-xl border border-amber-200 bg-amber-50 p-5">
                <AlertCircle className="mr-3 h-5 w-5 shrink-0 text-amber-600" />
                <span className="text-sm text-amber-800">
                  {t.latePassengers}
                </span>
              </div>
            </div>
          </div>

          {/* Boarding Groups & Required Documents - Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Boarding Groups */}
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-primary-100 flex h-10 w-10 items-center justify-center rounded-lg">
                  <BsPersonCheck className="text-primary-600 h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {t.boardingGroupsTitle}
                </h3>
              </div>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="bg-primary-100 text-primary-700 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-medium">
                    1
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {t.priorityBoarding}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t.priorityBoardingDesc}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary-100 text-primary-700 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-medium">
                    2
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {t.economyRear}
                    </p>
                    <p className="text-xs text-gray-500">{t.economyRearDesc}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary-100 text-primary-700 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-medium">
                    3
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {t.economyFront}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t.economyFrontDesc}
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Required Documents */}
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {t.requiredTitle}
                </h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">
                    {t.requiredBoardingPass}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">
                    {t.requiredPassport}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  <span className="text-sm text-gray-700">
                    {t.requiredCabinBag}
                  </span>
                </li>
              </ul>

              <div className="mt-4 rounded-lg bg-gray-50 p-3">
                <p className="mb-1 text-xs font-medium text-gray-900">
                  {t.gateCheckTitle}
                </p>
                <p className="text-xs text-gray-600">{t.gateCheckDesc}</p>
              </div>
            </div>
          </div>

          {/* Announcements */}
          <div className="border-primary-200 bg-primary-50 rounded-xl border p-5">
            <div className="flex items-start gap-3">
              <TbSpeakerphone className="text-primary-600 mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <h4 className="mb-1 text-sm font-semibold text-gray-900">
                  {t.announcementsTitle}
                </h4>
                <p className="text-sm text-gray-700">{t.announcementsDesc}</p>
              </div>
            </div>
          </div>

          {/* In-Flight Regulations */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MdOutlineAirlineSeatReclineNormal className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">
                {t.inFlightTitle}
              </h3>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-400" />
                  <span className="text-sm text-gray-700">{t.seatbelt}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-400" />
                  <span className="text-sm text-gray-700">{t.electronics}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-400" />
                  <span className="text-sm text-gray-700">
                    {t.seatPosition}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-400" />
                  <span className="text-sm text-gray-700">
                    {t.overheadBins}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Prohibited On Board */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TbAlertTriangle className="h-6 w-6 text-red-600" />
              <h3 className="text-xl font-bold text-gray-900">
                {t.prohibitedTitle}
              </h3>
            </div>

            <div className="rounded-xl border border-red-200 bg-red-50 p-5">
              <ul className="mb-4 space-y-4">
                <li className="flex items-start gap-3">
                  <TbAlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  <span className="text-sm leading-relaxed text-gray-700">
                    {t.prohibitedNoSmoking}
                  </span>
                </li>
                {/* Merged Noise and Disturbance Row */}
                <li className="flex items-start gap-3">
                  <TbAlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  <span className="text-sm leading-relaxed text-gray-700">
                    {t.prohibitedNoDisturbance}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <TbAlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  <span className="text-sm leading-relaxed text-gray-700">
                    {t.prohibitedNoChaos}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <TbAlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  <span className="text-sm leading-relaxed text-gray-700">
                    {t.prohibitedEmergency}
                  </span>
                </li>
              </ul>

              <div className="mt-4 border-t border-red-200 pt-3">
                <p className="text-xs font-bold tracking-wide text-red-700 uppercase">
                  {t.prohibitedWarning}
                </p>
              </div>
            </div>
          </div>

          {/* Boarding Tips */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="mb-3 flex items-center gap-2">
                <MdOutlineFlightTakeoff className="text-primary-500 h-5 w-5" />
                <h4 className="text-base font-semibold text-gray-900">
                  {t.tipsTitle}
                </h4>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary-500 mt-0.5 h-4 w-4 shrink-0" />
                  <span className="text-sm text-gray-700">{t.tipEarly}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary-500 mt-0.5 h-4 w-4 shrink-0" />
                  <span className="text-sm text-gray-700">{t.tipCharge}</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <ul className="space-y-2 lg:mt-9">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary-500 mt-0.5 h-4 w-4 shrink-0" />
                  <span className="text-sm text-gray-700">
                    {t.tipEssentials}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary-500 mt-0.5 h-4 w-4 shrink-0" />
                  <span className="text-sm text-gray-700">{t.tipListen}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
