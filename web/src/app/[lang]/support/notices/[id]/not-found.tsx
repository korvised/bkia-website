import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { cookies } from "next/headers";
import { createSupportI18n } from "@/data/i18n/support";
import { Lang } from "@/types/language";
import { defaultLanguage } from "@/lib";

export default async function NoticeNotFound() {
  const c = await cookies();
  const lang = (c.get("lang")?.value as Lang) ?? defaultLanguage;

  const t = createSupportI18n(lang).notices;

  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
        <AlertCircle className="h-10 w-10 text-red-600" />
      </div>

      <h1 className="mb-3 text-3xl font-bold text-gray-900">
        {t.notFoundTitle}
      </h1>

      <p className="mb-8 max-w-md text-center text-lg text-gray-600">
        {t.notFoundMessage}
      </p>

      <Link
        href={`/${lang}/support/notices`}
        className="bg-primary-600 hover:bg-primary-700 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {t.backToNotices}
      </Link>
    </div>
  );
}
