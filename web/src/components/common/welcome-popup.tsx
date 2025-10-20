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
import { Fragment } from "react";
import { useWelcomePopup } from "@/hooks/use-welcome-popup";
import { cn } from "@/lib/utils";

export default function WelcomePopup() {
  const {
    isOpen,
    images,
    currentIndex,
    canClose,
    isLoading,
    setCurrentIndex,
    handleClose,
    trackClick,
  } = useWelcomePopup("always");

  // Don't render anything if loading or not open
  if (isLoading || images.length === 0) {
    return null;
  }

  const currentImage = images[currentIndex];
  const hasMultipleImages = images.length > 1;

  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const handleCtaClick = () => {
    if (currentImage.link) {
      trackClick(currentImage.link);
      handleClose();
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={() => canClose && handleClose()}
        className="relative z-[9999]"
      >
        {/* Backdrop with fade animation */}
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

        {/* Dialog Panel Container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
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
              <CloseButton canClose={canClose} onClose={handleClose} />

              {/* Navigation Buttons */}
              {hasMultipleImages && (
                <NavigationButtons
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                />
              )}

              {/* Main Content */}
              <div className="relative overflow-hidden rounded-lg bg-white shadow-2xl">
                <PopupImage image={currentImage} onCtaClick={handleCtaClick} />

                {/* Pagination Dots */}
                {hasMultipleImages && (
                  <PaginationDots
                    images={images}
                    currentIndex={currentIndex}
                    onDotClick={setCurrentIndex}
                  />
                )}
              </div>

              {/* Helper Text */}
              {!canClose && (
                <p className="mt-2 text-center text-sm text-white/80">
                  You can close this in a moment...
                </p>
              )}
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}

// Sub-components for better organization

interface CloseButtonProps {
  canClose: boolean;
  onClose: () => void;
}

function CloseButton({ canClose, onClose }: CloseButtonProps) {
  return (
    <button
      onClick={onClose}
      disabled={!canClose}
      className={cn(
        "absolute top-2 right-2 z-10 flex items-center justify-center rounded-full bg-white/90 p-2 shadow-lg transition-all outline-none hover:scale-110 hover:bg-white",
        !canClose && "pointer-events-none opacity-30",
      )}
      aria-label="Close popup"
      title={canClose ? "Close" : "Please wait..."}
    >
      <X className="h-6 w-6 text-gray-800" />
    </button>
  );
}

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
}

function NavigationButtons({ onPrevious, onNext }: NavigationButtonsProps) {
  return (
    <>
      <button
        onClick={onPrevious}
        className="absolute top-1/2 left-2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/90 p-2 shadow-lg transition-all outline-none hover:scale-110 hover:bg-white"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>
      <button
        onClick={onNext}
        className="absolute top-1/2 right-2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/90 p-2 shadow-lg transition-all outline-none hover:scale-110 hover:bg-white"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>
    </>
  );
}

interface PopupImageProps {
  image: {
    imageUrl: string;
    title: string;
    description?: string;
    link?: string;
    linkText?: string;
  };
  onCtaClick: () => void;
}

function PopupImage({ image, onCtaClick }: PopupImageProps) {
  return (
    <div className="relative aspect-[16/10] w-full">
      <img
        src={image.imageUrl}
        alt={image.title}
        className="h-full w-full object-cover"
      />

      {/* Overlay Content */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 text-white md:p-8">
        <h2 className="mb-2 text-2xl leading-tight font-bold md:text-3xl">
          {image.title}
        </h2>

        {image.description && (
          <p className="mb-4 text-sm opacity-95 md:text-base">
            {image.description}
          </p>
        )}

        {image.link && image.linkText && (
          <Link
            href={image.link}
            onClick={onCtaClick}
            className="bg-primary hover:bg-primary-600 inline-block rounded-lg px-6 py-3 font-semibold text-white transition-colors"
          >
            {image.linkText}
          </Link>
        )}
      </div>
    </div>
  );
}

interface PaginationDotsProps {
  images: Array<{ id: string }>;
  currentIndex: number;
  onDotClick: (index: number) => void;
}

function PaginationDots({
  images,
  currentIndex,
  onDotClick,
}: PaginationDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2 bg-white py-3">
      {images.map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={cn(
            "h-2 rounded-full transition-all",
            index === currentIndex
              ? "bg-primary w-8"
              : "w-2 bg-gray-300 hover:bg-gray-400",
          )}
          aria-label={`Go to image ${index + 1}`}
        />
      ))}
    </div>
  );
}
