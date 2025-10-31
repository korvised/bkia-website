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
} from "@/components/guides/arrival";
import { ArrivalTab } from "@/types/guide";
import { Metadata } from "next";

interface ArrivalPageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ tab?: ArrivalTab }>;
}

export async function generateMetadata({
  params,
}: ArrivalPageProps): Promise<Metadata> {
  const { lang } = await params;

  const metadata = {
    en: {
      title: "Arrival Guide",
      description:
        "Complete arrival guide for Bokeo International Airport. Information about immigration, baggage claim, customs clearance, and airport exit procedures.",
    },
    lo: {
      title: "ຄູ່ມືຜູ້ໂດຍສານຂາເຂົ້າ",
      description:
        "ຄູ່ມືການມາເຖິງສົມບູນສຳລັບສະໜາມບິນສາກົນບໍ່ແກ້ວ. ຂໍ້ມູນກ່ຽວກັບການເຂົ້າເມືອງ, ການຮັບກະເປົາ, ການຜ່ານພາສີ ແລະ ຂະບວນການອອກຈາກສະໜາມບິນ.",
    },
    zh: {
      title: "到达指南",
      description:
        "博胶国际机场完整到达指南。了解入境、行李提取、海关清关和机场出口流程的信息。",
    },
  };

  return {
    title: metadata[lang as Lang].title,
    description: metadata[lang as Lang].description,
  };
}

export default async function ArrivalPage({
  params,
  searchParams,
}: ArrivalPageProps) {
  const { lang } = await params;
  const { tab = "airport" } = await searchParams;

  return (
    <div>
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
