import { FeatureLayout } from "@/components/common";
import { navigation, MenuItem } from "@/data/navigation";
import { Lang } from "@/types/language";

interface FlightsLayoutProps {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}

const menuItems: MenuItem[] = (navigation.find((m) => m.id === "flights")
  ?.menuItems || []) as MenuItem[];

const title = {
  en: "Flights",
  lo: "ຖ້ຽວບິນ",
  zh: "航班",
};

export default async function FlightsLayout({
  params,
  children,
}: FlightsLayoutProps) {
  const { lang } = await params;

  return (
    <FeatureLayout
      lang={lang as Lang}
      title={title[lang as Lang]}
      preserveQuery={["date"]}
      menuItems={menuItems}
    >
      {children}
    </FeatureLayout>
  );
}
