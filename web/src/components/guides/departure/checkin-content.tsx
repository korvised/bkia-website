import Link from "next/link";
import { MdOutlineAccessTime } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { PiAirplaneTiltLight } from "react-icons/pi";
import { Lang } from "@/types/language";
import { createPassengerGuideI18n } from "@/data/i18n/guide";

interface CheckinContentProps {
  lang: Lang;
}

export function CheckinContent({ lang }: CheckinContentProps) {
  const { checkin: t } = createPassengerGuideI18n(lang);

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
      {/* Left side - Illustration */}
      <div className="flex justify-center lg:w-72 lg:shrink-0">
        <div className="relative flex h-56 w-56 items-center justify-center">
          {/* Background circle */}
          <div className="bg-primary-50 absolute h-48 w-48 rounded-full" />

          {/* Main illustration */}
          <div className="relative p-4">
            {/* Counter area container */}
            <div className="relative">
              {/* Counter desk (larger and more defined) */}
              <div className="bg-primary-400 border-primary-500 relative h-16 w-48 rounded-lg border-b-4 shadow-md">
                {/* Desk top surface */}
                <div className="bg-primary-500 absolute -top-1 left-0 h-3 w-full rounded-t-lg shadow-inner" />

                {/* Screen/Monitor on the counter */}
                <div className="absolute -top-12 left-8 h-10 w-16 rounded-t-lg border border-gray-900 bg-gray-800 shadow-lg">
                  {/* Simple flight info display pattern */}
                  <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-green-400" />
                  <div className="mx-auto mt-1 h-1 w-8 rounded-full bg-green-400 opacity-75" />
                </div>

                {/* Check-in sign/number */}
                <div className="text-primary-800 absolute -top-10 right-4 flex h-8 w-16 items-center justify-center rounded-sm bg-gray-200 text-xs font-bold shadow-inner">
                  04
                </div>

                {/* Person behind counter (Agent) */}
                <div className="absolute -top-12 left-16 -translate-x-1/2">
                  {/* Head */}
                  <div className="bg-primary-600 mx-auto h-8 w-8 rounded-full shadow-sm" />
                  {/* Body */}
                  <div className="bg-primary-600 mx-auto -mt-1 h-6 w-10 rounded-t-lg" />
                </div>
              </div>

              {/* PASSENGER AREA: ຖືກປັບໃຫ້ຢູ່ກາງຫຼາຍຂຶ້ນ */}
              <div className="absolute -bottom-8 left-1/2 mt-2 -translate-x-1/2">
                {/* Passenger with luggage */}
                <div className="relative flex items-end space-x-2">
                  {/* Person */}
                  <div className="relative">
                    <div className="bg-primary-600 mx-auto h-9 w-9 rounded-full shadow-sm" />
                    <div className="bg-primary-600 mx-auto -mt-0.5 h-12 w-12 rounded-t-lg" />
                  </div>

                  {/* Luggage (slightly more detailed) */}
                  <div className="relative bottom-0">
                    <div className="bg-primary-200 border-primary-400 h-12 w-8 rounded border-2 shadow-inner">
                      {/* Handle */}
                      <div className="bg-primary-400 mx-auto mt-[-4px] h-2 w-3 rounded-sm" />
                      {/* Wheels (simple) */}
                      <div className="absolute -bottom-1 left-1 h-1 w-1 rounded-full bg-gray-600" />
                      <div className="absolute right-1 -bottom-1 h-1 w-1 rounded-full bg-gray-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Content */}
      <div className="flex-1 space-y-6">
        {/* Title */}
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900 lg:text-3xl">
            {t.title}
          </h2>
          <p className="text-base leading-relaxed text-gray-600">{t.intro}</p>
        </div>

        {/* Counter Check-in */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <IoPeopleOutline className="text-primary-600 h-5 w-5" />
            <h3 className="text-lg font-semibold text-gray-900">
              {t.counterCheckinTitle}
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-gray-600">
            {t.counterCheckinDesc}{" "}
            <Link
              href={`/${lang}/flights/airlines`}
              className="text-primary-600 hover:text-primary-700 underline"
            >
              {t.viewAirlineCounters}
            </Link>
          </p>
        </div>

        {/* Arrival Times */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MdOutlineAccessTime className="h-5 w-5 text-amber-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              {t.arrivalTimesTitle}
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-gray-600">
            {t.arrivalTimesDesc}{" "}
            <Link
              href={`/${lang}/flights/airlines`}
              className="text-primary-600 hover:text-primary-700 underline"
            >
              {t.viewAirlineContacts}
            </Link>
          </p>

          {/* Time boxes */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="mb-1 flex items-center gap-2">
                <PiAirplaneTiltLight className="text-primary-500 h-4 w-4" />
                <p className="text-sm font-medium text-gray-900">
                  {t.domesticFlights}
                </p>
              </div>
              <p className="text-sm text-gray-600">{t.domesticArrival}</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="mb-1 flex items-center gap-2">
                <PiAirplaneTiltLight className="text-primary-500 h-4 w-4" />
                <p className="text-sm font-medium text-gray-900">
                  {t.internationalFlights}
                </p>
              </div>
              <p className="text-sm text-gray-600">{t.internationalArrival}</p>
            </div>
          </div>
        </div>

        {/* Counter Hours Table */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">
            {t.counterHoursTitle}
          </h3>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-white">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600"></th>
                  <th className="text-primary-600 px-4 py-3 text-left font-medium">
                    {t.opens}
                  </th>
                  <th className="text-danger-600 px-4 py-3 text-left font-medium">
                    {t.closes}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 border-t border-gray-200 bg-white">
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {t.domesticFlights}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{t.domesticOpens}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {t.domesticCloses}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {t.internationalFlights}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {t.internationalOpens}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {t.internationalCloses}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
