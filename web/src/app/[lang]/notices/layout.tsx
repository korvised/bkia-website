import { FeatureLayout } from "@/components/common";
import { navigation, MenuItem } from "@/data/navigation";
import { Lang } from "@/types/language";

interface NoticesLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

const menuItems: MenuItem[] = (navigation.find((m) => m.id === "notices")
  ?.menuItems || []) as MenuItem[];

const title = {
  en: "Announcements",
  lo: "ແຈ້ງການ",
  zh: "公告",
};

export default async function NoticesLayout({
  children,
  params,
}: NoticesLayoutProps) {
  const { lang } = await params;

  return (
    <FeatureLayout
      lang={lang as Lang}
      title={title[lang as Lang]}
      menuItems={menuItems}
    >
      {children}
    </FeatureLayout>
  );
}
