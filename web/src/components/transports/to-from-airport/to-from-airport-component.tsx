"use client";

import Image from "next/image";
import {
  Car,
  Bus,
  Phone,
  MessageCircle,
  MapPin,
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
    <>
      {/* ── Header + Counter + Vehicles ─────────────────────── */}
      <section className="bg-[#f0fbfc] py-10">
        <div className="container space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              {t.title}
            </h1>
            <p className="max-w-2xl text-gray-500 lg:text-lg">{t.intro}</p>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Image */}
            <div className="overflow-hidden rounded-2xl bg-white">
              <div className="relative aspect-video">
                <Image
                  // src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/parking/Picture1.png"
                  src="/taxi-counter.jpeg"
                  alt={t.counterTitle}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Counter info + vehicles */}
            <div className="space-y-7">
              <div>
                <p className="mb-3 text-xs font-bold tracking-widest text-[#00AAAC] uppercase">
                  {t.counterTitle}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 shrink-0 text-[#00AAAC]" />
                    {t.counterLocation}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 shrink-0 text-[#00AAAC]/30" />
                    {t.counterBuilding}
                  </div>
                </div>
              </div>

              <div className="border-t border-[#d4f2f3] pt-6">
                <p className="mb-4 text-xs font-bold tracking-widest text-[#00AAAC] uppercase">
                  {t.vehiclesTitle}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white">
                      <Car className="h-5 w-5 text-[#00AAAC]" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {t.taxiName}
                      </p>
                      <p className="text-sm text-gray-400">{t.taxiDesc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white">
                      <Bus className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{t.vanName}</p>
                      <p className="text-sm text-gray-400">{t.vanDesc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Rates + Payment ────────────────────────────────── */}
      <section className="bg-white py-10">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-1 text-xs font-bold tracking-widest text-[#00AAAC] uppercase">
              {t.ratesTitle}
            </p>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              {t.ratesTitle}
            </h2>
            <div className="flex items-start gap-3 border-l-2 border-[#00AAAC] pl-4">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#00AAAC]" />
              <p className="text-sm text-gray-600">{t.ratesNote}</p>
            </div>
          </div>
          <div>
            <p className="mb-1 text-xs font-bold tracking-widest text-[#00AAAC] uppercase">
              {t.paymentTitle}
            </p>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              {t.paymentTitle}
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <CreditCard className="h-4 w-4 shrink-0 text-emerald-500" />
                {t.cashPayment}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <CreditCard className="h-4 w-4 shrink-0 text-sky-500" />
                {t.transferPayment}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────── */}
      <section className="bg-gray-50 py-10">
        <div className="container">
          <p className="mb-1 text-xs font-bold tracking-widest text-[#00AAAC] uppercase">
            {t.featuresTitle}
          </p>
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            {t.featuresTitle}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[t.feature1, t.feature2, t.feature3, t.feature4].map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-3 text-sm text-gray-600"
              >
                <span className="mt-0.5 shrink-0 font-bold text-[#00AAAC]">
                  ✓
                </span>
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking CTA ────────────────────────────────────── */}
      <section className="bg-[#00AAAC] py-12">
        <div className="container">
          <p className="mb-1 text-xs font-bold tracking-widest text-white/60 uppercase">
            {t.bookingTitle}
          </p>
          <h2 className="mb-2 text-2xl font-bold text-white">
            {t.bookingTitle}
          </h2>
          <p className="mb-8 max-w-lg text-sm text-white/75">{t.bookingDesc}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="tel:+8562092014955"
              className="flex items-center gap-3 rounded-xl bg-white px-5 py-3.5 text-[#00AAAC] transition-opacity hover:opacity-90"
            >
              <Phone className="h-5 w-5 shrink-0" />
              <div>
                <p className="text-xs text-[#00AAAC]/60">{t.phone}</p>
                <p className="font-bold">+856-20-92014955</p>
              </div>
            </a>
            <a
              href="https://wa.me/8562092014955"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-white/30 bg-white/10 px-5 py-3.5 text-white transition-colors hover:bg-white/20"
            >
              <MessageCircle className="h-5 w-5 shrink-0" />
              <div>
                <p className="text-xs text-white/60">{t.whatsapp}</p>
                <p className="font-bold">+856-20-92014955</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
