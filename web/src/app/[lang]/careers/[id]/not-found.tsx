import Link from "next/link";
import { cookies } from "next/headers";
import type { Lang } from "@/types/language";
import { defaultLanguage } from "@/lib";
import { createCareersI18n } from "@/data/i18n/about/careers";

export default async function CareerNotFound() {
  const c = await cookies();
  const lang = (c.get("lang")?.value as Lang) ?? (defaultLanguage as Lang);
  const { careers: t } = createCareersI18n(lang);

  return (
    <section className="bg-[#0f1e3d] flex min-h-[60vh] items-center">
      <div className="container py-20 text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5">
          <svg
            className="h-10 w-10 text-[#00AAAC]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.25}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 00-4 0v2M8 7V5a2 2 0 014 0" />
            <path d="M12 12v4M10 14h4" />
          </svg>
        </div>

        <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#00AAAC]">
          BKIA — {t.openPositions}
        </p>
        <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
          {t.positionNotFound}
        </h1>
        <p className="mx-auto mb-10 max-w-sm text-sm leading-relaxed text-white/45">
          {t.positionNotFoundMessage}
        </p>

        <Link
          href={`/${lang}/careers`}
          className="inline-flex items-center gap-2 rounded-xl bg-[#00AAAC] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#009a9c]"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {t.backToPositions}
        </Link>
      </div>
    </section>
  );
}
