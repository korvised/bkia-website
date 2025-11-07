"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { Fragment, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useWelcomePopup } from "@/hooks/use-welcome-popup";
import { cn } from "@/utils/cn";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

export function WelcomePopup() {
  const { isOpen, images, canClose, isLoading, handleClose, trackClick } =
    useWelcomePopup("always");

  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Don't render anything if loading or no images
  if (isLoading || !images.length) {
    return null;
  }

  const hasMultipleImages = images.length > 1;

  const handleCtaClick = (link: string) => {
    trackClick(link);
    handleClose();
  };

  const handlePrevious = () => {
    swiperInstance?.slidePrev();
  };

  const handleNext = () => {
    swiperInstance?.slideNext();
  };

  const handleDotClick = (index: number) => {
    swiperInstance?.slideTo(index);
  };

  const handleMouseEnter = () => {
    swiperInstance?.autoplay?.stop();
  };

  const handleMouseLeave = () => {
    swiperInstance?.autoplay?.start();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={() => canClose && handleClose()}
        className="relative z-[9999]"
      >
        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </TransitionChild>

        {/* Dialog Container */}
        <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="relative mx-auto w-full max-w-4xl">
              {/* Close Button */}
              <button
                onClick={handleClose}
                disabled={!canClose}
                className={cn(
                  "absolute top-1 right-1 z-10 flex items-center justify-center rounded-full bg-white/90 shadow-lg transition-all outline-none hover:scale-110 hover:bg-white",
                  "p-1.5 sm:p-2",
                  "sm:top-2 sm:right-2",
                  !canClose && "pointer-events-none opacity-30",
                )}
                aria-label="Close popup"
              >
                <X className="h-4 w-4 text-gray-800 sm:h-6 sm:w-6" />
              </button>

              {/* Custom Navigation Buttons */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="absolute top-1/2 left-1 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/90 p-1.5 shadow-lg transition-all outline-none hover:scale-110 hover:bg-white sm:left-2 sm:p-2"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-4 w-4 text-gray-800 sm:h-6 sm:w-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute top-1/2 right-1 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/90 p-1.5 shadow-lg transition-all outline-none hover:scale-110 hover:bg-white sm:right-2 sm:p-2"
                    aria-label="Next"
                  >
                    <ChevronRight className="h-4 w-4 text-gray-800 sm:h-6 sm:w-6" />
                  </button>
                </>
              )}

              {/* Main Content with Swiper */}
              <div
                className="relative overflow-hidden rounded-lg bg-white shadow-2xl"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Swiper
                  modules={[Navigation, Pagination, Autoplay, EffectFade]}
                  onSwiper={setSwiperInstance}
                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                  autoplay={
                    hasMultipleImages
                      ? {
                          delay: 5000,
                          disableOnInteraction: false,
                        }
                      : false
                  }
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  speed={600}
                  loop={hasMultipleImages}
                  className="aspect-[16/10] w-full"
                >
                  {images.map((image, index) => (
                    <SwiperSlide key={image.id || index}>
                      <div className="relative h-full w-full">
                        <img
                          src={image.imageUrl}
                          alt={image.title}
                          className="h-full w-full object-cover"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3 text-white sm:p-6 md:p-8">
                          <h2 className="mb-1 text-lg leading-tight font-bold sm:mb-2 sm:text-2xl md:text-3xl">
                            {image.title}
                          </h2>

                          {image.description && (
                            <p className="mb-2 text-xs opacity-95 sm:mb-4 sm:text-sm md:text-base">
                              {image.description}
                            </p>
                          )}

                          {image.link && image.linkText && (
                            <Link
                              href={image.link}
                              onClick={() => handleCtaClick(image.link!)}
                              className="bg-primary hover:bg-primary-600 inline-block rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors sm:px-6 sm:py-3 sm:text-base"
                            >
                              {image.linkText}
                            </Link>
                          )}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom Pagination Dots */}
                {hasMultipleImages && (
                  <div className="flex items-center justify-center gap-1.5 bg-white py-2 sm:gap-2 sm:py-3">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={cn(
                          "h-1.5 rounded-full transition-all outline-none sm:h-2",
                          index === activeIndex
                            ? "bg-primary w-6 sm:w-8"
                            : "w-1.5 bg-gray-300 hover:bg-gray-400 sm:w-2",
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
