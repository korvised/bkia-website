"use client";

import Image from "next/image";
import {
  Car,
  Bike,
  Banknote,
  QrCode,
  AlertTriangle,
  Ticket,
  MapPin,
  Clock,
  ZoomIn,
  X,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useInView } from "@/hooks/useInView";
import type { Lang } from "@/types/language";

// ── Trilingual content ────────────────────────────────────────────────────────
const CONTENT = {
  en: {
    eyebrow: "BKIA — Services",
    title: "Airport Parking",
    subtitle:
      "Convenient, well-organised parking for passengers, greeters, and visitors — with clear zones for every vehicle type.",
    mapLabel: "Parking Layout Map",
    ratesLabel: "Parking Rates",
    ratesTitle: "Hourly Rates",
    ratesNote: "All rates are charged per hour of parking.",
    perHour: "/ hr",
    vehicles: [
      {
        key: "large",
        label: "Cars, Sedans, Pickups & Vans",
        icon: "car" as const,
        lak: "30,000",
        thb: "50",
        cny: "10",
        accent: "teal" as const,
      },
      {
        key: "small",
        label: "Motorcycles & Tuk-tuks",
        icon: "bike" as const,
        lak: "15,000",
        thb: "25",
        cny: "5",
        accent: "amber" as const,
      },
    ],
    zonesLabel: "Parking Zones",
    zonesTitle: "Zone Guide",
    domestic: "Domestic Terminal",
    international: "International Terminal",
    zones: {
      domestic: [
        { zone: "1",   desc: "Bus & Taxi parking" },
        { zone: "2–3", desc: "General passenger vehicles & motorcycles" },
        { zone: "4",   desc: "Staff & VIP parking" },
      ],
      international: [
        { zone: "1",   desc: "VIP & staff parking" },
        { zone: "2–3", desc: "General passenger vehicles & motorcycles" },
        { zone: "4",   desc: "General passenger vehicles" },
      ],
    },
    paymentLabel: "Payment",
    paymentTitle: "Accepted Payment Methods",
    payments: [
      { label: "Cash", detail: "Lao Kip (LAK) · Thai Baht (THB) · Chinese Yuan (CNY)" },
      { label: "Bank Transfer", detail: "Lao QR — all Lao bank apps accepted" },
    ],
    tipsLabel: "Important",
    tips: [
      "Keep your parking ticket safe — you will need it to exit.",
      "Payment must be settled before leaving the parking area.",
      "Follow directional signs to your designated parking zone.",
    ],
    lostTicket: "Lost parking ticket fee: 80,000 LAK",
  },
  lo: {
    eyebrow: "BKIA — ການບໍລິການ",
    title: "ລານຈອດລົດ",
    subtitle:
      "ລານຈອດລົດທີ່ສະດວກສະບາຍ ແລະ ມີລະບຽບ ສຳລັບຜູ້ໂດຍສານ, ຜູ້ມາຮັບ-ສົ່ງ ແລະ ຜູ້ມາຢ້ຽມຢາມ — ມີເຂດສຳລັບທຸກປະເພດຍານພາຫະນະ.",
    mapLabel: "ແຜນຜັງລານຈອດລົດ",
    ratesLabel: "ອັດຕາຄ່າຈອດລົດ",
    ratesTitle: "ຄ່າບໍລິການຕໍ່ຊົ່ວໂມງ",
    ratesNote: "ຄ່າຈອດລົດທຸກອັດຕາ ຄິດໄລ່ຕາມຊົ່ວໂມງ.",
    perHour: "/ 2 ຊ.ມ",
    vehicles: [
      {
        key: "large",
        label: "ລົດໃຫຍ່ (ລົດເກັງ, ລົດຕູ້, ລົດກະບະ)",
        icon: "car" as const,
        lak: "30,000",
        thb: "50",
        cny: "10",
        accent: "teal" as const,
      },
      {
        key: "small",
        label: "ລົດຈັກ ແລະ ລົດສາມລໍ້",
        icon: "bike" as const,
        lak: "15,000",
        thb: "25",
        cny: "5",
        accent: "amber" as const,
      },
    ],
    zonesLabel: "ເຂດຈອດລົດ",
    zonesTitle: "ຄູ່ມືເຂດຈອດ",
    domestic: "ອາຄານສາຍພາຍໃນປະເທດ",
    international: "ອາຄານສາຍຕ່າງປະເທດ",
    zones: {
      domestic: [
        { zone: "1",   desc: "ບ່ອນຈອດລົດເມ ແລະ ແທັກຊີ" },
        { zone: "2–3", desc: "ລົດຜູ້ໂດຍສານທົ່ວໄປ ແລະ ລົດຈັກ" },
        { zone: "4",   desc: "ລົດພະນັກງານ ແລະ VIP" },
      ],
      international: [
        { zone: "1",   desc: "ລົດ VIP ແລະ ພະນັກງານ" },
        { zone: "2–3", desc: "ລົດຜູ້ໂດຍສານທົ່ວໄປ ແລະ ລົດຈັກ" },
        { zone: "4",   desc: "ລົດຜູ້ໂດຍສານທົ່ວໄປ" },
      ],
    },
    paymentLabel: "ການຊຳລະເງິນ",
    paymentTitle: "ວິທີການຊຳລະເງິນ",
    payments: [
      { label: "ເງິນສົດ", detail: "ກີບລາວ (LAK) · ບາດໄທ (THB) · ຢວນຈີນ (CNY)" },
      { label: "ໂອນເງິນ", detail: "ລາວ QR — ທຸກແອັບທະນາຄານລາວ" },
    ],
    tipsLabel: "ຂໍ້ມູນສຳຄັນ",
    tips: [
      "ເກັບປີ້ຈອດລົດໄວ້ໃຫ້ດີ — ທ່ານຈຳເປັນຕ້ອງໃຊ້ເມື່ອອອກ.",
      "ຕ້ອງຊຳລະເງິນກ່ອນອອກຈາກລານຈອດ.",
      "ປະຕິບັດຕາມປ້າຍທິດທາງໄປຫາເຂດຈອດທີ່ກຳນົດ.",
    ],
    lostTicket: "ຄ່າທຳນຽມປີ້ຈອດລົດເສຍ: 80,000 ກີບ",
  },
  zh: {
    eyebrow: "BKIA — 服务",
    title: "机场停车场",
    subtitle:
      "为乘客、接送人员和访客提供便捷、井然有序的停车服务，各车辆类型均有专属停车区。",
    mapLabel: "停车场布局图",
    ratesLabel: "停车费率",
    ratesTitle: "按小时计费",
    ratesNote: "所有费率均按停车小时数计算。",
    perHour: "/ 小时",
    vehicles: [
      {
        key: "large",
        label: "轿车、皮卡、面包车",
        icon: "car" as const,
        lak: "30,000",
        thb: "50",
        cny: "10",
        accent: "teal" as const,
      },
      {
        key: "small",
        label: "摩托车、三轮车",
        icon: "bike" as const,
        lak: "15,000",
        thb: "25",
        cny: "5",
        accent: "amber" as const,
      },
    ],
    zonesLabel: "停车区域",
    zonesTitle: "区域指南",
    domestic: "国内航站楼",
    international: "国际航站楼",
    zones: {
      domestic: [
        { zone: "1",   desc: "巴士与出租车停车区" },
        { zone: "2–3", desc: "普通乘客车辆与摩托车" },
        { zone: "4",   desc: "员工与贵宾停车区" },
      ],
      international: [
        { zone: "1",   desc: "贵宾与员工停车区" },
        { zone: "2–3", desc: "普通乘客车辆与摩托车" },
        { zone: "4",   desc: "普通乘客车辆" },
      ],
    },
    paymentLabel: "支付方式",
    paymentTitle: "接受的支付方式",
    payments: [
      { label: "现金", detail: "老挝基普 (LAK) · 泰铢 (THB) · 人民币 (CNY)" },
      { label: "银行转账", detail: "老挝二维码 — 所有老挝银行应用均支持" },
    ],
    tipsLabel: "重要提示",
    tips: [
      "请妥善保管停车票 — 离场时需要出示。",
      "离开停车区前必须完成付款。",
      "请按照指示牌前往指定停车区。",
    ],
    lostTicket: "遗失停车票费用：80,000 基普",
  },
} as const;

