import { ReactNode } from "react";
import { Lang } from "@/types/language";
import { ServicesLayout } from "@/components/layout/services";
import { TransportationTabs } from "@/components/transportation";

interface TransportationLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: Lang }>;
}

export default async function TransportationLayout({
  children,
  params,
}: TransportationLayoutProps) {
  const { lang } = await params;

  return (
    <ServicesLayout lang={lang}>
      <div className="py-8">
        <TransportationTabs lang={lang} />
        {children}
      </div>
    </ServicesLayout>
  );
}
