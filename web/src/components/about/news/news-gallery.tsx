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
  overlay?: string;      // e.g. "+5"
  overlayLabel?: string; // e.g. "photos" / "ຮູບພາບ"
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(index)}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00AAAC] focus-visible:ring-offset-2",
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
      {/* Hover / overlay */}
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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const count = images.length;
  const isOpen = lightboxIndex !== null;

  const open = (i: number) => setLightboxIndex(i);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goNext = useCallback(() => setLightboxIndex((i) => ((i ?? 0) + 1) % count), [count]);
  const goPrev = useCallback(() => setLightboxIndex((i) => ((i ?? 0) - 1 + count) % count), [count]);

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
    if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev();
    setTouchStart(null);
  };

  if (count === 0) return null;

  const currentImage = lightboxIndex !== null ? images[lightboxIndex] : null;

  // ── Grid layout ─────────────────────────────────────────────────────────────
  const renderGrid = () => {
    // 1 image — full width cinematic
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

    // 2 images — equal halves
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

    // 3+ images — featured left + up to 2 thumbs right (with +N overlay)
    const hiddenCount = Math.max(0, count - 3); // images beyond slot [2]

    return (
      <div
        className="grid gap-2 sm:gap-3"
        style={{
          gridTemplateColumns: "2fr 1fr",
          gridTemplateRows: "1fr 1fr",
          height: "clamp(220px, 40vw, 420px)",
        }}
      >
        {/* Featured — spans full height left side */}
        <GridThumb
          img={images[0]}
          index={0}
          onClick={open}
          className="row-span-2 h-full w-full"
        />
        {/* Thumb 1 */}
        <GridThumb
          img={images[1]}
          index={1}
          onClick={open}
          className="h-full w-full"
        />
        {/* Thumb 2 — shows +N overlay if more images exist */}
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
        {/* Header */}
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
          className="fixed inset-0 z-[9999] flex flex-col bg-black/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Top bar */}
          <div className="flex shrink-0 items-center justify-between px-4 py-3 sm:px-6">
            <span className="text-sm font-medium text-white/50">
              <span className="text-white">{(lightboxIndex ?? 0) + 1}</span>
              {" / "}
              {count}
            </span>
            <button
              type="button"
              onClick={closeLightbox}
              className="rounded-full bg-white/10 p-2 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Close (Esc)"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Main image */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
            {count > 1 && (
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-2 z-10 rounded-full bg-white/10 p-2.5 text-white/70 transition-all hover:bg-white/20 hover:text-white sm:left-4"
                aria-label="Previous"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={lightboxIndex}
              src={asset(currentImage.path)}
              alt={currentImage.originalName}
              className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
              draggable={false}
              style={{ animation: "lb-fadein 0.18s ease" }}
            />

            {count > 1 && (
              <button
                type="button"
                onClick={goNext}
                className="absolute right-2 z-10 rounded-full bg-white/10 p-2.5 text-white/70 transition-all hover:bg-white/20 hover:text-white sm:right-4"
                aria-label="Next"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Bottom: caption + thumbnail strip */}
          <div className="shrink-0 px-4 pb-4 pt-2 sm:px-6">
            <p className="mb-3 truncate text-center text-xs text-white/35">
              {currentImage.originalName}
            </p>

            {count > 1 && (
              <div
                ref={thumbsRef}
                className="flex justify-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {images.map((img, i) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    className={cn(
                      "relative h-12 w-12 shrink-0 overflow-hidden rounded-lg transition-all duration-200 sm:h-14 sm:w-14",
                      i === lightboxIndex
                        ? "opacity-100 ring-2 ring-[#00AAAC] ring-offset-2 ring-offset-black"
                        : "opacity-40 hover:opacity-70",
                    )}
                    aria-label={`Image ${i + 1}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(img.path)}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
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
