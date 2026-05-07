"use client";

import { Search, PackageSearch, Phone } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import type { Lang } from "@/types/language";
import { t } from "./lost-found.constants";

interface LostFoundHowItWorksProps {
  lang: Lang;
}

export function LostFoundHowItWorks({ lang }: LostFoundHowItWorksProps) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 });

  const steps = [
    { n: "01", title: t("howStep1Title", lang), desc: t("howStep1Desc", lang), icon: Search       },
    { n: "02", title: t("howStep2Title", lang), desc: t("howStep2Desc", lang), icon: PackageSearch },
    { n: "03", title: t("howStep3Title", lang), desc: t("howStep3Desc", lang), icon: Phone        },
  ];

  return (
    <section ref={ref} className="bg-white py-14 md:py-20">
      <div className="container max-w-4xl">
        <p
          className={`mb-10 text-center text-xs font-semibold uppercase tracking-widest text-primary transition-all duration-500 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          {t("howItWorks", lang)}
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map(({ n, title, desc, icon: Icon }, i) => (
            <div
              key={n}
              className={`relative rounded-2xl border border-gray-100 bg-gray-50 p-6 transition-all duration-700 ${
                inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="select-none text-xl font-black text-gray-100">{n}</span>
              </div>
              <h3 className="mb-2 font-bold text-gray-900">{title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
