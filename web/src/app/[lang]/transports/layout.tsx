import { FeatureLayout } from "@/components/common";
import { mainNavigation, MenuItem } from "@/data/main-navigation";
import { Lang } from "@/types/language";

interface TransportationLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

const menuItems: MenuItem[] = (mainNavigation.find((m) => m.id === "transports")
  ?.menuItems || []) as MenuItem[];

const title = {
  en: "Transport",
  lo: "ການຂົນສົ່ງ",
  zh: "交通",
};

export default async function TransportationLayout({
  children,
  params,
}: TransportationLayoutProps) {
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
