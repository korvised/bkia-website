import { useEffect, useState } from "react";
import { LuEye, LuPencilLine, LuPlus, LuX } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Input, Select } from "@/components/ui";
import { cn } from "@/lib";
import { ImportantPriority } from "@/types";
import type { INotice, INoticeForm, ICreateNoticePayload } from "@/features/notice/types";

// ─── Constants ────────────────────────────────────────────────────────────────

const LANG_TABS = [
  { key: "en" as const, label: "EN" },
  { key: "lo" as const, label: "ລາວ" },
  { key: "zh" as const, label: "中文" },
];

const PRIORITY_OPTIONS = [
  { value: ImportantPriority.NORMAL, label: "Normal" },
  { value: ImportantPriority.HIGH, label: "High" },
  { value: ImportantPriority.URGENT, label: "Urgent" },
];

const emptyForm = (): INoticeForm => ({
  title: { en: "", lo: "", zh: "" },
  description: { en: "", lo: "", zh: "" },
  content: { en: "", lo: "", zh: "" },
  priority: ImportantPriority.NORMAL,
  publishDate: new Date().toISOString().split("T")[0],
  effectiveDate: "",
  expiryDate: "",
  tags: [],
  isActive: true,
});

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  defaultValues?: INotice;
  onSubmit: (payload: ICreateNoticePayload) => Promise<void>;
  isLoading: boolean;
  submitLabel?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function NoticeForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel = "Save Notice",
}: Props) {
  const [form, setForm] = useState<INoticeForm>(emptyForm);
  const [activeLang, setActiveLang] = useState<"en" | "lo" | "zh">("en");
  const [contentMode, setContentMode] = useState<"write" | "preview">("write");
  const [tagDraft, setTagDraft] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Pre-populate when editing
  useEffect(() => {
    if (defaultValues) {
      setForm({
        title: defaultValues.title ?? { en: "", lo: "", zh: "" },
        description: defaultValues.description ?? { en: "", lo: "", zh: "" },
        content: defaultValues.content ?? { en: "", lo: "", zh: "" },
        priority: defaultValues.priority ?? ImportantPriority.NORMAL,
        publishDate: defaultValues.publishDate
          ? defaultValues.publishDate.split("T")[0]
          : "",
        effectiveDate: defaultValues.effectiveDate
          ? defaultValues.effectiveDate.split("T")[0]
          : "",
        expiryDate: defaultValues.expiryDate
          ? defaultValues.expiryDate.split("T")[0]
          : "",
        tags: defaultValues.tags ?? [],
        isActive: defaultValues.isActive ?? true,
      });
    } else {
      setForm(emptyForm());
    }
  }, [defaultValues]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const setMultilingual = (
    field: "title" | "description" | "content",
    lang: "en" | "lo" | "zh",
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value },
    }));
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

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.title.en?.trim() && !form.title.lo?.trim()) {
      errs.title = "Title is required in at least one language (EN or ລາວ).";
    }
    if (!form.priority) errs.priority = "Priority is required.";
    if (!form.publishDate) errs.publishDate = "Publish date is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const hasDescription = Object.values(form.description).some((v) => v?.trim());
    const payload: ICreateNoticePayload = {
      title: form.title,
      description: hasDescription ? form.description : null,
      content: form.content,
      priority: form.priority as ImportantPriority,
      publishDate: form.publishDate,
      effectiveDate: form.effectiveDate || null,
      expiryDate: form.expiryDate || null,
      tags: form.tags,
      isActive: form.isActive,
    };
    await onSubmit(payload);
  };

  const activeLangLabel = LANG_TABS.find((t) => t.key === activeLang)?.label;
  const langFont = activeLang === "en" ? "font-en" : activeLang === "lo" ? "font-lo" : "font-zh";

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
              onChange={(e) => setMultilingual("title", activeLang, e.target.value)}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Description{" "}
              <span className="font-normal text-gray-400">({activeLangLabel}) — optional</span>
            </label>
            <textarea
              placeholder={`Short description in ${activeLangLabel}...`}
              value={form.description[activeLang] ?? ""}
              onChange={(e) => setMultilingual("description", activeLang, e.target.value)}
              rows={3}
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Content */}
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
                placeholder={`Full content (markdown) in ${activeLangLabel}...`}
                value={form.content[activeLang] ?? ""}
                onChange={(e) => setMultilingual("content", activeLang, e.target.value)}
                rows={12}
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
        </div>
      </div>

      {/* ── Details ── */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
          Details
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Priority */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Priority <span className="text-red-500">*</span>
            </label>
            <Select
              placeholder="Select priority"
              value={form.priority}
              onChange={(value) =>
                setForm((prev) => ({ ...prev, priority: value as ImportantPriority }))
              }
              options={PRIORITY_OPTIONS}
            />
            {errors.priority && (
              <p className="mt-1 text-xs text-red-500">{errors.priority}</p>
            )}
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

          {/* Effective Date */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Effective Date{" "}
              <span className="font-normal text-gray-400">(optional)</span>
            </label>
            <input
              type="date"
              value={form.effectiveDate}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, effectiveDate: e.target.value }))
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Expiry Date */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Expiry Date{" "}
              <span className="font-normal text-gray-400">(optional)</span>
            </label>
            <input
              type="date"
              value={form.expiryDate}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, expiryDate: e.target.value }))
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* isActive toggle */}
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={form.isActive}
            onClick={() => setForm((prev) => ({ ...prev, isActive: !prev.isActive }))}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              form.isActive ? "bg-primary" : "bg-gray-300",
            )}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform",
                form.isActive ? "translate-x-6" : "translate-x-1",
              )}
            />
          </button>
          <div>
            <span className="text-sm font-medium text-gray-700">
              {form.isActive ? "Active" : "Inactive"}
            </span>
            <p className="text-xs text-gray-400">
              {form.isActive
                ? "This notice will be visible on the public website."
                : "This notice is hidden from the public website."}
            </p>
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
            placeholder="e.g. Flight Update"
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
  );
}
