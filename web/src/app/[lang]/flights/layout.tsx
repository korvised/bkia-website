import { Lang } from "@/types/language";
import { ServicesLayout } from "@/components/layout/services";

interface FlightsLayoutProps {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}

export default async function FlightsLayout({
  params,
  children,
}: FlightsLayoutProps) {
  const { lang } = await params;

  return <ServicesLayout lang={lang as Lang}>{children}</ServicesLayout>;
}
