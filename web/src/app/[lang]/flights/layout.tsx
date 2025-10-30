import { Lang } from "@/types/language";
import { FlightLayout } from "@/components/flights";

interface FlightsLayoutProps {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}

export default async function FlightsLayout({
  params,
  children,
}: FlightsLayoutProps) {
  const { lang } = await params;

  return <FlightLayout lang={lang as Lang}>{children}</FlightLayout>;
}
