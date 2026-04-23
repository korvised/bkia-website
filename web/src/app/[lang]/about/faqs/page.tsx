import type { Metadata } from "next";
import type { Lang } from "@/types/language";
import { FAQsContent } from "@/components/about/faqs";

interface Props {
  params: Promise<{ lang: Lang }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;

  const titles: Record<Lang, string> = {
    en: "FAQs — Bokeo International Airport",
    lo: "ຄຳຖາມທີ່ຖືກຖາມເລື້ອຍໆ — ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    zh: "常见问题 — 博胶国际机场",
  };
  const descriptions: Record<Lang, string> = {
    en: "Find answers to frequently asked questions about flights, check-in, baggage, security, and airport services at Bokeo International Airport.",
    lo: "ຊອກຫາຄຳຕອບສຳລັບຄຳຖາມທີ່ຖືກຖາມເລື້ອຍໆກ່ຽວກັບທ່ຽວບິນ, ການເຊັກອິນ, ກະເປົ໋າ, ຄວາມປອດໄພ ແລະ ການບໍລິການສະໜາມບິນ.",
    zh: "在博胶国际机场，查找有关航班、值机、行李、安检及机场服务的常见问题解答。",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
  };
}

export default async function FAQsPage({ params }: Props) {
  const { lang } = await params;
  return <FAQsContent lang={lang} />;
}
