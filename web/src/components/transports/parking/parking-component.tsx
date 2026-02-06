"use client";

import Image from "next/image";
import { Car, Bike } from "lucide-react";
import { Lang } from "@/types/language";
import { createParkingI18n } from "@/data/i18n/transport/parking";

interface Props {
  lang: Lang;
}

export const ParkingComponent = ({ lang }: Props) => {
  const { parking: t } = createParkingI18n(lang);

  return (
    <div className="container space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
          {t.title}
        </h1>
        <p className="text-gray-600 lg:text-lg">{t.intro}</p>
      </div>

      {/* Map and Zones Side by Side on Large Screens */}
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {/* Parking Map */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white xl:col-span-2">
          <div className="relative aspect-video bg-gray-100">
            <Image
              src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/parking/Picture1.png"
              alt={t.mapTitle}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Parking Zones */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            {t.zonesTitle}
          </h2>
          <div className="space-y-4">
            {/* Domestic */}
            <div className="bg-primary-50 rounded-lg p-5">
              <h3 className="mb-3 font-semibold text-gray-900">
                {t.domesticTitle}
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>{t.zone1Domestic}</li>
                <li>{t.zone23Domestic}</li>
                <li>{t.zone4Domestic}</li>
              </ul>
            </div>

            {/* International */}
            <div className="bg-secondary-50 rounded-lg p-5">
              <h3 className="mb-3 font-semibold text-gray-900">
                {t.internationalTitle}
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>{t.zone1International}</li>
                <li>{t.zone23International}</li>
                <li>{t.zone4International}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Parking Rates */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          {t.ratesTitle}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Large Vehicles */}
          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-4">
              <div className="bg-primary-100 flex h-12 w-12 items-center justify-center rounded-full">
                <Car className="text-primary-600 h-6 w-6" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{t.largeVehicles}</p>
                <p className="text-sm text-gray-500">{t.ratesNote}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-gray-900">30,000 LAK</p>
              <p className="text-sm text-gray-500">50 THB / 10 CNY</p>
            </div>
          </div>

          {/* Small Vehicles */}
          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-4">
              <div className="bg-secondary-100 flex h-12 w-12 items-center justify-center rounded-full">
                <Bike className="text-secondary-600 h-6 w-6" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{t.smallVehicles}</p>
                <p className="text-sm text-gray-500">{t.ratesNote}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-gray-900">15,000 LAK</p>
              <p className="text-sm text-gray-500">25 THB / 5 CNY</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          {t.featuresTitle}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex gap-2 text-gray-700">
            <span className="text-primary-600">✓</span>
            <span>{t.feature1}</span>
          </div>
          <div className="flex gap-2 text-gray-700">
            <span className="text-primary-600">✓</span>
            <span>{t.feature2}</span>
          </div>
          <div className="flex gap-2 text-gray-700">
            <span className="text-primary-600">✓</span>
            <span>{t.feature3}</span>
          </div>
          <div className="flex gap-2 text-gray-700">
            <span className="text-primary-600">✓</span>
            <span>{t.feature4}</span>
          </div>
        </div>
      </section>

      {/* Bottom Grid: Payment & Important Info */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Payment Methods */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            {t.paymentTitle}
          </h2>
          <div className="space-y-3">
            <div className="flex gap-3 text-gray-700">
              <span>💵</span>
              <span>{t.cashPayment}</span>
            </div>
            <div className="flex gap-3 text-gray-700">
              <span>📱</span>
              <span>{t.qrPayment}</span>
            </div>
          </div>
        </section>

        {/* Important Information */}
        <section className="rounded-lg bg-yellow-50 p-5">
          <h2 className="mb-3 text-xl font-semibold text-yellow-900">
            {t.importantTitle}
          </h2>
          <ul className="space-y-2 text-sm text-yellow-900">
            <li>• {t.parkingTip1}</li>
            <li>• {t.parkingTip2}</li>
            <li>• {t.parkingTip3}</li>
          </ul>
          <div className="mt-4 rounded-lg bg-yellow-100 px-3 py-2 font-semibold text-yellow-900">
            ⚠️ {t.lostTicketFee}
          </div>
        </section>
      </div>
    </div>
  );
};
