"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc";
import { useLanguage } from "@/context";
import { cn, formatDate } from "@/lib";
import { createCommonI18n } from "@/data/i18n/common";
import { INotice } from "@/types/notice";

import "swiper/css";
import "swiper/css/effect-fade";

interface HeroSlide {
  id: number;
  image: string;
  alt: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image:
      "https://bkia-website.s3.ap-southeast-7.amazonaws.com/carousel/001.jpg",
    alt: "Airport Terminal",
  },
  {
    id: 2,
    image:
      "https://bkia-website.s3.ap-southeast-7.amazonaws.com/carousel/002.jpg",
    alt: "Aircraft",
  },
  {
    id: 3,
    image:
      "https://bkia-website.s3.ap-southeast-7.amazonaws.com/carousel/003.jpg",
    alt: "Runway",
  },
  {
    id: 4,
    image:
      "https://bkia-website.s3.ap-southeast-7.amazonaws.com/carousel/004.jpg",
    alt: "Facilities",
  },
];

interface HeroSectionProps {
  notices?: INotice[];
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  notices,
  className,
}) => {
  const { lang } = useLanguage();
  const [heroSwiper, setHeroSwiper] = useState<SwiperType | null>(null);
  const [announcementSwiper, setAnnouncementSwiper] =
    useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { homepage: t } = createCommonI18n(lang);

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
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={slide.id === 1}
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/50" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Hero Navigation Controls */}
      <div className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white/25 px-0.5 sm:bottom-16 sm:bg-white/10 sm:px-1.5 sm:py-1.5 sm:backdrop-blur-xs">
        <button
          onClick={() => heroSwiper?.slidePrev()}
          className="group rounded-full p-1 transition-colors hover:bg-white/20"
        >
          <ChevronLeft className="h-4 w-4 text-white/70 transition-colors group-hover:text-white sm:h-4.5 sm:w-4.5" />
        </button>
        <div className="flex items-center gap-1.5 px-1">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => heroSwiper?.slideToLoop(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                activeIndex === index
                  ? "w-8 bg-white sm:w-10"
                  : "w-1.5 bg-white/40 hover:bg-white/60",
              )}
            />
          ))}
        </div>
        <button
          onClick={() => heroSwiper?.slideNext()}
          className="group rounded-full p-1 transition-colors hover:bg-white/20"
        >
          <ChevronRight className="h-4 w-4 text-white/70 transition-colors group-hover:text-white sm:h-4.5 sm:w-4.5" />
        </button>
      </div>

      {/* Announcement Bar - Absolute at Bottom */}
      {notices && notices.length > 0 && (
        <div className="absolute bottom-0 z-30 h-8 w-full overflow-hidden sm:h-11">
          <div className="relative container flex h-full items-stretch !p-0">
            {/* 1. Label Area: w-auto fits text content on all devices */}
            <div className="bg-primary-600 relative flex w-auto min-w-max flex-shrink-0 items-center justify-start gap-2 px-4 sm:px-6 lg:px-8 xl:px-12">
              {/* Left Bleed: Extends the primary-500 color from the container edge to the screen edge */}
              <div className="bg-primary-600 absolute top-0 right-full h-full w-screen" />

              <Volume2 className="h-4 w-4 text-white sm:h-5 sm:w-5" />
              <span className="hidden text-xs font-bold tracking-wide text-white uppercase sm:block sm:text-sm">
                {t.announcements}
              </span>
            </div>

            {/* 2. Notice Swiper & Controls Area */}
            <div className="relative flex min-w-0 flex-1 items-center bg-black/20">
              {/* Right Bleed: Extends the dark background to the right screen edge */}
              <div className="absolute top-0 left-full h-full w-screen bg-black/20" />

              {/* Swiper Content */}
              <div className="flex min-w-0 flex-1 items-center px-4 sm:px-6">
                <Swiper
                  modules={[Autoplay]}
                  direction="vertical"
                  speed={800}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  loop
                  onSwiper={setAnnouncementSwiper}
                  className="h-11 w-full"
                >
                  {notices.map((notice) => (
                    <SwiperSlide key={notice.id}>
                      <Link
                        href={`/${lang}/support/notices/${notice.id}`}
                        className="group flex h-full w-full items-center gap-4"
                        onMouseEnter={() => announcementSwiper?.autoplay.stop()}
                        onMouseLeave={() =>
                          announcementSwiper?.autoplay.start()
                        }
                      >
                        <span className="line-clamp-1 text-xs font-medium text-white/90 transition-all group-hover:text-white group-hover:underline sm:text-sm">
                          {notice.title[lang]}
                        </span>
                        <span className="hidden flex-shrink-0 rounded-full bg-white/20 px-2 py-0.5 text-[10px] whitespace-nowrap text-white/70 md:inline">
                          {formatDate(notice.createdAt)}
                        </span>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Announcement Controls */}
              <div className="flex items-center gap-1 sm:px-6 lg:px-8 xl:px-12">
                <button
                  onClick={() => announcementSwiper?.slidePrev()}
                  className="p-1 text-white/60 transition-all hover:text-white active:scale-95"
                >
                  <VscTriangleLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => announcementSwiper?.slideNext()}
                  className="p-1 text-white/60 transition-all hover:text-white active:scale-95"
                >
                  <VscTriangleRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
