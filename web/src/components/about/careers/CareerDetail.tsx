import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fmtDate } from "@/lib";
import { createCareersI18n } from "@/data/i18n/about/careers";
import type { IJobPost } from "@/types/careers";
import type { Lang } from "@/types/language";

interface CareerDetailProps {
  job: IJobPost;
  lang: Lang;
}

type DeadlineStatus = "expired" | "soon" | "ok" | null;

function getDeadlineStatus(deadline: string | null | undefined): DeadlineStatus {
  if (!deadline) return null;
  const now = new Date();
  const d = new Date(deadline);
  if (d < now) return "expired";
  const diffDays = Math.ceil((d.getTime() - now.getTime()) / 86_400_000);
  return diffDays <= 7 ? "soon" : "ok";
}

export function CareerDetail({ job, lang }: CareerDetailProps) {
  const { careers: t } = createCareersI18n(lang);
  const deadlineStatus = getDeadlineStatus(job.deadline);

  return (
    <div>
      {/* Back link */}
      <Link
        href={`/${lang}/careers`}
        className="group mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 transition-colors hover:text-[#00AAAC]"
      >
        <svg
          className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        {t.backToPositions}
      </Link>

      {/* Job card */}
      <div className="rounded-2xl border border-gray-100 bg-white">
        {/* Header */}
        <div className="border-l-4 border-[#00AAAC] px-6 py-6 sm:px-8 sm:py-7">
          {/* Badges */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#00AAAC]/10 px-3 py-1 text-xs font-bold tracking-wide text-[#00AAAC]">
              {job.position[lang]}
            </span>
            <span className="rounded-full bg-[#1a2c5b]/[0.08] px-3 py-1 text-xs font-semibold text-[#1a2c5b]">
              {job.vacancyCount}&nbsp;
              {job.vacancyCount === 1 ? t.vacancy : t.vacancies}
            </span>
            {job.deadline && (
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  deadlineStatus === "expired"
                    ? "bg-red-50 text-red-600"
                    : deadlineStatus === "soon"
                      ? "bg-amber-50 text-amber-600"
                      : "bg-gray-50 text-gray-500"
                }`}
              >
                {t.deadline}:{" "}
                {deadlineStatus === "expired"
                  ? t.deadlineExpired
                  : fmtDate(new Date(job.deadline!), lang)}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold leading-snug text-[#0f1e3d] sm:text-2xl">
            {job.title[lang]}
          </h3>

          {/* Posted */}
          <p className="mt-1.5 text-xs text-gray-400">
            {t.posted}&nbsp;{fmtDate(new Date(job.publishDate), lang)}
          </p>
        </div>

        {/* Divider */}
        <div className="mx-6 h-px bg-gray-50 sm:mx-8" />

        {/* Markdown content */}
        {job.content && (
          <div className="px-6 py-6 sm:px-8 sm:py-7">
            <div className="news-content text-sm leading-relaxed text-gray-700">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {job.content[lang]}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
