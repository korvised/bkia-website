import { ReactNode } from "react";
import { Metadata } from "next";
import { Lang } from "@/types/language";
import { ServicesLayout } from "@/components/layout/services";
import { GuideTabs } from "@/components/guide";

interface GuideLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: Pick<GuideLayoutProps, "params">): Promise<Metadata> {
  const { lang } = await params;

  const metadata = {
    en: {
      title: "Passenger Guide",
      description:
        "Complete guide for passengers at Bokeo International Airport. Find information about departure, arrival, transfer, facilities, and special services.",
    },
    lo: {
      title: "ຄູ່ມືສຳລັບຜູ້ໂດຍສານ",
      description:
        "ຄູ່ມືທີ່ສົມບູນສຳລັບຜູ້ໂດຍສານທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ. ຊອກຫາຂໍ້ມູນກ່ຽວກັບການເດີນທາງອອກ, ການມາເຖິງ, ການໂອນຍ້າຍ, ສິ່ງອຳນວຍຄວາມສະດວກ ແລະ ບໍລິການພິເສດ.",
    },
    zh: {
      title: "旅客指南",
      description:
        "博胶国际机场旅客完整指南。查找有关出发、到达、转机、设施和特殊服务的信息。",
    },
  };

  return {
    title: metadata[lang as Lang].title,
    description: metadata[lang as Lang].description,
  };
}

export default async function GuideLayout({
  children,
  params,
}: GuideLayoutProps) {
  const { lang } = await params;

  return (
    <ServicesLayout lang={lang as Lang}>
      <GuideTabs />
      {children}
    </ServicesLayout>
  );
}
