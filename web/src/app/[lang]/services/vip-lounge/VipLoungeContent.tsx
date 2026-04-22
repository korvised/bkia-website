"use client";

import Image from "next/image";
import {
  Wifi,
  Wind,
  Coffee,
  UserCheck,
  VolumeX,
  Phone,
  Check,
  Star,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useInView } from "@/hooks/useInView";
import type { Lang } from "@/types/language";

// ── S3 image paths ────────────────────────────────────────────────────────────
const IMG = {
  gold:    "https://bkia-website.s3.ap-southeast-7.amazonaws.com/vip-lounge/gold.jpg",
  premium: "https://bkia-website.s3.ap-southeast-7.amazonaws.com/vip-lounge/premium.jpg",
  silver:  "https://bkia-website.s3.ap-southeast-7.amazonaws.com/vip-lounge/silver.jpg",
} as const;

// ── Slideshow images for the intro section ────────────────────────────────────
// Add or remove URLs here to control how many slides appear.
const ROOM_IMAGES = [
  "https://bkia-website.s3.ap-southeast-7.amazonaws.com/vip-lounge/room.jpg",
  "https://bkia-website.s3.ap-southeast-7.amazonaws.com/vip-lounge/room-2.jpg",
  "https://bkia-website.s3.ap-southeast-7.amazonaws.com/vip-lounge/room-3.jpg",
] as const;

// ── Amenity icon list (order matches per-lang label arrays) ───────────────────
const AMENITY_ICONS = [UserCheck, Wind, VolumeX, Coffee, Wifi] as const;

