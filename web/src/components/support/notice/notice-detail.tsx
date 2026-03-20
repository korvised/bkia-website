import {
  Calendar,
  Clock,
  AlertCircle,
  AlertTriangle,
  Info,
  ArrowLeft,
  Tag,
} from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Lang } from "@/types/language";
import { ImportantPriority } from "@/types/enum";
import { INotice } from "@/types/notice";
import { cn, fmtDate } from "@/lib";
import { createSupportI18n } from "@/data/i18n/support";

interface NoticeDetailProps {
  lang: Lang;
  notice: INotice;
}

export function NoticeDetail({ lang, notice }: NoticeDetailProps) {
  const t = createSupportI18n(lang).notices;

  const priorityConfig: Record<
    ImportantPriority,
    {
      label: string;
      badge: string;
      headerBg: string;
      borderClass: string;
      icon: typeof AlertCircle;
    }
  > = {
    [ImportantPriority.URGENT]: {
      label: t.categoryUrgent,
      badge: "bg-red-600 text-white",
      headerBg: "bg-red-50",
      borderClass: "border-red-600",
      icon: AlertCircle,
    },
    [ImportantPriority.HIGH]: {
      label: t.categoryHigh,
      badge: "bg-orange-500 text-white",
      headerBg: "bg-orange-50/60",
      borderClass: "border-orange-500",
      icon: AlertTriangle,
    },
    [ImportantPriority.NORMAL]: {
      label: t.categoryNormal,
      badge: "bg-[#00AAAC] text-white",
      headerBg: "bg-[#f0fbfc]",
      borderClass: "border-[#00AAAC]",
      icon: Info,
    },
  };

  const config = priorityConfig[notice.priority];
  const Icon = config.icon;

  return (
    <>
      {/* Header — priority-tinted with left accent bar */}
      <section
        className={cn(
          "border-l-[6px] py-10 lg:border-l-8",
          config.headerBg,
          config.borderClass,
        )}
      >
        <div className="container max-w-4xl">
          {/* Back */}
          <Link
            href={`/${lang}/support/notices`}
            className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t.backToNotices}
          </Link>

          {/* Priority badge */}
          <div className="mb-5">
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-wide",
                config.badge,
              )}
            >
              <Icon className="h-4 w-4" />
              {config.label}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 lg:text-4xl">
            {notice.title[lang]}
          </h1>

          {/* Description */}
          <p className="text-lg leading-relaxed text-gray-600">
            {notice.description[lang]}
          </p>

          {/* Meta */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-black/10 pt-6 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4 text-gray-400" />
              <div>
                <span className="text-xs text-gray-400">{t.publishedOn} </span>
                <time dateTime={notice.publishDate} className="font-semibold text-gray-800">
                  {fmtDate(new Date(notice.publishDate), lang)}
                </time>
              </div>
            </div>
            {notice.effectiveDate && (
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4 text-gray-400" />
                <div>
                  <span className="text-xs text-gray-400">{t.effectiveFrom} </span>
                  <time dateTime={notice.effectiveDate} className="font-semibold text-gray-800">
                    {fmtDate(new Date(notice.effectiveDate), lang)}
                  </time>
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          {notice.tags && notice.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Tag className="h-3.5 w-3.5 text-gray-400" />
              {notice.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-black/10"
                >
                  {tag[lang]}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-10">
        <div className="container max-w-4xl">
          <article className="prose prose-gray prose-lg prose-headings:font-bold prose-headings:text-gray-900 prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4 prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-a:text-[#00AAAC] prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:my-4 prose-ol:my-4 prose-li:text-gray-700 prose-li:my-2 prose-img:rounded-xl prose-img:my-8 prose-blockquote:border-l-4 prose-blockquote:border-[#00AAAC] prose-blockquote:bg-[#f0fbfc] prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:my-6 prose-code:text-[#00AAAC] prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-4 max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {notice.content[lang]}
            </ReactMarkdown>
          </article>
        </div>
      </section>
    </>
  );
}
