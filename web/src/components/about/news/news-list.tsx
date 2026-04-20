import { Newspaper, Eye, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Lang } from "@/types/language";
import { INews } from "@/types/news";
import { asset, fmtDate } from "@/lib";
import { createNewsI18n } from "@/data/i18n/about";
import { IPaginationMeta } from "@/types/pagination";
import { NewsPagination } from "./news-pagination";

interface NewsListProps {
  lang: Lang;
  news: INews[];
  searchQuery?: string;
  meta: IPaginationMeta;
  searchParams: Record<string, string | undefined>;
}

export function NewsList({
  lang,
  news,
  searchQuery,
  meta,
  searchParams,
}: NewsListProps) {
  const t = createNewsI18n(lang).news;

  if (news.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <Newspaper className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">
          {searchQuery ? t.noNewsFound : t.newsNotFoundMessage}
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-gray-600">
          {searchQuery ? t.noResultsMessage : t.noNewsMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* News Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((article) => (
          <Link
            key={article.id}
            href={`/${lang}/about/news/${article.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl bg-white transition-all hover:bg-[#f0fbfc]"
          >
            {/* Cover Image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
              <Image
                src={asset(article.coverImage.path)}
                alt={article.title[lang]}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
              {/* Meta */}
              <div className="mb-3 flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <time dateTime={article.publishDate}>
                    {fmtDate(new Date(article.publishDate), lang)}
                  </time>
                </div>
                <div className="flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5" />
                  <span>
                    {article.viewCount} {t.views}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-[#00AAAC]">
                {article.title[lang]}
              </h3>

              {/* Excerpt */}
              <p className="mb-4 line-clamp-3 flex-1 text-sm text-gray-600">
                {article.excerpt[lang]}
              </p>

              {/* Read More */}
              <div className="flex items-center gap-2 text-sm font-medium text-[#00AAAC] transition-all group-hover:gap-3">
                <span>{t.readMore}</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {meta.pages > 1 && (
        <NewsPagination lang={lang} meta={meta} searchParams={searchParams} />
      )}
    </div>
  );
}
