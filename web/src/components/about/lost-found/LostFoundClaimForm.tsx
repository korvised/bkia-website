"use client";

import { useState, useCallback, useId } from "react";
import {
  X,
  Loader2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  PlaneTakeoff,
  UserRound,
  Camera,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import type { Lang } from "@/types/language";
import type { ILostFoundItem } from "@/types/lost-found";
import { LostFoundStatus } from "@/types/enum";
import { submitClaim } from "@/services/lost-found";
import { t, emptyClaimForm, type ClaimFormState } from "./lost-found.constants";
import { FilePreviewGrid } from "./FilePreviewGrid";

/* ── Input helpers ─────────────────────────────────────────────────────── */

const INPUT =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";
const INPUT_ERR =
  "w-full rounded-lg border border-red-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100";

function Req() {
  return <span className="ml-0.5 text-red-400">*</span>;
}

/* ── Main component ──────────────────────────────────────────────────── */

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
  const [refCode, setRefCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Set<string>>(new Set());

  const isMatched = item.status === LostFoundStatus.MATCHED;

  const update = useCallback(
    (updater: (prev: ClaimFormState) => ClaimFormState) => {
      setForm(updater);
      setFieldErrors(new Set());
      setSubmitError("");
    },
    [],
  );

  const hasErr = (key: string) => fieldErrors.has(key);

  /* ── Validate all ──────────────────────────────────────────────────── */

  const validate = useCallback((): Set<string> => {
    const errs = new Set<string>();
    if (form.ownershipProof.length < 10) errs.add("ownershipProof");
    if (form.claimantName.trim().length < 2) errs.add("claimantName");
    if (!form.claimantPhone.trim()) errs.add("claimantPhone");
    return errs;
  }, [form]);

  /* ── Submit ─────────────────────────────────────────────────────────── */

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const errs = validate();
      if (errs.size > 0) {
        setFieldErrors(errs);
        return;
      }
      setSubmitting(true);
      setSubmitError("");
      try {
        const fd = new FormData();
        fd.append("claimantName", form.claimantName);
        if (form.claimantPhone) fd.append("claimantPhone", form.claimantPhone);
        if (form.claimantEmail) fd.append("claimantEmail", form.claimantEmail);
        if (form.flightNumber) fd.append("flightNumber", form.flightNumber);
        if (form.seatNumber) fd.append("seatNumber", form.seatNumber);
        fd.append("ownershipProof", form.ownershipProof);
        form.files.forEach((f) => fd.append("images", f));
        const res = await submitClaim(item.id, fd);
        setRefCode(res.referenceCode ?? "");
        setClaimDone(true);
        onSuccess();
      } catch {
        setSubmitError(t("errorGeneric", lang));
      } finally {
        setSubmitting(false);
      }
    },
    [form, item.id, lang, onSuccess, validate],
  );

  /* ── Success state ──────────────────────────────────────────────────── */

  const handleCopyRef = async () => {
    try {
      await navigator.clipboard.writeText(refCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* noop */ }
  };

  if (claimDone) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-emerald-200/50" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 shadow-lg shadow-emerald-100/60">
            <CheckCircle2 className="h-7 w-7 text-emerald-600" />
          </div>
          <Sparkles className="absolute -right-2 -top-1 h-4 w-4 text-amber-400 lf-scale" />
        </div>
        <p className="max-w-xs text-sm font-semibold text-gray-900">
          {t("claimSuccess", lang)}
        </p>

        {refCode && (
          <div className="w-full max-w-xs rounded-2xl border border-primary/15 bg-gradient-to-b from-primary/[0.04] to-transparent px-6 py-5">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-primary/70">
              {t("claimRefCode", lang)}
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono text-xl font-extrabold tracking-widest text-gray-900">
                {refCode}
              </span>
              <button
                type="button"
                onClick={handleCopyRef}
                className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="mt-2.5 text-[11px] leading-relaxed text-gray-400">
              {t("claimRefCodeHint", lang)}
            </p>
          </div>
        )}

        <button
          onClick={onCancel}
          className="text-sm font-medium text-primary underline-offset-2 transition hover:underline"
        >
          {t("backToList", lang)}
        </button>
      </div>
    );
  }

  /* ── Form ────────────────────────────────────────────────────────────── */

  return (
    <form onSubmit={handleSubmit} className="animate-[lf-in_0.3s_ease_both]">
      {/* MATCHED notice */}
      {isMatched && (
        <div className="mb-5 flex items-start gap-2.5 rounded-xl bg-amber-50 px-4 py-3 ring-1 ring-amber-200/60">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
          <p className="text-xs leading-relaxed text-amber-700">
            {t("statusMatchedHint", lang)}
          </p>
        </div>
      )}

      {/* ── Two-column layout on md+ ──────────────────────────────────── */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* ── Left: Prove it's yours ──────────────────────────────────── */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {t("claimSectionDescribe", lang)}
            </h4>
          </div>

          {/* Ownership proof */}
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-gray-600">
              {t("ownershipProof", lang)} <Req />
            </span>
            <textarea
              maxLength={2000}
              value={form.ownershipProof}
              onChange={(e) =>
                update((f) => ({ ...f, ownershipProof: e.target.value }))
              }
              placeholder={t("ownershipProofHint", lang)}
              rows={3}
              className={`resize-none ${
                hasErr("ownershipProof") ||
                (form.ownershipProof.length > 0 &&
                  form.ownershipProof.length < 10)
                  ? INPUT_ERR
                  : INPUT
              }`}
            />
            <div className="mt-0.5 flex justify-between text-[11px]">
              <span
                className={
                  form.ownershipProof.length > 0 &&
                  form.ownershipProof.length < 10
                    ? "text-red-500"
                    : "text-transparent"
                }
              >
                {t("ownershipProofMinLength", lang)}
              </span>
              <span
                className={
                  form.ownershipProof.length >= 1900
                    ? "text-red-500"
                    : "text-gray-400"
                }
              >
                {form.ownershipProof.length}/2000
              </span>
            </div>
          </label>

          {/* File upload */}
          <div>
            <span className="mb-1 block text-xs font-semibold text-gray-600">
              {t("proofPhotos", lang)}
            </span>
            {form.files.length === 0 ? (
              <div className="group relative rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50 px-3 py-4 text-center transition hover:border-primary/40 hover:bg-primary/[0.02]">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  multiple
                  className="sr-only"
                  id={`${formId}-files`}
                  onChange={(e) => {
                    const picked = Array.from(e.target.files ?? []);
                    if (picked.length)
                      update((f) => ({ ...f, files: picked.slice(0, 5) }));
                    e.target.value = "";
                  }}
                />
                <label
                  htmlFor={`${formId}-files`}
                  className="flex cursor-pointer flex-col items-center gap-1"
                >
                  <Camera className="h-5 w-5 text-gray-400 transition group-hover:text-primary" />
                  <span className="text-xs font-semibold text-primary">
                    {t("proofPhotos", lang)}
                  </span>
                  <p className="max-w-[220px] text-[10px] leading-relaxed text-gray-400">
                    {t("proofPhotosHint", lang)}
                  </p>
                </label>
              </div>
            ) : (
              <FilePreviewGrid
                files={form.files}
                onRemove={(i) =>
                  update((prev) => ({
                    ...prev,
                    files: prev.files.filter((_, j) => j !== i),
                  }))
                }
                onAddFiles={(picked) =>
                  update((f) => ({
                    ...f,
                    files: [...f.files, ...picked].slice(0, 5),
                  }))
                }
              />
            )}
          </div>
        </div>

        {/* ── Right: Your details ─────────────────────────────────────── */}
        <div className="space-y-4">
          {/* Contact */}
          <div className="flex items-center gap-2">
            <UserRound className="h-4 w-4 text-primary" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {t("claimSectionContact", lang)}
            </h4>
          </div>

          <div className="grid gap-3 grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-gray-600">
                {t("claimantName", lang)} <Req />
              </span>
              <input
                type="text"
                value={form.claimantName}
                onChange={(e) =>
                  update((f) => ({ ...f, claimantName: e.target.value }))
                }
                className={hasErr("claimantName") ? INPUT_ERR : INPUT}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-gray-600">
                {t("claimantPhone", lang)} <Req />
              </span>
              <input
                type="tel"
                value={form.claimantPhone}
                onChange={(e) =>
                  update((f) => ({ ...f, claimantPhone: e.target.value }))
                }
                className={hasErr("claimantPhone") ? INPUT_ERR : INPUT}
              />
            </label>
          </div>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-gray-600">
              {t("claimantEmail", lang)}
            </span>
            <input
              type="email"
              value={form.claimantEmail}
              onChange={(e) =>
                update((f) => ({ ...f, claimantEmail: e.target.value }))
              }
              placeholder="example@email.com"
              className={INPUT}
            />
          </label>

          {/* Divider */}
          <div className="h-px bg-gray-100" />

          {/* Flight */}
          <div className="flex items-center gap-2">
            <PlaneTakeoff className="h-4 w-4 text-primary" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {t("claimSectionFlight", lang)}
            </h4>
            <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[9px] font-medium text-gray-400">
              {lang === "lo" ? "ບໍ່ບັງຄັບ" : lang === "zh" ? "选填" : "Optional"}
            </span>
          </div>

          <div className="grid gap-3 grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-gray-600">
                {t("claimFlightNumber", lang)}
              </span>
              <input
                type="text"
                maxLength={20}
                value={form.flightNumber}
                onChange={(e) =>
                  update((f) => ({ ...f, flightNumber: e.target.value }))
                }
                placeholder="QV 201"
                className={INPUT}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-gray-600">
                {t("claimSeatNumber", lang)}
              </span>
              <input
                type="text"
                maxLength={20}
                value={form.seatNumber}
                onChange={(e) =>
                  update((f) => ({ ...f, seatNumber: e.target.value }))
                }
                placeholder="14A"
                className={INPUT}
              />
            </label>
          </div>
        </div>
      </div>

      {/* ── Error + submit bar ─────────────────────────────────────────── */}
      {(submitError || fieldErrors.size > 0) && (
        <div className="mt-5 flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3">
          <p className="flex-1 text-sm text-red-600">
            {submitError ||
              (lang === "lo"
                ? "ກະລຸນາຕື່ມຂໍ້ມູນທີ່ຈຳເປັນໃຫ້ຄົບ"
                : lang === "zh"
                  ? "请填写所有必填项"
                  : "Please complete all required fields")}
          </p>
          <button
            type="button"
            onClick={() => {
              setFieldErrors(new Set());
              setSubmitError("");
            }}
            className="mt-0.5 shrink-0 text-red-400 hover:text-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-primary-600 hover:shadow-md hover:shadow-primary/15 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting ? t("submitting", lang) : t("submitClaim", lang)}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
        >
          {t("cancelClaim", lang)}
        </button>
      </div>
    </form>
  );
}
