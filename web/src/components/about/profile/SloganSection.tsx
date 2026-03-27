"use client";

import { motion } from "motion/react";
import type { Lang } from "@/types/language";
import { tProfile } from "@/data/i18n/about/profile";

export function SloganSection({ lang }: { lang: Lang }) {
  return (
    <section className="bg-[#00AAAC] py-12 sm:py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="text-center"
        >
          {/* Label */}
          <p className="mb-4 text-xs font-bold tracking-widest text-white/60 uppercase">
            {tProfile("sloganLabel", lang)}
          </p>

          {/* Lao line — always shown */}
          <p className="font-lo text-2xl leading-snug font-black text-white sm:text-3xl lg:text-4xl">
            {tProfile("sloganLo", lang)}
          </p>

          {/* English line — always shown (bilingual motto) */}
          <p className="mt-2 text-base font-medium text-white/75 italic sm:text-lg">
            {tProfile("sloganEn", lang)}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
