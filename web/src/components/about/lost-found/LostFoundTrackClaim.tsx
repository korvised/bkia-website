"use client";

import { useState, useRef } from "react";
import {
  Search,
  Loader2,
  ClipboardList,
  Clock,
  CheckCircle2,
  XCircle,
  PackageCheck,
  RotateCcw,
  Send,
  Eye,
  AlertCircle,
  MapPin,
  CalendarDays,
  Tag,
  FileText,
  Link2,
  MessageSquareText,
} from "lucide-react";
import type { Lang } from "@/types/language";
import { ClaimStatus, LostFoundCategory } from "@/types/enum";
import { trackClaim, type TrackedClaim } from "@/services/lost-found";
import { t, CATEGORY_KEYS, formatDate } from "./lost-found.constants";

interface LostFoundTrackClaimProps {
  lang: Lang;
}

/* ── Timeline steps ─────────────────────────────────────────────────────── */

interface TimelineStep {
  key: string;
  icon: typeof Clock;
  labelKey: string;
  state: "done" | "active" | "upcoming" | "rejected";
  date?: string | null;
}

function buildTimeline(claim: TrackedClaim, lang: Lang): TimelineStep[] {
  const s = claim.status as ClaimStatus;

  // Submitted — always done
  const submitted: TimelineStep = {
    key: "submitted",
    icon: Send,
    labelKey: "trackStepSubmitted",
    state: "done",
    date: claim.createdAt,
  };

  // Under Review
  const reviewing: TimelineStep = {
    key: "reviewing",
    icon: Eye,
    labelKey: "trackStepReviewing",
    state:
      s === ClaimStatus.PENDING
        ? "active"
        : "done",
    date: s === ClaimStatus.PENDING ? null : claim.reviewedAt,
  };

  // If rejected — show rejected step and stop
  if (s === ClaimStatus.REJECTED) {
    return [
      submitted,
      reviewing,
      {
        key: "rejected",
        icon: XCircle,
        labelKey: "trackStepRejected",
        state: "rejected",
        date: claim.reviewedAt,
      },
    ];
  }

  // Approved
  const approved: TimelineStep = {
    key: "approved",
    icon: CheckCircle2,
    labelKey: "trackStepApproved",
    state:
      s === ClaimStatus.PENDING
        ? "upcoming"
        : s === ClaimStatus.APPROVED
          ? "active"
          : "done",
    date: [ClaimStatus.APPROVED, ClaimStatus.COMPLETED].includes(s)
      ? claim.reviewedAt
      : null,
  };

  // Completed / Returned
  const completed: TimelineStep = {
    key: "completed",
    icon: PackageCheck,
    labelKey: "trackStepCompleted",
    state:
      s === ClaimStatus.COMPLETED ? "done" : "upcoming",
    date: s === ClaimStatus.COMPLETED ? claim.updatedAt : null,
  };

  return [submitted, reviewing, approved, completed];
}

/* ── Colors per state ───────────────────────────────────────────────────── */

const STATE_STYLES = {
  done: {
    dot: "bg-primary text-white",
    line: "bg-primary",
    text: "text-gray-900",
    date: "text-gray-500",
  },
  active: {
    dot: "bg-primary text-white ring-4 ring-primary/20",
    line: "bg-gray-200",
    text: "text-gray-900 font-semibold",
    date: "text-primary",
  },
  upcoming: {
    dot: "bg-gray-200 text-gray-400",
    line: "bg-gray-200",
    text: "text-gray-400",
    date: "text-gray-300",
  },
  rejected: {
    dot: "bg-red-500 text-white ring-4 ring-red-100",
    line: "bg-gray-200",
    text: "text-red-600 font-semibold",
    date: "text-red-400",
  },
};

/* ── Status banner config ───────────────────────────────────────────────── */

