import { Metadata } from "next";
import { Suspense } from "react";
import { Lang } from "@/types/language";
import {
  BaggageContent,
  BoardingContent,
  CheckinContent,
  DepartureTabNavigation,
  ImmigrationContent,
  RelatedServices,
  SecurityContent,
} from "@/components/guides/departure";
import { DepartureTab } from "@/types/guide";
import { createDepartureGuideI18n } from "@/data/i18n/guides";

interface DeparturePageProps {
  params: Promise<{ lang: Lang }>;
  searchParams: Promise<{ tab?: DepartureTab }>;
}

export async function generateMetadata({
  params,
}: DeparturePageProps): Promise<Metadata> {
  const { lang } = await params;
  const { departureNav: t } = createDepartureGuideI18n(lang);

  return {
    title: t.title,
    description: t.subtitle,
  };
}

export default async function DepartureGuidePage({
  params,
  searchParams,
}: DeparturePageProps) {
  const { lang } = await params;
  const { tab = "checkin" } = await searchParams;
  const { departureNav: t } = createDepartureGuideI18n(lang);

  return (
    <>
      {/* ── Header ──────────────────────────────────────────── */}
      <section className="bg-white py-10">
        <div className="container space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
            {t.title}
          </h1>
          <p className="max-w-2xl text-gray-500 lg:text-lg">{t.subtitle}</p>
        </div>
      </section>

      {/* ── Tab Navigation ──────────────────────────────────── */}
      <DepartureTabNavigation lang={lang} activeTab={tab} />

      {/* ── Content ─────────────────────────────────────────── */}
      <Suspense fallback={<ContentSkeleton />}>
        <DepartureContent tab={tab} lang={lang} />
      </Suspense>

      {/* ── Related Services ────────────────────────────────── */}
      <RelatedServices lang={lang} />
    </>
  );
}

function DepartureContent({ tab, lang }: { tab: DepartureTab; lang: Lang }) {
  switch (tab) {
    case "checkin":
      return <CheckinContent lang={lang} />;
    case "baggage":
      return <BaggageContent lang={lang} />;
    case "security":
      return <SecurityContent lang={lang} />;
    case "immigration":
      return <ImmigrationContent lang={lang} />;
    case "boarding":
      return <BoardingContent lang={lang} />;
    default:
      return <CheckinContent lang={lang} />;
  }
}

function ContentSkeleton() {
  return (
    <>
      <section className="bg-white py-10">
        <div className="container animate-pulse space-y-3">
          <div className="h-8 w-1/3 rounded bg-gray-200" />
          <div className="h-4 w-2/3 rounded bg-gray-200" />
        </div>
      </section>
      <section className="bg-[#f0fbfc] py-10">
        <div className="container animate-pulse">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="h-72 rounded-xl bg-gray-200 lg:h-[420px]" />
            <div className="space-y-4">
              <div className="h-4 w-1/4 rounded bg-gray-200" />
              <div className="h-3 w-full rounded bg-gray-200" />
              <div className="h-3 w-5/6 rounded bg-gray-200" />
              <div className="h-3 w-full rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
