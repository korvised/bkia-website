"use client";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Info,
  Car,
  Star,
  Accessibility,
  ChevronRight,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";
import type { Lang } from "@/types/language";
import { tContacts } from "@/data/i18n/about/contact";
import { tFooter } from "@/data/i18n/layout/footer";

// ── Constants ──────────────────────────────────────────────────────────────

const MAIN_PHONE = "+856 84 260 179";
const MAIN_EMAIL = "info@bokeointernationalairport.com";
const TAXI_PHONE = "+856 20 92 014 955";
const VIP_PHONE  = "+856 84 212 030";

function t(key: Parameters<typeof tContacts>[0], lang: Lang) {
  return tContacts(key, lang);
}

function dialHref(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}

// ── ServiceCard ────────────────────────────────────────────────────────────

function ServiceCard({
  icon: Icon,
  color,
  title,
  desc,
  location,
  hours,
  phone,
  callLabel,
  index,
  visible,
}: {
  icon: React.ElementType;
  color: { bg: string; text: string; btn: string; hover: string };
  title: string;
  desc: string;
  location: string;
  hours: string;
  phone: string;
  callLabel: string;
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className={`flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${color.bg}`}>
        <Icon className={`h-5 w-5 ${color.text}`} />
      </div>
      <h3 className="mb-1 font-bold text-gray-900">{title}</h3>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-500">{desc}</p>
      <div className="mb-5 space-y-1.5 border-t border-gray-50 pt-4">
        <span className="flex items-start gap-2 text-xs text-gray-400">
          <MapPin className="mt-px h-3.5 w-3.5 shrink-0" />
          {location}
        </span>
        <span className="flex items-center gap-2 text-xs text-gray-400">
          <Clock className="h-3.5 w-3.5 shrink-0" />
          {hours}
        </span>
      </div>
      <a
        href={dialHref(phone)}
        className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white transition-all ${color.btn} ${color.hover}`}
      >
        <Phone className="h-4 w-4" />
        {callLabel} {phone}
      </a>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export function ContactContent({ lang }: Props) {
  const [servicesRef, servicesIn] = useInView<HTMLElement>({ threshold: 0.05 });

  const desks = [
    {
      icon:     Info,
      color:    { bg: "bg-primary/10",  text: "text-primary",    btn: "bg-primary",    hover: "hover:bg-primary-600" },
      title:    t("infoTitle",    lang),
      desc:     t("infoDesc",     lang),
      location: t("infoLocation", lang),
      hours:    t("infoHours",    lang),
      phone:    MAIN_PHONE,
    },
    {
      icon:     Car,
      color:    { bg: "bg-amber-50",   text: "text-amber-600",  btn: "bg-amber-500",  hover: "hover:bg-amber-600"   },
      title:    t("taxiTitle",    lang),
      desc:     t("taxiDesc",     lang),
      location: t("taxiLocation", lang),
      hours:    t("taxiHours",    lang),
      phone:    TAXI_PHONE,
    },
    {
      icon:     Star,
      color:    { bg: "bg-violet-50",  text: "text-violet-600", btn: "bg-violet-500", hover: "hover:bg-violet-600"  },
      title:    t("vipTitle",    lang),
      desc:     t("vipDesc",     lang),
      location: t("vipLocation", lang),
      hours:    t("vipHours",    lang),
      phone:    VIP_PHONE,
    },
    {
      icon:     Accessibility,
      color:    { bg: "bg-sky-50",     text: "text-sky-600",    btn: "bg-sky-500",    hover: "hover:bg-sky-600"     },
      title:    t("specialTitle",    lang),
      desc:     t("specialDesc",     lang),
      location: t("specialLocation", lang),
      hours:    t("specialHours",    lang),
      phone:    MAIN_PHONE,
    },
  ];

  return (
    <>
      <style>{`
        @keyframes ct-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ct-up { animation: ct-up 0.6s cubic-bezier(0.22,1,0.36,1) both; }
        .ct-d1 { animation-delay: 0.07s; }
        .ct-d2 { animation-delay: 0.17s; }
        .ct-d3 { animation-delay: 0.27s; }
        .ct-d4 { animation-delay: 0.37s; }
        @media (prefers-reduced-motion: reduce) {
          .ct-up { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      {/* ── Hero — split layout ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary-800">
        {/* Subtle decorative rings */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full border border-white/[0.04]" />
          <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full border border-white/[0.04]" />
        </div>

        <div className="container relative grid gap-10 py-16 lg:grid-cols-[1fr_340px] lg:items-start lg:py-24 xl:grid-cols-[1fr_380px]">

          {/* ── Left: title block ── */}
          <div className="self-center">
            <p className="ct-up ct-d1 mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/75">
              {t("heroLabel", lang)}
            </p>
            <h1 className="ct-up ct-d2 mb-4 text-4xl font-bold leading-tight text-white md:text-5xl">
              {t("heroTitle", lang)}
            </h1>
            <p className="ct-up ct-d3 max-w-md text-base leading-relaxed text-white/60">
              {t("heroSubtitle", lang)}
            </p>

            {/* Location + hours pill row */}
            <div className="ct-up ct-d4 mt-8 flex flex-wrap gap-3">
              <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-white/60">
                <MapPin className="h-3.5 w-3.5 text-primary-300" />
                {tFooter("address", lang)}
              </span>
              <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-white/60">
                <Clock className="h-3.5 w-3.5 text-primary-300" />
                {tFooter("operatingHours", lang)}
              </span>
            </div>
          </div>

          {/* ── Right: contact panel ── */}
          <div className="ct-up ct-d3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] backdrop-blur-sm">

            {/* Phone row */}
            <a
              href={dialHref(MAIN_PHONE)}
              className="group flex items-center gap-4 border-b border-white/10 px-5 py-5 transition-colors hover:bg-white/10"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                <Phone className="h-4.5 w-4.5 h-[18px] w-[18px]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
                  {t("phoneCardTitle", lang)}
                </p>
                <p className="mt-0.5 text-base font-bold text-white">{MAIN_PHONE}</p>
                <p className="text-xs text-white/40">{t("phoneCardSub", lang)}</p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-white/25 transition-transform group-hover:translate-x-0.5 group-hover:text-white/50" />
            </a>

            {/* Email row */}
            <a
              href={`mailto:${MAIN_EMAIL}`}
              className="group flex items-center gap-4 border-b border-white/10 px-5 py-5 transition-colors hover:bg-white/10"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                <Mail className="h-[18px] w-[18px]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
                  {t("emailCardTitle", lang)}
                </p>
                <p className="mt-0.5 break-all text-sm font-bold text-white">{MAIN_EMAIL}</p>
                <p className="text-xs text-white/40">{t("emailCardSub", lang)}</p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-white/25 transition-transform group-hover:translate-x-0.5 group-hover:text-white/50" />
            </a>

            {/* Static location row */}
            <div className="flex items-center gap-4 px-5 py-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white/60">
                <MapPin className="h-[18px] w-[18px]" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
                  {t("locationCardTitle", lang)}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-white">{tFooter("address", lang)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service desks ─────────────────────────────────────────────── */}
      <section ref={servicesRef} className="bg-gray-50 py-14 md:py-20">
        <div className="container">
          {/* Header */}
          <div className={`mb-10 transition-all duration-700 ${servicesIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
              {t("servicesTitle", lang)}
            </p>
            <p className="text-sm text-gray-500">{t("servicesSubtitle", lang)}</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {desks.map((desk, i) => (
              <ServiceCard
                key={desk.title}
                index={i}
                visible={servicesIn}
                callLabel={t("callLabel", lang)}
                {...desk}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

interface Props { lang: Lang; }
