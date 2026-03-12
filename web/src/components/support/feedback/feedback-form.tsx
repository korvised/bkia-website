"use client";

import { useState, useRef } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import {
  LuCircleCheck,
  LuStar,
  LuPaperclip,
  LuX,
  LuChevronDown,
  LuCheck,
} from "react-icons/lu";
import { cn } from "@/lib";
import { submitFeedback } from "@/services/feedback";
import { createSupportI18n } from "@/data/i18n/support";
import type { Lang } from "@/types/language";

interface Props {
  lang: Lang;
}

interface SelectItem {
  value: string;
  label: string;
}

// ── Reusable Listbox Select ──────────────────────────────────────────────────
function FormSelect({
  options,
  value,
  onChange,
  placeholder,
  error,
}: {
  options: SelectItem[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: boolean;
}) {
  const selected = options.find((o) => o.value === value) ?? null;

  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div className="relative">
          <ListboxButton
            className={cn(
              "flex h-11 w-full items-center justify-between gap-2 rounded-lg border px-3 text-sm transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary",
              error
                ? "border-red-400 bg-red-50"
                : "border-gray-300 bg-white hover:border-gray-400",
              !selected && "text-gray-400",
            )}
          >
            <span className={selected ? "text-gray-900" : "text-gray-400"}>
              {selected ? selected.label : placeholder}
            </span>
            <LuChevronDown
              className={cn(
                "h-4 w-4 shrink-0 text-gray-400 transition-transform",
                open && "rotate-180",
              )}
            />
          </ListboxButton>

          <ListboxOptions
            modal={false}
            className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg focus:outline-none"
          >
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                value={option.value}
                className="flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm data-[focus]:bg-primary/5 data-[selected]:font-medium data-[selected]:text-primary"
              >
                {({ selected: isSelected }) => (
                  <>
                    <span>{option.label}</span>
                    {isSelected && (
                      <LuCheck className="h-4 w-4 shrink-0 text-primary" />
                    )}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      )}
    </Listbox>
  );
}

