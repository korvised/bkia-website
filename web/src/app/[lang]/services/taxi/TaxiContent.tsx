"use client";

import Image from "next/image";
import {
  Car,
  Bus,
  Phone,
  MapPin,
  Banknote,
  QrCode,
  Users,
  CheckCircle2,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";
import type { Lang } from "@/types/language";

// ── Destination prices — edit here ───────────────────────────────────────────
// Set to a string like "80,000" or leave as "—" for placeholder
const PRICES = {
  tonPheung:      { lak: "—", cny: "—" },
  goldenTriangle: { lak: "—", cny: "—" },
  huayXai:        { lak: "—", cny: "—" },
} as const;

// ── Trilingual content ────────────────────────────────────────────────────────
const CONTENT = {
  en: {
    eyebrow: "BKIA — Services",
    title: "Airport Taxi",
    subtitle:
      "Fixed-price taxi and van service connecting the airport to the city and key destinations nearby.",
    features: [
      "Licensed & safety-certified drivers",
      "Door-to-door service",
      "Advance reservation available",
    ],
    faresLabel: "Fixed-Price Fares",
    faresTitle: "Destinations & Rates",
    faresNote: "All fares are fixed by destination. Inquire at the service counter before departure.",
    startingFrom: "Starting from",
    destinations: [
      {
        key: "tonPheung",
        name: "Ton Pheung City",
        detail: "Within the city area",
        lak: PRICES.tonPheung.lak,
        cny: PRICES.tonPheung.cny,
      },
      {
        key: "goldenTriangle",
        name: "Golden Triangle SEZ",
        detail: "Special Economic Zone",
        lak: PRICES.goldenTriangle.lak,
        cny: PRICES.goldenTriangle.cny,
      },
      {
        key: "huayXai",
        name: "Houay Xai",
        detail: "Provincial capital",
        lak: PRICES.huayXai.lak,
        cny: PRICES.huayXai.cny,
      },
    ],
    vehiclesLabel: "Vehicle Options",
    vehiclesTitle: "Choose Your Ride",
    vehicles: [
      {
        key: "taxi",
        name: "Taxi — Sedan",
        desc: "Ideal for 1–4 passengers with standard luggage.",
        capacity: "1–4 passengers",
        icon: "car" as const,
      },
      {
        key: "van",
        name: "Van",
        desc: "For families or groups needing extra comfort and luggage space.",
        capacity: "5+ passengers",
        icon: "van" as const,
      },
    ],
    paymentLabel: "Payment",
    payments: [
      { label: "Cash", detail: "Lao Kip (LAK) · Chinese Yuan (CNY)" },
      { label: "Bank Transfer", detail: "Mobile banking — all Lao bank apps" },
    ],
    bookingLabel: "Book a Taxi",
    bookingTitle: "Reserve in Advance",
    bookingDesc:
      "Call or message via WhatsApp to schedule a pick-up or drop-off at a specific time.",
    counterLabel: "Service Counter",
    counterLocation: "Exit 04 — Domestic Terminal",
    phoneLabel: "Call Us",
    phone: "+856 20 9201 4955",
  },
  lo: {
    eyebrow: "BKIA — ການບໍລິການ",
    title: "ແທັກຊີສະໜາມບິນ",
    subtitle:
      "ບໍລິການລົດແທັກຊີ ແລະ ລົດຕູ້ ລາຄາກຳນົດ ເຊື່ອມຕໍ່ສະໜາມບິນກັບຕົວເມືອງ ແລະ ຈຸດໝາຍໃກ້ຄຽງ.",
    features: [
      "ຄົນຂັບທີ່ໄດ້ຮັບໃບອະນຸຍາດ ແລະ ຜ່ານການຮັບຮອງ",
      "ບໍລິການຮັບ-ສົ່ງ ເຖິງຈຸດໝາຍໂດຍກົງ",
      "ສາມາດຈອງລ່ວງໜ້າໄດ້",
    ],
    faresLabel: "ລາຄາລີ່ມຕົ້ນ (ລາຄາກຳນົດ)",
    faresTitle: "ຈຸດໝາຍປາຍທາງ ແລະ ອັດຕາຄ່າໂດຍສານ",
    faresNote: "ລາຄາກຳນົດຕາມຈຸດໝາຍ. ກະລຸນາສອບຖາມລາຄາໂດຍກົງຢູ່ເຄົາເຕີ ກ່ອນເດີນທາງ.",
    startingFrom: "ລາຄາລີ່ມຕົ້ນ",
    destinations: [
      {
        key: "tonPheung",
        name: "ພາຍໃນເມືອງຕົ້ນເຜິ້ງ",
        detail: "ເຂດໃຈກາງເມືອງ",
        lak: PRICES.tonPheung.lak,
        cny: PRICES.tonPheung.cny,
      },
      {
        key: "goldenTriangle",
        name: "ເຂດເສດຖະກິດພິເສດສາມຫຼຽມຄຳ",
        detail: "ເຂດເສດຖະກິດພິເສດ",
        lak: PRICES.goldenTriangle.lak,
        cny: PRICES.goldenTriangle.cny,
      },
      {
        key: "huayXai",
        name: "ໄປຫ້ວຍຊາຍ",
        detail: "ສູນກາງແຂວງ",
        lak: PRICES.huayXai.lak,
        cny: PRICES.huayXai.cny,
      },
    ],
    vehiclesLabel: "ປະເພດລົດ",
    vehiclesTitle: "ເລືອກລົດທີ່ເໝາະສົມ",
    vehicles: [
      {
        key: "taxi",
        name: "ລົດເກັງ (Taxi)",
        desc: "ເໝາະສຳລັບຜູ້ໂດຍສານ 1–4 ທ່ານ ພ້ອມກະເປົ໋າທົ່ວໄປ.",
        capacity: "1–4 ທ່ານ",
        icon: "car" as const,
      },
      {
        key: "van",
        name: "ລົດຕູ້ (Van)",
        desc: "ສຳລັບຄອບຄົວ ຫຼື ກຸ່ມທີ່ຕ້ອງການຄວາມສະດວກ ແລະ ພື້ນທີ່ໃສ່ກະເປົ໋າ.",
        capacity: "5+ ທ່ານ",
        icon: "van" as const,
      },
    ],
    paymentLabel: "ຊ່ອງທາງການຊຳລະ",
    payments: [
      { label: "ເງິນສົດ", detail: "ກີບລາວ (LAK) · ຢວນຈີນ (CNY)" },
      { label: "ໂອນເງິນ", detail: "ແອັບທະນາຄານ — ທຸກທະນາຄານລາວ" },
    ],
    bookingLabel: "ຈອງລົດ",
    bookingTitle: "ຈອງລ່ວງໜ້າ",
    bookingDesc:
      "ໂທ ຫຼື ສົ່ງຂໍ້ຄວາມທາງ WhatsApp ເພື່ອນັດໝາຍເວລາຮັບ-ສົ່ງ.",
    counterLabel: "ຈຸດໃຫ້ບໍລິການ",
    counterLocation: "ປະຕູທາງອອກ 04 — ອາຄານພາຍໃນ",
    phoneLabel: "ໂທຫາພວກເຮົາ",
    phone: "+856 20 9201 4955",
  },
  zh: {
    eyebrow: "BKIA — 服务",
    title: "机场出租车",
    subtitle: "固定价格出租车与面包车服务，连接机场与市区及周边主要目的地。",
    features: [
      "持证上岗，安全认证司机",
      "提供门到门直达服务",
      "支持提前预约",
    ],
    faresLabel: "固定票价",
    faresTitle: "目的地与票价",
    faresNote: "票价按目的地固定。请出发前在服务台咨询。",
    startingFrom: "起价",
    destinations: [
      {
        key: "tonPheung",
        name: "顿丰市区",
        detail: "市中心区域",
        lak: PRICES.tonPheung.lak,
        cny: PRICES.tonPheung.cny,
      },
      {
        key: "goldenTriangle",
        name: "金三角经济特区",
        detail: "特别经济区",
        lak: PRICES.goldenTriangle.lak,
        cny: PRICES.goldenTriangle.cny,
      },
      {
        key: "huayXai",
        name: "会晒",
        detail: "省会城市",
        lak: PRICES.huayXai.lak,
        cny: PRICES.huayXai.cny,
      },
    ],
    vehiclesLabel: "车型选择",
    vehiclesTitle: "选择合适的车型",
    vehicles: [
      {
        key: "taxi",
        name: "出租车（轿车）",
        desc: "适合 1–4 名乘客携带标准行李。",
        capacity: "1–4 人",
        icon: "car" as const,
      },
      {
        key: "van",
        name: "商务面包车",
        desc: "适合家庭或团体，提供更宽敞的空间与行李位。",
        capacity: "5 人以上",
        icon: "van" as const,
      },
    ],
    paymentLabel: "支付方式",
    payments: [
      { label: "现金", detail: "老挝基普 (LAK) · 人民币 (CNY)" },
      { label: "银行转账", detail: "手机银行 — 支持所有老挝银行应用" },
    ],
    bookingLabel: "预约用车",
    bookingTitle: "提前预约",
    bookingDesc: "可通过电话或 WhatsApp 预约特定时间的接送服务。",
    counterLabel: "服务台",
    counterLocation: "04 号出口 — 国内航站楼",
    phoneLabel: "致电我们",
    phone: "+856 20 9201 4955",
  },
} as const;

// ── Component ─────────────────────────────────────────────────────────────────
export function TaxiContent({ lang }: { lang: Lang }) {
  const t = CONTENT[lang];

  const [heroRef,  heroInView]  = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [fareRef,  fareInView]  = useInView<HTMLDivElement>({ threshold: 0.05 });
  const [vehRef,   vehInView]   = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [ctaRef,   ctaInView]   = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <>
      <style>{`
        @keyframes tx-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tx-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tx-anim { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      {/* ── 1. Hero ───────────────────────────────────────────────────────────── */}
      <section className="bg-primary-700">
        <div
          ref={heroRef}
          className="container grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20"
        >
          {/* Left */}
          <div>
            <p
              className="tx-anim mb-3 text-[10px] font-extrabold uppercase tracking-[0.32em] text-primary-300"
              style={heroInView ? { animation: "tx-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
            >
              {t.eyebrow}
            </p>
            <h1
              className="tx-anim text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-5xl"
              style={heroInView ? { animation: "tx-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 80ms both" } : { opacity: 0 }}
            >
              {t.title}
            </h1>
            <p
              className="tx-anim mt-4 max-w-md text-sm leading-relaxed text-white/55 sm:text-base"
              style={heroInView ? { animation: "tx-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 160ms both" } : { opacity: 0 }}
            >
              {t.subtitle}
            </p>
            <div
              className="tx-anim mt-8 space-y-2.5"
              style={heroInView ? { animation: "tx-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) 260ms both" } : { opacity: 0 }}
            >
              {t.features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary-300" />
                  <span className="text-sm text-white/70">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: taxi counter photo */}
          <div
            className="tx-anim relative overflow-hidden rounded-2xl"
            style={heroInView ? { animation: "tx-fade-in 0.8s cubic-bezier(0.22,1,0.36,1) 100ms both" } : { opacity: 0 }}
          >
            <div className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
              <Car className="h-4 w-4 text-primary-300" />
            </div>
            <div className="relative aspect-[4/3]">
              <Image
                src="/taxi-counter.jpeg"
                alt={t.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/60 to-transparent px-5 py-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-primary-300" />
                <p className="text-xs font-semibold text-white/75">{t.counterLocation}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* ── 2. Fares ──────────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-14 sm:py-18">
        <div className="container">
          <div ref={fareRef}>
            <p
              className="tx-anim mb-1 text-[10px] font-extrabold uppercase tracking-[0.32em] text-primary"
              style={fareInView ? { animation: "tx-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
            >
              {t.faresLabel}
            </p>
            <h2
              className="tx-anim text-2xl font-bold text-primary-800 sm:text-3xl"
              style={fareInView ? { animation: "tx-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 70ms both" } : { opacity: 0 }}
            >
              {t.faresTitle}
            </h2>
            <p
              className="tx-anim mt-1.5 text-sm text-gray-400"
              style={fareInView ? { animation: "tx-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 140ms both" } : { opacity: 0 }}
            >
              {t.faresNote}
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {t.destinations.map((dest, i) => (
              <div
                key={dest.key}
                className="tx-anim flex flex-col rounded-2xl border border-primary/15 bg-white p-6 transition-shadow hover:shadow-md"
                style={fareInView ? { animation: `tx-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) ${220 + i * 100}ms both` } : { opacity: 0 }}
              >
                {/* Destination */}
                <div className="mb-5 flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold leading-snug text-primary-800">{dest.name}</p>
                    <p className="mt-0.5 text-xs text-gray-400">{dest.detail}</p>
                  </div>
                </div>

                <div className="mt-auto border-t border-gray-100 pt-4">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/50">
                    {t.startingFrom}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-primary">{dest.lak}</span>
                    <span className="text-sm font-bold text-primary/40">LAK</span>
                  </div>
                  {dest.cny !== "—" && (
                    <p className="mt-1 text-xs text-gray-400">≈ {dest.cny} CNY</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ── 3. Vehicles ───────────────────────────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-18">
        <div className="container">
          <div ref={vehRef}>
            <p
              className="tx-anim mb-1 text-[10px] font-extrabold uppercase tracking-[0.32em] text-primary"
              style={vehInView ? { animation: "tx-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
            >
              {t.vehiclesLabel}
            </p>
            <h2
              className="tx-anim text-2xl font-bold text-primary-800 sm:text-3xl"
              style={vehInView ? { animation: "tx-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 70ms both" } : { opacity: 0 }}
            >
              {t.vehiclesTitle}
            </h2>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {t.vehicles.map((v, i) => {
              const VIcon = v.icon === "car" ? Car : Bus;
              const isCar = v.icon === "car";
              return (
                <div
                  key={v.key}
                  className={`tx-anim flex items-start gap-5 rounded-2xl border p-6 ${
                    isCar ? "border-primary/15 bg-primary-50/40" : "border-amber-200 bg-amber-50/40"
                  }`}
                  style={vehInView ? { animation: `tx-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) ${180 + i * 120}ms both` } : { opacity: 0 }}
                >
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                    isCar ? "bg-primary/10" : "bg-amber-100"
                  }`}>
                    <VIcon className={`h-6 w-6 ${isCar ? "text-primary" : "text-amber-600"}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-bold text-primary-800">{v.name}</p>
                      <span className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold ${
                        isCar ? "bg-primary/8 text-primary" : "bg-amber-100 text-amber-700"
                      }`}>
                        <Users className="h-2.5 w-2.5" />
                        {v.capacity}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ── 4. Booking CTA ────────────────────────────────────────────────────── */}
      <section className="bg-primary-50 py-14 sm:py-16">
        <div ref={ctaRef} className="container grid gap-8 lg:grid-cols-2 lg:gap-12">

          {/* Payment methods */}
          <div
            className="tx-anim"
            style={ctaInView ? { animation: "tx-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
          >
            <p className="mb-5 text-[10px] font-extrabold uppercase tracking-[0.32em] text-primary">
              {t.paymentLabel}
            </p>
            <div className="space-y-3">
              {t.payments.map(({ label, detail }, i) => {
                const Icon = i === 0 ? Banknote : QrCode;
                return (
                  <div
                    key={label}
                    className={`flex items-start gap-4 rounded-xl border p-4 ${
                      i === 0 ? "border-emerald-100 bg-emerald-50" : "border-sky-100 bg-sky-50"
                    }`}
                  >
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      i === 0 ? "bg-emerald-100" : "bg-sky-100"
                    }`}>
                      <Icon className={`h-4 w-4 ${i === 0 ? "text-emerald-600" : "text-sky-600"}`} />
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

          {/* Booking */}
          <div
            className="tx-anim"
            style={ctaInView ? { animation: "tx-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 120ms both" } : { opacity: 0 }}
          >
            <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.32em] text-primary">
              {t.bookingLabel}
            </p>
            <h2 className="mb-1 text-xl font-bold text-primary-800 sm:text-2xl">
              {t.bookingTitle}
            </h2>
            <p className="mb-5 text-sm text-gray-400">{t.bookingDesc}</p>

            <div className="space-y-3">
              <a
                href={`tel:${t.phone.replace(/-/g, "")}`}
                className="flex items-center gap-4 rounded-xl border border-primary/20 bg-white px-5 py-4 transition-all hover:border-primary/40 hover:shadow-sm active:scale-[0.98]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/50">{t.phoneLabel}</p>
                  <p className="font-bold text-primary-800">{t.phone}</p>
                </div>
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
