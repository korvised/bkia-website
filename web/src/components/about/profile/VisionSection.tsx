"use client";

import { Quote } from "lucide-react";
import type { Lang } from "@/types/language";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { tProfile } from "@/data/i18n/about/profile";

/*
 * IMAGE GUIDE — Vision Section background:
 * When you have a real photo, wrap it as:
 *   <div className="absolute inset-0">
 *     <Image src="/images/profile/vision-bg.jpg" alt="" fill className="object-cover" />
 *     <div className="absolute inset-0 bg-[#00AAAC]/60" />
 *   </div>
 * Suggested photo: runway/apron at golden hour OR terminal interior with high ceilings.
 */
export function VisionSection({ lang }: { lang: Lang }) {
  const { animRef, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f0fbfc] via-[#e6f7f8] to-[#d4f2f3] py-20 sm:py-28">
      {/* Dot texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle,#00AAAC_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="container relative">
        <div
          ref={animRef}
          className={`mx-auto max-w-4xl transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Label */}
          <p className="mb-6 text-center text-sm font-bold uppercase tracking-widest text-[#00AAAC] sm:text-base">
            {tProfile("visionLabel", lang)}
          </p>

          {/* Oversized opening quote + text */}
          <div className="relative">
            <Quote className="absolute -top-4 -left-2 h-16 w-16 text-[#00AAAC]/20 sm:-top-6 sm:-left-4 sm:h-20 sm:w-20" />
            <p className="relative px-6 text-center text-2xl font-bold leading-relaxed text-[#003d3e] sm:text-3xl lg:text-4xl lg:leading-snug">
              {tProfile("visionText", lang)}
            </p>
            <Quote className="absolute -bottom-4 -right-2 h-16 w-16 rotate-180 text-[#00AAAC]/20 sm:-bottom-6 sm:-right-4 sm:h-20 sm:w-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
