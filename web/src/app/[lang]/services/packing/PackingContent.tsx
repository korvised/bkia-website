"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Package,
  Flame,
  Zap,
  Scissors,
  Apple,
  Bomb,
  ChevronRight,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";
import type { Lang } from "@/types/language";

// ── Slideshow images ──────────────────────────────────────────────────────────
// Edit this array to change/add images
const PACKING_IMAGES = [
  "https://bkia-website.s3.ap-southeast-7.amazonaws.com/services/packing/packing-1.jpg",
  "https://bkia-website.s3.ap-southeast-7.amazonaws.com/services/packing/packing-2.jpg",
] as const;

// ── Prohibited item icon list (order matches per-lang arrays) ─────────────────
const PROHIBITED_ICONS = [Flame, Bomb, Zap, Scissors, Apple] as const;

// ── Pricing sizes ─────────────────────────────────────────────────────────────
const SIZE_COLORS = [
  { bg: "bg-primary-50", border: "border-primary/20", label: "text-primary", price: "text-primary-800", icon: "bg-primary/10 text-primary" },
  { bg: "bg-amber-50",   border: "border-amber-200",  label: "text-amber-600", price: "text-amber-800",   icon: "bg-amber-100 text-amber-600" },
  { bg: "bg-primary-50", border: "border-primary/20", label: "text-primary",   price: "text-primary-800", icon: "bg-primary/10 text-primary" },
] as const;

