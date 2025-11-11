import { FeatureLayout } from "@/components/common";
import { navigation, MenuItem } from "@/data/navigation";
import { Lang } from "@/types/language";

interface SupportLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

const menuItems: MenuItem[] = (navigation.find((m) => m.id === "support")
  ?.menuItems || []) as MenuItem[];

const title = {
  en: "Support",
  lo: "ສະໜັບສະໜູນ",
  zh: "客户支持",
};

export default async function SupportLayout({
  children,
  params,
}: SupportLayoutProps) {
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
