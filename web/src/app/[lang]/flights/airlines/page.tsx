import { AirlineCard } from "@/components/flights";
import { mockAirlines } from "@/data/mock-flights";

interface AirlinesPageProps {
  params: Promise<{ lang: string }>;
}

export default async function AirlinesPage({ params }: AirlinesPageProps) {
  const { lang } = await params;

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {mockAirlines.map((airline) => (
          <AirlineCard key={airline.code} airline={airline} />
        ))}
      </div>
    </div>
  );
}
