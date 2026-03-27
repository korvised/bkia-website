"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight, Megaphone } from "lucide-react";
import { cn, formatDate } from "@/lib";
import { useLanguage } from "@/context";
import { createCommonI18n } from "@/data/i18n/common";
import type { IBanner } from "@/types/banner";
import type { INotice } from "@/types/notice";
import { asset } from "@/lib";

import "swiper/css";
import "swiper/css/effect-fade";

const FALLBACK_SLIDES = [
  {
    id: "fallback-1",
    image:
      "https://bkia-website.s3.ap-southeast-7.amazonaws.com/carousel/001.jpg",
    alt: "Airport Terminal",
  },
];

interface HeroSectionProps {
  banners?: IBanner[];
  notices?: INotice[];
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  banners,
  notices,
  className,
}) => {
  const { lang } = useLanguage();
  const { homepage: tHome } = createCommonI18n(lang);
  const [heroSwiper, setHeroSwiper] = useState<SwiperType | null>(null);
  const [noticeSwiper, setNoticeSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeNotice, setActiveNotice] = useState(0);

  const slides =
    banners && banners.length > 0
      ? banners.map((b) => ({
          id: b.id,
          image: asset(b.image.path),
          alt: b.altText?.en || "",
        }))
      : FALLBACK_SLIDES;

  const hasNotices = notices && notices.length > 0;

  return (
    <div className={cn("relative h-full w-full", className)}>
      {/* Hero Image Slider */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        speed={1200}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        onSwiper={setHeroSwiper}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={index === 0}
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/50" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ── Notice Ticker ────────────────────────────────────────────────── */}
      {hasNotices && (
        <div className="absolute right-0 bottom-0 left-0 z-20">
          {/* Frosted glass strip */}
          <div className="relative flex h-11 items-stretch overflow-hidden bg-black/10 backdrop-blur-xs sm:h-12">
            {/* Left label badge */}
            <div className="bg-primary relative flex shrink-0 items-center gap-2 px-4 sm:px-5">
              {/* Diagonal cut on the right edge */}
              <div className="bg-primary absolute top-0 -right-3 h-full w-6 skew-x-[-12deg]" />
              <Megaphone className="relative z-10 h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
              <span className="relative z-10 hidden text-[11px] font-bold tracking-widest text-white uppercase sm:block sm:text-xs">
                {tHome.announcements}
              </span>
            </div>

            {/* Scrolling notices */}
            <div className="flex min-w-0 flex-1 items-center pr-3 pl-6 sm:pl-8">
              <Swiper
                modules={[Autoplay]}
                direction="vertical"
                speed={700}
                autoplay={{ delay: 4500, disableOnInteraction: false }}
                loop
                onSwiper={setNoticeSwiper}
                onSlideChange={(s) => setActiveNotice(s.realIndex)}
                className="h-12 w-full"
              >
                {notices.map((notice) => (
                  <SwiperSlide key={notice.id}>
                    <Link
                      href={`/${lang}/support/notices/${notice.id}`}
                      className="group flex h-full w-full items-center gap-3"
                      onMouseEnter={() => noticeSwiper?.autoplay.stop()}
                      onMouseLeave={() => noticeSwiper?.autoplay.start()}
                    >
                      <span className="line-clamp-1 text-xs font-medium text-white/85 transition-colors group-hover:text-white group-hover:underline sm:text-sm">
                        {notice.title[lang]}
                      </span>
                      <span className="hidden shrink-0 text-[10px] text-white/40 md:block">
                        {formatDate(notice.createdAt)}
                      </span>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Dot indicators + controls */}
            <div className="flex shrink-0 items-center gap-2 pr-4 sm:pr-5">
              {/* Dot indicators */}
              <div className="hidden items-center gap-1 sm:flex">
                {notices.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => noticeSwiper?.slideToLoop(i)}
                    className={cn(
                      "rounded-full transition-all duration-300",
                      activeNotice === i
                        ? "bg-primary h-1.5 w-4"
                        : "h-1 w-1 bg-white/30 hover:bg-white/50",
                    )}
                  />
                ))}
              </div>

              {/* Prev / Next */}
              <div className="flex items-center">
                <button
                  onClick={() => noticeSwiper?.slidePrev()}
                  className="rounded p-1 text-white/40 transition-colors hover:text-white"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => noticeSwiper?.slideNext()}
                  className="rounded p-1 text-white/40 transition-colors hover:text-white"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prev / Next — ghost arrows on left & right edges */}
      <button
        onClick={() => heroSwiper?.slidePrev()}
        className="group absolute top-1/2 left-3 z-20 -translate-y-1/2 rounded-full p-2 opacity-0 transition-all duration-200 hover:bg-white/20 hover:opacity-100 sm:left-4 [&:hover]:opacity-100 [@media(hover:none)]:opacity-100"
      >
        <ChevronLeft className="h-5 w-5 text-white/80 drop-shadow" />
      </button>
      <button
        onClick={() => heroSwiper?.slideNext()}
        className="group absolute top-1/2 right-3 z-20 -translate-y-1/2 rounded-full p-2 opacity-0 transition-all duration-200 hover:bg-white/20 hover:opacity-100 sm:right-4 [&:hover]:opacity-100 [@media(hover:none)]:opacity-100"
      >
        <ChevronRight className="h-5 w-5 text-white/80 drop-shadow" />
      </button>

      {/* Slide indicator — vertical pills, bottom-right */}
      <div
        className={cn(
          "absolute right-4 z-20 flex flex-col items-center gap-1.5 sm:right-6",
          hasNotices ? "bottom-16 sm:bottom-18" : "bottom-5 sm:bottom-7",
        )}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => heroSwiper?.slideToLoop(index)}
            className={cn(
              "w-[3px] rounded-full transition-all duration-300",
              activeIndex === index
                ? "h-7 bg-white shadow-[0_0_6px_rgba(255,255,255,0.6)]"
                : "h-2.5 bg-white/35 hover:bg-white/65",
            )}
          />
        ))}
      </div>
    </div>
  );
};
