"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { Lang } from "@/types/language";
import { tProfile, PROFILE_IMAGES } from "@/data/i18n/about/profile";

export function HistorySection({ lang }: { lang: Lang }) {
  const [slide, setSlide] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setSlide((s) => (s + 1) % PROFILE_IMAGES.length),
      4500,
    );
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

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

            {/* Heading */}
            <h2 className="mb-6 text-2xl font-black leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
              {tProfile("historyHeading", lang)}
            </h2>

            {/* Body paragraphs */}
            <div className="space-y-4 text-sm leading-relaxed text-gray-600 sm:text-base">
              <p>{tProfile("historyPara1", lang)}</p>
              <p>{tProfile("historyPara2", lang)}</p>
            </div>
          </motion.div>

          {/* Slideshow column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
            className="relative overflow-hidden rounded-2xl"
          >
            <div className="relative aspect-[4/3] w-full bg-gray-100">
              {PROFILE_IMAGES.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={`BKIA profile ${i + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-opacity duration-1000 ease-in-out"
                  style={{ opacity: i === slide ? 1 : 0 }}
                  priority={i === 0}
                />
              ))}

              {/* Dot indicators */}
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5">
                {PROFILE_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Slide ${i + 1}`}
                    onClick={() => { setSlide(i); startTimer(); }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === slide ? "w-5 bg-white" : "w-1.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
