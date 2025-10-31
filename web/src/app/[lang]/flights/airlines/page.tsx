import { AirlineCard } from "@/components/flights";
import { mockAirlines } from "@/data/mock-flights";
import { Lang } from "@/types/language";

interface AirlinesPageProps {
  params: Promise<{ lang: string }>;
}

export default async function AirlinesPage({ params }: AirlinesPageProps) {
  const { lang } = await params;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {mockAirlines.map((airline) => (
        <AirlineCard lang={lang as Lang} airline={airline} />
      ))}
    </div>
  );
}
