import { Metadata } from "next";
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

export async function generateMetadata({
  params,
}: DeparturePageProps): Promise<Metadata> {
  const { lang } = await params;

  const metadata = {
    en: {
      title: "Departure Guide",
      description:
        "Step-by-step guide for departure procedures at Bokeo International Airport. Learn about check-in, security, customs, and boarding processes.",
    },
    lo: {
      title: "ຄູ່ມືການເດີນທາງອອກ",
      description:
        "ຄູ່ມືຂັ້ນຕອນການເດີນທາງອອກທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ. ຮຽນຮູ້ກ່ຽວກັບການເຊັກອິນ, ການກວດຄວາມປອດໄພ, ພາສີສຸນລະກາກອນ ແລະ ຂະບວນການຂຶ້ນເຮືອບິນ.",
    },
    zh: {
      title: "出发指南",
      description:
        "博胶国际机场出发流程分步指南。了解值机、安检、海关和登机流程。",
    },
  };

  return {
    title: metadata[lang as Lang].title,
    description: metadata[lang as Lang].description,
  };
}

export default async function DepartureGuidePage({
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
