import { useEffect, useRef, useState } from "react";
import {
  LuEye,
  LuGripVertical,
  LuImage,
  LuImages,
  LuPencilLine,
  LuPlus,
  LuTrash2,
  LuX,
} from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Input, Select } from "@/components/ui";
import { asset, cn } from "@/lib";
import { NewsCategory } from "@/types";
import type { IFile } from "@/types";
import type {
  INews,
  INewsForm,
  INewsSubmitPayload,
} from "@/features/news/types";

// ─── Constants ─────────────────────────────────────────────────────────────

const LANG_TABS = [
  { key: "en" as const, label: "EN" },
  { key: "lo" as const, label: "ລາວ" },
  { key: "zh" as const, label: "中文" },
];

const CATEGORY_OPTIONS = [
  { value: NewsCategory.AIRPORT_UPDATE, label: "Airport Update" },
  { value: NewsCategory.FLIGHT_SERVICE, label: "Flight Service" },
  { value: NewsCategory.EVENT, label: "Event" },
  { value: NewsCategory.ANNOUNCEMENT, label: "Announcement" },
  { value: NewsCategory.SUSTAINABILITY, label: "Sustainability" },
  { value: NewsCategory.TECHNOLOGY, label: "Technology" },
  { value: NewsCategory.COMMUNITY, label: "Community" },
];

const emptyForm = (): INewsForm => ({
  slug: "",
  title: { en: "", lo: "", zh: "" },
  excerpt: { en: "", lo: "", zh: "" },
  content: { en: "", lo: "", zh: "" },
  category: "",
  author: "",
  publishDate: new Date().toISOString().split("T")[0],
  isFeatured: false,
  featuredIndex: null,
  isPublished: false,
  tags: [],
  metaDescription: { en: "", lo: "", zh: "" },
  coverImageFile: null,
  galleryFiles: [],
  existingImages: [],
});

// ─── Props ──────────────────────────────────────────────────────────────────

