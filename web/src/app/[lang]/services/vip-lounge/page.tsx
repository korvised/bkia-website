import type { Metadata } from "next";
import type { Lang } from "@/types/language";
import { VipLoungeContent } from "./VipLoungeContent";

interface Props {
  params: Promise<{ lang: Lang }>;
}

const META: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "VIP Lounge | Bokeo International Airport",
    description:
      "Premium private lounge experience at Bokeo International Airport. Three packages available from 159 CNY.",
  },
  lo: {
    title: "ຫ້ອງ VIP | ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    description:
      "ຫ້ອງຮັບຮອງ VIP ພິເສດ ທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ. ສາມລະດັບຄ່າບໍລິການ ເລີ່ມຕົ້ນ 159 ຢວນ.",
  },
  zh: {
    title: "贵宾休息室 | 博胶国际机场",
    description:
      "博胶国际机场尊享贵宾休息室，提供三种套餐，起价159元人民币。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return META[lang as Lang] ?? META.en;
}

export default async function VipLoungePage({ params }: Props) {
  const { lang } = await params;
  return <VipLoungeContent lang={lang as Lang} />;
}
