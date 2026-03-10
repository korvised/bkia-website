import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  LuNewspaper,
  LuArrowLeft,
  LuPencil,
  LuCalendar,
  LuUser,
  LuEye,
  LuStar,
  LuTag,
} from "react-icons/lu";
import { Breadcrumb } from "@/components/ui";
import { asset, formatDate } from "@/lib";
import { usePermissions } from "@/hooks";
import { PermissionSlug } from "@/types/enum.type";
import { useFetchNewsByIdQuery } from "@/features/news/api";
import { NewsCategoryBadge } from "../components";

type Lang = "en" | "lo" | "zh";

const LANGS: { key: Lang; label: string }[] = [
  { key: "en", label: "EN" },
  { key: "lo", label: "ລາວ" },
  { key: "zh", label: "中文" },
];

export function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { can } = usePermissions();
  const [activeLang, setActiveLang] = useState<Lang>("en");

  const { data: news, isLoading } = useFetchNewsByIdQuery(id!, { skip: !id });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Breadcrumb
          items={[
            { label: "Content" },
            { label: "News", icon: LuNewspaper, path: "/content/news" },
            { label: "Detail" },
          ]}
        />
        <div className="flex items-center justify-center py-20">
          <span className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="space-y-6">
        <Breadcrumb
          items={[
            { label: "Content" },
            { label: "News", icon: LuNewspaper, path: "/content/news" },
            { label: "Detail" },
          ]}
        />
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
          <p className="text-gray-500">News article not found.</p>
          <button
            type="button"
            onClick={() => navigate("/content/news")}
            className="text-primary mt-4 text-sm hover:underline"
          >
            Back to News
          </button>
        </div>
      </div>
    );
  }

  const title = news.title[activeLang] || news.title.en || news.title.lo || news.title.zh || "—";
  const excerpt = news.excerpt[activeLang] || news.excerpt.en || news.excerpt.lo || news.excerpt.zh || "";
  const content = news.content[activeLang] || news.content.en || news.content.lo || news.content.zh || "";

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Content" },
          { label: "News", icon: LuNewspaper, path: "/content/news" },
          { label: "Detail" },
        ]}
      />

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary-100 rounded-lg p-2">
            <LuNewspaper className="text-primary h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">News Detail</h1>
            <p className="text-sm text-gray-500">Preview news article content</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("/content/news")}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            <LuArrowLeft className="h-4 w-4" />
            Back
          </button>
          {can(PermissionSlug.NEWS_UPDATE) && (
            <Link
              to={`/content/news/${news.id}/edit`}
              className="bg-primary hover:bg-primary-600 focus:ring-primary flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              <LuPencil className="h-4 w-4" />
              Edit
            </Link>
          )}
        </div>
      </div>

      {/* Article Card */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">

        {/* Cover Image */}
        {news.coverImage?.path && (
          <div className="relative h-64 w-full overflow-hidden sm:h-80">
            <img
              src={asset(news.coverImage.path)}
              alt={title}
              className="h-full w-full object-cover"
            />
            {/* Overlay badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <NewsCategoryBadge category={news.category} />
              {news.isFeatured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                  <LuStar className="h-3 w-3" />
                  Featured
                </span>
              )}
              <span
                className={
                  news.isPublished
                    ? "inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700"
                    : "inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500"
                }
              >
                {news.isPublished ? "Published" : "Draft"}
              </span>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          {/* Meta badges (when no cover image) */}
          {!news.coverImage?.path && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <NewsCategoryBadge category={news.category} />
              {news.isFeatured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                  <LuStar className="h-3 w-3" />
                  Featured
                </span>
              )}
              <span
                className={
                  news.isPublished
                    ? "inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700"
                    : "inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500"
                }
              >
                {news.isPublished ? "Published" : "Draft"}
              </span>
            </div>
          )}

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

          {/* Title */}
          <h2 className="mb-4 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
            {title}
          </h2>

          {/* Meta Info */}
          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            {news.author && (
              <span className="flex items-center gap-1.5">
                <LuUser className="h-4 w-4" />
                {news.author}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <LuCalendar className="h-4 w-4" />
              {formatDate(news.publishDate)}
            </span>
            <span className="flex items-center gap-1.5">
              <LuEye className="h-4 w-4" />
              {news.viewCount.toLocaleString()} views
            </span>
          </div>

          {/* Excerpt Callout */}
          {excerpt && (
            <div className="mb-6 rounded-lg border-l-4 border-primary bg-primary-50 px-5 py-4">
              <p className="text-base font-medium leading-relaxed text-gray-700 italic">
                {excerpt}
              </p>
            </div>
          )}

          {/* Divider */}
          <div className="mb-6 h-px bg-gray-100" />

          {/* Content — Markdown */}
          {content ? (
            <div className="markdown-preview">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-gray-400 italic">No content available for this language.</p>
          )}

          {/* Tags */}
          {news.tags && news.tags.length > 0 && (
            <div className="mt-8 border-t border-gray-100 pt-6">
              <div className="flex flex-wrap items-center gap-2">
                <LuTag className="h-4 w-4 text-gray-400" />
                {news.tags.map((tag, i) => {
                  const tagLabel = tag[activeLang] || tag.en || tag.lo || tag.zh;
                  if (!tagLabel) return null;
                  return (
                    <span
                      key={i}
                      className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                    >
                      {tagLabel}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Slug / Meta */}
          <div className="mt-6 rounded-lg bg-gray-50 px-4 py-3 text-xs text-gray-400">
            <span className="font-mono">slug: {news.slug}</span>
            {news.metaDescription?.[activeLang] && (
              <p className="mt-1">
                <span className="font-semibold">Meta:</span>{" "}
                {news.metaDescription[activeLang]}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
