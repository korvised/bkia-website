"use client";

import { motion } from "motion/react";
import type { Lang } from "@/types/language";
import { tProfile } from "@/data/i18n/about/profile";

// T·E·A·M — each letter gets its own colour identity
const TEAM_LETTERS = [
  { letter: "T", wordKey: "valuesTWord" as const, bg: "bg-[#00AAAC]", light: "bg-[#e6f7f8]", text: "text-[#00AAAC]" },
  { letter: "E", wordKey: "valuesEWord" as const, bg: "bg-violet-500",  light: "bg-violet-50",  text: "text-violet-600" },
  { letter: "A", wordKey: "valuesAWord" as const, bg: "bg-amber-500",   light: "bg-amber-50",   text: "text-amber-600" },
  { letter: "M", wordKey: "valuesMWord" as const, bg: "bg-emerald-500", light: "bg-emerald-50", text: "text-emerald-600" },
];

const VISION_POINTS = [
  { num: "01", key: "visionPoint1" as const },
  { num: "02", key: "visionPoint2" as const },
];

export function VisionSection({ lang }: { lang: Lang }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f0fbfc] via-[#e6f7f8] to-[#d4f2f3] py-20 sm:py-28">
      {/* Dot-grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle,#00AAAC_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="container relative">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="mb-10 text-center text-sm font-bold uppercase tracking-widest text-[#00AAAC]"
        >
          {tProfile("visionLabel", lang)}
        </motion.p>

        {/* T·E·A·M tiles + words */}
        <div className="mb-4 flex flex-wrap justify-center gap-3 sm:gap-4">
          {TEAM_LETTERS.map(({ letter, wordKey, bg, light, text }, i) => (
            <motion.div
              key={letter}
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: 0.1 + i * 0.09,
                type: "spring",
                stiffness: 280,
                damping: 18,
              }}
              className="flex w-24 flex-col items-center gap-2 sm:w-28"
            >
              {/* Big coloured letter tile */}
              <div className={`flex h-16 w-16 items-center justify-center rounded-2xl sm:h-20 sm:w-20 ${bg}`}>
                <span className="text-4xl font-black text-white sm:text-5xl">{letter}</span>
              </div>
              {/* Word labels: English always on top, local lang below (hidden when EN) */}
              <div className="flex flex-col items-center gap-0.5 text-center">
                <span className={`text-xs font-bold ${text}`}>
                  {tProfile(wordKey, "en")}
                </span>
                {lang !== "en" && (
                  <span className="text-xs font-medium text-[#00AAAC]/70">
                    {tProfile(wordKey, lang)}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mb-14" />

        {/* Vision points */}
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          {VISION_POINTS.map(({ num, key }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.55 + i * 0.12, ease: [0.25, 1, 0.5, 1] }}
              className="flex gap-4 rounded-2xl bg-white/70 p-5 backdrop-blur-sm"
            >
              {/* Number badge */}
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#00AAAC] text-sm font-black text-white">
                {num}
              </span>
              <p className="text-sm leading-relaxed text-[#003d3e] sm:text-base">
                {tProfile(key, lang)}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
