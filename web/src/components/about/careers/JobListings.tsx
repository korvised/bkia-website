"use client";

import Link from "next/link";
import { fmtDate } from "@/lib";
import { createCareersI18n } from "@/data/i18n/about/careers";
import { useInView } from "@/hooks/useInView";
import type { IJobPost } from "@/types/careers";
import type { Lang } from "@/types/language";

interface JobListingsProps {
  jobs: IJobPost[];
  lang: Lang;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
type DeadlineStatus = "expired" | "soon" | "ok" | null;

function getDeadlineStatus(deadline: string | null | undefined): DeadlineStatus {
  if (!deadline) return null;
  const d = new Date(deadline);
  if (d < new Date()) return "expired";
  const diffDays = Math.ceil((d.getTime() - Date.now()) / 86_400_000);
  return diffDays <= 7 ? "soon" : "ok";
}

function getDaysLeft(deadline: string): number {
  return Math.ceil((new Date(deadline).getTime() - Date.now()) / 86_400_000);
}

function isNewPost(publishDate: string): boolean {
  return Math.ceil((Date.now() - new Date(publishDate).getTime()) / 86_400_000) <= 7;
}

// ── Rich list row ─────────────────────────────────────────────────────────────
function JobRow({ job, lang }: { job: IJobPost; lang: Lang }) {
  const { careers: t } = createCareersI18n(lang);
  const deadlineStatus = getDeadlineStatus(job.deadline);
  const daysLeft = job.deadline && deadlineStatus !== "expired"
    ? getDaysLeft(job.deadline)
    : null;
  const isNew = isNewPost(job.publishDate);

  return (
    <Link
      href={`/${lang}/careers/${job.id}`}
      className="group block rounded-xl border border-gray-100 bg-white px-5 py-4 transition-all duration-200 hover:border-[#00AAAC]/40 hover:shadow-md hover:-translate-y-px sm:px-6"
    >
      {/* ── Row 1: badges + new + arrow ── */}
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-[#00AAAC]/10 px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-[#00AAAC]">
          {job.position[lang]}
        </span>
        <span className="rounded-full bg-[#1a2c5b]/[0.07] px-2.5 py-0.5 text-[11px] font-semibold text-[#1a2c5b]">
          {job.vacancyCount}&nbsp;
          {job.vacancyCount === 1 ? t.vacancy : t.vacancies}
        </span>
        {isNew && (
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-emerald-600">
            {t.newBadge}
          </span>
        )}
        {/* Arrow — right-aligned */}
        <svg
          className="ml-auto h-4 w-4 shrink-0 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-[#00AAAC]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* ── Row 2: title ── */}
      <p className="mt-2 line-clamp-2 text-sm font-semibold text-[#0f1e3d] sm:text-base">
        {job.title[lang]}
      </p>

      {/* ── Row 3: dates ── */}
      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1">
        {/* Posted date */}
        <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          {t.posted}&nbsp;{fmtDate(new Date(job.publishDate), lang)}
        </span>

        {/* Deadline */}
        {job.deadline && (
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium ${
              deadlineStatus === "expired"
                ? "text-red-500"
                : deadlineStatus === "soon"
                  ? "text-amber-500"
                  : "text-gray-400"
            }`}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" d="M12 7v5l3 3" />
            </svg>
            {deadlineStatus === "expired" ? (
              t.deadlineExpired
            ) : (
              <>
                {t.closes}&nbsp;{fmtDate(new Date(job.deadline!), lang)}
                {daysLeft !== null && (
                  <span className="ml-1 opacity-70">
                    ({daysLeft === 1
                      ? `1 ${t.dayLeft}`
                      : `${daysLeft} ${t.daysLeft}`})
                  </span>
                )}
              </>
            )}
          </span>
        )}
      </div>
    </Link>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function JobListings({ jobs, lang }: JobListingsProps) {
  const { careers: t } = createCareersI18n(lang);
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.08 });

  if (jobs.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-gray-100 bg-white py-16 text-center">
        <svg
          className="mx-auto mb-4 h-12 w-12 text-gray-200"
          fill="none"
          viewBox="0 0 48 48"
          stroke="currentColor"
          aria-hidden="true"
        >
          <rect x="8" y="14" width="32" height="26" rx="3" strokeWidth="1.5" />
          <path d="M16 14v-3a8 8 0 1116 0v3" strokeWidth="1.5" />
          <path d="M20 27h8M24 23v8" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <p className="text-sm text-gray-400">{t.noPositions}</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes job-slide-in {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .job-row-animated { animation: none !important; opacity: 1 !important; }
        }
      `}</style>
      <div ref={ref} className="space-y-2">
        {jobs.map((job, i) => (
          <div
            key={job.id}
            className="job-row-animated"
            style={
              inView
                ? {
                    animation: `job-slide-in 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 70}ms both`,
                  }
                : { opacity: 0 }
            }
          >
            <JobRow job={job} lang={lang} />
          </div>
        ))}
      </div>
    </>
  );
}
