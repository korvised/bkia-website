"use client";

import type { Lang } from "@/types/language";
import { useScrollAnimation, useScrollAnimationBatch } from "@/hooks/useScrollAnimation";
import { tProfile } from "@/data/i18n/about/profile";

// English words are fixed — they spell TEAM
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
  const titleAnim = useScrollAnimation({ threshold: 0.2 });
  const { setRef, visibleItems } = useScrollAnimationBatch(values.length, { threshold: 0.1 });

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container">
        {/* Section title */}
        <div
          ref={titleAnim.ref}
          className={`mb-12 text-center transition-all duration-700 ${
            titleAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="mb-2 inline-block text-sm font-bold uppercase tracking-widest text-[#00AAAC]">
            {tProfile("valuesLabel", lang)}
          </span>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {tProfile("valuesSubtitle", lang)}
          </h2>
          {/* T·E·A·M decorative tiles */}
          <div className="mt-5 flex justify-center gap-1.5">
            {values.map(({ letter, bg }, i) => (
              <span
                key={letter}
                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl font-black text-white shadow-sm ${bg}`}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ letter, word, text, color, bg, textColor, bgLight }, i) => (
            <div
              key={letter + word}
              ref={setRef(i)}
              className={`group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/80 transition-all duration-700 hover:-translate-y-1 hover:shadow-xl ${
                visibleItems.has(i) ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: visibleItems.has(i) ? `${i * 120}ms` : "0ms" }}
            >
              {/* Bold top strip */}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
