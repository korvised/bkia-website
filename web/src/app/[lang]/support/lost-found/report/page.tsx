import type { Metadata } from "next";
import Link from "next/link";
import { Lang } from "@/types/language";
import { createSupportI18n } from "@/data/i18n/support";
import {
  LostFoundReportForm,
  LostFoundReportGuide,
} from "@/components/support/lost-found";
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
      <div className="grid gap-6 lg:grid-cols-3 2xl:grid-cols-6">
        {/* Form */}
        <div className="lg:col-span-2 2xl:col-span-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs lg:p-8">
            <LostFoundReportForm lang={lang as Lang} />
          </div>
        </div>

        {/* Guide */}
        <div className="lg:col-span-1 2xl:col-span-2">
          <LostFoundReportGuide lang={lang as Lang} />
        </div>
      </div>
    </div>
  );
}
