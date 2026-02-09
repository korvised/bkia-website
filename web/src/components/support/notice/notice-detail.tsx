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
      icon: typeof AlertCircle;
      accent: string;
    }
  > = {
    [ImportantPriority.URGENT]: {
      label: t.categoryUrgent,
      badge: "bg-red-600 text-white",
      icon: AlertCircle,
      accent: "border-l-red-600",
    },
    [ImportantPriority.HIGH]: {
      label: t.categoryHigh,
      badge: "bg-orange-500 text-white",
      icon: AlertTriangle,
      accent: "border-l-orange-500",
    },
    [ImportantPriority.NORMAL]: {
      label: t.categoryNormal,
      badge: "bg-blue-500 text-white",
      icon: Info,
      accent: "border-l-blue-500",
    },
  };

  const config = priorityConfig[notice.priority];
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl">
        {/* Back Button */}
        <Link
          href={`/${lang}/support/notices`}
          className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to all notices
        </Link>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Header Section */}
          <div className={cn("border-l-8 p-8 lg:p-10", config.accent)}>
            {/* Priority Badge */}
            <div className="mb-5">
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold tracking-wide uppercase",
                  config.badge,
                )}
              >
                <Icon className="h-4 w-4" />
                {config.label}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-3xl leading-tight font-bold text-gray-900 lg:text-4xl">
              {notice.title[lang]}
            </h1>

            {/* Description */}
            <p className="text-lg leading-relaxed text-gray-600">
              {notice.description[lang]}
            </p>

            {/* Meta Information */}
            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                    <Calendar className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">{t.publishedOn}</div>
                    <time
                      dateTime={notice.publishDate}
                      className="font-semibold text-gray-900"
                    >
                      {fmtDate(new Date(notice.publishDate), lang)}
                    </time>
                  </div>
                </div>

                {notice.effectiveDate && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                      <Clock className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">
                        {t.effectiveFrom}
                      </div>
                      <time
                        dateTime={notice.effectiveDate}
                        className="font-semibold text-gray-900"
                      >
                        {fmtDate(new Date(notice.effectiveDate), lang)}
                      </time>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {notice.tags && notice.tags.length > 0 && (
              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="mb-3 flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Related Topics
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {notice.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-lg border border-gray-200 bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                    >
                      {tag[lang]}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="bg-white p-8 lg:p-10">
            <article className="prose prose-gray prose-lg prose-headings:font-bold prose-headings:text-gray-900 prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4 prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-a:text-primary-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:my-4 prose-ol:my-4 prose-li:text-gray-700 prose-li:my-2 prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8 prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:my-6 prose-code:text-primary-600 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-4 max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {notice.content[lang]}
              </ReactMarkdown>
            </article>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 flex justify-center">
          <Link
            href={`/${lang}/support/notices`}
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            <ArrowLeft className="h-4 w-4" />
            View all notices
          </Link>
        </div>
      </div>
    </div>
  );
}
