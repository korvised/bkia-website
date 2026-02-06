import { ParkingComponent } from "@/components/transports/parking";
import { Lang } from "@/types/language";

interface RegionalTransportPageProps {
  params: Promise<{ lang: Lang }>;
}

export default async function ParkingPage({
  params,
}: RegionalTransportPageProps) {
  const { lang } = await params;

  return <ParkingComponent lang={lang} />;
}
