import { Lang } from "@/types/language";
import { AirportSecurity } from "@/components/guides/security";

interface AirportSecurityPageProps {
  params: Promise<{ lang: Lang }>;
}

export default async function AirportSecurityPage({
  params,
}: AirportSecurityPageProps) {
  const { lang } = await params;

  return <AirportSecurity lang={lang} />;
}
