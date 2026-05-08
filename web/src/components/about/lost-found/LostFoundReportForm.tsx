"use client";

import { useState, useCallback, useId } from "react";
import {
  X,
  Loader2,
  CheckCircle2,
  Copy,
  Check,
  Package,
  PlaneTakeoff,
  ShieldCheck,
  UserRound,
  Camera,
  Sparkles,
  Luggage,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";
import type { Lang } from "@/types/language";
import { LostFoundCategory } from "@/types/enum";
import { submitStandaloneClaim } from "@/services/lost-found";
import { t, CATEGORY_KEYS } from "./lost-found.constants";
import { FilePreviewGrid } from "./FilePreviewGrid";

interface ReportFormState {
  category: LostFoundCategory | "";
  itemDescription: string;
  lostDate: string;
  lostLocation: string;
  ownershipProof: string;
  flightNumber: string;
  seatNumber: string;
  claimantName: string;
  claimantPhone: string;
  claimantEmail: string;
  files: File[];
}

const emptyForm = (): ReportFormState => ({
  category: "",
  itemDescription: "",
  lostDate: "",
  lostLocation: "",
  ownershipProof: "",
  flightNumber: "",
  seatNumber: "",
  claimantName: "",
  claimantPhone: "",
  claimantEmail: "",
  files: [],
});

const CATEGORIES = Object.values(LostFoundCategory);
const TOTAL_STEPS = 4;

/* ── Step config ───────────────────────────────────────────────────────── */

const STEPS = [
  { icon: Package, labelKey: "reportStep1" as const },
  { icon: PlaneTakeoff, labelKey: "reportStep2" as const },
  { icon: ShieldCheck, labelKey: "reportStep3" as const },
  { icon: UserRound, labelKey: "reportStep4" as const },
];

/* ── Input class helpers ───────────────────────────────────────────────── */

const INPUT_BASE =
  "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:ring-2";
const INPUT_NORMAL =
  `${INPUT_BASE} border-gray-200 focus:border-primary focus:ring-primary/20`;
const INPUT_ERROR =
  `${INPUT_BASE} border-red-300 focus:border-red-400 focus:ring-red-100`;
const SELECT_BASE =
  "w-full appearance-none rounded-lg border bg-white pl-3 pr-10 py-2.5 text-sm text-gray-900 outline-none transition focus:ring-2";
const SELECT_NORMAL =
  `${SELECT_BASE} border-gray-200 focus:border-primary focus:ring-primary/20`;
const SELECT_ERROR =
  `${SELECT_BASE} border-red-300 focus:border-red-400 focus:ring-red-100`;

function Req() {
  return <span className="ml-0.5 text-red-400">*</span>;
}

/* ── Sidebar panel (large screens) ───────────────────────────────────── */

function InfoSidebar({ lang, step }: { lang: Lang; step: number }) {
  const tips = [
    { icon: Package, label: t("reportSectionItem", lang) },
    { icon: PlaneTakeoff, label: t("claimSectionFlight", lang) },
    { icon: ShieldCheck, label: t("claimSectionProof", lang) },
    { icon: UserRound, label: t("claimSectionContact", lang) },
  ];

  return (
    <div className="relative hidden overflow-hidden rounded-l-2xl bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 p-8 lg:flex lg:flex-col lg:justify-between">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/[0.06]" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full border border-white/[0.06]" />
      <div className="pointer-events-none absolute right-8 top-1/2 h-24 w-24 rounded-full bg-white/[0.03]" />

      {/* Top content */}
      <div className="relative">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
          <Luggage className="h-7 w-7 text-white" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-white">
          {t("reportTitle", lang)}
        </h3>
        <p className="text-sm leading-relaxed text-white/60">
          {t("reportSubtitle", lang)}
        </p>
      </div>

      {/* Step-aware checklist — 1:1 mapping with 4 steps */}
      <div className="relative mt-10">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-white/40">
          {t("reportFormChecklist", lang)}
        </p>
        <div className="space-y-3">
          {tips.map(({ icon: Icon, label }, i) => {
            const state =
              i < step ? "done" : i === step ? "active" : "upcoming";
            return (
              <div key={label} className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                    state === "active"
                      ? "bg-white/20 ring-1 ring-white/30"
                      : state === "done"
                        ? "bg-emerald-400/20"
                        : "bg-white/10"
                  }`}
                >
                  {state === "done" ? (
                    <Check className="h-4 w-4 text-emerald-300" />
                  ) : (
                    <Icon
                      className={`h-4 w-4 transition-colors duration-300 ${
                        state === "active" ? "text-white" : "text-white/50"
                      }`}
                    />
                  )}
                </div>
                <span
                  className={`text-sm transition-colors duration-300 ${
                    state === "active"
                      ? "font-semibold text-white"
                      : state === "done"
                        ? "text-emerald-200/70"
                        : "text-white/50"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom hint */}
      <div className="relative mt-10 rounded-xl bg-white/[0.07] px-4 py-3.5 backdrop-blur-sm">
        <p className="text-xs leading-relaxed text-white/50">
          {t("reportSidebarHint", lang)}
        </p>
      </div>
    </div>
  );
}

/* ── Step indicator (top of form panel) ────────────────────────────────── */

function StepIndicator({ step, lang }: { step: number; lang: Lang }) {
  return (
    <div className="mb-7">
      {/* Desktop: horizontal step circles + labels — centered */}
      <div className="hidden sm:block">
        {/* Circles + connectors row */}
        <div className="flex items-center justify-center">
          {STEPS.map(({ icon: Icon, labelKey }, i) => {
            const isDone = i < step;
            const isCurrent = i === step;
            return (
              <div key={labelKey} className="flex items-center">
                {/* Circle */}
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isDone
                        ? "border-emerald-400 bg-emerald-50"
                        : isCurrent
                          ? "border-primary bg-primary/10 ring-4 ring-primary/10"
                          : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    {isDone ? (
                      <Check className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Icon
                        className={`h-4 w-4 ${
                          isCurrent ? "text-primary" : "text-gray-400"
                        }`}
                      />
                    )}
                  </div>
                  {/* Label */}
                  <span
                    className={`text-[11px] font-semibold transition-colors duration-300 ${
                      isDone
                        ? "text-emerald-600"
                        : isCurrent
                          ? "text-primary"
                          : "text-gray-400"
                    }`}
                  >
                    {t(labelKey, lang)}
                  </span>
                </div>

                {/* Connector line */}
                {i < TOTAL_STEPS - 1 && (
                  <div className="mx-2 mb-5 h-0.5 w-16 lg:w-20">
                    <div
                      className={`h-full rounded-full transition-colors duration-500 ${
                        i < step ? "bg-emerald-300" : "bg-gray-200"
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: compact progress bar + step label */}
      <div className="sm:hidden">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-bold text-gray-800">
            {t(STEPS[step].labelKey, lang)}
          </span>
          <span className="text-xs font-medium text-gray-400">
            {step + 1} {t("reportStepOf", lang)} {TOTAL_STEPS}
          </span>
        </div>
        <div className="flex gap-1.5">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                i < step
                  ? "bg-emerald-400"
                  : i === step
                    ? "bg-primary"
                    : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────────── */

interface Props {
  lang: Lang;
  onCancel: () => void;
}

export function LostFoundReportForm({ lang, onCancel }: Props) {
  const formId = useId();
  const [form, setForm] = useState<ReportFormState>(emptyForm);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [done, setDone] = useState(false);
  const [refCode, setRefCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [stepErrors, setStepErrors] = useState<string[]>([]);

  /* ── Form updater — clears errors on any field change ───────────── */

  const updateForm = useCallback(
    (updater: (prev: ReportFormState) => ReportFormState) => {
      setForm(updater);
      setStepErrors([]);
      setSubmitError("");
    },
    [],
  );

  /* ── Per-step validation ────────────────────────────────────────────── */

  const validateStep = useCallback(
    (s: number): string[] => {
      const errors: string[] = [];
      if (s === 0) {
        if (!form.category) errors.push(t("reportCategory", lang));
        if (form.itemDescription.length < 5)
          errors.push(t("reportItemDesc", lang));
      } else if (s === 1) {
        // Flight details — all optional, no validation
      } else if (s === 2) {
        if (form.ownershipProof.length < 10)
          errors.push(t("ownershipProof", lang));
      } else if (s === 3) {
        if (form.claimantName.trim().length < 2)
          errors.push(t("claimantName", lang));
        if (!form.claimantPhone.trim())
          errors.push(t("claimantPhone", lang));
      }
      return errors;
    },
    [form, lang],
  );

  const handleNext = useCallback(() => {
    const errors = validateStep(step);
    if (errors.length > 0) {
      setStepErrors(errors);
      return;
    }
    setStepErrors([]);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }, [step, validateStep]);

  const handleBack = useCallback(() => {
    setStepErrors([]);
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  /* ── Submit ─────────────────────────────────────────────────────────── */

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const errors = validateStep(step);
      if (errors.length > 0) {
        setStepErrors(errors);
        return;
      }
      setStepErrors([]);
      setSubmitting(true);
      setSubmitError("");
      try {
        const fd = new FormData();
        fd.append("category", form.category);
        fd.append("itemDescription", form.itemDescription);
        if (form.lostDate) fd.append("lostDate", form.lostDate);
        if (form.lostLocation) fd.append("lostLocation", form.lostLocation);
        fd.append("ownershipProof", form.ownershipProof);
        if (form.flightNumber) fd.append("flightNumber", form.flightNumber);
        if (form.seatNumber) fd.append("seatNumber", form.seatNumber);
        fd.append("claimantName", form.claimantName);
        if (form.claimantPhone) fd.append("claimantPhone", form.claimantPhone);
        if (form.claimantEmail) fd.append("claimantEmail", form.claimantEmail);
        form.files.forEach((f) => fd.append("images", f));

        const result = await submitStandaloneClaim(fd);
        setRefCode(result.referenceCode);
        setDone(true);
      } catch {
        setSubmitError(t("errorGeneric", lang));
      } finally {
        setSubmitting(false);
      }
    },
    [form, lang, step, validateStep],
  );

  const handleCopyRef = async () => {
    try {
      await navigator.clipboard.writeText(refCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback */
    }
  };

  /* ── Helper: is a specific field in error? ──────────────────────────── */
  const hasError = (fieldKey: string) => stepErrors.includes(fieldKey);

  // ── Success state ──────────────────────────────────────────────────
  if (done) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm lg:grid lg:grid-cols-[340px_1fr]">
        <InfoSidebar lang={lang} step={TOTAL_STEPS} />
        <div className="flex flex-col items-center justify-center gap-5 px-6 py-14 text-center lg:px-12">
          {/* Animated check */}
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-200/50" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 shadow-lg shadow-emerald-100/60">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <Sparkles className="absolute -right-2 -top-1 h-5 w-5 text-amber-400 lf-scale" />
          </div>

          <p className="max-w-sm text-lg font-bold text-gray-900">
            {t("reportSuccess", lang)}
          </p>

          {refCode && (
            <div className="w-full max-w-xs rounded-2xl border border-primary/15 bg-gradient-to-b from-primary/[0.04] to-transparent px-6 py-5">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-primary/70">
                {t("reportRefCode", lang)}
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-xl font-extrabold tracking-widest text-gray-900">
                  {refCode}
                </span>
                <button
                  type="button"
                  onClick={handleCopyRef}
                  className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-primary"
                  title="Copy"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="mt-2.5 text-[11px] leading-relaxed text-gray-400">
                {t("reportRefCodeHint", lang)}
              </p>
            </div>
          )}

          <button
            onClick={onCancel}
            className="mt-1 text-sm font-medium text-primary underline-offset-2 transition hover:underline"
          >
            {t("backToList", lang)}
          </button>
        </div>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:grid lg:grid-cols-[340px_1fr]">
      {/* Left panel — visible on lg+ */}
      <InfoSidebar lang={lang} step={step} />

      {/* Right panel — stepper form */}
      <div className="px-5 py-7 sm:px-8 sm:py-8">
        {/* Mobile-only header (desktop shows it in sidebar) */}
        <div className="mb-5 lg:hidden">
          <h3 className="text-lg font-bold text-gray-900">
            {t("reportTitle", lang)}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {t("reportSubtitle", lang)}
          </p>
        </div>

        {/* Step indicator */}
        <StepIndicator step={step} lang={lang} />

        <form id={`${formId}-report`} onSubmit={handleSubmit}>
          {/* ─── Step content ─────────────────────────────────────── */}
          <div className="relative min-h-[260px]">
            {/* Step 0: Item details */}
            {step === 0 && (
              <div className="animate-[lf-in_0.3s_ease_both] space-y-4">
                <div className="flex items-center gap-2.5">
                  <Package className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-bold text-gray-800">
                    {t("reportSectionItem", lang)}
                  </h3>
                </div>

                {/* Category + Date row */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1 block text-xs font-semibold text-gray-600">
                      {t("reportCategory", lang)} <Req />
                    </span>
                    <div className="relative">
                      <select
                        value={form.category}
                        onChange={(e) =>
                          updateForm((f) => ({
                            ...f,
                            category: e.target.value as LostFoundCategory | "",
                          }))
                        }
                        className={
                          hasError(t("reportCategory", lang))
                            ? SELECT_ERROR
                            : SELECT_NORMAL
                        }
                      >
                        <option value="">
                          {t("reportCategoryPlaceholder", lang)}
                        </option>
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {t(CATEGORY_KEYS[cat], lang)}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    </div>
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs font-semibold text-gray-600">
                      {t("reportLostDate", lang)}
                    </span>
                    <input
                      type="date"
                      value={form.lostDate}
                      onChange={(e) =>
                        updateForm((f) => ({ ...f, lostDate: e.target.value }))
                      }
                      className={INPUT_NORMAL}
                    />
                  </label>
                </div>

                {/* Item description */}
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-gray-600">
                    {t("reportItemDesc", lang)} <Req />
                  </span>
                  <textarea
                    minLength={5}
                    maxLength={2000}
                    value={form.itemDescription}
                    onChange={(e) =>
                      updateForm((f) => ({
                        ...f,
                        itemDescription: e.target.value,
                      }))
                    }
                    placeholder={t("reportItemDescHint", lang)}
                    rows={3}
                    className={`resize-none ${
                      hasError(t("reportItemDesc", lang)) ||
                      (form.itemDescription.length > 0 &&
                        form.itemDescription.length < 5)
                        ? INPUT_ERROR
                        : INPUT_NORMAL
                    }`}
                  />
                  <div className="mt-0.5 flex justify-between text-[11px]">
                    <span
                      className={
                        form.itemDescription.length > 0 &&
                        form.itemDescription.length < 5
                          ? "text-red-500"
                          : "text-transparent"
                      }
                    >
                      {t("reportItemDescMinLength", lang)}
                    </span>
                    <span
                      className={
                        form.itemDescription.length >= 1900
                          ? "text-red-500"
                          : "text-gray-400"
                      }
                    >
                      {form.itemDescription.length}/2000
                    </span>
                  </div>
                </label>

                {/* Location */}
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-gray-600">
                    {t("reportLostLocation", lang)}
                  </span>
                  <input
                    type="text"
                    maxLength={255}
                    value={form.lostLocation}
                    onChange={(e) =>
                      updateForm((f) => ({
                        ...f,
                        lostLocation: e.target.value,
                      }))
                    }
                    placeholder={t("reportLostLocationHint", lang)}
                    className={INPUT_NORMAL}
                  />
                </label>
              </div>
            )}

            {/* Step 1: Flight details */}
            {step === 1 && (
              <div className="animate-[lf-in_0.3s_ease_both] space-y-4">
                <div className="flex items-center gap-2.5">
                  <PlaneTakeoff className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-bold text-gray-800">
                    {t("claimSectionFlight", lang)}
                  </h3>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1 block text-xs font-semibold text-gray-600">
                      {t("claimFlightNumber", lang)}
                    </span>
                    <input
                      type="text"
                      maxLength={20}
                      value={form.flightNumber}
                      onChange={(e) =>
                        updateForm((f) => ({
                          ...f,
                          flightNumber: e.target.value,
                        }))
                      }
                      placeholder="QV 201"
                      className={INPUT_NORMAL}
                    />
                    <p className="mt-1 text-[11px] text-gray-400">
                      {t("claimFlightHint", lang)}
                    </p>
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
                        updateForm((f) => ({
                          ...f,
                          seatNumber: e.target.value,
                        }))
                      }
                      placeholder="14A"
                      className={INPUT_NORMAL}
                    />
                    <p className="mt-1 text-[11px] text-gray-400">
                      {t("claimSeatHint", lang)}
                    </p>
                  </label>
                </div>

                {/* Helpful note */}
                <div className="rounded-xl bg-primary/[0.04] px-4 py-3">
                  <p className="text-xs leading-relaxed text-gray-500">
                    {lang === "lo"
                      ? "ຂໍ້ມູນຖ້ຽວບິນບໍ່ບັງຄັບ ແຕ່ຈະຊ່ວຍໃຫ້ພະນັກງານກວດສອບໄດ້ໄວຂຶ້ນ."
                      : lang === "zh"
                        ? "航班信息为选填项，但有助于加快审核速度。"
                        : "Flight details are optional but help our staff verify your claim faster."}
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Proof of ownership */}
            {step === 2 && (
              <div className="animate-[lf-in_0.3s_ease_both] space-y-4">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-bold text-gray-800">
                    {t("claimSectionProof", lang)}
                  </h3>
                </div>

                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-gray-600">
                    {t("ownershipProof", lang)} <Req />
                  </span>
                  <textarea
                    minLength={10}
                    maxLength={2000}
                    value={form.ownershipProof}
                    onChange={(e) =>
                      updateForm((f) => ({
                        ...f,
                        ownershipProof: e.target.value,
                      }))
                    }
                    placeholder={t("ownershipProofHint", lang)}
                    rows={3}
                    className={`resize-none ${
                      hasError(t("ownershipProof", lang)) ||
                      (form.ownershipProof.length > 0 &&
                        form.ownershipProof.length < 10)
                        ? INPUT_ERROR
                        : INPUT_NORMAL
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
                    <div className="group relative rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50 px-4 py-5 text-center transition hover:border-primary/40 hover:bg-primary/[0.02]">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        multiple
                        className="sr-only"
                        id={`${formId}-files`}
                        onChange={(e) => {
                          const picked = Array.from(e.target.files ?? []);
                          if (picked.length)
                            updateForm((f) => ({
                              ...f,
                              files: picked.slice(0, 5),
                            }));
                          e.target.value = "";
                        }}
                      />
                      <label
                        htmlFor={`${formId}-files`}
                        className="flex cursor-pointer flex-col items-center gap-1.5"
                      >
                        <Camera className="h-5 w-5 text-gray-400 transition group-hover:text-primary" />
                        <span className="text-xs font-semibold text-primary">
                          {t("proofPhotos", lang)}
                        </span>
                        <p className="max-w-xs text-[10px] leading-relaxed text-gray-400">
                          {t("proofPhotosHint", lang)}
                        </p>
                      </label>
                    </div>
                  ) : (
                    <FilePreviewGrid
                      files={form.files}
                      onRemove={(i) =>
                        updateForm((prev) => ({
                          ...prev,
                          files: prev.files.filter((_, j) => j !== i),
                        }))
                      }
                      onAddFiles={(picked) =>
                        updateForm((f) => ({
                          ...f,
                          files: [...f.files, ...picked].slice(0, 5),
                        }))
                      }
                    />
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Contact info */}
            {step === 3 && (
              <div className="animate-[lf-in_0.3s_ease_both] space-y-4">
                <div className="flex items-center gap-2.5">
                  <UserRound className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-bold text-gray-800">
                    {t("claimSectionContact", lang)}
                  </h3>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1 block text-xs font-semibold text-gray-600">
                      {t("claimantName", lang)} <Req />
                    </span>
                    <input
                      type="text"
                      minLength={2}
                      value={form.claimantName}
                      onChange={(e) =>
                        updateForm((f) => ({
                          ...f,
                          claimantName: e.target.value,
                        }))
                      }
                      className={
                        hasError(t("claimantName", lang))
                          ? INPUT_ERROR
                          : INPUT_NORMAL
                      }
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
                        updateForm((f) => ({
                          ...f,
                          claimantPhone: e.target.value,
                        }))
                      }
                      className={
                        hasError(t("claimantPhone", lang))
                          ? INPUT_ERROR
                          : INPUT_NORMAL
                      }
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
                      updateForm((f) => ({
                        ...f,
                        claimantEmail: e.target.value,
                      }))
                    }
                    placeholder="example@email.com"
                    className={INPUT_NORMAL}
                  />
                </label>

                {/* Review summary on final step */}
                <div className="mt-2 rounded-xl bg-gray-50 p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {lang === "lo"
                      ? "ສະຫຼຸບລາຍງານ"
                      : lang === "zh"
                        ? "报告摘要"
                        : "Report Summary"}
                  </p>
                  <div className="space-y-2 text-sm">
                    {form.category && (
                      <div className="flex gap-2">
                        <span className="shrink-0 text-gray-400">
                          {t("reportCategory", lang)}:
                        </span>
                        <span className="font-medium text-gray-700">
                          {t(
                            CATEGORY_KEYS[form.category as LostFoundCategory],
                            lang,
                          )}
                        </span>
                      </div>
                    )}
                    {form.itemDescription && (
                      <div className="flex gap-2">
                        <span className="shrink-0 text-gray-400">
                          {t("reportItemDesc", lang)}:
                        </span>
                        <span className="line-clamp-2 font-medium text-gray-700">
                          {form.itemDescription}
                        </span>
                      </div>
                    )}
                    {form.flightNumber && (
                      <div className="flex gap-2">
                        <span className="shrink-0 text-gray-400">
                          {t("claimFlightNumber", lang)}:
                        </span>
                        <span className="font-medium text-gray-700">
                          {form.flightNumber}
                        </span>
                      </div>
                    )}
                    {form.files.length > 0 && (
                      <div className="flex gap-2">
                        <span className="shrink-0 text-gray-400">
                          {t("proofPhotos", lang)}:
                        </span>
                        <span className="font-medium text-gray-700">
                          {form.files.length}{" "}
                          {lang === "lo"
                            ? "ໄຟລ໌"
                            : lang === "zh"
                              ? "个文件"
                              : "file(s)"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ─── Validation errors ─────────────────────────────────── */}
          {stepErrors.length > 0 && (
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3">
              <p className="flex-1 text-sm text-red-600">
                {lang === "lo"
                  ? "ກະລຸນາຕື່ມຂໍ້ມູນທີ່ຈຳເປັນ"
                  : lang === "zh"
                    ? "请填写必填项"
                    : "Please fill in the required fields"}
                : {stepErrors.join(", ")}
              </p>
              <button
                type="button"
                onClick={() => setStepErrors([])}
                className="mt-0.5 shrink-0 text-red-400 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* ─── Submit error ─────────────────────────────────────── */}
          {submitError && (
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3">
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

          {/* ─── Navigation bar ────────────────────────────────────── */}
          <div className="mt-7 flex items-center border-t border-gray-100 pt-5">
            {/* Back / Cancel — left side */}
            <button
              type="button"
              onClick={step === 0 ? onCancel : handleBack}
              className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
            >
              <ChevronLeft className="h-4 w-4" />
              {step === 0 ? t("cancelClaim", lang) : t("reportStepBack", lang)}
            </button>

            <div className="flex-1" />

            {/* Next / Submit — right side */}
            {step < TOTAL_STEPS - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-primary-600 hover:shadow-md hover:shadow-primary/15"
              >
                {t("reportStepNext", lang)}
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-primary-600 hover:shadow-md hover:shadow-primary/15 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitting
                  ? t("submitting", lang)
                  : t("reportSubmit", lang)}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
