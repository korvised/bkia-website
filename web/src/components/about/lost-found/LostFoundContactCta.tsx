"use client";

import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import type { Lang } from "@/types/language";
import { t } from "./lost-found.constants";

interface LostFoundContactCtaProps {
  lang: Lang;
}

export function LostFoundContactCta({ lang }: LostFoundContactCtaProps) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="bg-primary-50 py-14 md:py-20">
      <div
        className={`container max-w-3xl text-center transition-all duration-700 ${
          inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
          {t("stillNeedHelp", lang)}
        </h2>
        <p className="mb-10 text-gray-500">{t("ctaSubtitle", lang)}</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="tel:+85684260179"
            className="group flex items-center gap-4 rounded-2xl border border-primary/20 bg-white px-6 py-5 text-left transition-all hover:border-primary/40 hover:shadow-md hover:shadow-primary/10"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <Phone className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-400">{t("callUs", lang)}</p>
              <p className="truncate font-semibold text-gray-900">+856 84 260 179</p>
            </div>
          </Link>

          <Link
            href="mailto:info@bokeointernationalairport.com"
            className="group flex items-center gap-4 rounded-2xl border border-primary/20 bg-white px-6 py-5 text-left transition-all hover:border-primary/40 hover:shadow-md hover:shadow-primary/10"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <Mail className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-400">{t("emailUs", lang)}</p>
              <p className="truncate font-semibold text-gray-900">info@bokeointernationalairport.com</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
