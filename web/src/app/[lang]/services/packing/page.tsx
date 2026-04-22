import type { Metadata } from "next";
import type { Lang } from "@/types/language";
import { PackingContent } from "./PackingContent";

interface Props {
  params: Promise<{ lang: Lang }>;
}

const META: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "Luggage Wrapping Service | Bokeo International Airport",
    description:
      "Professional luggage wrapping at Bokeo International Airport. Protect your bags, comply with airline regulations.",
  },
  lo: {
    title: "ບໍລິການຫຸ້ມຫໍ່ພັດສະດຸ | ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    description:
      "ບໍລິການຫຸ້ມຫໍ່ພັດສະດຸ ດ້ວຍມືອາຊີບ ທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ.",
  },
  zh: {
    title: "行李打包裹膜服务 | 博胶国际机场",
    description:
      "博胶国际机场专业行李裹膜服务，保护行李安全，符合航空法规。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return META[lang as Lang] ?? META.en;
}

export default async function PackingPage({ params }: Props) {
  const { lang } = await params;
  return <PackingContent lang={lang as Lang} />;
}
