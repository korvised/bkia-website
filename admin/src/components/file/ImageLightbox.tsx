import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import {
  HiArrowsPointingOut,
  HiChevronLeft,
  HiChevronRight,
  HiMagnifyingGlassMinus,
  HiMagnifyingGlassPlus,
  HiXMark,
} from "react-icons/hi2";
import type { IFile } from "@/types";
import { asset } from "@/lib";

// ─── Types ───────────────────────────────────────────────────────────────────

/** Local preview file (not yet uploaded — has an object URL) */
export interface IFilePreview {
  id?: string;
  url: string;
  name: string;
}

export type ImageFile = IFile | IFilePreview;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const isFilePreview = (file: ImageFile): file is IFilePreview =>
  "url" in file;

const getImageUrl = (file: ImageFile): string =>
  isFilePreview(file) ? file.url : asset(file.path);

const getImageName = (file: ImageFile): string =>
  isFilePreview(file) ? file.name : file.originalName;

const getImageId = (file: ImageFile, index: number): string =>
  isFilePreview(file) ? (file.id ?? String(index)) : file.id;

// ─── Props ───────────────────────────────────────────────────────────────────

interface Props {
  images: ImageFile[];
  initialIndex?: number;
  onClose: () => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

export const ImageLightbox: React.FC<Props> = ({
  images,
  initialIndex = 0,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false); // cursor class only
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);

  const lightboxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Live pan position & zoom mirror — updated imperatively, never cause re-renders
  const positionRef = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(1);

  const currentImage = images[currentIndex];

  const MIN_ZOOM = 1;
  const MAX_ZOOM = 5;
  const ZOOM_STEP = 0.25;

  // Keep zoomRef in sync with zoom state
  useEffect(() => { zoomRef.current = zoom; }, [zoom]);

  // ── Prevent body scroll ────────────────────────────────────────────────────
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // ── Reset zoom & position when image changes ───────────────────────────────
  useEffect(() => {
    positionRef.current = { x: 0, y: 0 };
    zoomRef.current = MIN_ZOOM;
    setZoom(MIN_ZOOM);
  }, [currentIndex]);

  // ── Apply transform to DOM directly ───────────────────────────────────────
  // Called imperatively during drag (zero re-renders) and from useLayoutEffect.
  const applyTransform = useCallback(() => {
    if (!imageRef.current) return;
    const z = zoomRef.current;
    const { x, y } = positionRef.current;
    imageRef.current.style.transform = `scale(${z}) translate(${x / z}px, ${y / z}px)`;
  }, []);

  // Re-sync DOM transform after every React render.
  // During drag there are NO renders, so this never conflicts with applyTransform().
  useLayoutEffect(() => {
    if (!imageRef.current) return;
    if (slideDirection) {
      // Let CSS slide classes (translate-x / opacity) control the transform
      imageRef.current.style.transform = "";
    } else {
      applyTransform();
    }
  });