const BANNER_CONFIG: Record<
  string,
  {
    icon: typeof Clock;
    colorClass: string;
    bgClass: string;
    borderClass: string;
    labelKey: "trackStatusPending" | "trackStatusApproved" | "trackStatusRejected" | "trackStatusCompleted";
    hintKey: "trackPendingHint" | "trackApprovedHint" | "trackRejectedHint" | "trackCompletedHint";
  }
> = {
  [ClaimStatus.PENDING]: {
    icon: Clock,
    colorClass: "text-amber-600",
    bgClass: "bg-amber-50",
    borderClass: "border-amber-200",
    labelKey: "trackStatusPending",
    hintKey: "trackPendingHint",
  },
  [ClaimStatus.APPROVED]: {
    icon: CheckCircle2,
    colorClass: "text-blue-600",
    bgClass: "bg-blue-50",
    borderClass: "border-blue-200",
    labelKey: "trackStatusApproved",
    hintKey: "trackApprovedHint",
  },
  [ClaimStatus.REJECTED]: {
    icon: XCircle,
    colorClass: "text-red-600",
    bgClass: "bg-red-50",
    borderClass: "border-red-200",
    labelKey: "trackStatusRejected",
    hintKey: "trackRejectedHint",
  },
  [ClaimStatus.COMPLETED]: {
    icon: PackageCheck,
    colorClass: "text-emerald-600",
    bgClass: "bg-emerald-50",
    borderClass: "border-emerald-200",
    labelKey: "trackStatusCompleted",
    hintKey: "trackCompletedHint",
  },
};

/* ── Main component ─────────────────────────────────────────────────────── */

