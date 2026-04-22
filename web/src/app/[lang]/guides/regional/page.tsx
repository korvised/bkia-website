import { Lang } from "@/types/language";
import { RegionalComponent } from "@/components/transports/regional";

interface RegionalTransportPageProps {
  params: Promise<{ lang: Lang }>;
}

export default async function RegionalTransportPage({
  params,
}: RegionalTransportPageProps) {
  const { lang } = await params;

  return <RegionalComponent lang={lang} />;
}
