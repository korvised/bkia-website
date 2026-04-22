import { ArrowRight, Briefcase, Calendar, Users } from "lucide-react";
import Link from "next/link";
import type { Lang } from "@/types/language";
import type { IJobPost } from "@/types/careers";
import { fmtDate } from "@/lib";
import { createCommonI18n } from "@/data/i18n/common";

interface FeaturedJobsSectionProps {
  lang: Lang;
  jobs: IJobPost[];
}

// ── Deadline chip ────────────────────────────────────────────────────────────

function DeadlineChip({
  deadline,
  closesLabel,
}: {
  deadline?: string | null;
  closesLabel: string;
}) {
  if (!deadline) return null;

  const d = new Date(deadline);
  const now = new Date();
  const expired = d < now;
  const daysLeft = Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const soon = !expired && daysLeft <= 7;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        expired
          ? "bg-red-100 text-red-600"
          : soon
            ? "bg-amber-100 text-amber-700"
            : "bg-emerald-50 text-emerald-700"
      }`}
    >
      <Calendar className="h-3 w-3 shrink-0" />
      {closesLabel} {deadline.split("T")[0]}
    </span>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────

export function FeaturedJobsSection({ lang, jobs }: FeaturedJobsSectionProps) {
  const { homepage: t } = createCommonI18n(lang);

  if (!jobs.length) return null;

  return (
    <section className="relative w-full overflow-hidden bg-[#0d1b3e] py-16 md:py-24">
      {/* Subtle ambient glow — doesn't interfere with content */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#00AAAC]/6 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#1a2c5b]/60 blur-2xl"
      />

      <div className="container relative">
        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          {/* Tag + heading */}
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00AAAC]/30 bg-[#00AAAC]/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#00AAAC]">
              <Briefcase className="h-3 w-3" />
              {t.weAreHiringTag}
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl lg:leading-[1.1]">
              {t.openPositionsTitle}
            </h2>
          </div>

          {/* View all CTA */}
          <Link
            href={`/${lang}/careers`}
            className="self-start inline-flex shrink-0 items-center gap-2 rounded-full bg-[#00AAAC] px-5 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#008e90] sm:self-auto"
          >
            {t.viewAllPositions}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* ── Cards grid ──────────────────────────────────────────────── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <Link
              key={job.id}
              href={`/${lang}/careers/${job.id}`}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white p-5 shadow-sm transition-all duration-200 hover:border-[#00AAAC]/50 hover:shadow-[0_4px_28px_rgba(0,170,172,0.15)]"
            >
              {/* ── Row 1: Position + vacancy count ─────────────── */}
              <div className="flex items-start justify-between gap-3">
                <span className="line-clamp-1 rounded-md bg-[#00AAAC]/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-[#00AAAC]">
                  {job.position[lang] || job.position.en || "Open Position"}
                </span>
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-[#1a2c5b] px-2.5 py-1 text-[11px] font-bold text-white">
                  <Users className="h-3 w-3" />
                  {job.vacancyCount}&thinsp;
                  {job.vacancyCount === 1 ? t.vacancy : t.vacancies}
                </span>
              </div>

              {/* ── Row 2: Title ─────────────────────────────────── */}
              <h3 className="mt-4 line-clamp-2 text-[15px] font-bold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-[#1a2c5b]">
                {job.title[lang] || job.title.en || "Untitled"}
              </h3>

              {/* ── Divider ──────────────────────────────────────── */}
              <div className="mt-4 border-t border-gray-100" />

              {/* ── Row 3: Dates + CTA ───────────────────────────── */}
              <div className="mt-4 flex items-end justify-between gap-3">
                {/* Date & deadline */}
                <div className="flex flex-col gap-1.5">
                  <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
                    <Calendar className="h-3 w-3 shrink-0" />
                    {fmtDate(new Date(job.publishDate), lang)}
                  </span>
                  {job.deadline && (
                    <DeadlineChip
                      deadline={job.deadline}
                      closesLabel={t.closesOn}
                    />
                  )}
                </div>

                {/* CTA */}
                <span className="shrink-0 text-xs font-bold text-[#00AAAC] transition-colors duration-200 group-hover:text-[#008e90]">
                  {t.applyNow}&nbsp;→
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
