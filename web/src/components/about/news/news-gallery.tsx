"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Images } from "lucide-react";
import type { IFile } from "@/types/file";
import { asset, cn } from "@/lib";
import { ImageLightbox } from "@/components/common";
import type { LightboxImage } from "@/components/common";

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

  const count = images.length;

  const open = (i: number) => setLightboxIndex(i);

  // Map IFile[] → LightboxImage[] for the shared lightbox
  const lightboxImages = useMemo<LightboxImage[]>(
    () =>
      images.map((img) => ({
        src: asset(img.path),
        alt: img.originalName,
        key: img.id,
      })),
    [images],
  );

  if (count === 0) return null;

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

      {/* ── Shared lightbox ── */}
      <ImageLightbox
        images={lightboxImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </>
  );
}