interface Props {
  defaultValues?: INews;
  onSubmit: (payload: INewsSubmitPayload) => Promise<void>;
  isLoading: boolean;
  submitLabel?: string;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ─── Unified gallery entry ───────────────────────────────────────────────────

type GalleryEntry =
  | { kind: "existing"; data: IFile }
  | { kind: "new"; data: File; preview: string };

// ─── Gallery Modal ───────────────────────────────────────────────────────────

interface GalleryModalProps {
  entries: GalleryEntry[];
  draggingId: string | null;
  recentlyMovedId: string | null;
  error?: string;
  onDragStart: (i: number) => void;
  onDragEnter: (i: number) => void;
  onDragEnd: () => void;
  onRemove: (i: number) => void;
  onAddFiles: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  getEntryId: (entry: GalleryEntry) => string;
}

function GalleryModal({
  entries,
  draggingId,
  recentlyMovedId,
  error,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onRemove,
  onAddFiles,
  onClose,
  getEntryId,
}: GalleryModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const canAdd = entries.length < 20;

  // Lock body scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      {/* Full-screen panel */}
      <div className="relative flex h-full w-full flex-col bg-white">

        {/* Header */}
        <div className="shrink-0 border-b border-gray-100 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Gallery Images</h2>
            <p className="mt-0.5 text-xs text-gray-400">
              {entries.length === 0
                ? "No images yet — add up to 20"
                : `${entries.length}/20 images · drag to reorder`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {canAdd && (
              <>
                <input
                  ref={inputRef}
                  id="gallery-modal-input"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={onAddFiles}
                  className="hidden"
                />
                <label
                  htmlFor="gallery-modal-input"
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-dashed border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
                >
                  <LuPlus className="h-4 w-4" />
                  Add images
                </label>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600"
            >
              Done
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-1 rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <LuX className="h-4 w-4" />
            </button>
          </div>
        </div>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-6">
          {error && (
            <p className="mb-4 rounded-lg bg-red-50 px-4 py-2.5 text-xs text-red-600">{error}</p>
          )}

          {entries.length === 0 ? (
            <label
              htmlFor="gallery-modal-input"
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 py-16 text-center transition-colors hover:border-primary hover:bg-primary/5"
            >
              <LuImages className="mb-3 h-10 w-10 text-gray-300" />
              <p className="text-sm font-medium text-gray-400">Click to add images</p>
              <p className="mt-1 text-xs text-gray-300">JPG, PNG, WebP · max 10 MB each · up to 20</p>
            </label>
          ) : (
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7">
              {entries.map((entry, i) => {
                const entryId = getEntryId(entry);
                const src = entry.kind === "existing" ? asset(entry.data.path) : entry.preview;
                const alt = entry.kind === "existing" ? entry.data.originalName : entry.data.name;
                const isDragging = entryId === draggingId;
                const wasMoved = entryId === recentlyMovedId;
                const isNew = entry.kind === "new";

                return (
                  <div
                    key={entryId}
                    draggable
                    onDragStart={() => onDragStart(i)}
                    onDragEnter={() => onDragEnter(i)}
                    onDragEnd={onDragEnd}
                    onDragOver={(e) => e.preventDefault()}
                    className={cn(
                      "group relative aspect-square cursor-grab overflow-hidden rounded-xl bg-gray-100 transition-all duration-200 active:cursor-grabbing",
                      isDragging && "opacity-40 scale-95",
                      wasMoved && "ring-2 ring-primary ring-offset-2",
                    )}
                  >
                    <img
                      src={src}
                      alt={alt}
                      draggable={false}
                      className="h-full w-full object-cover"
                    />

                    {/* Order badge */}
                    <span
                      className={cn(
                        "absolute left-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white transition-colors duration-300",
                        wasMoved ? "bg-primary" : "bg-black/60",
                      )}
                    >
                      {i + 1}
                    </span>

                    {/* New badge */}
                    {isNew && (
                      <span className="absolute right-1.5 top-1.5 rounded bg-primary/90 px-1 py-0.5 text-[9px] font-bold uppercase text-white">
                        New
                      </span>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/50 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <LuGripVertical className="h-4 w-4 text-white/70" />
                      <button
                        type="button"
                        onClick={() => onRemove(i)}
                        className="rounded-lg bg-red-500 p-1.5 text-white transition-colors hover:bg-red-600"
                        title="Remove"
                      >
                        <LuTrash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Add-more tile */}
              {canAdd && (
                <label
                  htmlFor="gallery-modal-input"
                  className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 text-gray-300 transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
                >
                  <LuPlus className="h-6 w-6" />
                </label>
              )}
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Component ──────────────────────────────────────────────────────────────

export function NewsForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel = "Save Article",
}: Props) {
  const [form, setForm] = useState<INewsForm>(emptyForm);
  const [activeLang, setActiveLang] = useState<"en" | "lo" | "zh">("en");
  const [contentMode, setContentMode] = useState<"write" | "preview">("write");
  const [tagDraft, setTagDraft] = useState<string>("");
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [galleryOrder, setGalleryOrder] = useState<GalleryEntry[]>([]);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [recentlyMovedId, setRecentlyMovedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragIndex = useRef<number | null>(null);

  // Pre-populate when editing
  useEffect(() => {
    if (defaultValues) {
      setForm({
        slug: defaultValues.slug ?? "",
        title: defaultValues.title ?? { en: "", lo: "", zh: "" },
        excerpt: defaultValues.excerpt
          ? { en: defaultValues.excerpt.en ?? "", lo: defaultValues.excerpt.lo ?? "", zh: defaultValues.excerpt.zh ?? "" }
          : { en: "", lo: "", zh: "" },
        content: defaultValues.content ?? { en: "", lo: "", zh: "" },
        category: defaultValues.category ?? "",
        author: defaultValues.author ?? "",
        publishDate: defaultValues.publishDate
          ? defaultValues.publishDate.split("T")[0]
          : "",
        isFeatured: defaultValues.isFeatured ?? false,
        featuredIndex: defaultValues.featuredIndex ?? null,
        isPublished: defaultValues.isPublished ?? false,
        tags: defaultValues.tags ?? [],
        metaDescription: defaultValues.metaDescription ?? { en: "", lo: "", zh: "" },
        coverImageFile: null,
        existingImages: defaultValues.images ?? [],
        galleryFiles: [],
      });
      setGalleryOrder(
        (defaultValues.images ?? []).map((img) => ({ kind: "existing", data: img })),
      );
      setCoverPreview(defaultValues.coverImage?.path ? asset(defaultValues.coverImage.path) : null);
    } else {
      setForm(emptyForm());
      setGalleryOrder([]);
      setCoverPreview(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues?.id]);

  // Close gallery modal on Escape
  useEffect(() => {
    if (!galleryOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setGalleryOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [galleryOpen]);

  // ── Handlers ────────────────────────────────────────────────────────────

  const setMultilingual = (
    field: "title" | "excerpt" | "content" | "metaDescription",
    lang: "en" | "lo" | "zh",
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value },
    }));
  };

  const handleTitleChange = (value: string) => {
    setMultilingual("title", activeLang, value);
    if (activeLang === "en" && !defaultValues && !form.slug) {
      setForm((prev) => ({ ...prev, slug: slugify(value) }));
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, coverImage: `File "${file.name}" exceeds the 5 MB limit (${(file.size / 1024 / 1024).toFixed(1)} MB).` }));
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setErrors((prev) => { const { coverImage: _, ...rest } = prev; return rest; });
    setForm((prev) => ({ ...prev, coverImageFile: file }));
    setCoverPreview(URL.createObjectURL(file));
  };

  const removeCoverImage = () => {
    setForm((prev) => ({ ...prev, coverImageFile: null }));
    setCoverPreview(defaultValues?.coverImage?.path ? asset(defaultValues.coverImage.path) : null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const addTag = () => {
    const trimmed = tagDraft.trim();
    if (!trimmed) return;
    setForm((prev) => ({ ...prev, tags: [...prev.tags, trimmed] }));
    setTagDraft("");
  };

  const removeTag = (index: number) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleGalleryFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    if (!picked.length) return;
    const oversized = picked.filter((f) => f.size > 10 * 1024 * 1024);
    const valid = picked.filter((f) => f.size <= 10 * 1024 * 1024);
    if (oversized.length > 0) {
      setErrors((prev) => ({
        ...prev,
        gallery: `${oversized.length} file(s) exceed 10 MB and were skipped: ${oversized.map((f) => f.name).join(", ")}.`,
      }));
    } else {
      setErrors((prev) => { const { gallery: _, ...rest } = prev; return rest; });
    }
    const allowed = Math.max(0, 20 - galleryOrder.length);
    const newEntries: GalleryEntry[] = valid.slice(0, allowed).map((file) => ({
      kind: "new",
      data: file,
      preview: URL.createObjectURL(file),
    }));
    setGalleryOrder((prev) => [...prev, ...newEntries]);
    e.target.value = "";
  };

  const removeGalleryEntry = (i: number) =>
    setGalleryOrder((prev) => prev.filter((_, j) => j !== i));

  const getEntryId = (entry: GalleryEntry) =>
    entry.kind === "existing" ? entry.data.id : entry.preview;

  const handleGalleryDragStart = (i: number) => {
    dragIndex.current = i;
    setDraggingId(getEntryId(galleryOrder[i]));
  };
  const handleGalleryDragEnter = (i: number) => {
    if (dragIndex.current === null || dragIndex.current === i) return;
    const from = dragIndex.current;
    dragIndex.current = i;
    setGalleryOrder((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(i, 0, moved);
      return next;
    });
  };
  const handleGalleryDragEnd = () => {
    const movedId = draggingId;
    dragIndex.current = null;
    setDraggingId(null);
    if (movedId) setRecentlyMovedId(movedId);
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.slug.trim()) errs.slug = "Slug is required.";
    if (!form.title.en?.trim() && !form.title.lo?.trim())
      errs.title = "Title is required in at least one language (EN or ລາວ).";
    if (!form.category) errs.category = "Category is required.";
    if (!form.publishDate) errs.publishDate = "Publish date is required.";
    if (!defaultValues && !form.coverImageFile)
      errs.coverImage = "Cover image is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const hasExcerpt = Object.values(form.excerpt).some((v) => v?.trim());
    const hasMeta = Object.values(form.metaDescription).some((v) => v?.trim());
    const existingImages = galleryOrder
      .filter((e): e is { kind: "existing"; data: IFile } => e.kind === "existing")
      .map((e) => e.data);
    const galleryFiles = galleryOrder
      .filter((e): e is { kind: "new"; data: File; preview: string } => e.kind === "new")
      .map((e) => e.data);
    await onSubmit({
      slug: form.slug.trim(),
      title: form.title,
      excerpt: hasExcerpt ? form.excerpt : null,
      content: form.content,
      category: form.category as NewsCategory,
      author: form.author.trim() || null,
      publishDate: form.publishDate,
      isFeatured: form.isFeatured,
      featuredIndex: form.featuredIndex,
      isPublished: form.isPublished,
      tags: form.tags,
      metaDescription: hasMeta ? form.metaDescription : null,
      coverImageFile: form.coverImageFile,
      galleryFiles,
      existingImages,
    });
  };

  const activeLangLabel = LANG_TABS.find((t) => t.key === activeLang)?.label;
  const langFont = activeLang === "en" ? "font-en" : activeLang === "lo" ? "font-lo" : "font-zh";

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ── Cover Image ── */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
            Cover Image <span className="text-red-500">*</span>
          </h3>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="relative w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-100 sm:w-72 shrink-0">
              {coverPreview ? (
                <>
                  <img
                    src={coverPreview}
                    alt="Cover preview"
                    className="h-auto w-full object-contain"
                  />
                  {form.coverImageFile && (
                    <button
                      type="button"
                      onClick={removeCoverImage}
                      className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white transition-colors hover:bg-black/70"
                    >
                      <LuX className="h-4 w-4" />
                    </button>
                  )}
                </>
              ) : (
                <div className="flex h-40 flex-col items-center justify-center gap-2 text-gray-400">
                  <LuImage className="h-10 w-10" />
                  <span className="text-xs">No image selected</span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-sm text-gray-600">
                {defaultValues
                  ? "Upload a new image to replace the current cover."
                  : "Upload a cover image for this news article."}
              </p>
              <p className="text-xs text-gray-400">
                Accepted: JPG, PNG, WebP. Max size: 5 MB. Recommended: 1200×630px.
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleCoverImageChange}
                className="hidden"
                id="cover-image-input"
              />
              <label
                htmlFor="cover-image-input"
                className="inline-flex cursor-pointer items-center gap-2 self-start rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <LuImage className="h-4 w-4" />
                {coverPreview ? "Change Image" : "Upload Image"}
              </label>
              {errors.coverImage && (
                <p className="text-xs text-red-500">{errors.coverImage}</p>
              )}
            </div>
          </div>
        </div>

        {/* ── Gallery Images (compact summary row) ── */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                <LuImages className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Gallery Images
                  <span className="ml-2 text-xs font-normal text-gray-400">(optional)</span>
                </p>
                {galleryOrder.length === 0 ? (
                  <p className="text-xs text-gray-400">No images added yet</p>
                ) : (
                  <p className="text-xs text-gray-500">
                    {galleryOrder.length} image{galleryOrder.length !== 1 ? "s" : ""}
                    {galleryOrder.filter((e) => e.kind === "new").length > 0 && (
                      <span className="ml-1 text-primary">
                        (+{galleryOrder.filter((e) => e.kind === "new").length} new)
                      </span>
                    )}
                  </p>
                )}
              </div>

              {/* Thumbnail strip — first 5 images */}
              {galleryOrder.length > 0 && (
                <div className="hidden items-center gap-1 sm:flex">
                  {galleryOrder.slice(0, 5).map((entry, i) => {
                    const src = entry.kind === "existing" ? asset(entry.data.path) : entry.preview;
                    const isNew = entry.kind === "new";
                    return (
                      <div
                        key={getEntryId(entry)}
                        className={cn(
                          "relative h-8 w-8 overflow-hidden rounded-md border border-gray-200 bg-gray-100",
                          isNew && "ring-1 ring-primary/60",
                        )}
                      >
                        <img src={src} alt="" className="h-full w-full object-cover" />
                        {i === 4 && galleryOrder.length > 5 && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-[9px] font-bold text-white">
                            +{galleryOrder.length - 5}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setGalleryOpen(true)}
              className="shrink-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-primary hover:text-primary"
            >
              {galleryOrder.length === 0 ? "Add Images" : "Manage Gallery"}
            </button>
          </div>

          {errors.gallery && (
            <p className="mt-2 text-xs text-red-500">{errors.gallery}</p>
          )}
        </div>

        {/* ── Slug ── */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
            URL Slug
          </h3>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Slug <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="e.g. new-terminal-opening-2025"
              value={form.slug}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, slug: slugify(e.target.value) }))
              }
            />
            <p className="mt-1 text-xs text-gray-400">
              Lowercase letters, numbers, and hyphens only. Auto-filled from EN title.
            </p>
            {errors.slug && (
              <p className="mt-1 text-xs text-red-500">{errors.slug}</p>
            )}
          </div>
        </div>

        {/* ── Multilingual Content ── */}
        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center gap-1 border-b border-gray-200 px-6 pt-4">
            {LANG_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveLang(tab.key)}
                className={cn(
                  "rounded-t-md px-4 py-2 text-sm font-medium transition-colors",
                  activeLang === tab.key
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-500 hover:text-gray-700",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className={`space-y-4 p-6 ${langFont}`}>
            {/* Title */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Title{" "}
                <span className="font-normal text-gray-400">({activeLangLabel})</span>
              </label>
              <Input
                placeholder={`Enter title in ${activeLangLabel}...`}
                value={form.title[activeLang] ?? ""}
                onChange={(e) => handleTitleChange(e.target.value)}
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Excerpt */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Excerpt{" "}
                <span className="font-normal text-gray-400">({activeLangLabel})</span>
              </label>
              <textarea
                placeholder={`Short summary in ${activeLangLabel}...`}
                value={form.excerpt[activeLang] ?? ""}
                onChange={(e) => setMultilingual("excerpt", activeLang, e.target.value)}
                rows={3}
                className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Content with Write/Preview */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Content{" "}
                  <span className="font-normal text-gray-400">
                    ({activeLangLabel}) — Markdown supported
                  </span>
                </label>
                <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 p-0.5">
                  <button
                    type="button"
                    onClick={() => setContentMode("write")}
                    className={cn(
                      "flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-colors",
                      contentMode === "write"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700",
                    )}
                  >
                    <LuPencilLine className="h-3.5 w-3.5" />
                    Write
                  </button>
                  <button
                    type="button"
                    onClick={() => setContentMode("preview")}
                    className={cn(
                      "flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-colors",
                      contentMode === "preview"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700",
                    )}
                  >
                    <LuEye className="h-3.5 w-3.5" />
                    Preview
                  </button>
                </div>
              </div>

              {contentMode === "write" ? (
                <textarea
                  placeholder={`Full article content (markdown) in ${activeLangLabel}...`}
                  value={form.content[activeLang] ?? ""}
                  onChange={(e) => setMultilingual("content", activeLang, e.target.value)}
                  rows={14}
                  className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                />
              ) : (
                <div className="min-h-[200px] rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                  {form.content[activeLang]?.trim() ? (
                    <div className="markdown-preview prose max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {form.content[activeLang] ?? ""}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm italic text-gray-400">
                      Nothing to preview — write some markdown content first.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Meta Description */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Meta Description{" "}
                <span className="font-normal text-gray-400">
                  ({activeLangLabel}) — SEO, optional
                </span>
              </label>
              <textarea
                placeholder={`SEO meta description in ${activeLangLabel}...`}
                value={form.metaDescription[activeLang] ?? ""}
                onChange={(e) =>
                  setMultilingual("metaDescription", activeLang, e.target.value)
                }
                rows={2}
                className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* ── Details ── */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
            Details
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Category */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <Select
                placeholder="Select category"
                value={form.category}
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, category: value as NewsCategory }))
                }
                options={CATEGORY_OPTIONS}
              />
              {errors.category && (
                <p className="mt-1 text-xs text-red-500">{errors.category}</p>
              )}
            </div>

            {/* Author */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Author{" "}
                <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <Input
                placeholder="e.g. Airport Communications Team"
                value={form.author}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, author: e.target.value }))
                }
              />
            </div>

            {/* Publish Date */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Publish Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={form.publishDate}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, publishDate: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
              {errors.publishDate && (
                <p className="mt-1 text-xs text-red-500">{errors.publishDate}</p>
              )}
            </div>
          </div>

          {/* Toggles */}
          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:gap-8">
            {/* isFeatured */}
            <div className="flex items-start gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={form.isFeatured}
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    isFeatured: !prev.isFeatured,
                    featuredIndex: !prev.isFeatured ? prev.featuredIndex : null,
                  }))
                }
                className={cn(
                  "relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  form.isFeatured ? "bg-primary" : "bg-gray-300",
                )}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform",
                    form.isFeatured ? "translate-x-6" : "translate-x-1",
                  )}
                />
              </button>
              <div>
                <span className="text-sm font-medium text-gray-700">Featured</span>
                <p className="text-xs text-gray-400">Show prominently on the news page</p>
                {form.isFeatured && (
                  <div className="mt-2">
                    <label className="mb-1 block text-xs font-medium text-gray-500">
                      Display order{" "}
                      <span className="font-normal text-gray-400">(1 = first, blank = auto)</span>
                    </label>
                    <input
                      type="number"
                      min={1}
                      step={1}
                      placeholder="e.g. 1"
                      value={form.featuredIndex ?? ""}
                      onChange={(e) => {
                        const v = e.target.value;
                        setForm((prev) => ({
                          ...prev,
                          featuredIndex: v === "" ? null : Math.max(1, parseInt(v, 10) || 1),
                        }));
                      }}
                      className="w-24 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-900 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* isPublished */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={form.isPublished}
                onClick={() =>
                  setForm((prev) => ({ ...prev, isPublished: !prev.isPublished }))
                }
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  form.isPublished ? "bg-primary" : "bg-gray-300",
                )}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform",
                    form.isPublished ? "translate-x-6" : "translate-x-1",
                  )}
                />
              </button>
              <div>
                <span className="text-sm font-medium text-gray-700">
                  {form.isPublished ? "Published" : "Draft"}
                </span>
                <p className="text-xs text-gray-400">
                  {form.isPublished
                    ? "Visible on the public website"
                    : "Hidden from the public website"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tags ── */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
            Tags
          </h3>

          {form.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {form.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="rounded-full p-0.5 transition-colors hover:bg-primary/10"
                  >
                    <LuX className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <Input
              placeholder="e.g. New Terminal"
              value={tagDraft}
              onChange={(e) => setTagDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
            />
            <button
              type="button"
              onClick={addTag}
              className="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600"
            >
              <LuPlus className="h-4 w-4" />
              Add
            </button>
          </div>
        </div>

        {/* ── Submit ── */}
        <div className="flex items-center justify-end gap-3 rounded-xl border border-gray-200 bg-white p-4">
          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-colors",
              isLoading
                ? "cursor-not-allowed bg-primary/60"
                : "bg-primary hover:bg-primary-600",
            )}
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Saving...
              </>
            ) : (
              submitLabel
            )}
          </button>
        </div>
      </form>

      {/* ── Gallery Modal (portal-like, rendered outside form) ── */}
      {galleryOpen && (
        <GalleryModal
          entries={galleryOrder}
          draggingId={draggingId}
          recentlyMovedId={recentlyMovedId}
          error={errors.gallery}
          onDragStart={handleGalleryDragStart}
          onDragEnter={handleGalleryDragEnter}
          onDragEnd={handleGalleryDragEnd}
          onRemove={removeGalleryEntry}
          onAddFiles={handleGalleryFilesChange}
          onClose={() => setGalleryOpen(false)}
          getEntryId={getEntryId}
        />
      )}
    </>
  );
}