  // ── Fullscreen ─────────────────────────────────────────────────────────────
  const toggleFullScreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await lightboxRef.current?.requestFullscreen().catch(() => {});
    } else {
      await document.exitFullscreen().catch(() => {});
    }
  }, []);

  // ── Pan bounds (reads zoomRef, stable — no deps) ───────────────────────────
  const calculateBounds = useCallback(() => {
    if (!containerRef.current || !imageRef.current) return { maxX: 0, maxY: 0 };
    const container = containerRef.current.getBoundingClientRect();
    const img = imageRef.current;
    const z = zoomRef.current;
    const maxX = Math.max(0, (img.naturalWidth * z - container.width) / 2);
    const maxY = Math.max(0, (img.naturalHeight * z - container.height) / 2);
    return { maxX, maxY };
  }, []);

  const clampXY = useCallback((x: number, y: number) => {
    const { maxX, maxY } = calculateBounds();
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  }, [calculateBounds]);

  // ── Zoom ───────────────────────────────────────────────────────────────────
  const handleZoomChange = useCallback(
    (newZoom: number, centerX?: number, centerY?: number) => {
      const clamped = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));

      if (clamped === MIN_ZOOM) {
        positionRef.current = { x: 0, y: 0 };
        zoomRef.current = clamped;
        setZoom(clamped);
        return;
      }

      if (centerX !== undefined && centerY !== undefined && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const ox = centerX - rect.width / 2;
        const oy = centerY - rect.height / 2;
        const ratio = clamped / zoomRef.current;
        const nx = positionRef.current.x * ratio - ox * (ratio - 1);
        const ny = positionRef.current.y * ratio - oy * (ratio - 1);
        zoomRef.current = clamped;
        positionRef.current = clampXY(nx, ny);
      } else {
        zoomRef.current = clamped;
        positionRef.current = clampXY(positionRef.current.x, positionRef.current.y);
      }

      setZoom(clamped); // triggers render → useLayoutEffect applies new transform
    },
    [clampXY],
  );

  const handleResetZoom = useCallback(() => {
    positionRef.current = { x: 0, y: 0 };
    zoomRef.current = MIN_ZOOM;
    setZoom(MIN_ZOOM);
  }, []);

  // ── Mouse wheel zoom ───────────────────────────────────────────────────────
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      handleZoomChange(
        zoomRef.current + (e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP),
        e.clientX - rect.left,
        e.clientY - rect.top,
      );
    },
    [handleZoomChange],
  );

  // ── Pan drag ───────────────────────────────────────────────────────────────
  // Key fix: attach mousemove + mouseup to WINDOW (not React container div).
  // This avoids the bug where setIsDragging(true) triggers a React re-render,
  // which causes the browser to fire a spurious `mouseleave` on the container
  // and immediately cancel the drag via onMouseLeave.
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (zoomRef.current <= 1) return;
      e.preventDefault();

      // Capture drag origin relative to current pan position
      const startX = e.clientX - positionRef.current.x;
      const startY = e.clientY - positionRef.current.y;

      setIsDragging(true); // re-render for cursor class only

      const onMove = (ev: MouseEvent) => {
        const { maxX, maxY } = calculateBounds();
        positionRef.current = {
          x: Math.max(-maxX, Math.min(maxX, ev.clientX - startX)),
          y: Math.max(-maxY, Math.min(maxY, ev.clientY - startY)),
        };
        applyTransform(); // direct DOM write — zero React re-renders
      };

      const onUp = () => {
        setIsDragging(false);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };

      // Native window listeners — survive React re-renders and work even when
      // the cursor moves outside the container element
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [calculateBounds, applyTransform],
  );

  // ── Double-click toggle zoom ───────────────────────────────────────────────
  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      if (zoomRef.current > 1) {
        handleResetZoom();
      } else {
        handleZoomChange(2, e.clientX - rect.left, e.clientY - rect.top);
      }
    },
    [handleZoomChange, handleResetZoom],
  );

  // ── Navigation ─────────────────────────────────────────────────────────────
  const handlePrev = useCallback(() => {
    if (images.length <= 1) return;
    setSlideDirection("right");
    setTimeout(() => {
      setCurrentIndex((p) => (p === 0 ? images.length - 1 : p - 1));
      setSlideDirection(null);
    }, 150);
  }, [images.length]);

  const handleNext = useCallback(() => {
    if (images.length <= 1) return;
    setSlideDirection("left");
    setTimeout(() => {
      setCurrentIndex((p) => (p === images.length - 1 ? 0 : p + 1));
      setSlideDirection(null);
    }, 150);
  }, [images.length]);

  const goToIndex = useCallback(
    (index: number) => {
      if (index === currentIndex) return;
      setSlideDirection(index > currentIndex ? "left" : "right");
      setTimeout(() => {
        setCurrentIndex(index);
        setSlideDirection(null);
      }, 150);
    },
    [currentIndex],
  );

  // ── Keyboard ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
      else if (e.key === "+" || e.key === "=") handleZoomChange(zoomRef.current + ZOOM_STEP);
      else if (e.key === "-") handleZoomChange(zoomRef.current - ZOOM_STEP);
      else if (e.key === "0") handleResetZoom();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, handlePrev, handleNext, handleZoomChange, handleResetZoom]);

  // ── Render ─────────────────────────────────────────────────────────────────
  return createPortal(
    <div
      ref={lightboxRef}
      className="fixed inset-0 z-[9999] flex flex-col bg-black"
    >
      {/* ── Top bar ── */}
      <div className="flex shrink-0 items-center justify-between px-4 py-3">
        {/* Counter */}
        <div className="text-sm text-white/70">
          <span className="font-medium text-white">{currentIndex + 1}</span>
          <span> / {images.length}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleZoomChange(zoom - ZOOM_STEP)}
            disabled={zoom <= MIN_ZOOM}
            className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30"
            title="Zoom out (-)"
          >
            <HiMagnifyingGlassMinus className="h-5 w-5" />
          </button>

          <button
            onClick={handleResetZoom}
            className="min-w-[4rem] rounded-full px-2 py-1 text-center text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            title="Reset zoom (0)"
          >
            {Math.round(zoom * 100)}%
          </button>

          <button
            onClick={() => handleZoomChange(zoom + ZOOM_STEP)}
            disabled={zoom >= MAX_ZOOM}
            className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30"
            title="Zoom in (+)"
          >
            <HiMagnifyingGlassPlus className="h-5 w-5" />
          </button>

          <button
            onClick={toggleFullScreen}
            className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            title="Fullscreen"
          >
            <HiArrowsPointingOut className="h-5 w-5" />
          </button>

          <div className="mx-2 h-6 w-px bg-white/20" />

          <button
            onClick={onClose}
            className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            title="Close (Esc)"
          >
            <HiXMark className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* ── Image area ── */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-4 z-20 rounded-full bg-black/40 p-3 text-white/80 backdrop-blur-sm transition-all hover:bg-black/60 hover:text-white"
          >
            <HiChevronLeft className="h-8 w-8" />
          </button>
        )}

        <div
          ref={containerRef}
          className={clsx(
            "flex h-full w-full items-center justify-center overflow-hidden",
            zoom > 1 ? "cursor-grab" : "cursor-zoom-in",
            isDragging && "!cursor-grabbing",
          )}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onDoubleClick={handleDoubleClick}
        >
          {/* Transform applied imperatively — no React style prop needed */}
          <img
            ref={imageRef}
            key={getImageId(currentImage, currentIndex)}
            src={getImageUrl(currentImage)}
            alt={getImageName(currentImage)}
            className={clsx(
              "max-h-[75vh] max-w-[85vw] rounded object-contain shadow-2xl select-none",
              !isDragging && "transition-all duration-200",
              slideDirection === "left" && "translate-x-[-100px] opacity-0",
              slideDirection === "right" && "translate-x-[100px] opacity-0",
            )}
            draggable={false}
          />
        </div>

        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-4 z-20 rounded-full bg-black/40 p-3 text-white/80 backdrop-blur-sm transition-all hover:bg-black/60 hover:text-white"
          >
            <HiChevronRight className="h-8 w-8" />
          </button>
        )}
      </div>

      {/* ── Footer — filename & hint ── */}
      <div className="shrink-0 px-4 py-2 text-center">
        <p className="truncate text-sm text-white/70">
          {getImageName(currentImage)}
        </p>
        <p className="mt-0.5 text-xs text-white/30">
          Scroll to zoom · Drag to pan · Double-click to toggle zoom
        </p>
      </div>

      {/* ── Thumbnails ── */}
      {images.length > 1 && (
        <div className="flex shrink-0 justify-center gap-2 px-4 pb-4">
          <div className="flex max-w-full gap-2 overflow-x-auto rounded-lg bg-white/5 p-2">
            {images.map((img, idx) => (
              <button
                key={getImageId(img, idx)}
                onClick={() => goToIndex(idx)}
                className={clsx(
                  "relative h-14 w-14 shrink-0 overflow-hidden rounded-md transition-all",
                  idx === currentIndex
                    ? "ring-2 ring-white ring-offset-2 ring-offset-black/50"
                    : "opacity-50 hover:opacity-80",
                )}
              >
                <img
                  src={getImageUrl(img)}
                  alt={getImageName(img)}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>,
    document.body,
  );
};