// ── Zone badge colours ────────────────────────────────────────────────────────
const ZONE_ACCENT: Record<string, { bg: string; text: string }> = {
  "1":   { bg: "bg-amber-100",    text: "text-amber-700" },
  "2–3": { bg: "bg-primary-50",   text: "text-primary" },
  "4":   { bg: "bg-primary-50",   text: "text-primary" },
};

// ── Component ─────────────────────────────────────────────────────────────────
export function ParkingContent({ lang }: { lang: Lang }) {
  const t = CONTENT[lang];

  const [mapOpen, setMapOpen] = useState(false);

  const closeMap = useCallback(() => setMapOpen(false), []);

  useEffect(() => {
    if (!mapOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeMap(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mapOpen, closeMap]);

  const [heroRef,    heroInView]    = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [ratesRef,   ratesInView]   = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [zonesRef,   zonesInView]   = useInView<HTMLDivElement>({ threshold: 0.05 });
  const [payRef,     payInView]     = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <>
      <style>{`
        @keyframes pk-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pk-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes pk-modal-in {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pk-anim { animation: none !important; opacity: 1 !important; }
          .pk-modal-img { animation: none !important; }
        }
      `}</style>

      {/* ── 1. Hero — dark navy split ─────────────────────────────────────────── */}
      <section className="bg-primary-700">
        <div
          ref={heroRef}
          className="container grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20"
        >
          {/* Left: text */}
          <div>
            <p
              className="pk-anim mb-3 text-[10px] font-extrabold uppercase tracking-[0.32em] text-primary-300"
              style={heroInView ? { animation: "pk-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
            >
              {t.eyebrow}
            </p>
            <h1
              className="pk-anim text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-5xl"
              style={heroInView ? { animation: "pk-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 80ms both" } : { opacity: 0 }}
            >
              {t.title}
            </h1>
            <p
              className="pk-anim mt-4 max-w-md text-sm leading-relaxed text-white/55 sm:text-base"
              style={heroInView ? { animation: "pk-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 160ms both" } : { opacity: 0 }}
            >
              {t.subtitle}
            </p>

            {/* Quick-stat pills */}
            <div
              className="pk-anim mt-8 flex flex-wrap gap-3"
              style={heroInView ? { animation: "pk-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) 260ms both" } : { opacity: 0 }}
            >
              {[
                { icon: Clock,  label: "24 / 7" },
                { icon: MapPin, label: t.domestic },
                { icon: MapPin, label: t.international },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-lg bg-white/8 px-3 py-2"
                >
                  <Icon className="h-3.5 w-3.5 text-primary-300" />
                  <span className="text-xs font-semibold text-white/70">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: map image — click to open modal */}
          <button
            type="button"
            onClick={() => setMapOpen(true)}
            className="pk-anim group relative cursor-zoom-in overflow-hidden rounded-2xl bg-white/5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            style={heroInView ? { animation: "pk-fade-in 0.8s cubic-bezier(0.22,1,0.36,1) 100ms both" } : { opacity: 0 }}
            aria-label={t.mapLabel}
          >
            {/* Car badge */}
            <div className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
              <Car className="h-4 w-4 text-primary-300" />
            </div>
            {/* Zoom hint — appears on hover */}
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <div className="flex items-center gap-2 rounded-full bg-black/55 px-4 py-2 backdrop-blur-sm">
                <ZoomIn className="h-4 w-4 text-white" />
                <span className="text-xs font-semibold text-white">{t.mapLabel}</span>
              </div>
            </div>
            <div className="relative aspect-[4/3] transition-transform duration-500 group-hover:scale-[1.02]">
              <Image
                src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/parking/Picture1.png"
                alt={t.mapLabel}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-2"
                priority
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/50 to-transparent px-5 py-4">
              <p className="text-xs font-semibold text-white/75">{t.mapLabel}</p>
            </div>
          </button>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* ── 2. Rates ──────────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-14 sm:py-18">
        <div className="container">
          <div ref={ratesRef}>
            <p
              className="pk-anim mb-1 text-[10px] font-extrabold uppercase tracking-[0.32em] text-primary"
              style={ratesInView ? { animation: "pk-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
            >
              {t.ratesLabel}
            </p>
            <h2
              className="pk-anim text-2xl font-bold text-primary-800 sm:text-3xl"
              style={ratesInView ? { animation: "pk-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 70ms both" } : { opacity: 0 }}
            >
              {t.ratesTitle}
            </h2>
            <p
              className="pk-anim mt-1.5 text-sm text-gray-400"
              style={ratesInView ? { animation: "pk-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 140ms both" } : { opacity: 0 }}
            >
              {t.ratesNote}
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {t.vehicles.map((v, i) => {
              const isTeal  = v.accent === "teal";
              const VIcon   = v.icon === "car" ? Car : Bike;
              return (
                <div
                  key={v.key}
                  className={`pk-anim flex flex-col rounded-2xl border p-6 transition-shadow hover:shadow-md ${
                    isTeal
                      ? "border-primary/20 bg-white"
                      : "border-amber-200 bg-white"
                  }`}
                  style={ratesInView ? { animation: `pk-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) ${220 + i * 100}ms both` } : { opacity: 0 }}
                >
                  {/* Icon + label */}
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                        isTeal ? "bg-primary/10" : "bg-amber-100"
                      }`}
                    >
                      <VIcon className={`h-6 w-6 ${isTeal ? "text-primary" : "text-amber-600"}`} />
                    </div>
                    <p className="font-semibold text-gray-800">{v.label}</p>
                  </div>

                  {/* Divider */}
                  <div className={`my-5 h-px ${isTeal ? "bg-primary/8" : "bg-amber-100"}`} />

                  {/* Primary rate */}
                  <div className="flex items-baseline gap-2">
                    <span className={`text-5xl font-black tracking-tight ${isTeal ? "text-primary" : "text-amber-600"}`}>
                      {v.lak}
                    </span>
                    <div>
                      <p className={`text-sm font-bold ${isTeal ? "text-primary/50" : "text-amber-500/70"}`}>LAK</p>
                      <p className={`text-xs ${isTeal ? "text-primary/35" : "text-amber-400/70"}`}>{t.perHour}</p>
                    </div>
                  </div>

                  {/* Currency equivalents */}
                  <div className="mt-4 flex gap-3">
                    {[
                      { currency: "THB", amount: v.thb },
                      { currency: "CNY", amount: v.cny },
                    ].map(({ currency, amount }) => (
                      <div
                        key={currency}
                        className={`rounded-lg px-3 py-1.5 text-center ${
                          isTeal ? "bg-primary/6" : "bg-amber-50"
                        }`}
                      >
                        <p className={`text-base font-bold ${isTeal ? "text-primary" : "text-amber-600"}`}>
                          {amount}
                        </p>
                        <p className={`text-[10px] font-semibold ${isTeal ? "text-primary/40" : "text-amber-400"}`}>
                          {currency}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ── 3. Zones ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-18">
        <div className="container">
          <div ref={zonesRef}>
            <p
              className="pk-anim mb-1 text-[10px] font-extrabold uppercase tracking-[0.32em] text-primary"
              style={zonesInView ? { animation: "pk-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
            >
              {t.zonesLabel}
            </p>
            <h2
              className="pk-anim text-2xl font-bold text-primary-800 sm:text-3xl"
              style={zonesInView ? { animation: "pk-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 70ms both" } : { opacity: 0 }}
            >
              {t.zonesTitle}
            </h2>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {(["domestic", "international"] as const).map((terminal, ti) => (
              <div
                key={terminal}
                className="pk-anim rounded-2xl border border-gray-100 bg-gray-50 p-6"
                style={zonesInView ? { animation: `pk-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) ${180 + ti * 120}ms both` } : { opacity: 0 }}
              >
                <div className="mb-5 flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <p className="text-sm font-bold text-primary-800">
                    {terminal === "domestic" ? t.domestic : t.international}
                  </p>
                </div>
                <div className="space-y-3">
                  {t.zones[terminal].map(({ zone, desc }) => {
                    const ac = ZONE_ACCENT[zone] ?? { bg: "bg-gray-100", text: "text-gray-600" };
                    return (
                      <div key={zone} className="flex items-start gap-3">
                        <span className={`mt-0.5 shrink-0 rounded-md px-2 py-0.5 text-xs font-bold ${ac.bg} ${ac.text}`}>
                          {zone}
                        </span>
                        <p className="text-sm text-gray-600">{desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ── 4. Payment + Tips ────────────────────────────────────────────────── */}
      <section className="bg-primary-50 py-14 sm:py-16">
        <div ref={payRef} className="container grid gap-8 lg:grid-cols-2 lg:gap-12">

          {/* Payment methods */}
          <div
            className="pk-anim"
            style={payInView ? { animation: "pk-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
          >
            <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.32em] text-primary">
              {t.paymentLabel}
            </p>
            <h2 className="mb-5 text-xl font-bold text-primary-800 sm:text-2xl">
              {t.paymentTitle}
            </h2>
            <div className="space-y-3">
              {t.payments.map(({ label, detail }, i) => {
                const Icon = i === 0 ? Banknote : QrCode;
                const colors = i === 0
                  ? "bg-emerald-50 border-emerald-100"
                  : "bg-sky-50 border-sky-100";
                const iconColor = i === 0 ? "text-emerald-600" : "text-sky-600";
                const iconBg   = i === 0 ? "bg-emerald-100" : "bg-sky-100";
                return (
                  <div key={label} className={`flex items-start gap-4 rounded-xl border p-4 ${colors}`}>
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
                      <Icon className={`h-4.5 w-4.5 ${iconColor}`} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{label}</p>
                      <p className="mt-0.5 text-xs text-gray-500">{detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Important tips */}
          <div
            className="pk-anim"
            style={payInView ? { animation: "pk-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 120ms both" } : { opacity: 0 }}
          >
            <div className="mb-1 flex items-center gap-2">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
              <p className="text-[10px] font-extrabold uppercase tracking-[0.32em] text-amber-600">
                {t.tipsLabel}
              </p>
            </div>
            <h2 className="mb-5 text-xl font-bold text-primary-800 sm:text-2xl">
              &nbsp;
            </h2>
            <div className="space-y-3 border-l-2 border-amber-300 pl-5">
              {t.tips.map((tip, i) => (
                <p key={i} className="text-sm text-gray-600">{tip}</p>
              ))}
            </div>

            {/* Lost ticket callout */}
            <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
              <Ticket className="h-4 w-4 shrink-0 text-amber-600" />
              <p className="text-sm font-semibold text-amber-700">{t.lostTicket}</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Map lightbox modal ────────────────────────────────────────────────── */}
      {mapOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={t.mapLabel}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            style={{ animation: "pk-fade-in 0.2s ease both" }}
            onClick={closeMap}
          />

          {/* Close button — top-right of viewport */}
          <button
            type="button"
            onClick={closeMap}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Image — no card, floats on backdrop */}
          <div
            className="pk-modal-img relative z-10 w-full max-w-4xl"
            style={{ animation: "pk-modal-in 0.25s cubic-bezier(0.22,1,0.36,1) both", aspectRatio: "16/10" }}
          >
            <Image
              src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/parking/Picture1.png"
              alt={t.mapLabel}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
