import type { Metadata } from "next";
import type { Lang } from "@/types/language";
import { TaxiContent } from "./TaxiContent";

interface Props {
  params: Promise<{ lang: Lang }>;
}

const META: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "Airport Taxi | Bokeo International Airport",
    description:
      "Fixed-price taxi and van service at Bokeo International Airport. Serving Ton Pheung, Golden Triangle SEZ, and Houay Xai.",
  },
  lo: {
    title: "ແທັກຊີສະໜາມບິນ | ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    description:
      "ບໍລິການລົດແທັກຊີ ແລະ ລົດຕູ້ ລາຄາກຳນົດ ທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ. ໃຫ້ບໍລິການໄປ ຕົ້ນເຜິ້ງ, ສາມຫຼຽມຄຳ ແລະ ຫ້ວຍຊາຍ.",
  },
  zh: {
    title: "机场出租车 | 博胶国际机场",
    description:
      "博胶国际机场固定价格出租车与面包车服务，覆盖顿丰、金三角经济特区及会晒。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return META[lang as Lang] ?? META.en;
}

export default async function TaxiPage({ params }: Props) {
  const { lang } = await params;
  return <TaxiContent lang={lang as Lang} />;
}
