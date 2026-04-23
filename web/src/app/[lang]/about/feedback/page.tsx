import type { Metadata } from "next";
import type { Lang } from "@/types/language";
import { createFeedbackI18n } from "@/data/i18n/about/feedback";
import { FeedbackForm } from "@/components/support/feedback";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = createFeedbackI18n(lang as Lang).feedback;
  return { title: t.pageTitle, description: t.pageDescription };
}

export default async function FeedbackPage({ params }: PageProps) {
  const { lang } = await params;
  const t = createFeedbackI18n(lang as Lang).feedback;

  return (
    <>
      <style>{`
        @keyframes fb-fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .fb-anim { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="bg-primary-700">
        <div className="container py-14 lg:py-20">
          <p
            className="fb-anim mb-3 text-[10px] font-extrabold uppercase tracking-[0.32em] text-primary-300"
            style={{ animation: "fb-fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0ms both" }}
          >
            Support
          </p>
          <h1
            className="fb-anim text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-5xl"
            style={{ animation: "fb-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 80ms both" }}
          >
            {t.heroTitle}
          </h1>
          <p
            className="fb-anim mt-4 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base"
            style={{ animation: "fb-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 160ms both" }}
          >
            {t.heroSubtitle}
          </p>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* ── Form section ─────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl bg-white px-6 py-8 shadow-sm ring-1 ring-gray-100 lg:px-8 lg:py-10">
              <FeedbackForm lang={lang as Lang} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
