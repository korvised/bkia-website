"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import type { IFile } from "@/types/file";
import { asset, cn } from "@/lib";

interface NewsGalleryProps {
  images: IFile[];
  title?: string;
  photosLabel?: string;
}

// ── Thumbnail grid button ─────────────────────────────────────────────────────
function GridThumb({
  img,
  index,
  onClick,
  className,
  overlay,
  overlayLabel = "photos",
}: {
  img: IFile;
  index: number;
  onClick: (i: number) => void;
  className?: string;
  overlay?: string;
  overlayLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(index)}
      className={cn(
        "group relative cursor-zoom-in overflow-hidden rounded-xl bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00AAAC] focus-visible:ring-offset-2",
        className,
      )}
      aria-label={overlay ? `View all photos` : `View image ${index + 1}`}
    >
      <Image
        src={asset(img.path)}
        alt={img.originalName}
        fill
        className={cn(
          "object-cover transition-transform duration-500",
          !overlay && "group-hover:scale-105",
        )}
        sizes="(max-width: 640px) 50vw, 33vw"
      />
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-colors duration-200",
          overlay
            ? "bg-black/55 hover:bg-black/45"
            : "bg-black/0 group-hover:bg-black/20",
        )}
      >
        {overlay && (
          <span className="text-center font-bold text-white drop-shadow">
            <span className="block text-2xl sm:text-3xl">{overlay}</span>
            <span className="block text-xs font-normal opacity-80">{overlayLabel}</span>
          </span>
        )}
      </div>
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function NewsGallery({ images, title = "Photo Gallery", photosLabel = "photos" }: NewsGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const count = images.length;
  const isOpen = lightboxIndex !== null;

  const open = (i: number) => { setLightboxIndex(i); setImageLoaded(false); };
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goNext = useCallback(() => { setImageLoaded(false); setLightboxIndex((i) => ((i ?? 0) + 1) % count); }, [count]);
  const goPrev = useCallback(() => { setImageLoaded(false); setLightboxIndex((i) => ((i ?? 0) - 1 + count) % count); }, [count]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeLightbox, goNext, goPrev]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (lightboxIndex === null || !thumbsRef.current) return;
    const el = thumbsRef.current.children[lightboxIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [lightboxIndex]);

  // Swipe to navigate
  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { if (diff > 0) goNext(); else goPrev(); }
    setTouchStart(null);
  };

  if (count === 0) return null;

  const currentImage = lightboxIndex !== null ? images[lightboxIndex] : null;
  const progress = ((lightboxIndex ?? 0) + 1) / count;

  // ── Grid layout ─────────────────────────────────────────────────────────────
  const renderGrid = () => {
    if (count === 1) {
      return (
        <GridThumb
          img={images[0]}
          index={0}
          onClick={open}
          className="relative aspect-video w-full"
        />
      );
    }

    if (count === 2) {
      return (
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {images.map((img, i) => (
            <GridThumb
              key={img.id}
              img={img}
              index={i}
              onClick={open}
              className="relative aspect-square"
            />
          ))}
        </div>
      );
    }

    const hiddenCount = Math.max(0, count - 3);

    return (
      <div
        className="grid gap-2 sm:gap-3"
        style={{
          gridTemplateColumns: "2fr 1fr",
          gridTemplateRows: "1fr 1fr",
          height: "clamp(220px, 40vw, 420px)",
        }}
      >
        <GridThumb
          img={images[0]}
          index={0}
          onClick={open}
          className="row-span-2 h-full w-full"
        />
        <GridThumb
          img={images[1]}
          index={1}
          onClick={open}
          className="h-full w-full"
        />
        {count >= 3 && (
          <GridThumb
            img={images[2]}
            index={2}
            onClick={open}
            className="h-full w-full"
            overlay={hiddenCount > 0 ? `+${hiddenCount + 1}` : undefined}
            overlayLabel={photosLabel}
          />
        )}
      </div>
    );
  };

  return (
    <>
      {/* ── Gallery section ── */}
      <div className="py-8">
        <div className="mb-4 flex items-center gap-2">
          <Images className="h-5 w-5 text-[#00AAAC]" />
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
            {count}
          </span>
        </div>

        {renderGrid()}
      </div>

      {/* ── Lightbox ── */}
      {isOpen && currentImage && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col bg-black/96"
          role="dialog"
          aria-modal="true"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Teal progress bar */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-white/10">
            <div
              className="h-full bg-[#00AAAC] transition-all duration-300 ease-out"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          {/* Top bar */}
          <div className="flex shrink-0 items-center justify-between px-5 pb-2 pt-5">
            {/* Counter pill */}
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tabular-nums text-white/80 backdrop-blur-sm">
              {(lightboxIndex ?? 0) + 1} / {count}
            </span>

            {/* Close */}
            <button
              type="button"
              onClick={closeLightbox}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white active:scale-95"
              aria-label="Close (Esc)"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Main image */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-16 sm:px-24">
            {/* Prev */}
            {count > 1 && (
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white active:scale-95 sm:left-5"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            {/* Image + loading spinner */}
            <div className="relative flex h-full w-full items-center justify-center">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-white/15 border-t-[#00AAAC]" />
                </div>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={lightboxIndex}
                src={asset(currentImage.path)}
                alt={currentImage.originalName}
                className={cn(
                  "max-h-full max-w-full rounded-xl object-contain shadow-2xl transition-opacity duration-300",
                  imageLoaded ? "opacity-100" : "opacity-0",
                )}
                draggable={false}
                onLoad={() => setImageLoaded(true)}
                style={{ animation: imageLoaded ? "lb-fadein 0.2s ease" : "none" }}
              />
            </div>

            {/* Next */}
            {count > 1 && (
              <button
                type="button"
                onClick={goNext}
                className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/80 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white active:scale-95 sm:right-5"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Thumbnail strip
              Inset shadow is the only indicator that survives overflow-x:auto
              (overflow-x:auto forces overflow-y:hidden, clipping any outline/ring
              that extends outside the element — inset shadow renders inside bounds) */}
          <div className="shrink-0 px-5 pb-6 pt-4">
            {count > 1 && (
              <div
                ref={thumbsRef}
                className="flex justify-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {images.map((img, i) => {
                  const isActive = i === lightboxIndex;
                  return (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => setLightboxIndex(i)}
                      className={cn(
                        "relative h-14 w-14 shrink-0 cursor-pointer overflow-hidden rounded-lg transition-all duration-200",
                        isActive
                          ? "opacity-100 shadow-[inset_0_0_0_3px_#00AAAC]"
                          : "opacity-35 hover:opacity-70",
                      )}
                      aria-label={`Image ${i + 1}`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={asset(img.path)}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lightbox fade-in keyframe */}
      <style>{`
        @keyframes lb-fadein {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}
