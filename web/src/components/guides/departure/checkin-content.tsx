import Image from "next/image";
import Link from "next/link";
import { MdOutlineAccessTime } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { PiAirplaneTiltLight } from "react-icons/pi";
import { Lang } from "@/types/language";
import { createDepartureGuideI18n } from "@/data/i18n/guides";

interface CheckinContentProps {
  lang: Lang;
}

export function CheckinContent({ lang }: CheckinContentProps) {
  const { checkin: t } = createDepartureGuideI18n(lang);

  return (
    <>
      {/* ── Hero + Counter Info ──────────────────────────────── */}
      <section className="bg-[#f0fbfc] py-12">
        <div className="container">
          {/* Title */}
          <div className="mb-10 space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              {t.title}
            </h2>
            <p className="max-w-2xl text-gray-500 lg:text-lg">{t.intro}</p>
          </div>

          {/* Image + Info */}
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-72 w-full lg:h-[420px]">
              <Image
                src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/check-in.png"
                alt="check-in at bkia"
                fill
                className="object-contain object-top"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="space-y-8">
              {/* Counter check-in */}
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <IoPeopleOutline className="h-4 w-4 text-[#00AAAC]" />
                  <p className="text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                    {t.counterCheckinTitle}
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  {t.counterCheckinDesc}{" "}
                  <Link
                    href={`/${lang}/flights/departures`}
                    className="font-medium text-[#00AAAC] hover:underline"
                  >
                    {t.viewAirlineCounters}
                  </Link>
                </p>
              </div>

              {/* Arrival times */}
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <MdOutlineAccessTime className="h-4 w-4 text-amber-500" />
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-600">
                    {t.arrivalTimesTitle}
                  </p>
                </div>
                <p className="mb-4 text-sm text-gray-600">
                  {t.arrivalTimesDesc}{" "}
                  <Link
                    href={`/${lang}/flights/airlines`}
                    className="font-medium text-[#00AAAC] hover:underline"
                  >
                    {t.viewAirlineContacts}
                  </Link>
                </p>

                <div className="grid gap-0 divide-y divide-[#c8ecee] sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                  <div className="py-4 sm:pr-8">
                    <div className="flex items-center gap-2">
                      <PiAirplaneTiltLight className="h-4 w-4 text-[#00AAAC]" />
                      <p className="text-sm font-semibold text-gray-900">
                        {t.domesticFlights}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {t.domesticArrival}
                    </p>
                  </div>
                  <div className="py-4 sm:pl-8">
                    <div className="flex items-center gap-2">
                      <PiAirplaneTiltLight className="h-4 w-4 text-[#00AAAC]" />
                      <p className="text-sm font-semibold text-gray-900">
                        {t.internationalFlights}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {t.internationalArrival}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Counter Hours ────────────────────────────────────── */}
      <section className="bg-white py-10">
        <div className="container">
          <p className="mb-8 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
            {t.counterHoursTitle}
          </p>

          <div className="grid gap-0 divide-y divide-gray-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <div className="pb-8 sm:pr-12">
              <div className="mb-5 flex items-center gap-2">
                <PiAirplaneTiltLight className="h-4 w-4 text-[#00AAAC]" />
                <p className="font-semibold text-gray-900">{t.domesticFlights}</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="text-sm text-gray-500">{t.opens}</span>
                  <span className="rounded-lg bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
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

            <div className="pt-8 sm:pl-12 sm:pt-0">
              <div className="mb-5 flex items-center gap-2">
                <PiAirplaneTiltLight className="h-4 w-4 text-[#00AAAC]" />
                <p className="font-semibold text-gray-900">
                  {t.internationalFlights}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="text-sm text-gray-500">{t.opens}</span>
                  <span className="rounded-lg bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
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
      </section>
    </>
  );
}
