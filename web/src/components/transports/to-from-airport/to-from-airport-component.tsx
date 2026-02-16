"use client";

import Image from "next/image";
import {
  Car,
  Bus,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  CreditCard,
  Info,
} from "lucide-react";
import { Lang } from "@/types/language";
import { createToFromAirportI18n } from "@/data/i18n/transport";

interface Props {
  lang: Lang;
}

export const ToFromAirportComponent = ({ lang }: Props) => {
  const { toFromAirport: t } = createToFromAirportI18n(lang);

  return (
    <div className="container space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
          {t.title}
        </h1>
        <p className="text-gray-600 lg:text-lg">{t.intro}</p>
      </div>

      {/* Image + Service Counter side by side */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Counter Image */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
          <div className="relative aspect-video">
            <Image
              src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/parking/Picture1.png"
              alt={t.counterTitle}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Service Counter Info */}
        <section className="flex flex-col justify-center space-y-4">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
            <MapPin className="text-primary-500 h-5 w-5 shrink-0" />
            {t.counterTitle}
          </h2>
          <div className="space-y-3">
            <div className="flex gap-3 text-gray-700">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
              <span>{t.counterLocation}</span>
            </div>
            <div className="flex gap-3 text-gray-700">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
              <span>{t.counterBuilding}</span>
            </div>
          </div>

          {/* Vehicle Options inline */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xl font-semibold text-gray-900">
              {t.vehiclesTitle}
            </h2>
            <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4">
              <div className="bg-primary-100 flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
                <Car className="text-primary-600 h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{t.taxiName}</p>
                <p className="text-sm text-gray-500">{t.taxiDesc}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4">
              <div className="bg-secondary-100 flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
                <Bus className="text-secondary-600 h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{t.vanName}</p>
                <p className="text-sm text-gray-500">{t.vanDesc}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Features */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          {t.featuresTitle}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[t.feature1, t.feature2, t.feature3, t.feature4].map((f, i) => (
            <div key={i} className="flex gap-2 text-gray-700">
              <span className="text-primary-600 shrink-0">✓</span>
              <span>{f}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Rates + Payment */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Rates */}
        <section>
          <div className="mb-3 flex items-center gap-2">
            <CreditCard className="text-primary-600 h-5 w-5" />
            <h2 className="text-xl font-semibold text-gray-900">
              {t.ratesTitle}
            </h2>
          </div>
          <div className="border-primary-100 bg-primary-50 flex gap-3 rounded-lg border p-4">
            <Info className="text-primary-500 mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-gray-700">{t.ratesNote}</p>
          </div>
        </section>

        {/* Payment Methods */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            {t.paymentTitle}
          </h2>
          <div className="space-y-3">
            <div className="flex gap-3 text-gray-700">
              <span>💵</span>
              <span>{t.cashPayment}</span>
            </div>
            <div className="flex gap-3 text-gray-700">
              <span>📱</span>
              <span>{t.transferPayment}</span>
            </div>
          </div>
        </section>
      </div>

      {/* Advance Booking */}
      <section className="bg-secondary-50 rounded-lg p-5">
        <div className="mb-3 flex items-center gap-2">
          <Calendar className="text-secondary-600 h-5 w-5" />
          <h2 className="text-xl font-semibold text-gray-900">
            {t.bookingTitle}
          </h2>
        </div>
        <p className="mb-4 text-gray-700">{t.bookingDesc}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="tel:+8562092014955"
            className="border-secondary-200 hover:border-secondary-400 flex items-center gap-3 rounded-lg border bg-white px-4 py-3 text-gray-700 transition-colors"
          >
            <Phone className="text-secondary-600 h-5 w-5 shrink-0" />
            <div>
              <p className="text-xs text-gray-500">{t.phone}</p>
              <p className="font-semibold">+856-20-92014955</p>
            </div>
          </a>
          <a
            href="https://wa.me/8562092014955"
            target="_blank"
            rel="noopener noreferrer"
            className="border-secondary-200 hover:border-secondary-400 flex items-center gap-3 rounded-lg border bg-white px-4 py-3 text-gray-700 transition-colors"
          >
            <MessageCircle className="text-secondary-600 h-5 w-5 shrink-0" />
            <div>
              <p className="text-xs text-gray-500">{t.whatsapp}</p>
              <p className="font-semibold">+856-20-92014955</p>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
};
