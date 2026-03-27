import { Metadata } from "next";
import { Suspense } from "react";
import { Lang } from "@/types/language";
import {
  ArrivalAirportContent,
  ArrivalTabNavigation,
  BaggageClaimContent,
  BorderInspectionContent,
  CustomsInspectionContent,
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
      <ArrivalTabNavigation lang={lang} activeTab={tab} />

      {/* ── Content ─────────────────────────────────────────── */}
      <Suspense fallback={<ContentSkeleton />}>
        <ArrivalContent tab={tab} lang={lang} />
      </Suspense>

      {/* ── Related Services ────────────────────────────────── */}
      <RelatedServices lang={lang} />
    </>
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
    case "leaving":
      return <LeavingAirportContent lang={lang} />;
    default:
      return <ArrivalAirportContent lang={lang} />;
  }
}

function ContentSkeleton() {
  return (
    <>
      <section className="bg-[#f0fbfc] py-10">
        <div className="container animate-pulse">
          <div className="mb-8 space-y-3">
            <div className="h-8 w-1/3 rounded bg-[#d4f2f3]" />
            <div className="h-4 w-2/3 rounded bg-[#d4f2f3]" />
          </div>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="h-72 rounded-xl bg-[#d4f2f3] lg:h-[420px]" />
            <div className="space-y-4">
              <div className="h-3 w-1/4 rounded bg-[#d4f2f3]" />
              <div className="h-3 w-full rounded bg-[#d4f2f3]" />
              <div className="h-3 w-5/6 rounded bg-[#d4f2f3]" />
              <div className="h-3 w-full rounded bg-[#d4f2f3]" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-10">
        <div className="container animate-pulse space-y-4">
          <div className="h-3 w-1/4 rounded bg-gray-200" />
          <div className="h-3 w-full rounded bg-gray-200" />
          <div className="h-3 w-5/6 rounded bg-gray-200" />
        </div>
      </section>
    </>
  );
}
