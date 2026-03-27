"use client";

import { motion } from "motion/react";
import { Shield, Heart, Megaphone, Rocket } from "lucide-react";
import type { Lang } from "@/types/language";
import { tProfile } from "@/data/i18n/about/profile";

const PILLARS = [
  {
    key: "missionTaglineSafety" as const,
    Icon: Shield,
    gradient: "from-red-500 to-rose-600",
  },
  {
    key: "missionTaglineCare" as const,
    Icon: Heart,
    gradient: "from-[#00AAAC] to-[#008e90]",
  },
  {
    key: "missionTaglinePromote" as const,
    Icon: Megaphone,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    key: "missionTaglineDevelop" as const,
    Icon: Rocket,
    gradient: "from-emerald-500 to-emerald-600",
  },
];

export function MissionSection({ lang }: { lang: Lang }) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="mb-12 text-center text-sm font-bold uppercase tracking-widest text-[#00AAAC]"
        >
          {tProfile("missionLabel", lang)}
        </motion.p>

        {/* Four pillars — floating, no boxes */}
        <div className="mb-14 flex flex-wrap justify-center gap-10 sm:gap-16">
          {PILLARS.map(({ key, Icon, gradient }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.09, ease: [0.25, 1, 0.5, 1] }}
              className="flex flex-col items-center gap-3"
            >
              {/* Coloured circle icon */}
              <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${gradient}`}>
                <Icon className="h-7 w-7 text-white" />
              </div>

              {/* Label */}
              <p className="text-sm font-bold text-gray-800 sm:text-base">
                {tProfile(key, lang)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mission paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 1, 0.5, 1] }}
          className="mx-auto max-w-3xl text-center text-base leading-relaxed text-gray-600 sm:text-lg"
        >
          {tProfile("missionText", lang)}
        </motion.p>

      </div>
    </section>
  );
}
