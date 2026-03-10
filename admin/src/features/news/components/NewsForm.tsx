import { useEffect, useRef, useState } from "react";
import {
  LuEye,
  LuImage,
  LuPencilLine,
  LuPlus,
  LuX,
} from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Input, Select } from "@/components/ui";
import { asset, cn } from "@/lib";
import { NewsCategory } from "@/types";
import type {
  IMultilingualText,
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
  isPublished: false,
  tags: [],
  metaDescription: { en: "", lo: "", zh: "" },
  coverImageFile: null,
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
  const [tagDraft, setTagDraft] = useState<IMultilingualText>({ en: "", lo: "", zh: "" });
  const [tagLang, setTagLang] = useState<"en" | "lo" | "zh">("en");
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pre-populate when editing
  useEffect(() => {
    if (defaultValues) {
      setForm({
        slug: defaultValues.slug ?? "",
        title: defaultValues.title ?? { en: "", lo: "", zh: "" },
        excerpt: defaultValues.excerpt ?? { en: "", lo: "", zh: "" },
        content: defaultValues.content ?? { en: "", lo: "", zh: "" },
        category: defaultValues.category ?? "",
        author: defaultValues.author ?? "",
        publishDate: defaultValues.publishDate
          ? defaultValues.publishDate.split("T")[0]
          : "",
        isFeatured: defaultValues.isFeatured ?? false,
        isPublished: defaultValues.isPublished ?? false,
        tags: defaultValues.tags ?? [],
        metaDescription: defaultValues.metaDescription ?? { en: "", lo: "", zh: "" },
        coverImageFile: null,
      });
      setCoverPreview(defaultValues.coverImage?.path ? asset(defaultValues.coverImage.path) : null);
    } else {
      setForm(emptyForm());
      setCoverPreview(null);
    }
  }, [defaultValues]);

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
    // Auto-fill slug from EN title if slug is empty (create mode only)
    if (activeLang === "en" && !defaultValues && !form.slug) {
      setForm((prev) => ({ ...prev, slug: slugify(value) }));
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, coverImageFile: file }));
    const url = URL.createObjectURL(file);
    setCoverPreview(url);
  };

  const removeCoverImage = () => {
    setForm((prev) => ({ ...prev, coverImageFile: null }));
    setCoverPreview(defaultValues?.coverImage?.path ?? null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const addTag = () => {
    const hasValue = tagDraft.en?.trim() || tagDraft.lo?.trim() || tagDraft.zh?.trim();
    if (!hasValue) return;
    setForm((prev) => ({ ...prev, tags: [...prev.tags, { ...tagDraft }] }));
    setTagDraft({ en: "", lo: "", zh: "" });
  };

  const removeTag = (index: number) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
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
    const hasMeta = Object.values(form.metaDescription).some((v) => v?.trim());
    await onSubmit({
      slug: form.slug.trim(),
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      category: form.category as NewsCategory,
      author: form.author.trim() || null,
      publishDate: form.publishDate,
      isFeatured: form.isFeatured,
      isPublished: form.isPublished,
      tags: form.tags,
      metaDescription: hasMeta ? form.metaDescription : null,
      coverImageFile: form.coverImageFile,
    });
  };

  const activeLangLabel = LANG_TABS.find((t) => t.key === activeLang)?.label;

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ── Cover Image ── */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
          Cover Image <span className="text-red-500">*</span>
        </h3>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          {/* Preview */}
          <div className="relative h-44 w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50 sm:w-72 shrink-0">
            {coverPreview ? (
              <>
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="h-full w-full object-cover"
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
              <div className="flex h-full flex-col items-center justify-center gap-2 text-gray-400">
                <LuImage className="h-10 w-10" />
                <span className="text-xs">No image selected</span>
              </div>
            )}
          </div>

          {/* Upload controls */}
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
        {/* Language Tabs */}
        <div className="flex items-center gap-1 border-b border-gray-200 px-6 pt-4">
          {LANG_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveLang(tab.key)}
              className={cn(
                "rounded-t-md px-4 py-2 text-sm font-medium transition-colors",
                activeLang === tab.key
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-4 p-6">
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
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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

          {/* Meta Description (SEO) */}
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
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.publishDate && (
              <p className="mt-1 text-xs text-red-500">{errors.publishDate}</p>
            )}
          </div>
        </div>

        {/* Toggles */}
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:gap-8">
          {/* isFeatured */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={form.isFeatured}
              onClick={() =>
                setForm((prev) => ({ ...prev, isFeatured: !prev.isFeatured }))
              }
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                form.isFeatured ? "bg-yellow-400" : "bg-gray-300",
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
              <p className="text-xs text-gray-400">
                Show prominently on the news page
              </p>
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
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                form.isPublished ? "bg-green-500" : "bg-gray-300",
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
            {form.tags.map((tag, index) => {
              const label = tag.en || tag.lo || tag.zh || "";
              return (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700"
                >
                  {label}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="rounded-full p-0.5 transition-colors hover:bg-blue-100"
                  >
                    <LuX className="h-3 w-3" />
                  </button>
                </span>
              );
            })}
          </div>
        )}

        <div className="rounded-lg border border-dashed border-gray-300 p-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-500">
            Add New Tag
          </p>
          <div className="mb-3 flex items-center gap-1">
            {LANG_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setTagLang(tab.key)}
                className={cn(
                  "rounded px-3 py-1 text-xs font-medium transition-colors",
                  tagLang === tab.key
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:bg-gray-100",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Input
                placeholder={`Tag in ${LANG_TABS.find((t) => t.key === tagLang)?.label}...`}
                value={tagDraft[tagLang] ?? ""}
                onChange={(e) =>
                  setTagDraft((prev) => ({ ...prev, [tagLang]: e.target.value }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
            </div>
            <button
              type="button"
              onClick={addTag}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              <LuPlus className="h-4 w-4" />
              Add
            </button>
          </div>
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
              ? "cursor-not-allowed bg-blue-400"
              : "bg-blue-600 hover:bg-blue-700",
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
  );
}
