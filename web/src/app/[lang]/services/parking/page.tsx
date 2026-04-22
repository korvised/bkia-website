import type { Metadata } from "next";
import type { Lang } from "@/types/language";
import { ParkingContent } from "./ParkingContent";

interface Props {
  params: Promise<{ lang: Lang }>;
}

const META: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "Airport Parking | Bokeo International Airport",
    description:
      "Convenient parking at Bokeo International Airport. Hourly rates for cars and motorcycles, two terminals, multiple payment methods.",
  },
  lo: {
    title: "ລານຈອດລົດ | ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    description:
      "ລານຈອດລົດທີ່ສະດວກສະບາຍ ທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ. ຄ່າຈອດລົດຕາມຊົ່ວໂມງ ສຳລັບລົດໃຫຍ່ ແລະ ລົດຈັກ.",
  },
  zh: {
    title: "机场停车场 | 博胶国际机场",
    description:
      "博胶国际机场便捷停车服务，按小时计费，支持多种支付方式。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return META[lang as Lang] ?? META.en;
}

export default async function ParkingPage({ params }: Props) {
  const { lang } = await params;
  return <ParkingContent lang={lang as Lang} />;
}
