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

      {/* Announcement Bar - Absolute at Bottom */}
      {notices && notices.length > 0 && (
        <div className="absolute bottom-0 z-30 h-11 w-full overflow-hidden">
          {/* 1. Background Layer: ແຍກສີອອກເປັນ 3 ສ່ວນເພື່ອບໍ່ໃຫ້ສີເຫຼື້ອມກັນ */}
          <div className="absolute inset-0 flex">
            {/* ສ່ວນທີ 1: ສີ primary-500 ເລີ່ມຈາກຂອບຈໍດ້ານຊ້າຍ ມາຫາຂອບ Container */}
            <div className="bg-primary w-[calc(50%-768px)] min-w-0" />

            {/* ສ່ວນທີ 2: ສີ primary-800 ສຳລັບ Label (ຕ້ອງໃຫ້ກວ້າງເທົ່າກັບ Label Area ດ້ານລຸ່ມ) */}
            <div className="bg-primary-500 w-48 sm:w-56 lg:w-64 xl:w-72" />

            {/* ສ່ວນທີ 3: ສີພື້ນຫຼັງສຳລັບສ່ວນ Notice Swiper (ສີເຂັ້ມ/Blur) */}
            <div className="flex-1 bg-black/15 backdrop-blur-md" />
          </div>

          {/* 2. Content Layer: ໃຊ້ class .container ເພື່ອໃຫ້ຂໍ້ຄວາມ Align ກັບ Search Bar */}
          <div className="relative container flex h-full items-stretch !p-0">
            {/* Label Area (ສີ primary-800) */}
            <div className="flex w-48 flex-shrink-0 items-center justify-start gap-2 px-4 sm:w-56 sm:px-6 lg:w-64 lg:px-8 xl:w-72 xl:px-12">
              <Volume2 className="h-4 w-4 text-white sm:h-5 sm:w-5" />
              <span className="text-xs font-bold tracking-wide text-white uppercase sm:text-sm">
                {t.announcements}
              </span>
            </div>

            {/* Notice Swiper Area (ພື້ນຫຼັງຈະເປັນສີຈາກ Background Layer ສ່ວນທີ 3) */}
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
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => announcementSwiper?.slideNext()}
                className="p-1 text-white/60 transition-all hover:text-white active:scale-95"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
