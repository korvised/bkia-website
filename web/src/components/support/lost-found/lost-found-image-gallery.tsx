"use client";

import { useState } from "react";
import Image from "next/image";
import { IFile } from "@/types/file";
import { asset, cn } from "@/lib";

interface LostFoundImageGalleryProps {
  images: IFile[];
  itemName: string;
  fallback?: React.ReactNode;
}

export function LostFoundImageGallery({
  images,
  itemName,
  fallback,
}: LostFoundImageGalleryProps) {
  const [selected, setSelected] = useState(0);

  if (images.length === 0) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-50">
        <div className="flex h-full items-center justify-center">{fallback}</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main image — aspect ratio keeps shape responsive; object-contain shows full item */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-50">
        <Image
          key={images[selected].id}
          src={asset(images[selected].path)}
          alt={`${itemName} — ${selected + 1} / ${images.length}`}
          fill
          className="object-contain p-3 transition-opacity duration-200"
          priority={selected === 0}
        />
        {/* Counter */}
        {images.length > 1 && (
          <span className="absolute right-3 bottom-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white">
            {selected + 1} / {images.length}
          </span>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            /* Wrapper provides the teal "border" as background-through-padding.
               No box-shadow → no overlap with adjacent thumbnails. */
            <div
              key={img.id}
              className={cn(
                "h-20 w-20 shrink-0 rounded-xl transition-all",
                i === selected
                  ? "bg-[#00AAAC] p-[2px]"
                  : "bg-transparent p-0",
              )}
            >
              <button
                type="button"
                onClick={() => setSelected(i)}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  "relative block h-full w-full overflow-hidden bg-gray-100 transition-opacity",
                  i === selected
                    ? "rounded-[10px] opacity-100"
                    : "rounded-xl opacity-50 hover:opacity-90",
                )}
              >
                <Image
                  src={asset(img.path)}
                  alt={img.originalName}
                  fill
                  className="object-cover"
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
