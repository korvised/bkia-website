"use client";

import { useState, useRef } from "react";
import {
  Check,
  Star,
  Paperclip,
  X,
  Loader2,
  Upload,
  Sparkles,
  Shield,
  Wifi,
  UtensilsCrossed,
  UserCheck,
  Building2,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib";
import { submitFeedback } from "@/services/feedback";
import { createFeedbackI18n } from "@/data/i18n/about/feedback";
import type { Lang } from "@/types/language";

interface Props {
  lang: Lang;
}

const INPUT_BASE =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm transition-all placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none";

export function FeedbackForm({ lang }: Props) {
  const t = createFeedbackI18n(lang).feedback;

  // ── Build category list after t is ready ─────────────────────────────────
  const categories = [
    { value: "CLEANLINESS",   Icon: Sparkles,        label: t.categoryClean      },
    { value: "SECURITY",      Icon: Shield,           label: t.categorySecurity   },
    { value: "WIFI",          Icon: Wifi,             label: t.categoryWifi       },
    { value: "FOOD_BEVERAGE", Icon: UtensilsCrossed,  label: t.categoryFood       },
    { value: "STAFF_SERVICE", Icon: UserCheck,        label: t.categoryStaff      },
    { value: "FACILITIES",    Icon: Building2,        label: t.categoryFacilities },
    { value: "OTHER",         Icon: MoreHorizontal,   label: t.categoryOther      },
  ];

  // ── Terminal short labels (first segment before " — ") ──────────────────
  const terminalOptions = [
    { value: "",  label: "—" },
    { value: "A", label: t.terminalInt.split(" — ")[0] },
    { value: "B", label: t.terminalDom.split(" — ")[0] },
  ];

  // ── State ─────────────────────────────────────────────────────────────────
  const [rating,        setRating]        = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [category,      setCategory]      = useState("");
  const [comment,       setComment]       = useState("");
  const [terminal,      setTerminal]      = useState("");
  const [specificArea,  setSpecificArea]  = useState("");
  const [followUp,      setFollowUp]      = useState(false);
  const [email,         setEmail]         = useState("");
  const [phone,         setPhone]         = useState("");
  const [files,         setFiles]         = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting,   setIsSubmitting]   = useState(false);
  const [submitted,      setSubmitted]      = useState(false);
  const [error,          setError]          = useState("");
  const [categoryError,  setCategoryError]  = useState(false);
  const [commentError,   setCommentError]   = useState(false);
  const [phoneError,     setPhoneError]     = useState(false);

  const starLabels  = [t.star1, t.star2, t.star3, t.star4, t.star5];
  const activeRating = hoveredRating || rating;

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    setFiles((prev) => [...prev, ...selected].slice(0, 5));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    let valid = true;
    if (!category)      { setCategoryError(true);  valid = false; } else { setCategoryError(false); }
    if (!comment.trim()) { setCommentError(true);   valid = false; } else { setCommentError(false); }
    if (followUp && !phone) { setPhoneError(true);  valid = false; } else { setPhoneError(false); }
    if (!valid) return;

    setIsSubmitting(true);
    try {
      const fd = new FormData();
      if (rating > 0) fd.append("rating", String(rating));
      fd.append("category", category);
      fd.append("comment", comment);
      if (terminal)    fd.append("terminal", terminal);
      if (specificArea) fd.append("specificArea", specificArea);
      fd.append("followUp", String(followUp));
      if (followUp && email) fd.append("email", email);
      if (followUp)    fd.append("phone", phone);
      files.forEach((f) => fd.append("files", f));

      await submitFeedback(fd);
      setSubmitted(true);
    } catch {
      setError(t.errorGeneric);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setRating(0); setHoveredRating(0); setCategory(""); setComment("");
    setTerminal(""); setSpecificArea(""); setFollowUp(false);
    setEmail(""); setPhone(""); setFiles([]);
    setError(""); setCategoryError(false); setPhoneError(false);
    setCommentError(false); setSubmitted(false);
  };

  // ── Success state ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex flex-col items-center py-10 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Check className="h-8 w-8 text-primary" strokeWidth={2.5} />
        </div>
        <h2 className="mb-2 text-xl font-bold text-gray-900">{t.thankYouTitle}</h2>
        <p className="mb-8 max-w-sm text-sm leading-relaxed text-gray-500">
          {t.thankYouMessage}
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
        >
          {t.submitAnother}
        </button>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="space-y-7">

      {/* 1. Rating ──────────────────────────────────────────────────────── */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-700">{t.ratingOptional}</p>
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              aria-label={starLabels[star - 1]}
              onClick={() => setRating(star === rating ? 0 : star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="rounded p-1 focus:outline-none"
            >
              <Star
                className={cn(
                  "h-8 w-8 transition-colors duration-100",
                  star <= activeRating
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-200 hover:text-amber-300",
                )}
              />
            </button>
          ))}
          {/* Fixed-width label slot so stars don't jump */}
          <span className="ml-2 min-w-[72px] text-sm font-medium text-gray-500">
            {activeRating > 0 ? starLabels[activeRating - 1] : ""}
          </span>
        </div>
      </div>

      {/* 2. Category chips ──────────────────────────────────────────────── */}
      <div>
        <p className="mb-2.5 text-sm font-medium text-gray-700">
          {t.category} <span className="text-red-400">*</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map(({ value, Icon, label }) => {
            const selected = category === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => { setCategory(value); setCategoryError(false); }}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all duration-150",
                  selected
                    ? "border-primary bg-primary text-white shadow-sm"
                    : cn(
                        "border-gray-200 bg-white text-gray-600",
                        "hover:border-primary/50 hover:text-primary",
                        categoryError && "border-red-200",
                      ),
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                {label}
              </button>
            );
          })}
        </div>
        {categoryError && (
          <p className="mt-2 text-xs text-red-500">{t.required}</p>
        )}
      </div>

      {/* 3. Comment + char counter ──────────────────────────────────────── */}
      <div>
        <label htmlFor="fb-comment" className="mb-1.5 block text-sm font-medium text-gray-700">
          {t.comment} <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <textarea
            id="fb-comment"
            value={comment}
            onChange={(e) => { setComment(e.target.value); setCommentError(false); }}
            rows={4}
            maxLength={1000}
            placeholder={t.commentPlaceholder}
            className={cn(
              "w-full resize-none rounded-lg border px-3 py-2.5 pb-6 text-sm transition-all placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none",
              commentError ? "border-red-300 bg-red-50" : "border-gray-200 bg-white",
            )}
          />
          <span className="absolute bottom-2 right-3 text-[10px] text-gray-400 tabular-nums">
            {comment.length}/1000
          </span>
        </div>
        {commentError && (
          <p className="mt-1 text-xs text-red-500">{t.required}</p>
        )}
      </div>

      {/* 4 + 5. Terminal (segmented) + Specific Area — 2-col on sm+ ─────── */}
      <div className="grid gap-5 sm:grid-cols-2">

        {/* Terminal segmented control */}
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">{t.terminal}</p>
          <div className="flex rounded-lg border border-gray-200 bg-gray-50 p-0.5">
            {terminalOptions.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setTerminal(value)}
                className={cn(
                  "flex-1 truncate rounded-md px-2 py-1.5 text-xs font-medium transition-all duration-150",
                  terminal === value
                    ? "bg-white text-primary shadow-sm ring-1 ring-gray-100"
                    : "text-gray-500 hover:text-gray-700",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Specific Area */}
        <div>
          <label htmlFor="fb-area" className="mb-2 block text-sm font-medium text-gray-700">
            {t.specificArea}
          </label>
          <input
            id="fb-area"
            type="text"
            value={specificArea}
            onChange={(e) => setSpecificArea(e.target.value)}
            placeholder={t.specificAreaPlaceholder}
            className={INPUT_BASE}
          />
        </div>
      </div>

      {/* 6. Follow-up toggle + animated expand ──────────────────────────── */}
      <div className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3.5">
        {/* Toggle row */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-gray-700">{t.followUp}</span>
          <button
            type="button"
            role="switch"
            aria-checked={followUp}
            onClick={() => setFollowUp(!followUp)}
            className={cn(
              "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200",
              followUp ? "bg-primary" : "bg-gray-300",
            )}
          >
            <span
              className={cn(
                "inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-200",
                followUp ? "translate-x-[18px]" : "translate-x-[3px]",
              )}
            />
          </button>
        </div>

        {/* Smooth height expand via grid-template-rows */}
        <div
          className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ gridTemplateRows: followUp ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              {/* Phone (required) */}
              <div>
                <label htmlFor="fb-phone" className="mb-1.5 block text-sm font-medium text-gray-700">
                  {t.phone} <span className="text-red-400">*</span>
                </label>
                <input
                  id="fb-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setPhoneError(false); }}
                  placeholder={t.phonePlaceholder}
                  className={cn(INPUT_BASE, phoneError && "border-red-300 bg-red-50")}
                />
                {phoneError && (
                  <p className="mt-1 text-xs text-red-500">{t.phoneRequired}</p>
                )}
              </div>
              {/* Email (optional) */}
              <div>
                <label htmlFor="fb-email" className="mb-1.5 block text-sm font-medium text-gray-700">
                  {t.email}
                </label>
                <input
                  id="fb-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className={INPUT_BASE}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. File attachments ────────────────────────────────────────────── */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-700">{t.attachFiles}</p>

        {/* Attached file list */}
        {files.length > 0 && (
          <ul className="mb-3 space-y-1.5">
            {files.map((file, i) => (
              <li
                key={i}
                className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <Paperclip className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                  <span className="truncate text-xs text-gray-700">{file.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  aria-label="Remove file"
                  className="ml-2 shrink-0 rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Drop zone */}
        {files.length < 5 && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="group flex w-full flex-col items-center gap-1.5 rounded-xl border-2 border-dashed border-gray-200 px-4 py-5 transition-all hover:border-primary/40 hover:bg-primary/5"
          >
            <Upload className="h-5 w-5 text-gray-400 transition-colors group-hover:text-primary" />
            <span className="text-sm font-medium text-gray-500 transition-colors group-hover:text-primary">
              {t.addFile}
            </span>
            <span className="text-xs text-gray-400">{t.attachFilesHint}</span>
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

      {/* Error banner ───────────────────────────────────────────────────── */}
      {error && (
        <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Submit ─────────────────────────────────────────────────────────── */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-600 disabled:opacity-60"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSubmitting ? t.submitting : t.submit}
      </button>
    </form>
  );
}
