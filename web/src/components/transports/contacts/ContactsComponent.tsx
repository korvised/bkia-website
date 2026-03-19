"use client";

import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import type { Lang } from "@/types/language";
import { tContacts } from "@/data/i18n/transport/contacts";

interface Props {
  lang: Lang;
}

export function ContactsComponent({ lang }: Props) {
  const t = (k: Parameters<typeof tContacts>[0]) => tContacts(k, lang);

  const items = [
    {
      key: "info",
      title: t("infoTitle"),
      desc: t("infoDesc"),
      location: t("infoLocation"),
      hours: t("infoHours"),
      phone: "+856-84-212-000",
      whatsapp: null,
      bar: "bg-[#00AAAC]",
      btn: "bg-[#00AAAC] text-white hover:bg-[#009899]",
    },
    {
      key: "taxi",
      title: t("taxiTitle"),
      desc: t("taxiDesc"),
      location: t("taxiLocation"),
      hours: t("taxiHours"),
      phone: "+856-20-92014955",
      whatsapp: "8562092014955",
      bar: "bg-amber-500",
      btn: "bg-amber-500 text-white hover:bg-amber-600",
    },
    {
      key: "vip",
      title: t("vipTitle"),
      desc: t("vipDesc"),
      location: t("vipLocation"),
      hours: t("vipHours"),
      phone: "+856-84-212-030",
      whatsapp: null,
      bar: "bg-violet-500",
      btn: "bg-violet-500 text-white hover:bg-violet-600",
    },
    {
      key: "special",
      title: t("specialTitle"),
      desc: t("specialDesc"),
      location: t("specialLocation"),
      hours: t("specialHours"),
      phone: "+856-84-212-040",
      whatsapp: null,
      bar: "bg-sky-500",
      btn: "bg-sky-500 text-white hover:bg-sky-600",
    },
  ];

  return (
    <>
      {/* ── Header ─────────────────────────────────────────── */}
      <section className="bg-white py-10">
        <div className="container space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">{t("title")}</h1>
          <p className="max-w-2xl text-gray-500 lg:text-lg">{t("intro")}</p>
        </div>
      </section>

      {/* ── Service rows ───────────────────────────────────── */}
      <section className="bg-[#f0fbfc] py-4">
        <div className="container divide-y divide-[#d4f2f3]">
          {items.map(({ key, title, desc, location, hours, phone, whatsapp, bar, btn }) => (
            <div key={key} className="flex flex-col gap-4 py-8 sm:flex-row sm:items-start sm:gap-10">
              {/* Left color bar */}
              <div className={`h-1 w-10 shrink-0 rounded-full sm:mt-1.5 sm:h-14 sm:w-1 ${bar}`} />

              {/* Content */}
              <div className="flex-1 space-y-1.5">
                <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                <p className="text-sm text-gray-500">{desc}</p>
                <div className="flex flex-wrap gap-x-5 gap-y-1 pt-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-gray-300" />
                    {location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-gray-300" />
                    {hours}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                <a
                  href={`tel:${phone.replace(/[\s-]/g, "")}`}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${btn}`}
                >
                  <Phone className="h-4 w-4" />
                  {phone}
                </a>
                {whatsapp && (
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-[#b2e8ea] bg-white px-4 py-2.5 text-sm font-semibold text-[#00AAAC] transition-colors hover:bg-[#e6f7f8]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {t("whatsappLabel")}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
