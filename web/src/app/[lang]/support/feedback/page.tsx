import type { Metadata } from "next";
import { MessageSquare } from "lucide-react";
import { Lang } from "@/types/language";
import { createSupportI18n } from "@/data/i18n/support";
import { FeedbackForm } from "@/components/support/feedback";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = createSupportI18n(lang as Lang).feedback;
  return { title: t.pageTitle, description: t.pageDescription };
}

export default async function FeedbackPage({ params }: PageProps) {
  const { lang } = await params;
  const t = createSupportI18n(lang as Lang).feedback;

  return (
    <>
      {/* Hero */}
      <section className="bg-[#f0fbfc] py-10">
        <div className="container">
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#00AAAC]">
              <MessageSquare className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                Support
              </p>
              <h1 className="text-2xl font-bold text-gray-900 lg:text-4xl">
                {t.heroTitle}
              </h1>
              <p className="mt-2 max-w-xl text-sm text-gray-500 lg:text-base">
                {t.heroSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-gray-50 py-10">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl bg-white px-6 py-8 lg:px-8">
              <FeedbackForm lang={lang as Lang} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
