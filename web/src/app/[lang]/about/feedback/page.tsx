import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
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

      {/* ── Contact CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-primary-50 py-14 md:py-20">
        <div className="container max-w-3xl text-center">
          <h2
            className="fb-anim mb-2 text-2xl font-bold text-gray-900 md:text-3xl"
            style={{ animation: "fb-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0ms both" }}
          >
            {t.ctaTitle}
          </h2>
          <p
            className="fb-anim mb-10 text-gray-500"
            style={{ animation: "fb-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 80ms both" }}
          >
            {t.ctaSubtitle}
          </p>

          <div
            className="fb-anim grid grid-cols-1 gap-4 sm:grid-cols-2"
            style={{ animation: "fb-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 160ms both" }}
          >
            {/* Phone card */}
            <Link
              href="tel:+85684260179"
              className="group flex items-center gap-4 rounded-2xl border border-primary/20 bg-white px-6 py-5 text-left transition-all hover:border-primary/40 hover:shadow-md hover:shadow-primary/10"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Phone className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-400">{t.callUs}</p>
                <p className="truncate font-semibold text-gray-900">+856 84 260 179</p>
              </div>
            </Link>

            {/* Email card */}
            <Link
              href="mailto:info@bokeointernationalairport.com"
              className="group flex items-center gap-4 rounded-2xl border border-primary/20 bg-white px-6 py-5 text-left transition-all hover:border-primary/40 hover:shadow-md hover:shadow-primary/10"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Mail className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-400">{t.emailUs}</p>
                <p className="truncate font-semibold text-gray-900">info@bokeointernationalairport.com</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
