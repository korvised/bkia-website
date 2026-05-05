import { ArrowRight, Calendar } from "lucide-react";
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

const NEWS_TAG: Record<Lang, string> = {
  en: "Latest News",
  lo: "ຂ່າວສານ",
  zh: "最新资讯",
};

export const NewsSection = ({ lang, news }: NewsSectionProps) => {
  const { homepage: t } = createCommonI18n(lang);

  if (news.length === 0) return null;

  const [featured, ...rest] = news;

  return (
    <section className="w-full bg-white py-14 md:py-20">
      <div className="container">
        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-3 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              {NEWS_TAG[lang]}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              {t.latestNewsTitle}
            </h2>
          </div>
          <Link
            href={`/${lang}/notices/news`}
            className="self-start inline-flex shrink-0 items-center gap-2 rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white sm:self-auto"
          >
            {t.viewAllNews}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Articles layout: featured 2/3 + 2 compact cards 1/3 on desktop */}
        <div className="grid gap-5 lg:grid-cols-3 lg:items-stretch">

          {/* Featured article */}
          <Link
            href={`/${lang}/notices/news/${featured.slug}`}
            className="group relative overflow-hidden rounded-2xl bg-gray-100 lg:col-span-2"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[380px]">
              <Image
                src={asset(featured.coverImage.path)}
                alt={featured.title[lang]}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

              {/* Content overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <h3 className="line-clamp-2 text-lg font-bold text-white sm:text-xl">
                  {featured.title[lang]}
                </h3>
                <div className="mt-2 flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-white/55">
                    <Calendar className="h-3 w-3" />
                    {fmtDate(new Date(featured.publishDate), lang)}
                  </span>
                  <span className="text-xs font-semibold text-primary-200 underline-offset-2 group-hover:underline">
                    {t.readMore} →
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Side articles — horizontal: image left, text right */}
          <div className="flex flex-col gap-4 lg:col-span-1 lg:h-full">
            {rest.map((article) => (
              <Link
                key={article.id}
                href={`/${lang}/notices/news/${article.slug}`}
                className="group flex overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:border-primary/20 hover:shadow-md lg:flex-1"
              >
                {/* Image — fills card height */}
                <div className="relative w-32 shrink-0 lg:w-36">
                  <Image
                    src={asset(article.coverImage.path)}
                    alt={article.title[lang]}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Text */}
                <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 px-4 py-4">
                  <span className="flex items-center gap-1 text-[11px] text-gray-400">
                    <Calendar className="h-3 w-3 shrink-0" />
                    {fmtDate(new Date(article.publishDate), lang)}
                  </span>
                  <h3 className="line-clamp-3 text-sm font-bold leading-snug text-gray-900 transition-colors group-hover:text-primary">
                    {article.title[lang]}
                  </h3>
                  <span className="mt-1 text-xs font-semibold text-primary/70 transition-colors group-hover:text-primary">
                    {t.readMore} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
