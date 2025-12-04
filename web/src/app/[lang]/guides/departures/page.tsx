import { Metadata } from "next";
import { Suspense } from "react";
import { Lang } from "@/types/language";
import {
  BaggageContent,
  BoardingContent,
  CheckinContent,
  DepartureTabNavigation,
  RelatedServices,
  SecurityContent,
} from "@/components/guides/departure";
import { DepartureTab } from "@/types/guide";

interface DeparturePageProps {
  params: Promise<{ lang: Lang }>;
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
      title: "ຄູ່ມືຜູ້ໂດຍສານຂາອອກ",
      description:
        "ຄູ່ມືຂັ້ນຕອນການເດີນທາງອອກທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ. ຮຽນຮູ້ກ່ຽວກັບການເຊັກອິນ, ການກວດຄວາມປອດໄພ, ພາສີ ແລະ ຂະບວນການຂຶ້ນເຮືອບິນ.",
    },
    zh: {
      title: "出发指南",
      description:
        "博胶国际机场出发流程分步指南。了解值机、安检、海关和登机流程。",
    },
  };

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
  };
}

export default async function DepartureGuidePage({
  params,
  searchParams,
}: DeparturePageProps) {
  const { lang } = await params;
  const { tab = "checkin" } = await searchParams;

  return (
    <div className="bg-gray-50">
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
      return <SecurityContent />;
    case "boarding":
      return <BoardingContent />;
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
