import { FeatureLayout } from "@/components/common";
import { navigation, MenuItem } from "@/data/navigation";
import { Lang } from "@/types/language";

interface AboutLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

const menuItems: MenuItem[] = (navigation.find((m) => m.id === "about")
  ?.menuItems || []) as MenuItem[];

const title = {
  en: "About Us",
  lo: "ກ່ຽວກັບພວກເຮົາ",
  zh: "关于我们",
};

export default async function AboutLayout({
  children,
  params,
}: AboutLayoutProps) {
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