// ── Trilingual content ────────────────────────────────────────────────────────
const CONTENT = {
  en: {
    eyebrow: "BKIA — Services",
    title: "Luggage Wrapping Service",
    subtitle:
      "Professional wrapping to keep your belongings safe and compliant throughout your journey.",
    benefits: [
      { label: "Scratch & Breakage Protection", desc: "Multi-layer wrap shields against impacts and abrasion during handling" },
      { label: "Luggage Security", desc: "Tamper-evident wrap deters unauthorized access to your bags" },
      { label: "Airline Regulation Compliant", desc: "Wrapping meets international aviation safety standards" },
      { label: "Bags, Fragile Items & Documents", desc: "Suitable for travel bags, fragile parcels, and document folders" },
    ],
    pricingLabel: "Pricing",
    pricingTitle: "Service Rates",
    pricingNote: "Prices are per item. Staff on site can advise on the appropriate size.",
    startingFrom: "Starting from",
    sizes: [
      { key: "small",  label: "Small",  sublabel: "Carry-on / hand luggage",      placeholder: "—" },
      { key: "medium", label: "Medium", sublabel: "Standard checked bag",          placeholder: "—" },
      { key: "large",  label: "Large",  sublabel: "Oversized / special items",     placeholder: "—" },
    ],
    prohibitedLabel: "Prohibited Items",
    prohibitedTitle: "Items We Cannot Wrap",
    prohibitedNote:
      "The following items may not be wrapped or carried as checked baggage. Please check full airline and customs regulations before packing.",
    prohibited: [
      { label: "Flammable / Chemicals / Gas",    desc: "Lighters, aerosols, compressed gas, paint, solvents" },
      { label: "Firearms & Explosives",          desc: "Weapons, ammunition, fireworks, blasting caps" },
      { label: "Batteries, Lighters & Phones",   desc: "Spare lithium batteries and power banks must travel in cabin" },
      { label: "Sharp Objects & Strong Magnets", desc: "Knives, scissors over 6 cm, industrial magnets" },
      { label: "Strong-Smelling Food",           desc: "Durian, mangosteen and other pungent foods are restricted" },
    ],
    readMoreLabel: "Full Baggage Regulations",
    locationLabel: "Find Us",
    locationTitle: "Service Location",
    locationBuilding: "Domestic Terminal",
    locationDesc:
      "Left of Departure Gate 04 — or directly in front of the Domestic Arrivals entrance.",
    locationNote: "Our staff are available during all operating hours.",
  },
  lo: {
    eyebrow: "BKIA — ການບໍລິການ",
    title: "ບໍລິການຫຸ້ມຫໍ່ພັດສະດຸ",
    subtitle:
      "ຫຸ້ມຫໍ່ພັດສະດຸດ້ວຍມືອາຊີບ ເພື່ອປ້ອງກັນສິ່ງຂອງຂອງທ່ານ ໃຫ້ປອດໄພ ຕະຫຼອດການເດີນທາງ.",
    benefits: [
      { label: "ປ້ອງກັນຮອຍຂີດ ແລະ ການແຕກຫັກ", desc: "ການຫຸ້ມຫໍ່ຫຼາຍຊັ້ນ ຊ່ວຍປ້ອງກັນການກະທົບ ໃນລະຫວ່າງການຂົນສົ່ງ" },
      { label: "ຮັກສາຄວາມປອດໄພຂອງກະເປົ໋າ", desc: "ຮູບແບບຫຸ້ມຫໍ່ທີ່ສັງເກດໄດ້ງ່າຍ ຫາກຖືກເປີດກ່ອນ ຮອດໂທ" },
      { label: "ສອດຄ່ອງກັບກົດລະບຽບສາຍການບິນ", desc: "ການຫຸ້ມຫໍ່ ໄດ້ຮັບການຮັບຮອງຕາມມາດຕະຖານສາກົນ" },
      { label: "ກະເປົ໋າ, ສິ່ງຂອງແຕກຫັກ ແລະ ເອກະສານ", desc: "ເໝາະສຳລັບກະເປົ໋າເດີນທາງ, ສິ່ງຂອງທີ່ແຕກຫັກງ່າຍ ແລະ ແຟ້ມເອກະສານ" },
    ],
    pricingLabel: "ອັດຕາຄ່າບໍລິການ",
    pricingTitle: "ລາຄາບໍລິການ",
    pricingNote: "ຄິດລາຄາຕໍ່ 1 ໃບ. ພະນັກງານໃນຈຸດ ສາມາດແນະນຳຂະໜາດທີ່ເໝາະສົມໄດ້.",
    startingFrom: "ເລີ່ມຕົ້ນ",
    sizes: [
      { key: "small",  label: "ຂະໜາດນ້ອຍ",  sublabel: "ພັດສະດຸຖືຂຶ້ນເຮືອ",           placeholder: "—" },
      { key: "medium", label: "ຂະໜາດກາງ",    sublabel: "ພັດສະດຸໃຫ້ຝາກ",              placeholder: "—" },
      { key: "large",  label: "ຂະໜາດໃຫຍ່",   sublabel: "ພັດສະດຸພິເສດ / ໃຫຍ່ກວ່າປົກກະຕິ", placeholder: "—" },
    ],
    prohibitedLabel: "ລາຍການຫ້າມ",
    prohibitedTitle: "ສິ່ງທີ່ບໍ່ສາມາດຫຸ້ມຫໍ່ໄດ້",
    prohibitedNote:
      "ລາຍການດ້ານລຸ່ມ ບໍ່ສາມາດຫຸ້ມຫໍ່ ຫຼື ຝາກເດີນທາງໄດ້. ກະລຸນາກວດສອບກົດລະບຽບສາຍການບິນ ກ່ອນຈັດກະເປົ໋າ.",
    prohibited: [
      { label: "ສິ່ງຕິດໄຟ / ເຄມີ / ແກ໊ສ",            desc: "ໄຟແຊັກ, ສະເປຣ, ແກ໊ສອັດ, ສີ, ນ້ຳຢາລ້າງ" },
      { label: "ອາວຸດ ແລະ ວັດຖຸລະເບີດ",               desc: "ອາວຸດ, ລູກໂດ່, ດອກໄໄ, ຈຸດຈ້ວງ" },
      { label: "ແບັດເຕີຣີ, ໄຟແຊັກ ແລະ ໂທລະສັບ",       desc: "ແບັດສຳຮອງ ແລະ ພາວເວີແບັງ ຕ້ອງຖືຂຶ້ນໂດຍສານ" },
      { label: "ຂອງມີຄົມ ແລະ ແມ່ເຫຼັກແຮງສູງ",         desc: "ມີດ, ກັນໄກ ຍາວກວ່າ 6 ຊມ, ແມ່ເຫຼັກໃຫຍ່" },
      { label: "ອາຫານທີ່ມີກິ່ນແຮງ",                   desc: "ທຸລຽນ, ມັງຄຸດ ແລະ ອາຫານທີ່ມີກິ່ນຮຸນແຮງ ຖືກຈຳກັດ" },
    ],
    readMoreLabel: "ກົດລະບຽບກ່ຽວກັບກະເປົ໋າທັງໝົດ",
    locationLabel: "ສະຖານທີ່ໃຫ້ບໍລິການ",
    locationTitle: "ຈຸດໃຫ້ບໍລິການ",
    locationBuilding: "ອາຄານສາຍພາຍໃນປະເທດ",
    locationDesc:
      "ຂ້າງເບື້ອງຊ້າຍຂອງປະຕູທາງອອກ 04 — ຫຼື ໜ້າປະຕູຂາເຂົ້າສາຍພາຍໃນປະເທດ.",
    locationNote: "ພະນັກງານໃຫ້ບໍລິການຕະຫຼອດເວລາທຳການ.",
  },
  zh: {
    eyebrow: "BKIA — 服务",
    title: "行李打包裹膜服务",
    subtitle: "专业裹膜保护，确保行李在整个旅途中安全合规。",
    benefits: [
      { label: "防划伤与防破损", desc: "多层裹膜有效抵御搬运过程中的撞击与磨损" },
      { label: "行李安全保障", desc: "防拆封裹膜，一旦被打开即可察觉，保障您的行李安全" },
      { label: "符合航空法规", desc: "裹膜服务符合国际航空安全标准" },
      { label: "适用于行李箱、易碎品及文件", desc: "适合旅行行李、易碎包裹及文件夹的保护裹膜" },
    ],
    pricingLabel: "收费标准",
    pricingTitle: "服务价格",
    pricingNote: "按件收费。现场工作人员可协助判断合适的尺寸。",
    startingFrom: "起价",
    sizes: [
      { key: "small",  label: "小件",  sublabel: "随身行李 / 手提包",   placeholder: "—" },
      { key: "medium", label: "中件",  sublabel: "标准托运行李箱",       placeholder: "—" },
      { key: "large",  label: "大件",  sublabel: "超大件 / 特殊物品",    placeholder: "—" },
    ],
    prohibitedLabel: "禁止物品",
    prohibitedTitle: "不可裹膜物品",
    prohibitedNote:
      "以下物品不可进行裹膜或作为托运行李运输。请在打包前仔细核对航空公司及海关相关规定。",
    prohibited: [
      { label: "易燃物 / 化学品 / 气体",   desc: "打火机、喷雾剂、压缩气体、油漆、溶剂" },
      { label: "枪支与爆炸物",             desc: "武器、弹药、烟花、雷管" },
      { label: "电池、打火机与手机",        desc: "备用锂电池和充电宝须随身携带" },
      { label: "利器与强磁性物品",          desc: "刀具、超过6厘米的剪刀、工业磁铁" },
      { label: "气味浓烈的食品",            desc: "榴莲、山竹等气味强烈的水果受到限制" },
    ],
    readMoreLabel: "查看完整行李规定",
    locationLabel: "服务地点",
    locationTitle: "服务位置",
    locationBuilding: "国内航站楼",
    locationDesc: "位于04号出发闸口左侧，或国内到达入口正前方。",
    locationNote: "工作人员在所有运营时间内均在岗服务。",
  },
} as const;

