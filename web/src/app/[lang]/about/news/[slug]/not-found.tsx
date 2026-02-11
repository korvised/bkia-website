import Link from "next/link";
import { ArrowLeft, Newspaper } from "lucide-react";
import { cookies } from "next/headers";
import { createNewsI18n } from "@/data/i18n/about";
import { Lang } from "@/types/language";
import { defaultLanguage } from "@/lib";

export default async function NewsNotFound() {
  const c = await cookies();
  const lang = (c.get("lang")?.value as Lang) ?? defaultLanguage;

  const { news: t } = createNewsI18n(lang);

  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
        <Newspaper className="h-10 w-10 text-blue-600" />
      </div>

      <h1 className="mb-3 text-3xl font-bold text-gray-900">
        {t.newsNotFoundTitle}
      </h1>

      <p className="mb-8 max-w-md text-center text-lg text-gray-600">
        {t.newsNotFoundMessage}
      </p>

      <div className="flex gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          {t.goToHomepage}
        </Link>
        <Link
          href={`/${lang}/support/news`}
          className="bg-primary-600 hover:bg-primary-700 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.viewAllNews}
        </Link>
      </div>
    </div>
  );
}
