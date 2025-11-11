import { Suspense } from "react";
import type { Metadata } from "next";
import { Lang } from "@/types/language";
import { listAirlines } from "@/services/flights";
import { AirlineBoard, AirlineBoardSkeleton } from "@/components/flights";

interface AirlinesPageProps {
  params: Promise<{ lang: Lang }>;
}

export async function generateMetadata({
  params,
}: AirlinesPageProps): Promise<Metadata> {
  const { lang } = await params;

  const metadata = {
    en: {
      title: "Airlines | Bokeo International Airport",
      description:
        "View airlines operating at Bokeo International Airport, including IATA codes and contact information.",
    },
    lo: {
      title: "ສາຍການບິນ | ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
      description:
        "ເບິ່ງລາຍຊື່ສາຍການບິນທີ່ປະກອບການທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ ຮວມທັງລະຫັດ IATA ແລະ ຂໍ້ມູນຕິດຕໍ່.",
    },
    zh: {
      title: "航空公司 | 博胶国际机场",
      description:
        "查看在博胶国际机场运营的航空公司，包括 IATA 值机柜台与联系方式。",
    },
  } as const;

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
  };
}

async function AirlinesContent({ lang }: { lang: Lang }) {
  const { data: airlines } = await listAirlines();

  return <AirlineBoard lang={lang} airlines={airlines} />;
}

export default async function AirlinesPage({ params }: AirlinesPageProps) {
  const { lang } = await params;

  return (
    <Suspense fallback={<AirlineBoardSkeleton />}>
      <AirlinesContent lang={lang} />
    </Suspense>
  );
}
