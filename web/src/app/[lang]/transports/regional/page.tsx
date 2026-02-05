import { Lang } from "@/types/language";
import { RegionalTransportComponent } from "@/components/transports/transport";

interface RegionalTransportPageProps {
  params: Promise<{ lang: Lang }>;
}

export default async function RegionalTransportPage({
  params,
}: RegionalTransportPageProps) {
  const { lang } = await params;

  return <RegionalTransportComponent lang={lang} />;
}
