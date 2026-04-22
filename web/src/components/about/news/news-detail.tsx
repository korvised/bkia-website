import { ArrowLeft, Calendar, Eye, Tag, User } from "lucide-react";
import { NewsGallery } from "./news-gallery";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Lang } from "@/types/language";
import { INews, NewsCategory } from "@/types/news";
import { asset, fmtDate } from "@/lib";
import { createNewsI18n } from "@/data/i18n/notices";

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
    <>
      {/* Hero — tinted header with cover image */}
      <section className="bg-[#f0fbfc] py-10">
        <div className="container">
          {/* Back link */}
          <Link
            href={`/${lang}/notices/news`}
            className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#008e90] transition-colors hover:text-[#00AAAC]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t.backToNews}
          </Link>

          {/* Cover image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 lg:aspect-[21/9]">
            <Image
              src={asset(news.coverImage.path)}
              alt={news.title[lang]}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Meta chips */}
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 font-medium text-gray-900 ring-1 ring-black/5">
              <Tag className="h-3.5 w-3.5 text-[#00AAAC]" />
              {categoryLabels[news.category]}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 ring-1 ring-black/5">
              <Calendar className="h-3.5 w-3.5 text-gray-400" />
              <time dateTime={news.publishDate}>
                {fmtDate(new Date(news.publishDate), lang)}
              </time>
            </span>
            {news.author && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 ring-1 ring-black/5">
                <User className="h-3.5 w-3.5 text-gray-400" />
                {news.author}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 ring-1 ring-black/5">
              <Eye className="h-3.5 w-3.5 text-gray-400" />
              {news.viewCount.toLocaleString()} {t.views}
            </span>
          </div>
        </div>
      </section>

      {/* Content section */}
      <section className="bg-white py-10">
        <div className="container">
          <div>
            {/* Title */}
            <h1 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
              {news.title[lang]}
            </h1>

            {/* Excerpt callout */}
            <div className="mb-8 rounded-r-lg border-l-4 border-[#00AAAC] bg-[#f0fbfc] px-6 py-4">
              <p className="text-lg leading-relaxed text-gray-700 italic">
                {news.excerpt[lang]}
              </p>
            </div>

            {/* Main Content (Markdown) */}
            <article className="news-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {news.content[lang]}
              </ReactMarkdown>
            </article>

            {/* Photo Gallery (after content) */}
            {news.images && news.images.length > 0 && (
              <NewsGallery
                images={news.images}
                title={t.photoGallery}
                photosLabel={t.photos}
              />
            )}

            {/* Tags */}
            {news.tags && news.tags.length > 0 && (
              <div className="mt-8 border-t border-gray-100 pt-8">
                <div className="mb-3 flex items-center gap-2 text-gray-500">
                  <Tag className="h-4 w-4" />
                  <span className="text-sm font-medium">{t.relatedTopics}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {news.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full px-3 py-1.5 text-sm text-gray-700 ring-1 ring-black/10"
                    >
                      {tag[lang]}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
