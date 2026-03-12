import type { Metadata } from "next";
import { Lang } from "@/types/language";
import { createSupportI18n } from "@/data/i18n/support";
import { FeedbackForm } from "@/components/support/feedback";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = createSupportI18n(lang as Lang).feedback;
  return {
    title: t.pageTitle,
    description: t.pageDescription,
  };
}

export default async function FeedbackPage({ params }: PageProps) {
  const { lang } = await params;
  const t = createSupportI18n(lang as Lang).feedback;

  return (
    <div className="container space-y-10">
      {/* Hero */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 lg:text-4xl">
          {t.heroTitle}
        </h1>
        <p className="max-w-2xl text-base text-gray-600">{t.heroSubtitle}</p>
      </div>

      {/* Form */}
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8">
          <FeedbackForm lang={lang as Lang} />
        </div>
      </div>
    </div>
  );
}
