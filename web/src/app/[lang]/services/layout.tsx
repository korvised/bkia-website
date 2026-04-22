import { FeatureLayout } from "@/components/common";
import { navigation, MenuItem } from "@/data/navigation";
import { Lang } from "@/types/language";

interface ServicesLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

const menuItems: MenuItem[] = (navigation.find((m) => m.id === "services")
  ?.menuItems || []) as MenuItem[];

const title = {
  en: "Services",
  lo: "ການບໍລິການ",
  zh: "服务",
};

export default async function ServicesLayout({
  children,
  params,
}: ServicesLayoutProps) {
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
