import { useCallback, useEffect, useRef, useState } from "react";
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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);

  const lightboxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const currentImage = images[currentIndex];

  const MIN_ZOOM = 1;
  const MAX_ZOOM = 5;
  const ZOOM_STEP = 0.25;

  // ── Prevent body scroll ────────────────────────────────────────────────────
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // ── Reset zoom when image changes ──────────────────────────────────────────
  useEffect(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [currentIndex]);

  // ── Fullscreen ─────────────────────────────────────────────────────────────
  const toggleFullScreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await lightboxRef.current?.requestFullscreen().catch(() => {});
    } else {
      await document.exitFullscreen().catch(() => {});
    }
  }, []);

  // ── Pan bounds ─────────────────────────────────────────────────────────────
  const calculateBounds = useCallback(() => {
    if (!containerRef.current || !imageRef.current) return { maxX: 0, maxY: 0 };
    const container = containerRef.current.getBoundingClientRect();
    const img = imageRef.current;
    const maxX = Math.max(0, (img.naturalWidth * zoom - container.width) / 2);
    const maxY = Math.max(0, (img.naturalHeight * zoom - container.height) / 2);
    return { maxX, maxY };
  }, [zoom]);

  const clampPosition = useCallback(
    (x: number, y: number) => {
      const { maxX, maxY } = calculateBounds();
      return {
        x: Math.max(-maxX, Math.min(maxX, x)),
        y: Math.max(-maxY, Math.min(maxY, y)),
      };
    },
    [calculateBounds],
  );

  // ── Zoom ───────────────────────────────────────────────────────────────────
  const handleZoomChange = useCallback(
    (newZoom: number, centerX?: number, centerY?: number) => {
      const clamped = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));
      if (clamped === MIN_ZOOM) {
        setZoom(clamped);
        setPosition({ x: 0, y: 0 });
        return;
      }
      if (centerX !== undefined && centerY !== undefined && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const ox = centerX - rect.width / 2;
        const oy = centerY - rect.height / 2;
        const ratio = clamped / zoom;
        const nx = position.x * ratio - ox * (ratio - 1);
        const ny = position.y * ratio - oy * (ratio - 1);
        setZoom(clamped);
        requestAnimationFrame(() => setPosition(clampPosition(nx, ny)));
      } else {
        setZoom(clamped);
        setPosition((p) => clampPosition(p.x, p.y));
      }
    },
    [zoom, position, clampPosition],
  );

  const handleResetZoom = useCallback(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // ── Mouse wheel zoom ───────────────────────────────────────────────────────
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      handleZoomChange(
        zoom + (e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP),
        e.clientX - rect.left,
        e.clientY - rect.top,
      );
    },
    [zoom, handleZoomChange],
  );

  // ── Pan drag ───────────────────────────────────────────────────────────────
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (zoom <= 1) return;
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    },
    [zoom, position],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || zoom <= 1) return;
      setPosition(clampPosition(e.clientX - dragStart.x, e.clientY - dragStart.y));
    },
    [isDragging, zoom, dragStart, clampPosition],
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (!isDragging) return;
    const up = () => setIsDragging(false);
    window.addEventListener("mouseup", up);
    return () => window.removeEventListener("mouseup", up);
  }, [isDragging]);

  // ── Double-click toggle zoom ───────────────────────────────────────────────
  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      if (zoom > 1) {
        handleResetZoom();
      } else {
        handleZoomChange(2, e.clientX - rect.left, e.clientY - rect.top);
      }
    },
    [zoom, handleZoomChange, handleResetZoom],
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
      else if (e.key === "+" || e.key === "=") handleZoomChange(zoom + ZOOM_STEP);
      else if (e.key === "-") handleZoomChange(zoom - ZOOM_STEP);
      else if (e.key === "0") handleResetZoom();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, handlePrev, handleNext, zoom, handleZoomChange, handleResetZoom]);

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
            isDragging && "cursor-grabbing",
          )}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDoubleClick={handleDoubleClick}
        >
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
            style={
              !slideDirection
                ? {
                    transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                  }
                : undefined
            }
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