// ── Main Form ────────────────────────────────────────────────────────────────
export function FeedbackForm({ lang }: Props) {
  const t = createSupportI18n(lang).feedback;

  // Form state
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");
  const [terminal, setTerminal] = useState("");
  const [specificArea, setSpecificArea] = useState("");
  const [followUp, setFollowUp] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const starLabels = [t.star1, t.star2, t.star3, t.star4, t.star5];

  const categoryOptions: SelectItem[] = [
    { value: "CLEANLINESS", label: t.categoryClean },
    { value: "SECURITY", label: t.categorySecurity },
    { value: "WIFI", label: t.categoryWifi },
    { value: "FOOD_BEVERAGE", label: t.categoryFood },
    { value: "STAFF_SERVICE", label: t.categoryStaff },
    { value: "FACILITIES", label: t.categoryFacilities },
    { value: "OTHER", label: t.categoryOther },
  ];

  const terminalOptions: SelectItem[] = [
    { value: "A", label: t.terminalInt },
    { value: "B", label: t.terminalDom },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    setFiles((prev) => [...prev, ...selected].slice(0, 5));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    let valid = true;
    if (!category) {
      setCategoryError(true);
      valid = false;
    } else {
      setCategoryError(false);
    }
    if (!comment.trim()) {
      setCommentError(true);
      valid = false;
    } else {
      setCommentError(false);
    }
    if (followUp && !email) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }
    if (!valid) return;

    setIsSubmitting(true);
    try {
      const fd = new FormData();
      if (rating > 0) fd.append("rating", String(rating));
      fd.append("category", category);
      fd.append("comment", comment);
      if (terminal) fd.append("terminal", terminal);
      if (specificArea) fd.append("specificArea", specificArea);
      fd.append("followUp", String(followUp));
      if (followUp && email) fd.append("email", email);
      if (followUp && phone) fd.append("phone", phone);
      files.forEach((f) => fd.append("files", f));

      await submitFeedback(fd);
      setSubmitted(true);
    } catch {
      setError("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setRating(0);
    setHoveredRating(0);
    setCategory("");
    setComment("");
    setTerminal("");
    setSpecificArea("");
    setFollowUp(false);
    setEmail("");
    setPhone("");
    setFiles([]);
    setError("");
    setCategoryError(false);
    setEmailError(false);
    setCommentError(false);
    setSubmitted(false);
  };

  // ── Thank-you state ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-green-100 bg-green-50 px-6 py-16 text-center">
        <LuCircleCheck className="mb-4 h-16 w-16 text-green-500" />
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          {t.thankYouTitle}
        </h2>
        <p className="mb-8 max-w-md text-gray-600">{t.thankYouMessage}</p>
        <button
          type="button"
          onClick={handleReset}
          className="bg-primary hover:bg-primary-600 rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-colors"
        >
          {t.submitAnother}
        </button>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 1. Rating */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {t.ratingOptional}
        </label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => {
            const active = star <= (hoveredRating || rating);
            return (
              <button
                key={star}
                type="button"
                aria-label={starLabels[star - 1]}
                onClick={() => setRating(star === rating ? 0 : star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none"
              >
                <LuStar
                  className={cn(
                    "h-8 w-8 transition-colors",
                    active
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300 hover:text-yellow-300",
                  )}
                />
              </button>
            );
          })}
          {rating > 0 && (
            <span className="ml-2 text-sm text-gray-500">
              {starLabels[rating - 1]}
            </span>
          )}
        </div>
      </div>

      {/* 2. Category */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {t.category}
          <span className="ml-1 text-red-500">*</span>
        </label>
        <FormSelect
          options={categoryOptions}
          value={category}
          onChange={(v) => {
            setCategory(v);
            setCategoryError(false);
          }}
          placeholder={t.selectCategory}
          error={categoryError}
        />
        {categoryError && (
          <p className="mt-1 text-xs text-red-500">{t.required}</p>
        )}
      </div>

      {/* 3. Comment */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {t.comment}
          <span className="ml-1 text-red-500">*</span>
        </label>
        <textarea
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            setCommentError(false);
          }}
          rows={4}
          placeholder={t.commentPlaceholder}
          className={cn(
            "focus:ring-primary w-full rounded-lg border px-3 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:outline-none",
            commentError ? "border-red-400 bg-red-50" : "border-gray-300",
          )}
        />
        {commentError && (
          <p className="mt-1 text-xs text-red-500">{t.required}</p>
        )}
      </div>

      {/* 4. Terminal */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {t.terminal}
        </label>
        <FormSelect
          options={terminalOptions}
          value={terminal}
          onChange={setTerminal}
          placeholder="—"
        />
      </div>

      {/* 5. Specific Area */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {t.specificArea}
        </label>
        <input
          type="text"
          value={specificArea}
          onChange={(e) => setSpecificArea(e.target.value)}
          placeholder={t.specificAreaPlaceholder}
          className="focus:ring-primary w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:outline-none"
        />
      </div>

      {/* 6. Follow-up */}
      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={followUp}
            onChange={(e) => setFollowUp(e.target.checked)}
            className="text-primary focus:ring-primary mt-0.5 h-4 w-4 rounded border-gray-300"
          />
          <span className="text-sm text-gray-700">{t.followUp}</span>
        </label>
      </div>

      {/* 7 & 8. Email + Phone (conditional) */}
      {followUp && (
        <div className="border-primary/20 bg-primary/5 space-y-4 rounded-lg border p-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t.email}
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}
              placeholder={t.emailPlaceholder}
              className={cn(
                "focus:ring-primary w-full rounded-lg border px-3 py-2.5 text-sm focus:ring-2 focus:outline-none",
                emailError ? "border-red-400 bg-red-50" : "border-gray-300",
              )}
            />
            {emailError && (
              <p className="mt-1 text-xs text-red-500">{t.emailRequired}</p>
            )}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t.phone}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t.phonePlaceholder}
              className="focus:ring-primary w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* 9. File Attachments */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {t.attachFiles}
        </label>
        <p className="mb-3 text-xs text-gray-500">{t.attachFilesHint}</p>

        {files.length > 0 && (
          <ul className="mb-3 space-y-2">
            {files.map((file, i) => (
              <li
                key={i}
                className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <LuPaperclip className="h-4 w-4 shrink-0 text-gray-400" />
                  <span className="truncate text-sm text-gray-700">
                    {file.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="ml-2 shrink-0 text-gray-400 hover:text-red-500"
                  aria-label="Remove file"
                >
                  <LuX className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {files.length < 5 && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="hover:border-primary hover:text-primary flex items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-500 transition-colors"
          >
            <LuPaperclip className="h-4 w-4" />
            Add file
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* 10. Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "w-full rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors",
          "bg-primary hover:bg-primary-600",
          isSubmitting && "bg-primary/60 cursor-not-allowed",
        )}
      >
        {isSubmitting ? t.submitting : t.submit}
      </button>
    </form>
  );
}
