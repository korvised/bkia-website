"use client";

import { useState, useCallback, useId } from "react";
import { X, Loader2, CheckCircle2, Clock } from "lucide-react";
import type { Lang } from "@/types/language";
import type { ILostFoundItem } from "@/types/lost-found";
import { LostFoundStatus } from "@/types/enum";
import { submitClaim } from "@/services/lost-found";
import { t, emptyClaimForm, type ClaimFormState } from "./lost-found.constants";
import { ClaimSection, Required } from "./ClaimSection";
import { FilePreviewGrid } from "./FilePreviewGrid";

interface LostFoundClaimFormProps {
  item: ILostFoundItem;
  lang: Lang;
  onSuccess: () => void;
  onCancel: () => void;
}

export function LostFoundClaimForm({
  item,
  lang,
  onSuccess,
  onCancel,
}: LostFoundClaimFormProps) {
  const formId = useId();
  const [form, setForm] = useState<ClaimFormState>(emptyClaimForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [claimDone, setClaimDone] = useState(false);

  const isMatched = item.status === LostFoundStatus.MATCHED;

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      setSubmitError("");
      try {
        const fd = new FormData();
        fd.append("claimantName",   form.claimantName);
        if (form.claimantPhone) fd.append("claimantPhone", form.claimantPhone);
        if (form.claimantEmail) fd.append("claimantEmail", form.claimantEmail);
        if (form.flightNumber)  fd.append("flightNumber",  form.flightNumber);
        if (form.seatNumber)    fd.append("seatNumber",    form.seatNumber);
        fd.append("ownershipProof", form.ownershipProof);
        form.files.forEach((f) => fd.append("images", f));
        await submitClaim(item.id, fd);
        setClaimDone(true);
        onSuccess();
      } catch {
        setSubmitError(t("errorGeneric", lang));
      } finally {
        setSubmitting(false);
      }
    },
    [form, item.id, lang, onSuccess],
  );

  if (claimDone) {
    return (
      <div className="lf-scale flex flex-col items-center gap-3 py-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-7 w-7 text-emerald-600" />
        </div>
        <p className="font-semibold text-gray-900">{t("claimSuccess", lang)}</p>
        <button
          onClick={onCancel}
          className="mt-1 text-sm text-primary underline-offset-2 hover:underline"
        >
          {t("backToList", lang)}
        </button>
      </div>
    );
  }

  return (
    <form id={`${formId}-form`} onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          {t("claimItemLabel", lang)}
        </span>
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
          {item.itemName}
        </span>
      </div>

      {/* MATCHED status notice */}
      {isMatched && (
        <div className="flex items-start gap-2.5 rounded-xl bg-amber-50 px-4 py-3 ring-1 ring-amber-200">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
          <p className="text-xs leading-relaxed text-amber-700">
            {t("statusMatchedHint", lang)}
          </p>
        </div>
      )}

      {/* Section 1 — Describe */}
      <ClaimSection title={t("claimSectionDescribe", lang)} number={1}>
        <label className="block">
          <span className="text-xs font-medium text-gray-700">
            {t("ownershipProof", lang)} <Required />
          </span>
          <textarea
            required
            minLength={10}
            maxLength={2000}
            value={form.ownershipProof}
            onChange={(e) => setForm((f) => ({ ...f, ownershipProof: e.target.value }))}
            placeholder={t("ownershipProofHint", lang)}
            rows={3}
            className={`mt-1 w-full resize-none rounded-xl border bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:ring-2 focus:ring-primary/20 ${
              form.ownershipProof.length > 0 && form.ownershipProof.length < 10
                ? "border-red-300 focus:border-red-400"
                : "border-gray-200 focus:border-primary"
            }`}
          />
          <div className="mt-1 flex items-center justify-between">
            <span
              className={`text-[11px] ${
                form.ownershipProof.length > 0 && form.ownershipProof.length < 10
                  ? "text-red-500"
                  : "text-gray-400"
              }`}
            >
              {form.ownershipProof.length < 10 ? t("ownershipProofMinLength", lang) : " "}
            </span>
            <span
              className={`tabular-nums text-[11px] ${
                form.ownershipProof.length >= 1900 ? "text-red-500" : "text-gray-400"
              }`}
            >
              {form.ownershipProof.length} / 2000
            </span>
          </div>
        </label>
      </ClaimSection>

      {/* Section 2 — Flight */}
      <ClaimSection title={t("claimSectionFlight", lang)} number={2}>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-medium text-gray-700">
              {t("claimFlightNumber", lang)}
            </span>
            <input
              type="text"
              maxLength={20}
              value={form.flightNumber}
              onChange={(e) => setForm((f) => ({ ...f, flightNumber: e.target.value }))}
              placeholder="QV 201"
              className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <span className="mt-1 block text-[0.7rem] text-gray-400">
              {t("claimFlightHint", lang)}
            </span>
          </label>
          <label className="block">
            <span className="text-xs font-medium text-gray-700">
              {t("claimSeatNumber", lang)}
            </span>
            <input
              type="text"
              maxLength={20}
              value={form.seatNumber}
              onChange={(e) => setForm((f) => ({ ...f, seatNumber: e.target.value }))}
              placeholder="14A"
              className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <span className="mt-1 block text-[0.7rem] text-gray-400">
              {t("claimSeatHint", lang)}
            </span>
          </label>
        </div>
      </ClaimSection>

      {/* Section 3 — Proof files */}
      <ClaimSection title={t("claimSectionProof", lang)} number={3}>
        <div>
          <span className="text-xs font-medium text-gray-700">{t("proofPhotos", lang)}</span>
          {form.files.length === 0 ? (
            <div className="mt-1 rounded-xl border border-dashed border-gray-200 bg-white px-4 py-5 text-center transition hover:border-primary/40">
              <input
                type="file"
                accept="image/*,.pdf"
                multiple
                className="sr-only"
                id={`${formId}-files`}
                onChange={(e) => {
                  const picked = Array.from(e.target.files ?? []);
                  if (picked.length) setForm((f) => ({ ...f, files: picked.slice(0, 5) }));
                  e.target.value = "";
                }}
              />
              <label
                htmlFor={`${formId}-files`}
                className="cursor-pointer text-xs font-medium text-primary hover:underline"
              >
                {t("proofPhotosHint", lang)}
              </label>
            </div>
          ) : (
            <div className="mt-1.5">
              <FilePreviewGrid
                files={form.files}
                onRemove={(i) =>
                  setForm((prev) => ({
                    ...prev,
                    files: prev.files.filter((_, j) => j !== i),
                  }))
                }
                onAddFiles={(picked) =>
                  setForm((f) => ({
                    ...f,
                    files: [...f.files, ...picked].slice(0, 5),
                  }))
                }
              />
            </div>
          )}
        </div>
      </ClaimSection>

      {/* Section 4 — Contact */}
      <ClaimSection title={t("claimSectionContact", lang)} number={4}>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-medium text-gray-700">
              {t("claimantName", lang)} <Required />
            </span>
            <input
              type="text"
              required
              minLength={2}
              value={form.claimantName}
              onChange={(e) => setForm((f) => ({ ...f, claimantName: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-gray-700">
              {t("claimantPhone", lang)} <Required />
            </span>
            <input
              type="tel"
              required
              value={form.claimantPhone}
              onChange={(e) => setForm((f) => ({ ...f, claimantPhone: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-xs font-medium text-gray-700">
              {t("claimantEmail", lang)}{" "}
              <span className="text-[10px] text-gray-400">(optional)</span>
            </span>
            <input
              type="email"
              value={form.claimantEmail}
              onChange={(e) => setForm((f) => ({ ...f, claimantEmail: e.target.value }))}
              placeholder="example@email.com"
              className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
        </div>
      </ClaimSection>

      {/* Error */}
      {submitError && (
        <div className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3">
          <p className="flex-1 text-sm text-red-600">{submitError}</p>
          <button
            type="button"
            onClick={() => setSubmitError("")}
            className="mt-0.5 shrink-0 text-red-400 hover:text-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Submit row */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-600 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-60"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting ? t("submitting", lang) : t("submitClaim", lang)}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-500 transition hover:border-gray-300 hover:text-gray-700"
        >
          {t("cancelClaim", lang)}
        </button>
      </div>
    </form>
  );
}
