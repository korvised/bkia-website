"use client";

import { Globe2 } from "lucide-react";
import type { Lang } from "@/types/language";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { tProfile } from "@/data/i18n/about/profile";

export function HistorySection({ lang }: { lang: Lang }) {
  const textAnim = useScrollAnimation({ threshold: 0.1 });
  const imgAnim = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <div
            ref={textAnim.ref}
            className={`transition-all duration-700 ${
              textAnim.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="text-sm font-bold uppercase tracking-widest text-[#00AAAC]">
                {tProfile("historyLabel", lang)}
              </span>
              <span className="rounded-md bg-[#e6f7f8] px-2 py-0.5 text-xs font-black tracking-widest text-[#00AAAC]">
                EST. 2021
              </span>
            </div>
            <h2 className="mb-6 text-3xl font-black leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Bokeo International<br />Airport Co., Ltd.
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-gray-600 sm:text-base">
              <p>{tProfile("historyPara1", lang)}</p>
              <p>{tProfile("historyPara2", lang)}</p>
              <p>{tProfile("historyPara3", lang)}</p>
            </div>
          </div>

          {/*
           * IMAGE GUIDE — History Section:
           * Replace the placeholder below with:
           *   <div className="relative aspect-[4/3] w-full">
           *     <Image src="/images/profile/terminal-exterior.jpg" alt="BKIA Terminal" fill className="object-cover" />
           *   </div>
           * Photo: front exterior of terminal, daytime, clear sky, from the arrival road.
           */}
          <div
            ref={imgAnim.ref}
            className={`relative overflow-hidden rounded-2xl shadow-xl transition-all duration-700 delay-200 ${
              imgAnim.isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="flex aspect-[4/3] w-full flex-col items-center justify-center bg-gradient-to-br from-[#d0f1f2] to-[#b2e8ea]">
              <div className="rounded-full bg-white/60 p-4">
                <Globe2 className="h-10 w-10 text-[#00AAAC]" />
              </div>
              <p className="mt-3 text-xs font-medium text-[#00AAAC]">Terminal Exterior Photo</p>
            </div>
            <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-[#00AAAC]/10" />
            <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-[#00AAAC]/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
