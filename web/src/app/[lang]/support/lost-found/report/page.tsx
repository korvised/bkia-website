import type { Metadata } from "next";
import Link from "next/link";
import { Lang } from "@/types/language";
import { createSupportI18n } from "@/data/i18n/support";
import { LostFoundReportForm } from "@/components/support/lost-found";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = createSupportI18n(lang as Lang).lostFound;
  return { title: t.reportFormTitle };
}

export default async function LostFoundReportPage({ params }: Props) {
  const { lang } = await params;
  const t = createSupportI18n(lang as Lang).lostFound;

  return (
    <div className="container space-y-8">
      {/* Back Button */}
      <Link
        href={`/${lang}/support/lost-found`}
        className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        {t.backToList}
      </Link>

      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 lg:text-4xl">
          {t.reportFormTitle}
        </h1>
        <p className="text-base text-gray-600">{t.reportFormSubtitle}</p>
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs lg:p-8">
          <LostFoundReportForm lang={lang as Lang} />
        </div>
      </div>
    </div>
  );
}
