"use client";

import { useState, useEffect, useRef } from "react";
import { X, ZoomIn, Plus, FileText } from "lucide-react";

interface FilePreviewGridProps {
  files: File[];
  onRemove: (index: number) => void;
  onAddFiles: (picked: File[]) => void;
  maxFiles?: number;
}

export function FilePreviewGrid({
  files,
  onRemove,
  onAddFiles,
  maxFiles = 5,
}: FilePreviewGridProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const addInputRef = useRef<HTMLInputElement>(null);

  // `urlMap` drives rendering; `urlMapRef` mirrors it so the unmount cleanup
  // can revoke without calling setState on an already-unmounted component.
  const [urlMap, setUrlMap] = useState<Map<File, string>>(() => new Map());
  const urlMapRef = useRef<Map<File, string>>(urlMap);

  useEffect(() => {
    const current = urlMapRef.current;
    const next = new Map(current);
    let changed = false;

    // Create object URLs for newly-added image files
    for (const file of files) {
      if (file.type.startsWith("image/") && !next.has(file)) {
        next.set(file, URL.createObjectURL(file));
        changed = true;
      }
    }

    // Revoke URLs for files that were removed from the list
    for (const [file, url] of current) {
      if (!files.includes(file)) {
        URL.revokeObjectURL(url);
        next.delete(file);
        changed = true;
      }
    }

    if (changed) {
      urlMapRef.current = next;
      setUrlMap(next);
    }
  }, [files]);

  // Revoke all remaining URLs on unmount via the ref (no setState needed)
  useEffect(() => {
    return () => {
      urlMapRef.current.forEach((url) => URL.revokeObjectURL(url));
      urlMapRef.current = new Map();
    };
  }, []);

  return (
    <>
      {/* Full-screen image preview overlay */}
      {previewUrl && (
        <div
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/88 p-6 backdrop-blur-sm"
          onClick={() => setPreviewUrl(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt="Preview"
            className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setPreviewUrl(null)}
            className="absolute right-4 top-4 rounded-full bg-white/20 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/35"
          >
            <X className="h-5 w-5" />
          </button>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-[11px] text-white/60 backdrop-blur-sm">
            Click anywhere to close
          </p>
        </div>
      )}

      {/* Hidden input for "add more" */}
      <input
        ref={addInputRef}
        type="file"
        accept="image/*,.pdf"
        multiple
        className="sr-only"
        onChange={(e) => {
          const picked = Array.from(e.target.files ?? []);
          if (picked.length) onAddFiles(picked);
          e.target.value = "";
        }}
      />

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {files.map((file, i) => {
          const isImage = file.type.startsWith("image/");
          const url = isImage ? (urlMap.get(file) ?? null) : null;
          return (
            <div key={i} className="group relative">
              {isImage ? (
                <button
                  type="button"
                  onClick={() => setPreviewUrl(url)}
                  className="relative block w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-100 shadow-sm transition hover:ring-2 hover:ring-primary hover:ring-offset-1"
                  title={file.name}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url ?? ""}
                    alt={file.name}
                    className="aspect-square w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/28">
                    <ZoomIn className="h-5 w-5 text-white opacity-0 drop-shadow transition-opacity group-hover:opacity-100" />
                  </div>
                </button>
              ) : (
                <div className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border border-red-100 bg-red-50 p-2 shadow-sm">
                  <FileText className="h-7 w-7 text-red-400" />
                  <span className="line-clamp-2 text-center text-[9px] font-medium leading-tight text-red-500">
                    {file.name}
                  </span>
                </div>
              )}

              {/* Remove button — appears on hover */}
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                title="Remove"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            </div>
          );
        })}

        {/* "Add more" tile */}
        {files.length < maxFiles && (
          <button
            type="button"
            onClick={() => addInputRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 transition-colors hover:border-primary/60 hover:bg-primary/5 hover:text-primary"
          >
            <Plus className="h-5 w-5" />
            <span className="text-[10px] font-medium">Add</span>
          </button>
        )}
      </div>

      <p className="mt-1.5 text-[11px] text-gray-400">
        {files.length} / {maxFiles} files
      </p>
    </>
  );
}
