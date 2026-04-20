"use client";

import { useState, useRef } from "react";
import { CheckCircle, Star, Paperclip, X, Loader2, Upload } from "lucide-react";
import { cn } from "@/lib";
import { submitFeedback } from "@/services/feedback";
import { createSupportI18n } from "@/data/i18n/support";
import type { Lang } from "@/types/language";

interface Props {
  lang: Lang;
}

const INPUT_BASE =
  "form-input focus:border-[#00AAAC] focus:ring-[#00AAAC]/10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm transition-all placeholder:text-gray-400 focus:ring-4 focus:outline-none";

const SELECT_BASE =
  "form-select focus:border-[#00AAAC] focus:ring-[#00AAAC]/10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm transition-all focus:ring-4 focus:outline-none";

export function FeedbackForm({ lang }: Props) {
  const t = createSupportI18n(lang).feedback;

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const starLabels = [t.star1, t.star2, t.star3, t.star4, t.star5];

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
    if (!category) { setCategoryError(true); valid = false; } else { setCategoryError(false); }
    if (!comment.trim()) { setCommentError(true); valid = false; } else { setCommentError(false); }
    if (followUp && !phone) { setPhoneError(true); valid = false; } else { setPhoneError(false); }
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
      if (followUp) fd.append("phone", phone);
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

  // ── Thank-you state ──────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="rounded-r-lg border-l-4 border-emerald-500 bg-emerald-50 px-6 py-8 text-center">
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-emerald-500" />
        <h2 className="mb-2 text-xl font-bold text-gray-900">{t.thankYouTitle}</h2>
        <p className="mb-6 max-w-sm mx-auto text-sm text-gray-600">{t.thankYouMessage}</p>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 rounded-full bg-[#00AAAC] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#008e90]"
        >
          {t.submitAnother}
        </button>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* 1. Rating */}
      <div>
        <label className="mb-3 block text-sm font-medium text-gray-700">
          {t.ratingOptional}
        </label>
        <div className="flex items-center">
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
                className="rounded-md p-2 focus:outline-none"
              >
                <Star
                  className={cn(
                    "h-7 w-7 transition-colors",
                    active
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300 hover:text-yellow-300",
                  )}
                />
              </button>
            );
          })}
          {rating > 0 && (
            <span className="ml-2 text-sm font-medium text-gray-600">
              {starLabels[rating - 1]}
            </span>
          )}
        </div>
      </div>

      {/* 2. Category */}
      <div>
        <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-gray-700">
          {t.category} <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => { setCategory(e.target.value); setCategoryError(false); }}
          className={cn(
            SELECT_BASE,
            categoryError && "border-red-400 bg-red-50",
          )}
        >
          <option value="" disabled>{t.selectCategory}</option>
          <option value="CLEANLINESS">{t.categoryClean}</option>
          <option value="SECURITY">{t.categorySecurity}</option>
          <option value="WIFI">{t.categoryWifi}</option>
          <option value="FOOD_BEVERAGE">{t.categoryFood}</option>
          <option value="STAFF_SERVICE">{t.categoryStaff}</option>
          <option value="FACILITIES">{t.categoryFacilities}</option>
          <option value="OTHER">{t.categoryOther}</option>
        </select>
        {categoryError && (
          <p className="mt-1 text-xs text-red-500">{t.required}</p>
        )}
      </div>

      {/* 3. Comment */}
      <div>
        <label htmlFor="comment" className="mb-1.5 block text-sm font-medium text-gray-700">
          {t.comment} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => { setComment(e.target.value); setCommentError(false); }}
          rows={4}
          placeholder={t.commentPlaceholder}
          className={cn(
            "form-textarea focus:border-[#00AAAC] focus:ring-[#00AAAC]/10 w-full resize-none rounded-lg border px-3 py-2.5 text-sm transition-all placeholder:text-gray-400 focus:ring-4 focus:outline-none",
            commentError ? "border-red-400 bg-red-50" : "border-gray-300 bg-white",
          )}
        />
        {commentError && (
          <p className="mt-1 text-xs text-red-500">{t.required}</p>
        )}
      </div>

      {/* 4. Terminal */}
      <div>
        <label htmlFor="terminal" className="mb-1.5 block text-sm font-medium text-gray-700">
          {t.terminal}
        </label>
        <select
          id="terminal"
          value={terminal}
          onChange={(e) => setTerminal(e.target.value)}
          className={SELECT_BASE}
        >
          <option value="">—</option>
          <option value="A">{t.terminalInt}</option>
          <option value="B">{t.terminalDom}</option>
        </select>
      </div>

      {/* 5. Specific Area */}
      <div>
        <label htmlFor="specificArea" className="mb-1.5 block text-sm font-medium text-gray-700">
          {t.specificArea}
        </label>
        <input
          id="specificArea"
          type="text"
          value={specificArea}
          onChange={(e) => setSpecificArea(e.target.value)}
          placeholder={t.specificAreaPlaceholder}
          className={INPUT_BASE}
        />
      </div>

      {/* 6. Follow-up checkbox */}
      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={followUp}
            onChange={(e) => setFollowUp(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#00AAAC] focus:ring-[#00AAAC]"
          />
          <span className="text-sm text-gray-700">{t.followUp}</span>
        </label>
      </div>

      {/* 7 & 8. Phone + Email (conditional) */}
      {followUp && (
        <div className="space-y-4 rounded-r-lg border-l-4 border-[#00AAAC] bg-[#f0fbfc] px-4 py-4">
          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-gray-700">
              {t.phone} <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); setPhoneError(false); }}
              placeholder={t.phonePlaceholder}
              className={cn(
                INPUT_BASE,
                phoneError && "border-red-400 bg-red-50",
              )}
            />
            {phoneError && (
              <p className="mt-1 text-xs text-red-500">{t.phoneRequired}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
              {t.email}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              className={INPUT_BASE}
            />
          </div>
        </div>
      )}

      {/* 9. File Attachments */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {t.attachFiles}
        </label>
        <p className="mb-3 text-xs text-gray-400">{t.attachFilesHint}</p>

        {files.length > 0 && (
          <ul className="mb-3 space-y-1.5">
            {files.map((file, i) => (
              <li
                key={i}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <Paperclip className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                  <span className="truncate text-xs text-gray-700">{file.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="ml-2 shrink-0 rounded-md p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                  aria-label="Remove file"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {files.length < 5 && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex min-h-[44px] items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2.5 text-sm text-gray-500 transition-colors hover:border-[#00AAAC] hover:bg-[#f0fbfc] hover:text-[#00AAAC]"
          >
            <Upload className="h-4 w-4" />
            {t.addFile}
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
        <div className="rounded-r-lg border-l-4 border-red-500 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* 10. Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#00AAAC] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#008e90] disabled:opacity-60"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSubmitting ? t.submitting : t.submit}
      </button>
    </form>
  );
}
