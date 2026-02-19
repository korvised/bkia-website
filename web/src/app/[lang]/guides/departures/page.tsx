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
import { createDepartureGuideI18n } from "@/data/i18n/guide";

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
    <div className="bg-gray-50">
      {/* Header */}
      <div className="bg-white pb-8">
        <div className="container space-y-3">
          <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
            {t.title}
          </h1>
          <p className="text-gray-600 lg:text-lg">{t.subtitle}</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <DepartureTabNavigation lang={lang} activeTab={tab} />

      {/* Content */}
      <div className="container py-8">
        <Suspense fallback={<ContentSkeleton />}>
          <DepartureContent tab={tab} lang={lang} />
        </Suspense>
      </div>

      {/* Related Services */}
      <RelatedServices lang={lang} />
    </div>
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
    <div className="animate-pulse space-y-6">
      <div className="flex items-start gap-4">
        <div className="h-24 w-24 rounded-lg bg-gray-200" />
        <div className="flex-1 space-y-4">
          <div className="h-8 w-1/4 rounded bg-gray-200" />
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-11/12 rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-10/12 rounded bg-gray-200" />
          </div>
          <div className="border-l-4 border-gray-300 bg-gray-100 p-4">
            <div className="h-4 w-3/4 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