// ── Trilingual content ────────────────────────────────────────────────────────
const CONTENT = {
  en: {
    eyebrow: "BKIA — VIP Lounge",
    title: "Premium Lounge Experience",
    subtitle:
      "A private, serene space designed for passengers who value comfort and privacy before their flight.",
    amenitiesLabel: "Lounge Amenities",
    amenities: [
      { label: "Private Seating", desc: "Exclusive seating away from the main terminal" },
      { label: "Air Conditioned", desc: "Comfortable climate-controlled environment" },
      { label: "Quiet & Private", desc: "Calm atmosphere for rest and focus" },
      { label: "Snacks Available", desc: "Complimentary light refreshments served" },
      { label: "Free WiFi", desc: "High-speed wireless internet throughout" },
    ],
    packagesLabel: "Service Packages",
    packagesTitle: "Choose Your Experience",
    packagesNote: "All packages include lounge access, air conditioning, and free WiFi.",
    currency: "CNY",
    perPerson: "/ person",
    packages: [
      {
        key: "silver",
        name: "Silver Package",
        price: "159",
        image: IMG.silver,
        accent: "slate" as const,
        features: [
          "VIP lounge seating",
          "Light snacks",
          "Free WiFi",
          "Air conditioning",
        ],
      },
      {
        key: "premium",
        name: "Premium Package",
        price: "169",
        image: IMG.premium,
        accent: "teal" as const,
        features: [
          "Comfortable lounge seating",
          "Food & beverages",
          "Free WiFi",
          "Air conditioning",
        ],
      },
      {
        key: "gold",
        name: "Gold Package",
        price: "179",
        image: IMG.gold,
        accent: "gold" as const,
        featured: true,
        badge: "Best",
        features: [
          "Private seating area",
          "Premium food & beverages",
          "Boarding notification",
          "Free WiFi",
          "Newspapers & magazines",
        ],
      },
    ],
    contactLabel: "Reserve Your Stay",
    contactTitle: "Book the VIP Lounge",
    contactDesc:
      "Contact our team to reserve your lounge experience or to enquire about availability.",
    phoneLabel: "Lounge Reservations",
    phone: "+856 84 212 030",
  },
  lo: {
    eyebrow: "BKIA — ຫ້ອງ VIP",
    title: "ຫ້ອງຮັບຮອງພິເສດ",
    subtitle:
      "ສະຖານທີ່ສ່ວນຕົວ ງຽບສະຫງົບ ສຳລັບຜູ້ໂດຍສານທີ່ຕ້ອງການຄວາມສະດວກ ກ່ອນຂຶ້ນເຮືອບິນ.",
    amenitiesLabel: "ການບໍລິການ",
    amenities: [
      { label: "ທີ່ນັ່ງສ່ວນຕົວ", desc: "ຮອງຮັບຜູ້ໂດຍສານທີ່ຕ້ອງການຄວາມເປັນສ່ວນຕົວ" },
      { label: "ຫ້ອງແອເຢັນ", desc: "ສາຍບາຍ ຫ້ອງແອເຢັນ ຄວບຄຸມອຸນຫະພູມ" },
      { label: "ງຽບສະຫງົບ", desc: "ບັນຍາກາດສ່ວນຕົວ ງຽບສະຫງົບ" },
      { label: "ອາຫານວ່າງ", desc: "ມີອາຫານວ່າງ ໃຫ້ບໍລິການ" },
      { label: "WiFi ຟຣີ", desc: "ອິນເຕີເນັດໄຮ້ສາຍຄວາມໄວສູງ" },
    ],
    packagesLabel: "ລະດັບຄ່າບໍລິການ",
    packagesTitle: "ເລືອກແພັກເກດ",
    packagesNote: "ທຸກແພັກເກດລວມທີ່ນັ່ງ, ຫ້ອງແອ ແລະ WiFi ຟຣີ.",
    currency: "ຢວນ",
    perPerson: "/ ຄົນ",
    packages: [
      {
        key: "silver",
        name: "Silver Package",
        price: "159",
        image: IMG.silver,
        accent: "slate" as const,
        features: [
          "ທີ່ນັ່ງ VIP",
          "ອາຫານວ່າງ",
          "WiFi ຟຣີ",
          "ຫ້ອງແອ",
        ],
      },
      {
        key: "premium",
        name: "Premium Package",
        price: "169",
        image: IMG.premium,
        accent: "teal" as const,
        features: [
          "ທີ່ນັ່ງສະບາຍ",
          "ອາຫານ ແລະ ເຄື່ອງດື່ມ",
          "WiFi ຟຣີ",
          "ຫ້ອງແອ",
        ],
      },
      {
        key: "gold",
        name: "Gold Package",
        price: "179",
        image: IMG.gold,
        accent: "gold" as const,
        featured: true,
        badge: "ດີທີ່ສຸດ",
        features: [
          "ທີ່ນັ່ງສ່ວນຕົວ",
          "ອາຫານ ແລະ ເຄື່ອງດື່ມພິເສດ",
          "ແຈ້ງເຕືອນຂຶ້ນເຮືອ",
          "WiFi ຟຣີ",
          "ໜັງສືພິມ ແລະ ວາລະສານ",
        ],
      },
    ],
    contactLabel: "ຈອງຫ້ອງ VIP",
    contactTitle: "ຈອງຫ້ອງຮັບຮອງ",
    contactDesc: "ຕິດຕໍ່ທີມງານ ເພື່ອຈອງ ຫຼື ສອບຖາມຂໍ້ມູນ.",
    phoneLabel: "ສາຍໂທຈອງຫ້ອງ VIP",
    phone: "+856 84 212 030",
  },
  zh: {
    eyebrow: "BKIA — 贵宾休息室",
    title: "尊享候机体验",
    subtitle: "专为注重舒适与私密的旅客打造，宁静专属的候机空间。",
    amenitiesLabel: "休息室设施",
    amenities: [
      { label: "私密座位区", desc: "远离公共候机大厅的专属私密空间" },
      { label: "中央空调", desc: "舒适温控环境" },
      { label: "安静私密", desc: "宁静氛围，适合休息与工作" },
      { label: "餐饮服务", desc: "免费提供精选小食与饮品" },
      { label: "免费WiFi", desc: "高速无线网络全程覆盖" },
    ],
    packagesLabel: "服务套餐",
    packagesTitle: "选择您的专属体验",
    packagesNote: "所有套餐均包含休息室使用权、空调及免费WiFi。",
    currency: "人民币",
    perPerson: "/ 人",
    packages: [
      {
        key: "silver",
        name: "标准套餐",
        price: "159",
        image: IMG.silver,
        accent: "slate" as const,
        features: [
          "贵宾休息室座位",
          "精选小食",
          "免费WiFi",
          "中央空调",
        ],
      },
      {
        key: "premium",
        name: "高级套餐",
        price: "169",
        image: IMG.premium,
        accent: "teal" as const,
        features: [
          "舒适候机座位",
          "餐饮服务",
          "免费WiFi",
          "中央空调",
        ],
      },
      {
        key: "gold",
        name: "黄金套餐",
        price: "179",
        image: IMG.gold,
        accent: "gold" as const,
        featured: true,
        badge: "推荐",
        features: [
          "专属私人区域",
          "精选美食与饮品",
          "优先登机提醒",
          "免费WiFi",
          "报纸与杂志",
        ],
      },
    ],
    contactLabel: "预订贵宾室",
    contactTitle: "立即预订贵宾休息室",
    contactDesc: "联系我们的团队预订体验，或获取更多服务信息。",
    phoneLabel: "贵宾室预订热线",
    phone: "+856 84 212 030",
  },
} as const;

