import { ReactNode } from "react";
import { Lang } from "@/types/language";
import { ServicesLayout } from "@/components/layout/services";
import { TransportationTabs } from "@/components/transportation";

interface TransportationLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function TransportationLayout({
  children,
  params,
}: TransportationLayoutProps) {
  const { lang } = await params;

  return (
    <ServicesLayout lang={lang as Lang}>
      <TransportationTabs lang={lang} />
      {children}
    </ServicesLayout>
  );
}
