// /components/news/news-detail.tsx - Refactored version
import { ArrowLeft, Calendar, Eye, Tag, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Lang } from "@/types/language";
import { INews, NewsCategory } from "@/types/news";
import { asset, fmtDate } from "@/lib";
import { createNewsI18n } from "@/data/i18n/support";

interface NewsDetailProps {
  lang: Lang;
  news: INews;
}

export function NewsDetail({ lang, news }: NewsDetailProps) {
  const t = createNewsI18n(lang).news;

  const categoryLabels: Record<NewsCategory, string> = {
    [NewsCategory.AIRPORT_UPDATE]: t.categoryAirportUpdate,
    [NewsCategory.FLIGHT_SERVICE]: t.categoryFlightService,
    [NewsCategory.EVENT]: t.categoryEvent,
    [NewsCategory.ANNOUNCEMENT]: t.categoryAnnouncement,
    [NewsCategory.SUSTAINABILITY]: t.categorySustainability,
    [NewsCategory.TECHNOLOGY]: t.categoryTechnology,
    [NewsCategory.COMMUNITY]: t.categoryCommunity,
  };

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="container">
        <Link
          href={`/${lang}/support/news`}
          className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          {t.backToNews}
        </Link>
      </div>

      <div className="container">
        {/* Main Content Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Cover Image */}
          <div className="relative aspect-video w-full overflow-hidden lg:aspect-[21/9]">
            <Image
              src={asset(news.coverImage.path)}
              alt={news.title[lang]}
              fill
              className="object-cover"
              priority
            />
            {news.isFeatured && (
              <div className="absolute top-4 left-4">
                <span className="bg-primary-600 inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                  {t.featuredNews}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 lg:p-10">
            {/* Meta Information */}
            <div className="mb-6 flex flex-wrap items-center gap-4 border-b border-gray-200 pb-6 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Tag className="h-4 w-4" />
                <span className="font-medium text-gray-900">
                  {categoryLabels[news.category]}
                </span>
              </div>

              <span className="text-gray-300">•</span>

              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <time dateTime={news.publishDate}>
                  {fmtDate(new Date(news.publishDate), lang)}
                </time>
              </div>

              {news.author && (
                <>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="h-4 w-4" />
                    <span>{news.author}</span>
                  </div>
                </>
              )}

              <span className="text-gray-300">•</span>

              <div className="flex items-center gap-2 text-gray-600">
                <Eye className="h-4 w-4" />
                <span>
                  {news.viewCount.toLocaleString()} {t.views}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
              {news.title[lang]}
            </h1>

            {/* Excerpt */}
            <div className="border-primary-500 mb-8 border-l-4 bg-gray-50 px-6 py-4">
              <p className="text-lg leading-relaxed text-gray-700">
                {news.excerpt[lang]}
              </p>
            </div>

            {/* Main Content (Markdown) */}
            <article className="prose prose-gray prose-lg prose-headings:font-bold prose-headings:text-gray-900 prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4 prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-a:text-primary-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:my-4 prose-ol:my-4 prose-li:text-gray-700 prose-li:my-2 prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8 prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:my-6 prose-code:text-primary-600 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-4 max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {news.content[lang]}
              </ReactMarkdown>
            </article>

            {/* Tags */}
            {news.tags && news.tags.length > 0 && (
              <div className="mt-8 border-t border-gray-200 pt-8">
                <div className="mb-4 flex items-center gap-2 text-gray-600">
                  <Tag className="h-4 w-4" />
                  <span className="text-sm font-medium">{t.relatedTopics}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {news.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
                    >
                      {tag[lang]}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 text-center">
          <Link
            href={`/${lang}/support/news`}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.viewAllNews}
          </Link>
        </div>
      </div>
    </div>
  );
}