// ── Accent style map ──────────────────────────────────────────────────────────
const ACCENT = {
  slate: {
    badge: "bg-slate-100 text-slate-500",
    price: "text-slate-600",
    priceUnit: "text-slate-400",
    border: "border-slate-200",
    check: "text-slate-400",
    ring: "",
  },
  teal: {
    badge: "bg-primary-50 text-primary",
    price: "text-primary",
    priceUnit: "text-primary/50",
    border: "border-primary/25",
    check: "text-primary",
    ring: "",
  },
  gold: {
    badge: "bg-amber-50 text-amber-600",
    price: "text-amber-600",
    priceUnit: "text-amber-400",
    border: "border-amber-300",
    check: "text-amber-500",
    ring: "ring-2 ring-amber-200/60 ring-offset-2",
  },
} as const;

// ── Component ─────────────────────────────────────────────────────────────────
export function VipLoungeContent({ lang }: { lang: Lang }) {
  const t = CONTENT[lang];

  const [introRef, introInView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  // ── Room slideshow ──────────────────────────────────────────────────────────
  const [slide, setSlide] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (ROOM_IMAGES.length <= 1) return;
    timerRef.current = setInterval(() => setSlide((s) => (s + 1) % ROOM_IMAGES.length), 4500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);
  const [pkgRef, pkgInView] = useInView<HTMLDivElement>({ threshold: 0.05 });
  const [ctaRef, ctaInView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <>
      <style>{`
        @keyframes vip-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes vip-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vip-anim { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      {/* ── 1. Intro — dark navy split ──────────────────────────────────────── */}
      <section className="bg-primary-700">
        <div ref={introRef} className="container grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">

          {/* Left: text */}
          <div>
            <p
              className="vip-anim mb-3 text-[10px] font-extrabold uppercase tracking-[0.32em] text-primary-300"
              style={introInView ? { animation: "vip-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
            >
              {t.eyebrow}
            </p>
            <h1
              className="vip-anim text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-5xl"
              style={introInView ? { animation: "vip-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 80ms both" } : { opacity: 0 }}
            >
              {t.title}
            </h1>
            <p
              className="vip-anim mt-4 max-w-md text-sm leading-relaxed text-white/55 sm:text-base"
              style={introInView ? { animation: "vip-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 160ms both" } : { opacity: 0 }}
            >
              {t.subtitle}
            </p>

            {/* Amenities list */}
            <div
              className="vip-anim mt-8 space-y-3"
              style={introInView ? { animation: "vip-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) 260ms both" } : { opacity: 0 }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/30">
                {t.amenitiesLabel}
              </p>
              {t.amenities.map((a, i) => {
                const Icon = AMENITY_ICONS[i];
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/15">
                      <Icon className="h-3.5 w-3.5 text-primary-300" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white/90">{a.label}</span>
                      <span className="ml-2 text-xs text-white/35">{a.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: room slideshow */}
          <div
            className="vip-anim relative overflow-hidden rounded-2xl"
            style={introInView ? { animation: "vip-fade-in 0.8s cubic-bezier(0.22,1,0.36,1) 100ms both" } : { opacity: 0 }}
          >
            {/* Star badge */}
            <div className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            </div>

            {/* Crossfade slides */}
            <div className="relative aspect-[4/3]">
              {ROOM_IMAGES.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt="VIP Lounge"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-opacity duration-1000 ease-in-out"
                  style={{ opacity: i === slide ? 1 : 0 }}
                  priority={i === 0}
                />
              ))}
            </div>

            {/* Bottom strip: caption + dots */}
            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/60 to-transparent px-5 py-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-white/80">{t.eyebrow}</p>
                {ROOM_IMAGES.length > 1 && (
                  <div className="flex items-center gap-1.5">
                    {ROOM_IMAGES.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setSlide(i);
                          if (timerRef.current) clearInterval(timerRef.current);
                          timerRef.current = setInterval(() => setSlide((s) => (s + 1) % ROOM_IMAGES.length), 4500);
                        }}
                        aria-label={`Slide ${i + 1}`}
                        className={`h-0.5 rounded-full transition-all duration-300 ${i === slide ? "w-5 bg-white" : "w-1.5 bg-white/40"}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider accent ──────────────────────────────────────────────────── */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* ── 2. Packages ─────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-14 sm:py-18">
        <div className="container">
          {/* Header */}
          <div ref={pkgRef}>
            <p
              className="vip-anim mb-1 text-[10px] font-extrabold uppercase tracking-[0.32em] text-primary"
              style={pkgInView ? { animation: "vip-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
            >
              {t.packagesLabel}
            </p>
            <h2
              className="vip-anim text-2xl font-bold text-primary-800 sm:text-3xl"
              style={pkgInView ? { animation: "vip-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 70ms both" } : { opacity: 0 }}
            >
              {t.packagesTitle}
            </h2>
            <p
              className="vip-anim mt-1.5 text-sm text-gray-400"
              style={pkgInView ? { animation: "vip-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 140ms both" } : { opacity: 0 }}
            >
              {t.packagesNote}
            </p>
          </div>

          {/* Cards grid */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.packages.map((pkg, i) => {
              const ac = ACCENT[pkg.accent];
              const isFeatured = "featured" in pkg && pkg.featured;
              return (
                <div
                  key={pkg.key}
                  className={`vip-anim relative flex flex-col overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-lg ${ac.border} ${isFeatured ? ac.ring : ""}`}
                  style={pkgInView ? { animation: `vip-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) ${220 + i * 100}ms both` } : { opacity: 0 }}
                >
                  {/* Featured badge */}
                  {"badge" in pkg && pkg.badge && (
                    <div className="absolute right-3 top-3 z-10">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide shadow-sm ${ac.badge}`}>
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  {/* Package image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {/* Color overlay tint */}
                    <div
                      className={`absolute inset-0 opacity-[0.08] ${
                        pkg.accent === "gold"
                          ? "bg-amber-400"
                          : pkg.accent === "teal"
                          ? "bg-primary"
                          : "bg-slate-400"
                      }`}
                    />
                  </div>

                  {/* Card body */}
                  <div className="flex flex-1 flex-col p-5">
                    {/* Tier name */}
                    <p className={`mb-3 text-[11px] font-extrabold uppercase tracking-[0.22em] ${ac.price}`}>
                      {pkg.name}
                    </p>

                    {/* Price */}
                    <div className="mb-4 flex items-baseline gap-1.5">
                      <span className={`text-4xl font-black leading-none ${ac.price}`}>
                        {pkg.price}
                      </span>
                      <div className="flex flex-col">
                        <span className={`text-xs font-bold ${ac.priceUnit}`}>{t.currency}</span>
                        <span className={`text-[10px] ${ac.priceUnit}`}>{t.perPerson}</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className={`mb-4 h-px ${pkg.accent === "gold" ? "bg-amber-100" : pkg.accent === "teal" ? "bg-primary/10" : "bg-slate-100"}`} />

                    {/* Features */}
                    <ul className="flex-1 space-y-2">
                      {pkg.features.map((f, fi) => (
                        <li key={fi} className="flex items-start gap-2.5 text-sm text-gray-600">
                          <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${ac.check}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. Contact ──────────────────────────────────────────────────────── */}
      <section className="bg-primary-50 py-14 sm:py-16">
        <div ref={ctaRef} className="container">
          <div
            className="vip-anim mx-auto max-w-2xl text-center"
            style={ctaInView ? { animation: "vip-fade-up 0.65s cubic-bezier(0.22,1,0.36,1) 0ms both" } : { opacity: 0 }}
          >
            <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.32em] text-primary">
              {t.contactLabel}
            </p>
            <h2 className="text-2xl font-bold text-primary-800 sm:text-3xl">
              {t.contactTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              {t.contactDesc}
            </p>

            {/* Phone CTA */}
            <a
              href={`tel:${t.phone.replace(/\s/g, "")}`}
              className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary-50 px-7 py-4 transition-all duration-200 hover:border-primary/40 hover:bg-primary-100 active:scale-[0.98]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary">
                <Phone className="h-4 w-4 text-white" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary/50">
                  {t.phoneLabel}
                </p>
                <p className="text-lg font-bold tracking-wide text-primary-800">
                  {t.phone}
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
