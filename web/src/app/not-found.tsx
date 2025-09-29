import { cookies } from "next/headers";
import Link from "next/link";
import { Home, Plane } from "lucide-react";
import type { Lang } from "@/types/language";
import { defaultLanguage } from "@/lib";
import { notFoundTranslations } from "@/data/translations/not-found";

export default async function RootNotFound() {
  const c = await cookies();
  const lang = (c.get("lang")?.value as Lang) ?? defaultLanguage;

  return (
    <div className="from-bokeo-teal-50 to-bokeo-blue-50 flex h-screen items-center justify-center bg-gradient-to-br p-4">
      <div className="w-full max-w-lg text-center">
        {/* Flying Plane with smoke trails */}
        <div className="relative mb-12 flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Plane centered */}
            <Plane className="text-bokeo-teal-600 relative z-10 h-20 w-20 -rotate-45" />

            {/* 3 Background lines (static) */}
            <div className="absolute top-16 flex gap-2">
              <div className="h-32 w-0.5 rounded-full bg-gray-300" />
              <div className="h-32 w-0.5 rounded-full bg-gray-300" />
              <div className="h-32 w-0.5 rounded-full bg-gray-300" />
            </div>

            {/* White smoke dots flowing - 3 lines */}
            <div className="absolute top-16 left-1/2 flex -translate-x-1/2 gap-2">
              <div className="relative">
                <span
                  className="smoke-dot"
                  style={{ "--delay": "0s" } as React.CSSProperties}
                />
              </div>
              <div className="relative">
                <span
                  className="smoke-dot"
                  style={{ "--delay": "0.4s" } as React.CSSProperties}
                />
              </div>
              <div className="relative">
                <span
                  className="smoke-dot"
                  style={{ "--delay": "0.8s" } as React.CSSProperties}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Error Message - i18n */}
        <h1 className="text-bokeo-teal-600 mb-2 text-7xl font-bold">
          {notFoundTranslations.subtitle[lang]}
        </h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          {notFoundTranslations.title[lang]}
        </h2>
        <p className="mb-8 text-gray-600">
          {notFoundTranslations.message[lang]}
        </p>

        {/* Flight Path Decoration */}
        <div className="mb-8 flex items-center justify-center gap-2 opacity-30">
          <div className="bg-bokeo-teal-400 h-px w-16" />
          <div className="bg-bokeo-teal-500 h-2 w-2 rounded-full" />
          <div className="bg-bokeo-teal-400 h-px w-24" />
          <div className="bg-bokeo-blue-500 h-2 w-2 rounded-full" />
          <div className="bg-bokeo-blue-400 h-px w-16" />
        </div>

        {/* Action Buttons - i18n */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={`/${lang}`}
            className="bg-bokeo-teal-600 hover:bg-bokeo-teal-700 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-colors"
          >
            <Home className="h-5 w-5" />
            {notFoundTranslations.goHome[lang]}
          </Link>

          <Link
            href={`/${lang}/flights`}
            className="border-bokeo-teal-600 text-bokeo-teal-600 hover:bg-bokeo-teal-50 inline-flex items-center justify-center gap-2 rounded-lg border-2 bg-white px-6 py-3 font-medium transition-colors"
          >
            <Plane className="h-5 w-5" />
            {notFoundTranslations.viewFlights[lang]}
          </Link>
        </div>

        {/* Help Text - i18n */}
        <p className="mt-8 text-sm text-gray-500">
          {notFoundTranslations.helpText[lang]}
        </p>
      </div>
    </div>
  );
}
