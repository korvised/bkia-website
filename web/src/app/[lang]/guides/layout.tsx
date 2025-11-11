import { ReactNode } from "react";
import { Lang } from "@/types/language";
import { FeatureLayout } from "@/components/common";
import { navigation, MenuItem } from "@/data/navigation";

interface GuideLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

const menuItems: MenuItem[] = (navigation.find((m) => m.id === "guides")
  ?.menuItems || []) as MenuItem[];

const title = {
  en: "Passenger Guide",
  lo: "ຄູ່ມືຜູ້ໂດຍສານ",
  zh: "乘客指南",
};

export default async function GuideLayout({
  children,
  params,
}: GuideLayoutProps) {
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
