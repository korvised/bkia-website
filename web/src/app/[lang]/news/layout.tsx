import { Lang } from "@/types/language";
import { AboutLayout } from "@/components/layout/about";

interface FlightsLayoutProps {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}

export default async function FlightsLayout({
  params,
  children,
}: FlightsLayoutProps) {
  const { lang } = await params;

  return <AboutLayout lang={lang as Lang}>{children}</AboutLayout>;
}
