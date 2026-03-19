"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";
import type { Lang } from "@/types/language";
import { tProfile } from "@/data/i18n/about/profile";

export function VisionSection({ lang }: { lang: Lang }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f0fbfc] via-[#e6f7f8] to-[#d4f2f3] py-20 sm:py-28">
      {/* Dot texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle,#00AAAC_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="container relative">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="mb-8 text-center text-sm font-bold uppercase tracking-widest text-[#00AAAC] sm:text-base"
        >
          {tProfile("visionLabel", lang)}
        </motion.p>

        {/* Quote block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
          className="relative mx-auto max-w-4xl"
        >
          <Quote className="absolute -top-4 -left-2 h-16 w-16 text-[#00AAAC]/25 sm:-top-6 sm:-left-4 sm:h-20 sm:w-20" />
          <p className="relative px-8 text-center text-2xl font-bold leading-relaxed text-[#003d3e] sm:text-3xl lg:text-4xl lg:leading-snug">
            {tProfile("visionText", lang)}
          </p>
          <Quote className="absolute -bottom-4 -right-2 h-16 w-16 rotate-180 text-[#00AAAC]/25 sm:-bottom-6 sm:-right-4 sm:h-20 sm:w-20" />
        </motion.div>
      </div>
    </section>
  );
}
