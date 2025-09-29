import { ReactNode } from "react";
import { Lang } from "@/types/language";
import { ServicesLayout } from "@/components/layout/services";
import { GuideTabs } from "@/components/guide";

interface GuideLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function GuideLayout({
  children,
  params,
}: GuideLayoutProps) {
  const { lang } = await params;

  return (
    <ServicesLayout lang={lang as Lang}>
      <GuideTabs />
      {children}
    </ServicesLayout>
  );
}
