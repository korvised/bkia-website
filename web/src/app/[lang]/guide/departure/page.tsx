import { Suspense } from "react";
import { Lang } from "@/types/language";
import {
  BoardingContent,
  BorderContent,
  CheckinContent,
  CustomsContent,
  DepartureTabNavigation,
  PurchaseContent,
  RelatedServices,
  SecurityContent,
} from "@/components/guide/departure";
import { DepartureTab } from "@/types/guide";

interface DeparturePageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ tab?: DepartureTab }>;
}

export default async function DeparturePage({
  params,
  searchParams,
}: DeparturePageProps) {
  const { lang } = await params;
  const { tab = "purchase" } = await searchParams;

  return (
    <div className="mx-auto max-w-7xl">
      {/* Tab Navigation */}
      <DepartureTabNavigation lang={lang as Lang} activeTab={tab} />

      {/* Content */}
      <div className="rounded-lg bg-white p-8 shadow-sm">
        <Suspense fallback={<ContentSkeleton />}>
          <DepartureContent tab={tab} />
        </Suspense>
      </div>

      {/* Related Services */}
      <RelatedServices />
    </div>
  );
}

function DepartureContent({ tab }: { tab: DepartureTab }) {
  switch (tab) {
    case "purchase":
      return <PurchaseContent />;
    case "checkin":
      return <CheckinContent />;
    case "customs":
      return <CustomsContent />;
    case "border":
      return <BorderContent />;
    case "security":
      return <SecurityContent />;
    case "boarding":
      return <BoardingContent />;
    default:
      return <PurchaseContent />;
  }
}

function ContentSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex items-start gap-4">
        <div className="h-24 w-24 rounded-lg bg-gray-200" />
        <div className="flex-1 space-y-3">
          <div className="h-8 w-1/4 rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-5/6 rounded bg-gray-200" />
          <div className="h-4 w-4/6 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
