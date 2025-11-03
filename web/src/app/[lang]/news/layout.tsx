import { FeatureLayout } from "@/components/common";
import { mainNavigation, MenuItem } from "@/data/main-navigation";
import { Lang } from "@/types/language";

interface NewsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

const menuItems: MenuItem[] = (mainNavigation.find((m) => m.id === "support")
  ?.menuItems || []) as MenuItem[];

const title = {
  en: "News",
  lo: "ສະໜັບສະໜູນ",
  zh: "客户支持",
};

export default async function NewsLayout({
  children,
  params,
}: NewsLayoutProps) {
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