export function LostFoundTrackClaim({ lang }: LostFoundTrackClaimProps) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<"not_found" | "generic" | null>(null);
  const [result, setResult] = useState<TrackedClaim | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTrack = async () => {
    const trimmed = code.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await trackClaim(trimmed);
      setResult(data);
    } catch (err: any) {
      if (err?.status === 404) {
        setError("not_found");
      } else {
        setError("generic");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCode("");
    setResult(null);
    setError(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const banner = result ? BANNER_CONFIG[result.status] : null;
  const timeline = result ? buildTimeline(result, lang) : [];

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <ClipboardList className="h-5 w-5 text-primary" />
          </div>
          <h2 className="mb-1.5 text-xl font-bold text-gray-900 md:text-2xl">
            {t("trackTitle", lang)}
          </h2>
          <p className="mx-auto max-w-md text-sm text-gray-500">
            {t("trackSubtitle", lang)}
          </p>
        </div>

        {/* Search input — always visible */}
        <div className="mx-auto mb-6 max-w-md">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setError(null);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              placeholder={t("trackPlaceholder", lang)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-4 pr-24 font-mono text-sm tracking-wider text-gray-800 placeholder-gray-400 outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
              disabled={loading}
            />
            <button
              type="button"
              onClick={handleTrack}
              disabled={loading || !code.trim()}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Search className="h-3.5 w-3.5" />
              )}
              {t("trackButton", lang)}
            </button>
          </div>
        </div>

        {/* Error: not found */}
        {error === "not_found" && (
          <div className="mx-auto max-w-md rounded-xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center">
            <AlertCircle className="mx-auto mb-2 h-7 w-7 text-gray-300" />
            <p className="mb-1 text-sm font-semibold text-gray-700">
              {t("trackNotFound", lang)}
            </p>
            <p className="text-xs text-gray-400">
              {t("trackNotFoundHint", lang)}
            </p>
          </div>
        )}

        {/* Error: generic */}
        {error === "generic" && (
          <div className="mx-auto max-w-md rounded-xl border border-red-100 bg-red-50 p-4 text-center">
            <p className="text-sm text-red-600">{t("errorGeneric", lang)}</p>
          </div>
        )}

        {/* ── Result: timeline ── */}
        {result && banner && (
          <div className="lf-scale mx-auto max-w-lg space-y-5">
            {/* Reference code + status pill */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400">
                  {t("reportRefCode", lang)}
                </p>
                <p className="font-mono text-base font-bold tracking-wider text-gray-900">
                  {result.referenceCode}
                </p>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${banner.borderClass} ${banner.bgClass} ${banner.colorClass}`}
              >
                <banner.icon className="h-3.5 w-3.5" />
                {t(banner.labelKey, lang)}
              </span>
            </div>

            {/* ── Timeline ── */}
            <div className="rounded-2xl border border-gray-100 bg-white px-5 py-6 shadow-sm sm:px-7">
              <div className="relative">
                {timeline.map((step, i) => {
                  const isLast = i === timeline.length - 1;
                  const styles = STATE_STYLES[step.state];
                  const Icon = step.icon;

                  return (
                    <div key={step.key} className="relative flex gap-4">
                      {/* Vertical line + dot */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all ${styles.dot}`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        {!isLast && (
                          <div
                            className={`w-0.5 flex-1 ${styles.line}`}
                            style={{ minHeight: 24 }}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className={`pb-7 ${isLast ? "pb-0" : ""}`}>
                        <p className={`text-sm leading-tight ${styles.text}`}>
                          {t(step.labelKey as any, lang)}
                        </p>
                        {step.date && (
                          <p className={`mt-0.5 text-xs ${styles.date}`}>
                            {formatDate(step.date, lang)}
                          </p>
                        )}
                        {step.state === "active" && (
                          <p className="mt-1 text-xs leading-relaxed text-gray-400">
                            {t(banner.hintKey, lang)}
                          </p>
                        )}
                        {step.state === "rejected" && (
                          <p className="mt-1 text-xs leading-relaxed text-red-400">
                            {t("trackRejectedHint", lang)}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Claim details ── */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="divide-y divide-gray-100">
                {/* Claimant */}
                <InfoRow
                  icon={ClipboardList}
                  label={t("trackClaimant", lang)}
                  value={result.claimantName}
                />

                {/* Category */}
                {result.category && (
                  <InfoRow
                    icon={Tag}
                    label={t("trackCategory", lang)}
                    value={t(
                      CATEGORY_KEYS[result.category as LostFoundCategory] ?? "categoryOther",
                      lang,
                    )}
                  />
                )}

                {/* Item description */}
                {result.itemDescription && (
                  <InfoRow
                    icon={FileText}
                    label={t("trackItemDesc", lang)}
                    value={result.itemDescription}
                  />
                )}

                {/* Lost location */}
                {result.lostLocation && (
                  <InfoRow
                    icon={MapPin}
                    label={t("trackLocation", lang)}
                    value={result.lostLocation}
                  />
                )}

                {/* Lost date */}
                {result.lostDate && (
                  <InfoRow
                    icon={CalendarDays}
                    label={t("trackDate", lang)}
                    value={formatDate(result.lostDate, lang)}
                  />
                )}

                {/* Linked item */}
                {result.linkedItem && (
                  <InfoRow
                    icon={Link2}
                    label={t("trackLinkedItem", lang)}
                    value={
                      result.linkedItem.displayNames?.[lang] ||
                      result.linkedItem.displayNames?.en ||
                      result.linkedItem.referenceCode
                    }
                  />
                )}

                {/* Staff note */}
                {result.staffNote && (
                  <div className="px-5 py-4">
                    <div className="flex items-start gap-3">
                      <MessageSquareText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400">
                          {t("trackStaffNote", lang)}
                        </p>
                        <p className="mt-1 rounded-lg bg-primary/5 px-3 py-2 text-sm leading-relaxed text-primary-900">
                          {result.staffNote}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Track another */}
            <div className="flex justify-center pt-1">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-primary hover:text-primary"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {t("trackAnother", lang)}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Info row ───────────────────────────────────────────────────────────── */

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 px-5 py-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400">
          {label}
        </p>
        <p className="mt-0.5 text-sm text-gray-800">{value}</p>
      </div>
    </div>
  );
}
