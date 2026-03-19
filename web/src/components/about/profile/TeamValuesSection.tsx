"use client";

import { motion } from "motion/react";
import type { Lang } from "@/types/language";
import { tProfile } from "@/data/i18n/about/profile";

// English words spell T·E·A·M
const EN_WORDS = ["Trust", "Excellence", "Accountability", "Mindfulness"] as const;

const TEAM_VALUES = (lang: Lang) => [
  {
    letter: "T",
    word: tProfile("valuesTrustWord", lang),
    text: tProfile("valuesTrustText", lang),
    color: "from-[#00AAAC] to-[#009EA0]",
    bg: "bg-[#00AAAC]",
    textColor: "text-[#00AAAC]",
    bgLight: "bg-[#e6f7f8]",
  },
  {
    letter: "E",
    word: tProfile("valuesExcellenceWord", lang),
    text: tProfile("valuesExcellenceText", lang),
    color: "from-violet-500 to-violet-600",
    bg: "bg-violet-500",
    textColor: "text-violet-600",
    bgLight: "bg-violet-50",
  },
  {
    letter: "A",
    word: tProfile("valuesAccountabilityWord", lang),
    text: tProfile("valuesAccountabilityText", lang),
    color: "from-amber-500 to-amber-600",
    bg: "bg-amber-500",
    textColor: "text-amber-600",
    bgLight: "bg-amber-50",
  },
  {
    letter: "M",
    word: tProfile("valuesMindfulnessWord", lang),
    text: tProfile("valuesMindfulnessText", lang),
    color: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-500",
    textColor: "text-emerald-600",
    bgLight: "bg-emerald-50",
  },
];

export function TeamValuesSection({ lang }: { lang: Lang }) {
  const values = TEAM_VALUES(lang);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="mb-12 text-center"
        >
          <span className="mb-2 inline-block text-sm font-bold uppercase tracking-widest text-[#00AAAC]">
            {tProfile("valuesLabel", lang)}
          </span>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {tProfile("valuesSubtitle", lang)}
          </h2>

          {/* T·E·A·M letter tiles — staggered pop-in */}
          <div className="mt-5 flex justify-center gap-1.5">
            {values.map(({ letter, bg }, i) => (
              <motion.span
                key={letter}
                initial={{ opacity: 0, scale: 0.5, y: 12 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + i * 0.08,
                  type: "spring",
                  stiffness: 300,
                  damping: 18,
                }}
                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl font-black text-white shadow-sm ${bg}`}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Value cards — staggered reveal */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ letter, word, text, color, textColor, bgLight }, i) => (
            <motion.div
              key={letter + word}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/80"
            >
              {/* Colored top strip */}
              <div className={`h-2 w-full bg-gradient-to-r ${color}`} />

              <div className="p-6">
                {/* Letter tile */}
                <div className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${bgLight}`}>
                  <span className={`text-4xl font-black ${textColor}`}>{letter}</span>
                </div>

                {/* Word — bilingual when not English */}
                {lang === "en" ? (
                  <h3 className={`mb-2 text-lg font-black ${textColor}`}>{word}</h3>
                ) : (
                  <div className="mb-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      {EN_WORDS[i]}
                    </p>
                    <h3 className={`text-lg font-black leading-tight ${textColor}`}>{word}</h3>
                  </div>
                )}

                <p className="text-sm leading-relaxed text-gray-500">{text}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
