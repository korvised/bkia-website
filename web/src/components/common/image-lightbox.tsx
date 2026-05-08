"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib";

/* ────────────────────────────────────────────────────────────────────────────
 *  Shared full-screen lightbox.
 *
 *  Accepts any image list — each item only needs { src, alt }.
 *  Works equally well with server-hosted URLs (`asset(file.path)`) and local
 *  blob URLs (`URL.createObjectURL(file)`).
 *
 *  Features:
 *   - Keyboard navigation (← → Esc)
 *   - Touch swipe
 *   - Thumbnail strip with auto-scroll
 *   - Teal progress bar
 *   - Loading spinner + fade-in
 *   - Body scroll lock
 * ──────────────────────────────────────────────────────────────────────────── */

export interface LightboxImage {
  /** Full URL (asset() result or blob URL) */
  src: string;
  /** Accessible alt text */
  alt: string;
  /** Optional thumbnail URL — defaults to `src` */
  thumbSrc?: string;
  /** Stable key for React — defaults to index */
  key?: string;
}

export interface ImageLightboxProps {
  images: LightboxImage[];
  /** Currently visible image index, or `null` when closed */
  index: number | null;
  /** Called when the lightbox wants to close */
  onClose: () => void;
  /** Called when the active index changes (prev/next/thumb click) */
  onIndexChange: (index: number) => void;
}

export function ImageLightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: ImageLightboxProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const count = images.length;
  const isOpen = index !== null && count > 0;

  /* ── Navigation helpers ─────────────────────────────────────────────────── */
  const goNext = useCallback(() => {
    if (index === null) return;
    setImageLoaded(false);
    onIndexChange((index + 1) % count);
  }, [index, count, onIndexChange]);

  const goPrev = useCallback(() => {
    if (index === null) return;
    setImageLoaded(false);
    onIndexChange((index - 1 + count) % count);
  }, [index, count, onIndexChange]);

  const goTo = useCallback(
    (i: number) => {
      if (i === index) return;
      setImageLoaded(false);
      onIndexChange(i);
    },
    [index, onIndexChange],
  );

  /* ── Keyboard ───────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose, goNext, goPrev]);

  /* ── Body scroll lock ───────────────────────────────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* ── Auto-scroll active thumbnail into view ─────────────────────────────── */
  useEffect(() => {
    if (index === null || !thumbsRef.current) return;
    const el = thumbsRef.current.children[index] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index]);

  /* ── Swipe ──────────────────────────────────────────────────────────────── */
  const onTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    setTouchStart(null);
  };

  /* ── Reset loaded state when index changes ──────────────────────────────── */
  useEffect(() => {
    setImageLoaded(false);
  }, [index]);

  /* ── Render ─────────────────────────────────────────────────────────────── */
  if (!isOpen) return null;

  const current = images[index];
  const progress = (index + 1) / count;

  return (
    <>
      <div
        className="fixed inset-0 z-[9999] flex flex-col bg-black/96"
        role="dialog"
        aria-modal="true"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* ── Teal progress bar ── */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-white/10">
          <div
            className="h-full bg-[#00AAAC] transition-all duration-300 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* ── Top bar ── */}
        <div className="flex shrink-0 items-center justify-between px-5 pb-2 pt-5">
          {/* Counter pill */}
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tabular-nums text-white/80 backdrop-blur-sm">
            {index + 1} / {count}
          </span>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white active:scale-95"
            aria-label="Close (Esc)"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── Main image area ── */}
        <div className="relative flex min-h-0 flex-1 items-center justify-center px-16 sm:px-24">
          {/* Prev button */}
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
              key={index}
              src={current.src}
              alt={current.alt}
              className={cn(
                "max-h-full max-w-full rounded-xl object-contain shadow-2xl transition-opacity duration-300",
                imageLoaded ? "opacity-100" : "opacity-0",
              )}
              draggable={false}
              onLoad={() => setImageLoaded(true)}
              style={{
                animation: imageLoaded ? "lb-fadein 0.2s ease" : "none",
              }}
            />
          </div>

          {/* Next button */}
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

        {/* ── Thumbnail strip ── */}
        {count > 1 && (
          <div className="shrink-0 px-5 pb-6 pt-4">
            <div
              ref={thumbsRef}
              className="flex justify-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {images.map((img, i) => {
                const isActive = i === index;
                return (
                  <button
                    key={img.key ?? i}
                    type="button"
                    onClick={() => goTo(i)}
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
                      src={img.thumbSrc ?? img.src}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

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