// ── Component ─────────────────────────────────────────────────────────────────
export function PackingContent({ lang }: { lang: Lang }) {
  const t = CONTENT[lang];

  const [heroRef,     heroInView]     = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [priceRef,    priceInView]    = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [prohibRef,   prohibInView]   = useInView<HTMLDivElement>({ threshold: 0.05 });
  const [locationRef, locationInView] = useInView<HTMLDivElement>({ threshold: 0.15 });

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
        @media (prefers-reduced-motion: reduce) {
          .pk-anim { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      {/* ── 1. Hero — dark split ──────────────────────────────────────────────── */}
      <section className="bg-primary-700">
        <div
          ref={heroRef}
          className="container grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20"
        >
          {/* Left: text + benefits */}
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

            {/* Benefits */}
            <div
              className="pk-anim mt-8 space-y-3"
              style={heroInView ? { animation: "pk-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) 260ms both" } : { opacity: 0 }}
            >
              {t.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/15">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary-300" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white/90">{b.label}</span>
                    <span className="ml-2 text-xs text-white/35">{b.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image */}
          <div
            className="pk-anim relative overflow-hidden rounded-2xl"
            style={heroInView ? { animation: "pk-fade-in 0.8s cubic-bezier(0.22,1,0.36,1) 100ms both" } : { opacity: 0 }}
          >
            {/* Shield badge */}
            <div className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
              <Shield className="h-4 w-4 text-primary-300" />
            </div>

            <div className="relative aspect-[4/3]">
              {PACKING_IMAGES.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt="Luggage wrapping service"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority={i === 0}
                  style={{ opacity: i === 0 ? 1 : 0 }}
                />
              ))}
            </div>

            {/* Bottom label strip */}
            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/60 to-transparent px-5 py-4">
              <p className="text-xs font-semibold text-white/80">{t.eyebrow}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* ── 2. Pricing ───────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-14 sm:py-18">
        <div className="container">
          <div ref={priceRef}>
            <p
              className="pk-anim mb-1 text-[10px] font-extrabold uppercase tracking-[0.32em] text-primary"
              style={priceInView ? { animation: "pk-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
            >
              {t.pricingLabel}
            </p>
            <h2
              className="pk-anim text-2xl font-bold text-primary-800 sm:text-3xl"
              style={priceInView ? { animation: "pk-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 70ms both" } : { opacity: 0 }}
            >
              {t.pricingTitle}
            </h2>
            <p
              className="pk-anim mt-1.5 text-sm text-gray-400"
              style={priceInView ? { animation: "pk-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 140ms both" } : { opacity: 0 }}
            >
              {t.pricingNote}
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {t.sizes.map((sz, i) => {
              const c = SIZE_COLORS[i];
              return (
                <div
                  key={sz.key}
                  className={`pk-anim flex flex-col items-center rounded-2xl border ${c.bg} ${c.border} px-6 py-8 text-center transition-shadow hover:shadow-md`}
                  style={priceInView ? { animation: `pk-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) ${220 + i * 100}ms both` } : { opacity: 0 }}
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${c.icon}`}>
                    <Package className="h-6 w-6" />
                  </div>
                  <p className={`text-xs font-extrabold uppercase tracking-[0.22em] ${c.label}`}>
                    {sz.label}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">{sz.sublabel}</p>
                  <div className="my-4 h-px w-10 bg-current opacity-10" />
                  <p className="text-xs text-gray-400">{t.startingFrom}</p>
                  <p className={`mt-0.5 text-3xl font-black ${c.price}`}>{sz.placeholder}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ── 3. Prohibited items ──────────────────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-18">
        <div className="container">
          <div ref={prohibRef}>
            <p
              className="pk-anim mb-1 text-[10px] font-extrabold uppercase tracking-[0.32em] text-amber-500"
              style={prohibInView ? { animation: "pk-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
            >
              {t.prohibitedLabel}
            </p>
            <h2
              className="pk-anim text-2xl font-bold text-gray-900 sm:text-3xl"
              style={prohibInView ? { animation: "pk-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 70ms both" } : { opacity: 0 }}
            >
              {t.prohibitedTitle}
            </h2>
            <p
              className="pk-anim mt-2 max-w-2xl text-sm leading-relaxed text-gray-400"
              style={prohibInView ? { animation: "pk-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 140ms both" } : { opacity: 0 }}
            >
              {t.prohibitedNote}
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.prohibited.map((item, i) => {
              const Icon = PROHIBITED_ICONS[i];
              return (
                <div
                  key={i}
                  className="pk-anim flex items-start gap-4 rounded-xl border border-amber-100 bg-amber-50 p-4 transition-shadow hover:shadow-sm"
                  style={prohibInView ? { animation: `pk-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) ${200 + i * 70}ms both` } : { opacity: 0 }}
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100">
                    <Icon className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-amber-800">{item.label}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-amber-600/70">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Read more link */}
          <div
            className="pk-anim mt-6 flex items-center gap-2"
            style={prohibInView ? { animation: "pk-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 600ms both" } : { opacity: 0 }}
          >
            <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
            <Link
              href={`/${lang}/guides/departures?tab=baggage`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 underline-offset-2 hover:underline"
            >
              {t.readMoreLabel}
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ── 4. Location ──────────────────────────────────────────────────────── */}
      <section className="bg-primary-50 py-14 sm:py-16">
        <div ref={locationRef} className="container">
          <div
            className="pk-anim mx-auto max-w-2xl"
            style={locationInView ? { animation: "pk-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
          >
            <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.32em] text-primary">
              {t.locationLabel}
            </p>
            <h2 className="text-2xl font-bold text-primary-800 sm:text-3xl">
              {t.locationTitle}
            </h2>

            <div className="mt-6 flex items-start gap-4 rounded-2xl border border-primary/15 bg-white px-6 py-5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-primary-800">{t.locationBuilding}</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">{t.locationDesc}</p>
                <p className="mt-2 text-xs text-primary/60">{t.locationNote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
