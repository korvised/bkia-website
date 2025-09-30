import { ReactNode } from "react";
import { Metadata } from "next";
import { ServicesLayout } from "@/components/layout/services";
import { Lang } from "@/types/language";
import { NoticeTabs } from "@/components/notice";

interface NoticeAndAnnouncementProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: Pick<NoticeAndAnnouncementProps, "params">): Promise<Metadata> {
  const { lang } = await params;

  const metadata = {
    en: {
      title: "Notices & Announcements",
      description:
        "Stay updated with important notices, announcements, lost & found items, and complaint handling at Bokeo International Airport.",
    },
    lo: {
      title: "ແຈ້ງການ ແລະ ປະກາດ",
      description:
        "ຕິດຕາມຂໍ້ມູນແຈ້ງການສຳຄັນ, ປະກາດ, ສິ່ງຂອງສູນຫາຍ ແລະ ການຮ້ອງທຸກທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ.",
    },
    zh: {
      title: "通知与公告",
      description: "了解博胶国际机场的重要通知、公告、失物招领和投诉处理信息。",
    },
  };

  return {
    title: metadata[lang as Lang].title,
    description: metadata[lang as Lang].description,
  };
}

export default async function NoticeAndAnnouncementLayout({
  children,
  params,
}: NoticeAndAnnouncementProps) {
  const { lang } = await params;

  return (
    <ServicesLayout lang={lang as Lang}>
      <NoticeTabs />
      {children}
    </ServicesLayout>
  );
}
