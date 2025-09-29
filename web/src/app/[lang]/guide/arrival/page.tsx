import { Suspense } from "react";
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
} from "@/components/guide/arrival";
import { ArrivalTab } from "@/types/guide";

interface ArrivalPageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ tab?: ArrivalTab }>;
}

export default async function ArrivalPage({
  params,
  searchParams,
}: ArrivalPageProps) {
  const { lang } = await params;
  const { tab = "airport" } = await searchParams;

  return (
    <div className="mx-auto max-w-7xl">
      {/* Tab Navigation */}
      <ArrivalTabNavigation lang={lang as Lang} activeTab={tab} />

      {/* Content */}
      <div className="rounded-lg bg-white p-8 shadow-sm">
        <Suspense fallback={<ContentSkeleton />}>
          <ArrivalContent tab={tab} />
        </Suspense>
      </div>

      {/* Related Services */}
      <RelatedServices />
    </div>
  );
}

function ArrivalContent({ tab }: { tab: ArrivalTab }) {
  switch (tab) {
    case "airport":
      return <ArrivalAirportContent />;
    case "customs-inspection":
      return <CustomsInspectionContent />;
    case "border-inspection":
      return <BorderInspectionContent />;
    case "baggage-claim":
      return <BaggageClaimContent />;
    case "exit-customs":
      return <ExitCustomsContent />;
    case "leaving":
      return <LeavingAirportContent />;
    default:
      return <ArrivalAirportContent />;
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
