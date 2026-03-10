import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  LuBell,
  LuArrowLeft,
  LuPencil,
  LuCalendar,
  LuClock,
  LuTag,
  LuCircleAlert,
  LuTriangle,
  LuInfo,
} from "react-icons/lu";
import { Breadcrumb } from "@/components/ui";
import { formatDate } from "@/lib";
import { usePermissions } from "@/hooks";
import { PermissionSlug } from "@/types/enum.type";
import { ImportantPriority } from "@/types";
import { useFetchNoticeByIdQuery } from "@/features/notice/api";

type Lang = "en" | "lo" | "zh";

const LANGS: { key: Lang; label: string }[] = [
  { key: "en", label: "EN" },
  { key: "lo", label: "ລາວ" },
  { key: "zh", label: "中文" },
];

const PRIORITY_CONFIG: Record<
  ImportantPriority,
  {
    label: string;
    icon: typeof LuCircleAlert;
    badge: string;
    border: string;
    bg: string;
  }
> = {
  [ImportantPriority.URGENT]: {
    label: "Urgent",
    icon: LuCircleAlert,
    badge: "bg-red-600 text-white",
    border: "border-l-red-600",
    bg: "bg-red-50",
  },
  [ImportantPriority.HIGH]: {
    label: "High",
    icon: LuTriangle,
    badge: "bg-orange-500 text-white",
    border: "border-l-orange-500",
    bg: "bg-orange-50",
  },
  [ImportantPriority.NORMAL]: {
    label: "Normal",
    icon: LuInfo,
    badge: "bg-blue-500 text-white",
    border: "border-l-blue-500",
    bg: "bg-blue-50",
  },
};

export function NoticeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { can } = usePermissions();
  const [activeLang, setActiveLang] = useState<Lang>("en");

  const { data: notice, isLoading } = useFetchNoticeByIdQuery(id!, { skip: !id });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Breadcrumb
          items={[
            { label: "Content" },
            { label: "Notices", icon: LuBell, path: "/content/notices" },
            { label: "Detail" },
          ]}
        />
        <div className="flex items-center justify-center py-20">
          <span className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="space-y-6">
        <Breadcrumb
          items={[
            { label: "Content" },
            { label: "Notices", icon: LuBell, path: "/content/notices" },
            { label: "Detail" },
          ]}
        />
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
          <p className="text-gray-500">Notice not found.</p>
          <button
            type="button"
            onClick={() => navigate("/content/notices")}
            className="text-primary mt-4 text-sm hover:underline"
          >
            Back to Notices
          </button>
        </div>
      </div>
    );
  }

  const priority = PRIORITY_CONFIG[notice.priority] ?? PRIORITY_CONFIG[ImportantPriority.NORMAL];
  const PriorityIcon = priority.icon;

  const title =
    notice.title[activeLang] || notice.title.en || notice.title.lo || notice.title.zh || "—";
  const description =
    notice.description[activeLang] ||
    notice.description.en ||
    notice.description.lo ||
    notice.description.zh ||
    "";
  const content =
    notice.content[activeLang] ||
    notice.content.en ||
    notice.content.lo ||
    notice.content.zh ||
    "";

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Content" },
          { label: "Notices", icon: LuBell, path: "/content/notices" },
          { label: "Detail" },
        ]}
      />

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary-100 rounded-lg p-2">
            <LuBell className="text-primary h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notice Detail</h1>
            <p className="text-sm text-gray-500">Preview notice content</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("/content/notices")}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            <LuArrowLeft className="h-4 w-4" />
            Back
          </button>
          {can(PermissionSlug.NOTICE_UPDATE) && (
            <Link
              to={`/content/notices/${notice.id}/edit`}
              className="bg-primary hover:bg-primary-600 focus:ring-primary flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              <LuPencil className="h-4 w-4" />
              Edit
            </Link>
          )}
        </div>
      </div>

      {/* Notice Card */}
      <div
        className={`overflow-hidden rounded-lg border border-gray-200 bg-white border-l-8 ${priority.border}`}
      >
        {/* Header Section */}
        <div className="p-6 sm:p-8">
          {/* Language Tabs */}
          <div className="mb-6 flex gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1 w-fit">
            {LANGS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveLang(key)}
                className={
                  activeLang === key
                    ? "rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-900 shadow-sm"
                    : "rounded-md px-3 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700"
                }
              >
                {label}
              </button>
            ))}
          </div>

          {/* Priority Badge */}
          <div className="mb-4 flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${priority.badge}`}
            >
              <PriorityIcon className="h-3.5 w-3.5" />
              {priority.label}
            </span>
            <span
              className={
                notice.isActive
                  ? "inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700"
                  : "inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500"
              }
            >
              {notice.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          {/* Title */}
          <h2 className="mb-4 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
            {title}
          </h2>

          {/* Description callout */}
          {description && (
            <div className={`mb-6 rounded-lg px-5 py-4 ${priority.bg}`}>
              <p className="text-base leading-relaxed text-gray-700 italic">{description}</p>
            </div>
          )}

          {/* Meta dates */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="rounded bg-gray-100 p-1">
                <LuCalendar className="h-3.5 w-3.5 text-gray-500" />
              </span>
              <span>
                <span className="font-medium text-gray-700">Published:</span>{" "}
                {formatDate(notice.publishDate)}
              </span>
            </span>
            {notice.effectiveDate && (
              <span className="flex items-center gap-1.5">
                <span className="rounded bg-gray-100 p-1">
                  <LuClock className="h-3.5 w-3.5 text-gray-500" />
                </span>
                <span>
                  <span className="font-medium text-gray-700">Effective:</span>{" "}
                  {formatDate(notice.effectiveDate)}
                </span>
              </span>
            )}
            {notice.expiryDate && (
              <span className="flex items-center gap-1.5">
                <span className="rounded bg-gray-100 p-1">
                  <LuClock className="h-3.5 w-3.5 text-gray-500" />
                </span>
                <span>
                  <span className="font-medium text-gray-700">Expires:</span>{" "}
                  {formatDate(notice.expiryDate)}
                </span>
              </span>
            )}
          </div>

          {/* Tags */}
          {notice.tags && notice.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <LuTag className="h-4 w-4 text-gray-400 shrink-0" />
              {notice.tags.map((tag, i) => {
                const tagLabel = tag[activeLang] || tag.en || tag.lo || tag.zh;
                if (!tagLabel) return null;
                return (
                  <span
                    key={i}
                    className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    {tagLabel}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Content — Markdown */}
        <div className="p-6 sm:p-8">
          {content ? (
            <div className="markdown-preview">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-gray-400 italic">No content available for this language.</p>
          )}
        </div>
      </div>
    </div>
  );
}
