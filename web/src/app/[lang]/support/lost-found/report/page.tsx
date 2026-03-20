import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, PackageSearch } from "lucide-react";
import { Lang } from "@/types/language";
import { createSupportI18n } from "@/data/i18n/support";
import {
  LostFoundReportForm,
  LostFoundReportGuide,
} from "@/components/support/lost-found";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = createSupportI18n(lang as Lang).lostFound;
  return { title: t.reportFormTitle, description: t.reportFormSubtitle };
}

export default async function LostFoundReportPage({ params }: Props) {
  const { lang } = await params;
  const t = createSupportI18n(lang as Lang).lostFound;

  return (
    <>
      {/* Hero */}
      <section className="bg-[#f0fbfc] py-10">
        <div className="container max-w-5xl">
          <Link
            href={`/${lang}/support/lost-found`}
            className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t.backToList}
          </Link>

          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#00AAAC]">
              <PackageSearch className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                Support
              </p>
              <h1 className="text-2xl font-bold text-gray-900 lg:text-4xl">
                {t.reportFormTitle}
              </h1>
              <p className="mt-2 max-w-xl text-sm text-gray-500 lg:text-base">
                {t.reportFormSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form + Guide */}
      <section className="bg-gray-50 py-10">
        <div className="container max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Form — takes 2 cols, sits on white */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-white px-6 py-8 lg:px-8">
                <LostFoundReportForm lang={lang as Lang} />
              </div>
            </div>

            {/* Guide — open, sits directly on gray-50 */}
            <div className="lg:col-span-1">
              <LostFoundReportGuide lang={lang as Lang} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
