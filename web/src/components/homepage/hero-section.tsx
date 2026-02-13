"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
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
}: HeroSectionProps) => {
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
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/50" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Hero Navigation Controls */}
      <div className="absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 rounded-full bg-white/10 px-1.5 py-1.5 backdrop-blur-sm">
        {/* Previous Button */}
        <button
          onClick={() => heroSwiper?.slidePrev()}
          className="group rounded-full p-1 transition-colors hover:bg-white/20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4 text-white/70 transition-colors group-hover:text-white sm:h-4.5 sm:w-4.5" />
        </button>

        {/* Pagination dots */}
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
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => heroSwiper?.slideNext()}
          className="group rounded-full p-1 transition-colors hover:bg-white/20"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4 text-white/70 transition-colors group-hover:text-white sm:h-4.5 sm:w-4.5" />
        </button>
      </div>

      {/* Announcement Bar */}
      <div className="absolute inset-x-0 bottom-0 z-30">
        {/* Curved wave - desktop only */}
        <div className="hidden lg:block">
          <div className="relative h-16 w-full overflow-hidden sm:h-20">
            <svg
              className="absolute inset-x-0 bottom-0 h-full w-full"
              viewBox="0 0 1440 100"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter
                  id="shadow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feDropShadow
                    dx="0"
                    dy="-2"
                    stdDeviation="4"
                    floodOpacity="0.15"
                  />
                </filter>
              </defs>
              <path
                d="M0,50 C240,20 480,20 720,50 C960,80 1200,80 1440,50 L1440,100 L0,100 Z"
                fill="#FFFFFF"
                filter="url(#shadow)"
              />
            </svg>
          </div>
        </div>

        {/* Mobile: blur bar */}
        <div className="block bg-black/20 backdrop-blur-md lg:hidden">
          {notices && notices.length > 0 && (
            <div className="mx-auto flex items-center gap-3 px-3 py-1">
              <div className="bg-primary-500/90 flex flex-shrink-0 items-center gap-2 rounded-full p-1">
                <Volume2 className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 overflow-hidden">
                <Swiper
                  modules={[Autoplay]}
                  direction="vertical"
                  speed={800}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  loop
                  onSwiper={setAnnouncementSwiper}
                  className="h-7"
                >
                  {notices.map((notice) => (
                    <SwiperSlide key={notice.id}>
                      <Link
                        href={`/${lang}/support/notices/${notice.id}`}
                        className="group flex h-full w-fit items-center gap-3"
                        onMouseEnter={() => announcementSwiper?.autoplay.stop()}
                        onMouseLeave={() =>
                          announcementSwiper?.autoplay.start()
                        }
                      >
                        <span className="line-clamp-1 text-xs text-white/90 transition-all group-hover:text-white group-hover:underline">
                          {notice.title[lang]}
                        </span>

                        <span className="hidden rounded-full bg-gray-300/50 px-3 py-0.5 text-xs whitespace-nowrap text-gray-50 sm:inline">
                          {formatDate(notice.createdAt)}
                        </span>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          )}
        </div>

        {/* Desktop: announcement over wave */}
        {notices && notices.length > 0 && (
          <div className="absolute bottom-0 hidden w-full lg:block">
            <div className="container mx-auto flex items-center gap-3 pb-3 sm:gap-4 sm:pb-4">
              <div className="bg-primary-500/90 flex flex-shrink-0 items-center gap-2.5 rounded-full p-1 xl:px-2 xl:py-1">
                <Volume2 className="h-4.5 w-4.5 text-white sm:h-5 sm:w-5" />
                <span className="hidden text-sm font-semibold text-white/90 xl:inline">
                  {t.announcements}
                </span>
              </div>
              <div className="flex-1 overflow-hidden">
                <Swiper
                  modules={[Autoplay]}
                  direction="vertical"
                  speed={800}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  loop
                  onSwiper={setAnnouncementSwiper}
                  className="h-7"
                >
                  {notices.map((notice) => (
                    <SwiperSlide key={notice.id}>
                      <Link
                        href={`/${lang}/support/notices/${notice.id}`}
                        className="group flex h-full w-fit items-center gap-3 sm:gap-4"
                        onMouseEnter={() => announcementSwiper?.autoplay.stop()}
                        onMouseLeave={() =>
                          announcementSwiper?.autoplay.start()
                        }
                      >
                        <span className="group-hover:text-primary-600 line-clamp-1 text-xs text-gray-600 transition-all group-hover:underline sm:text-sm">
                          {notice.title[lang]}
                        </span>
                        <span className="hidden rounded-full bg-gray-100 px-3 py-0.5 text-xs whitespace-nowrap text-gray-500 lg:inline">
                          {formatDate(notice.createdAt)}
                        </span>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
