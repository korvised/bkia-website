"use client";

import Image from "next/image";
import { Car, Bike, AlertTriangle, Banknote, QrCode } from "lucide-react";
import { Lang } from "@/types/language";
import { createParkingI18n } from "@/data/i18n/transport/parking";

interface Props {
  lang: Lang;
}

export const ParkingComponent = ({ lang }: Props) => {
  const { parking: t } = createParkingI18n(lang);

  const zones = {
    domestic: [
      { zone: "1", desc: t.zone1Domestic, color: "bg-amber-100 text-amber-700" },
      { zone: "2–3", desc: t.zone23Domestic, color: "bg-[#e6f7f8] text-[#00AAAC]" },
      { zone: "4", desc: t.zone4Domestic, color: "bg-violet-100 text-violet-700" },
    ],
    international: [
      { zone: "1", desc: t.zone1International, color: "bg-violet-100 text-violet-700" },
      { zone: "2–3", desc: t.zone23International, color: "bg-[#e6f7f8] text-[#00AAAC]" },
      { zone: "4", desc: t.zone4International, color: "bg-[#e6f7f8] text-[#00AAAC]" },
    ],
  };

  return (
    <>
      {/* ── Header ─────────────────────────────────────────── */}
      <section className="bg-white py-10">
        <div className="container space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">{t.title}</h1>
          <p className="max-w-2xl text-gray-500 lg:text-lg">{t.intro}</p>
        </div>
      </section>

      {/* ── Map ────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-10">
        <div className="container">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{t.mapTitle}</p>
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="relative aspect-video">
              <Image
                src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/parking/Picture1.png"
                alt={t.mapTitle}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Rates ──────────────────────────────────────────── */}
      <section className="bg-[#f0fbfc] py-10">
        <div className="container">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{t.ratesTitle}</p>
          <h2 className="mb-8 text-xl font-semibold text-gray-900">{t.ratesNote}</h2>

          <div className="grid gap-0 divide-y divide-[#d4f2f3] sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            {/* Large vehicles */}
            <div className="flex items-center gap-5 py-6 pr-0 sm:pr-10">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
                <Car className="h-7 w-7 text-[#00AAAC]" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{t.largeVehicles}</p>
                <p className="text-xs text-gray-400">50 THB · 10 CNY</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-[#00AAAC]">30,000</p>
                <p className="text-xs font-semibold text-[#00AAAC]/60">LAK / hr</p>
              </div>
            </div>

            {/* Small vehicles */}
            <div className="flex items-center gap-5 py-6 pl-0 sm:pl-10">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
                <Bike className="h-7 w-7 text-amber-500" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{t.smallVehicles}</p>
                <p className="text-xs text-gray-400">25 THB · 5 CNY</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-amber-500">15,000</p>
                <p className="text-xs font-semibold text-amber-500/60">LAK / hr</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Zones ──────────────────────────────────────────── */}
      <section className="bg-white py-10">
        <div className="container">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{t.zonesTitle}</p>
          <h2 className="mb-8 text-xl font-semibold text-gray-900">{t.zonesTitle}</h2>

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-bold text-gray-700">{t.domesticTitle}</p>
              <div className="space-y-3">
                {zones.domestic.map(({ zone, desc, color }) => (
                  <div key={zone} className="flex items-start gap-3">
                    <span className={`mt-0.5 shrink-0 rounded-md px-2 py-0.5 text-xs font-bold ${color}`}>{zone}</span>
                    <p className="text-sm text-gray-600">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-4 text-sm font-bold text-gray-700">{t.internationalTitle}</p>
              <div className="space-y-3">
                {zones.international.map(({ zone, desc, color }) => (
                  <div key={zone} className="flex items-start gap-3">
                    <span className={`mt-0.5 shrink-0 rounded-md px-2 py-0.5 text-xs font-bold ${color}`}>{zone}</span>
                    <p className="text-sm text-gray-600">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Payment ────────────────────────────────────────── */}
      <section className="bg-gray-50 py-10">
        <div className="container">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{t.paymentTitle}</p>
          <h2 className="mb-6 text-xl font-semibold text-gray-900">{t.paymentTitle}</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-gray-700">
              <Banknote className="h-5 w-5 shrink-0 text-emerald-500" />
              {t.cashPayment}
            </div>
            <div className="flex items-center gap-4 text-gray-700">
              <QrCode className="h-5 w-5 shrink-0 text-sky-500" />
              {t.qrPayment}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tips ───────────────────────────────────────────── */}
      <section className="bg-amber-50/60 py-10">
        <div className="container">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-amber-600">{t.importantTitle}</p>
          <h2 className="mb-6 text-xl font-semibold text-gray-900">{t.importantTitle}</h2>
          <div className="space-y-3 border-l-2 border-amber-300 pl-5">
            <p className="text-sm text-gray-600">{t.parkingTip1}</p>
            <p className="text-sm text-gray-600">{t.parkingTip2}</p>
            <p className="text-sm text-gray-600">{t.parkingTip3}</p>
          </div>
          <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-amber-700">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            {t.lostTicketFee}
          </div>
        </div>
      </section>
    </>
  );
};
