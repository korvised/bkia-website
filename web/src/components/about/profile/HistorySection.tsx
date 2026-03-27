"use client";

import { motion } from "motion/react";
import { Globe2 } from "lucide-react";
import type { Lang } from "@/types/language";
import { tProfile } from "@/data/i18n/about/profile";

export function HistorySection({ lang }: { lang: Lang }) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          >
            {/* Section label + EST badge */}
            <div className="mb-3 flex items-center gap-3">
              <span className="text-sm font-bold uppercase tracking-widest text-[#00AAAC]">
                {tProfile("historyLabel", lang)}
              </span>
              <span className="rounded-md bg-[#e6f7f8] px-2 py-0.5 text-xs font-black tracking-widest text-[#00AAAC]">
                {tProfile("historyEstBadge", lang)}
              </span>
            </div>

            {/* Heading — company name in the user's language */}
            <h2 className="mb-6 text-2xl font-black leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
              {tProfile("historyHeading", lang)}
            </h2>

            {/* Body paragraphs */}
            <div className="space-y-4 text-sm leading-relaxed text-gray-600 sm:text-base">
              <p>{tProfile("historyPara1", lang)}</p>
              <p>{tProfile("historyPara2", lang)}</p>
            </div>
          </motion.div>

          {/*
           * IMAGE GUIDE — History Section:
           * Replace placeholder with:
           *   <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
           *     <Image src="/images/profile/terminal-exterior.jpg" alt="BKIA Terminal" fill className="object-cover" />
           *   </div>
           * Suggested shot: terminal front exterior, daytime, clear sky.
           */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
            className="relative overflow-hidden rounded-2xl"
          >
            <div className="flex aspect-[4/3] w-full flex-col items-center justify-center bg-gradient-to-br from-[#d0f1f2] to-[#b2e8ea]">
              <div className="rounded-full bg-white/60 p-4">
                <Globe2 className="h-10 w-10 text-[#00AAAC]" />
              </div>
              <p className="mt-3 text-xs font-medium text-[#00AAAC]/70">
                Terminal Exterior Photo
              </p>
            </div>
            <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-[#00AAAC]/10" />
            <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-[#00AAAC]/10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
