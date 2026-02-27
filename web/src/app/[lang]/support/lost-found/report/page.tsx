import type { Metadata } from "next";
import Link from "next/link";
import { Lang } from "@/types/language";
import { cn } from "@/lib";
import { createSupportI18n } from "@/data/i18n/support";
import { LostFoundReportForm } from "@/components/support/lost-found";

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

  const tabs = [
    { id: "browse", label: t.tabAll, href: `/${lang}/support/lost-found` },
    {
      id: "report",
      label: t.tabReport,
      href: `/${lang}/support/lost-found/report`,
    },
  ];

  return (
    <div className="container space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 lg:text-4xl">
          {t.pageTitle}
        </h1>
        <p className="text-base text-gray-600">{t.pageDescription}</p>
      </div>

      {/* Top tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-1">
          {tabs.map((tab) => {
            const isActive = tab.id === "report";
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={cn(
                  "inline-flex items-center gap-2 border-b-2 px-6 py-3 text-sm font-medium whitespace-nowrap transition-all",
                  isActive
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
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
