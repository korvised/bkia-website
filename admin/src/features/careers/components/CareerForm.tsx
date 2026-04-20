import { useEffect, useRef, useState } from "react";
import { LuEye, LuImage, LuPencilLine, LuStar, LuX } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Input } from "@/components/ui";
import { asset, cn } from "@/lib";
import type {
  IJobPost,
  IJobPostForm,
  IJobPostSubmitPayload,
  IMultilingualText,
} from "@/features/careers/types";

// ── Constants ─────────────────────────────────────────────────────────────────

const LANG_TABS = [
  { key: "en" as const, label: "EN" },
  { key: "lo" as const, label: "ລາວ" },
  { key: "zh" as const, label: "中文" },
];

const emptyForm = (): IJobPostForm => ({
  title: { en: "", lo: "", zh: "" },
  content: { en: "", lo: "", zh: "" },
  position: { en: "", lo: "", zh: "" },
  vacancyCount: 1,
  coverImageFile: null,
  isPublished: false,
  isFeatured: false,
  publishDate: new Date().toISOString().split("T")[0],
  deadline: "",
});

// ── Props ─────────────────────────────────────────────────────────────────────

interface Props {
  defaultValues?: IJobPost;
  onSubmit: (payload: IJobPostSubmitPayload) => Promise<void>;
  isLoading: boolean;
  submitLabel?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function CareerForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel = "Save",
}: Props) {
  const [form, setForm] = useState<IJobPostForm>(emptyForm);
  const [activeLang, setActiveLang] = useState<"en" | "lo" | "zh">("en");
  const [contentMode, setContentMode] = useState<"write" | "preview">("write");
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Pre-populate on edit ─────────────────────────────────────────────────

  useEffect(() => {
    if (defaultValues) {
      setForm({
        title: defaultValues.title ?? { en: "", lo: "", zh: "" },
        content: defaultValues.content ?? { en: "", lo: "", zh: "" },
        position: defaultValues.position ?? { en: "", lo: "", zh: "" },
        vacancyCount: defaultValues.vacancyCount ?? 1,
        coverImageFile: null,
        isPublished: defaultValues.isPublished ?? false,
        isFeatured: defaultValues.isFeatured ?? false,
        publishDate: defaultValues.publishDate
          ? defaultValues.publishDate.split("T")[0]
          : "",
        deadline: defaultValues.deadline
          ? defaultValues.deadline.split("T")[0]
          : "",
      });
      setCoverPreview(
        defaultValues.coverImage?.path ? asset(defaultValues.coverImage.path) : null,
      );
    } else {
      setForm(emptyForm());
      setCoverPreview(null);
    }
  }, [defaultValues]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const setMultilingual = (
    field: "title" | "content" | "position",
    lang: "en" | "lo" | "zh",
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: { ...(prev[field] as IMultilingualText), [lang]: value },
    }));
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, coverImageFile: file }));
    setCoverPreview(URL.createObjectURL(file));
  };

  const removeCover = () => {
    setForm((prev) => ({ ...prev, coverImageFile: null }));
    setCoverPreview(defaultValues?.coverImage?.path ? asset(defaultValues.coverImage.path) : null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.title.en?.trim() && !form.title.lo?.trim())
      errs.title = "Title is required in at least one language (EN or ລາວ).";
    if (!form.position.en?.trim() && !form.position.lo?.trim())
      errs.position = "Position is required in at least one language.";
    if (!form.publishDate) errs.publishDate = "Publish date is required.";
    if (form.vacancyCount < 1) errs.vacancyCount = "At least 1 vacancy required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({
      title: form.title,
      content: form.content,
      position: form.position,
      vacancyCount: form.vacancyCount,
      coverImageFile: form.coverImageFile,
      isPublished: form.isPublished,
      isFeatured: form.isFeatured,
      publishDate: form.publishDate,
      deadline: form.deadline,
    });
  };

  const langFont =
    activeLang === "lo" ? "font-lo" : activeLang === "zh" ? "font-zh" : "";

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Cover Image (optional) */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
          Cover Image{" "}
          <span className="font-normal normal-case text-gray-400">(optional)</span>
        </h3>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 sm:w-64">
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
                    onClick={removeCover}
                    className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
                  >
                    <LuX className="h-3.5 w-3.5" />
                  </button>
                )}
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 text-gray-400">
                <LuImage className="h-8 w-8" />
                <span className="text-xs">No image</span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xs text-gray-400">
              JPG, PNG, WebP. Max 10 MB.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleCoverChange}
              className="hidden"
              id="cover-input"
            />
            <label
              htmlFor="cover-input"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-600 hover:border-primary hover:text-primary"
            >
              {coverPreview ? "Replace image" : "Upload image"}
            </label>
          </div>
        </div>
      </div>

      {/* Language Tabs: Title, Position, Content */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        {/* Lang tab bar */}
        <div className="mb-5 flex gap-1 border-b border-gray-100 pb-0">
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

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={
                ((form.title as IMultilingualText)[activeLang] as string) ?? ""
              }
              onChange={(e) => setMultilingual("title", activeLang, e.target.value)}
              className={cn(
                "w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                langFont,
              )}
              placeholder={`Job title in ${LANG_TABS.find((t) => t.key === activeLang)?.label}`}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Position / Department */}
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">
              Position / Department <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={
                ((form.position as IMultilingualText)[activeLang] as string) ?? ""
              }
              onChange={(e) =>
                setMultilingual("position", activeLang, e.target.value)
              }
              className={cn(
                "w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                langFont,
              )}
              placeholder={`Department or role category`}
            />
            {errors.position && (
              <p className="mt-1 text-xs text-red-500">{errors.position}</p>
            )}
          </div>

          {/* Content (markdown) */}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                Job Description — Markdown supported
              </label>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setContentMode("write")}
                  className={cn(
                    "flex items-center gap-1 rounded px-2.5 py-1 text-xs transition-colors",
                    contentMode === "write"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-400 hover:text-gray-600",
                  )}
                >
                  <LuPencilLine className="h-3 w-3" />
                  Write
                </button>
                <button
                  type="button"
                  onClick={() => setContentMode("preview")}
                  className={cn(
                    "flex items-center gap-1 rounded px-2.5 py-1 text-xs transition-colors",
                    contentMode === "preview"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-400 hover:text-gray-600",
                  )}
                >
                  <LuEye className="h-3 w-3" />
                  Preview
                </button>
              </div>
            </div>

            {contentMode === "write" ? (
              <textarea
                value={
                  ((form.content as IMultilingualText)[activeLang] as string) ?? ""
                }
                onChange={(e) =>
                  setMultilingual("content", activeLang, e.target.value)
                }
                rows={12}
                className={cn(
                  "w-full rounded-lg border border-gray-200 px-3 py-2.5 font-mono text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                  langFont,
                )}
                placeholder="Describe the role, responsibilities, and requirements using Markdown..."
              />
            ) : (
              <div className="min-h-[200px] rounded-lg border border-gray-200 bg-white px-6 py-5">
                <div className="news-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {(((form.content as IMultilingualText)[activeLang] as string) ?? "") ||
                      "*No content yet.*"}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Meta: vacancyCount, publishDate, deadline, isPublished */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
          Posting Details
        </h3>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Vacancy count */}
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">
              Vacancies <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              min={1}
              value={form.vacancyCount}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  vacancyCount: Math.max(1, Number(e.target.value)),
                }))
              }
            />
            {errors.vacancyCount && (
              <p className="mt-1 text-xs text-red-500">{errors.vacancyCount}</p>
            )}
          </div>

          {/* Publish date */}
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">
              Publish Date <span className="text-red-500">*</span>
            </label>
            <Input
              type="date"
              value={form.publishDate}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, publishDate: e.target.value }))
              }
            />
            {errors.publishDate && (
              <p className="mt-1 text-xs text-red-500">{errors.publishDate}</p>
            )}
          </div>

          {/* Deadline (optional) */}
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-600">
              Application Deadline{" "}
              <span className="font-normal normal-case text-gray-400">(optional)</span>
            </label>
            <Input
              type="date"
              value={form.deadline}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, deadline: e.target.value }))
              }
            />
          </div>

          {/* Published + Featured toggles — side by side */}
          <div className="col-span-full flex flex-wrap items-center gap-6 pt-6">
            {/* Published */}
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
                    "inline-block h-4 w-4 rounded-full bg-white shadow transition-transform",
                    form.isPublished ? "translate-x-6" : "translate-x-1",
                  )}
                />
              </button>
              <span className="text-sm font-medium text-gray-700">
                {form.isPublished ? "Published" : "Draft"}
              </span>
            </div>

            {/* Divider */}
            <div className="h-5 w-px bg-gray-200" />

            {/* Featured */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={form.isFeatured}
                onClick={() =>
                  setForm((prev) => ({ ...prev, isFeatured: !prev.isFeatured }))
                }
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2",
                  form.isFeatured ? "bg-amber-400" : "bg-gray-300",
                )}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 rounded-full bg-white shadow transition-transform",
                    form.isFeatured ? "translate-x-6" : "translate-x-1",
                  )}
                />
              </button>
              <span className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                <LuStar
                  className={cn(
                    "h-3.5 w-3.5 transition-colors",
                    form.isFeatured ? "text-amber-500" : "text-gray-400",
                  )}
                  fill={form.isFeatured ? "currentColor" : "none"}
                />
                {form.isFeatured ? "Featured on home page" : "Not featured"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            "rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600",
            isLoading && "cursor-not-allowed bg-primary/60",
          )}
        >
          {isLoading ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
