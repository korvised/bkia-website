import { Suspense } from "react";
import { Metadata } from "next";
import { Lang } from "@/types/language";
import {
  ArrivalAirportContent,
  ArrivalTabNavigation,
  BaggageClaimContent,
  BorderInspectionContent,
  CustomsInspectionContent,
  ExitCustomsContent,
  LeavingAirportContent,
  RelatedServices,
} from "@/components/guides/arrival";
import { ArrivalTab } from "@/types/guide";
import { createArrivalGuideI18n } from "@/data/i18n/guide";

interface ArrivalPageProps {
  params: Promise<{ lang: Lang }>;
  searchParams: Promise<{ tab?: ArrivalTab }>;
}

export async function generateMetadata({
  params,
}: ArrivalPageProps): Promise<Metadata> {
  const { lang } = await params;
  const { arrivalNav: t } = createArrivalGuideI18n(lang);

  return {
    title: t.title,
    description: t.subtitle,
  };
}

export default async function ArrivalPage({
  params,
  searchParams,
}: ArrivalPageProps) {
  const { lang } = await params;
  const { tab = "airport" } = await searchParams;
  const { arrivalNav: t } = createArrivalGuideI18n(lang);

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
      <ArrivalTabNavigation lang={lang as Lang} activeTab={tab} />

      {/* Content */}
      <div className="container py-8">
        <Suspense fallback={<ContentSkeleton />}>
          <ArrivalContent tab={tab} lang={lang} />
        </Suspense>
      </div>

      {/* Related Services */}
      <RelatedServices lang={lang} />
    </div>
  );
}

function ArrivalContent({ tab, lang }: { tab: ArrivalTab; lang: Lang }) {
  switch (tab) {
    case "airport":
      return <ArrivalAirportContent lang={lang} />;
    case "customs-inspection":
      return <CustomsInspectionContent lang={lang} />;
    case "border-inspection":
      return <BorderInspectionContent lang={lang} />;
    case "baggage-claim":
      return <BaggageClaimContent lang={lang} />;
    case "exit-customs":
      return <ExitCustomsContent lang={lang} />;
    case "leaving":
      return <LeavingAirportContent lang={lang} />;
    default:
      return <ArrivalAirportContent lang={lang} />;
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
