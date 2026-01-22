import Image from "next/image";
import Link from "next/link";
import { MdOutlineAccessTime } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { PiAirplaneTiltLight } from "react-icons/pi";
import { Lang } from "@/types/language";
import { createDepartureGuideI18n } from "@/data/i18n/guide";

interface CheckinContentProps {
  lang: Lang;
}

export function CheckinContent({ lang }: CheckinContentProps) {
  const { checkin: t } = createDepartureGuideI18n(lang);

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
        {/* Left side - Illustration (aligned to start, not centered) */}
        <div className="flex justify-center lg:w-96 lg:flex-none">
          <div className="relative h-72 w-full max-w-lg lg:h-[400px] lg:max-w-none">
            <Image
              src="/images/guides/check-in.png"
              alt="check-in in bkia"
              fill
              className="object-contain object-top"
              priority
              sizes="(max-width: 1024px) 100vw, 400px"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 space-y-8">
          {/* Counter Check-in Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <IoPeopleOutline className="text-primary-600 h-6 w-6" />
              <h3 className="text-xl font-bold text-gray-900">
                {t.counterCheckinTitle}
              </h3>
            </div>
            <p className="text-base leading-relaxed text-gray-600">
              {t.counterCheckinDesc}{" "}
              <Link
                href={`/${lang}/flights/departures`}
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors hover:underline"
              >
                {t.viewAirlineCounters}
              </Link>
            </p>
          </div>

          {/* Arrival Times Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MdOutlineAccessTime className="h-6 w-6 text-amber-600" />
              <h3 className="text-xl font-bold text-gray-900">
                {t.arrivalTimesTitle}
              </h3>
            </div>
            <p className="text-base leading-relaxed text-gray-600">
              {t.arrivalTimesDesc}{" "}
              <Link
                href={`/${lang}/flights/airlines`}
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors hover:underline"
              >
                {t.viewAirlineContacts}
              </Link>
            </p>

            {/* Time boxes - Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-2 flex items-center gap-2">
                  <PiAirplaneTiltLight className="text-primary-500 h-5 w-5" />
                  <p className="text-base font-semibold text-gray-900">
                    {t.domesticFlights}
                  </p>
                </div>
                <p className="text-sm text-gray-600">{t.domesticArrival}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-2 flex items-center gap-2">
                  <PiAirplaneTiltLight className="text-primary-500 h-5 w-5" />
                  <p className="text-base font-semibold text-gray-900">
                    {t.internationalFlights}
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  {t.internationalArrival}
                </p>
              </div>
            </div>
          </div>

          {/* Counter Hours */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              {t.counterHoursTitle}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Domestic Flights Card */}
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-4 flex items-center gap-2">
                  <PiAirplaneTiltLight className="text-primary-500 h-5 w-5" />
                  <p className="text-base font-semibold text-gray-900">
                    {t.domesticFlights}
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{t.opens}</span>
                    <span className="text-primary-600 bg-primary-50 rounded-lg px-3 py-1 text-sm font-medium">
                      {t.domesticOpens}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{t.closes}</span>
                    <span className="rounded-lg bg-red-50 px-3 py-1 text-sm font-medium text-red-600">
                      {t.domesticCloses}
                    </span>
                  </div>
                </div>
              </div>

              {/* International Flights Card */}
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-4 flex items-center gap-2">
                  <PiAirplaneTiltLight className="text-primary-500 h-5 w-5" />
                  <p className="text-base font-semibold text-gray-900">
                    {t.internationalFlights}
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{t.opens}</span>
                    <span className="text-primary-600 bg-primary-50 rounded-lg px-3 py-1 text-sm font-medium">
                      {t.internationalOpens}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{t.closes}</span>
                    <span className="rounded-lg bg-red-50 px-3 py-1 text-sm font-medium text-red-600">
                      {t.internationalCloses}
                    </span>
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
