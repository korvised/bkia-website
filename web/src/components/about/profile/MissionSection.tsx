"use client";

import { Globe2, Shield, Users, Leaf } from "lucide-react";
import type { Lang } from "@/types/language";
import { useScrollAnimation, useScrollAnimationBatch } from "@/hooks/useScrollAnimation";
import { tProfile } from "@/data/i18n/about/profile";

const MISSIONS = (lang: Lang) => [
  {
    Icon: Globe2,
    title: tProfile("missionConnectTitle", lang),
    text: tProfile("missionConnectText", lang),
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
  },
  {
    Icon: Shield,
    title: tProfile("missionSafetyTitle", lang),
    text: tProfile("missionSafetyText", lang),
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
  {
    Icon: Users,
    title: tProfile("missionServiceTitle", lang),
    text: tProfile("missionServiceText", lang),
    iconBg: "bg-[#e6f7f8]",
    iconColor: "text-[#00AAAC]",
  },
  {
    Icon: Leaf,
    title: tProfile("missionGreenTitle", lang),
    text: tProfile("missionGreenText", lang),
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
];

export function MissionSection({ lang }: { lang: Lang }) {
  const missions = MISSIONS(lang);
  const titleAnim = useScrollAnimation({ threshold: 0.2 });
  const { setRef, visibleItems } = useScrollAnimationBatch(missions.length, { threshold: 0.15 });

  return (
    <section className="bg-[#f5fbfc] py-16 sm:py-20">
      <div className="container">
        <div
          ref={titleAnim.ref}
          className={`mb-12 text-center transition-all duration-700 ${
            titleAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="mb-2 inline-block text-sm font-bold uppercase tracking-widest text-[#00AAAC]">
            {tProfile("missionLabel", lang)}
          </span>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {tProfile("missionSubtitle", lang)}
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {missions.map(({ Icon, title, text, iconBg, iconColor }, i) => (
            <div
              key={title}
              ref={setRef(i)}
              className={`group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200/80 transition-all duration-700 hover:-translate-y-1 hover:shadow-md ${
                visibleItems.has(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: visibleItems.has(i) ? `${i * 100}ms` : "0ms" }}
            >
              <div className={`mb-4 inline-flex rounded-xl p-3 ${iconBg}`}>
                <Icon className={`h-6 w-6 ${iconColor}`} />
              </div>
              <h3 className="mb-2 text-base font-bold text-gray-900 sm:text-lg">{title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
