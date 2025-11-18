"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import { useLanguage } from "@/context";
import { cn } from "@/lib";
import { createHomepageI18n } from "@/data/i18n/homepage";

import "swiper/css";
import "swiper/css/effect-fade";

interface HeroSlide {
  id: number;
  image: string;
  alt: string;
}

interface Announcement {
  id: number;
  content: {
    en: string;
    lo: string;
    zh: string;
  };
  link: string;
  date: string;
}

const heroSlides: HeroSlide[] = [
  { id: 1, image: "/images/wallpaper/001.jpg", alt: "Airport Terminal" },
  { id: 2, image: "/images/wallpaper/002.jpg", alt: "Aircraft" },
  { id: 3, image: "/images/wallpaper/003.jpg", alt: "Runway" },
  { id: 4, image: "/images/wallpaper/004.jpg", alt: "Facilities" },
];

const announcements: Announcement[] = [
  {
    id: 1,
    content: {
      en: "Spare Battery & E-cigarette Carry-on Procedures",
      lo: "ຂັ້ນຕອນການເອົາແບັດເຕີຣີສຳຮອງ ແລະ ບຸຫຼີ່ໄຟຟ້າຂຶ້ນເຄື່ອງ",
      zh: "备用电池和电子烟随身携带程序",
    },
    link: "/notices/battery-procedures",
    date: "2025-02-25",
  },
  {
    id: 2,
    content: {
      en: "International check-in counters now open",
      lo: "ເຄົາເຕີລົງທະບຽນສາກົນເປີດແລ້ວ",
      zh: "国际值机柜台现已开放",
    },
    link: "/notices/checkin-open",
    date: "2025-02-20",
  },
  {
    id: 3,
    content: {
      en: "New dining options available in Terminal 1",
      lo: "ຮ້ານອາຫານໃໝ່ໃນຂົວຕໍ່ທີ 1",
      zh: "1号航站楼新增餐饮选择",
    },
    link: "/notices/dining",
    date: "2025-02-15",
  },
];

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className }: HeroSectionProps) {
  const { lang } = useLanguage();
  const [heroSwiper, setHeroSwiper] = useState<SwiperType | null>(null);
  const [announcementSwiper, setAnnouncementSwiper] =
    useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { hero: t } = createHomepageI18n(lang);

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

      {/* Announcement Bar Curved */}
      <div className="absolute inset-x-0 bottom-0 z-30">
        <div className="relative h-16 w-full overflow-hidden sm:h-20">
          {/* Pure White Wave SVG  */}
          <svg
            className="absolute inset-x-0 bottom-0 h-full w-full"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Smooth elegant wave with shadow */}
            <defs>
              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
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

          {/* Announcement Container */}
          <div className="absolute -bottom-5 left-0 w-full sm:-bottom-7">
            <div className="container mx-auto flex h-full w-full items-center gap-3 pb-4 sm:gap-4 sm:pb-6">
              {/* LEFT: Icon & Label */}
              <div className="from-primary-500/90 to-primary-500 flex flex-shrink-0 items-center gap-2.5 rounded-full bg-gradient-to-br p-1 text-transparent xl:rounded-l-full xl:rounded-r-none xl:px-2 xl:py-1">
                <Volume2 className="h-4.5 w-4.5 text-white sm:h-5 sm:w-5" />
                <span className="hidden text-sm font-semibold text-white/90 xl:inline">
                  {t.announcements}
                </span>
              </div>

              {/*  Announcement Content */}
              <div className="flex-1 overflow-hidden">
                <Swiper
                  modules={[Autoplay]}
                  direction="vertical"
                  speed={800}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  loop
                  onSwiper={setAnnouncementSwiper}
                  className="h-12 sm:h-14"
                >
                  {announcements.map((a) => (
                    <SwiperSlide key={a.id}>
                      <Link
                        href={`/${lang}${a.link}`}
                        className="group flex h-full w-fit items-center gap-3 sm:gap-4"
                        onMouseEnter={() => announcementSwiper?.autoplay.stop()}
                        onMouseLeave={() =>
                          announcementSwiper?.autoplay.start()
                        }
                      >
                        <span className="group-hover:text-primary-600 line-clamp-1 text-xs text-gray-600 transition-all group-hover:underline sm:text-sm">
                          {a.content[lang]}
                        </span>
                        <span className="hidden rounded-full bg-gray-100 px-3 py-1 text-xs whitespace-nowrap text-gray-500 lg:inline">
                          {a.date}
                        </span>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
