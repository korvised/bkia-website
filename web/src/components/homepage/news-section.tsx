import { ArrowRight, Calendar, Newspaper } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Lang } from "@/types/language";
import { INews } from "@/types/news";
import { asset, fmtDate } from "@/lib";
import { createCommonI18n } from "@/data/i18n/common";

interface NewsSectionProps {
  lang: Lang;
  news: INews[];
}

export const NewsSection = ({ lang, news }: NewsSectionProps) => {
  const { homepage: t } = createCommonI18n(lang);

  if (news.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 py-16 md:py-24">
      <div className="container">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              {t.latestNewsTitle}
            </h2>
          </div>
          <Link
            href={`/${lang}/support/news`}
            className="bg-primary-600 hover:bg-primary-700 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors"
          >
            {t.viewAllNews}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.slice(0, 3).map((article) => (
            <Link
              key={article.id}
              href={`/${lang}/support/news/${article.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
                <Image
                  src={asset(article.coverImage.path)}
                  alt={article.title[lang]}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {article.isFeatured && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-600 inline-flex items-center rounded-lg px-3 py-1 text-xs font-semibold text-white shadow-lg">
                      <Newspaper className="mr-1.5 h-3.5 w-3.5" />
                      {t.featured}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                {/* Date */}
                <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="h-3.5 w-3.5" />
                  <time dateTime={article.publishDate}>
                    {fmtDate(new Date(article.publishDate), lang)}
                  </time>
                </div>

                {/* Title */}
                <h3 className="group-hover:text-primary-600 mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors">
                  {article.title[lang]}
                </h3>

                {/* Excerpt */}
                <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">
                  {article.excerpt[lang]}
                </p>

                {/* Read More Link */}
                <div className="text-primary-600 flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3">
                  <span>{t.readMore}</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
