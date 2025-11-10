import { Suspense } from "react";
import { Lang } from "@/types/language";
import { listAirlines } from "@/services/flights";
import { AirlineBoard, AirlineBoardSkeleton } from "@/components/flights";

interface AirlinesPageProps {
  params: Promise<{ lang: Lang }>;
}

async function AirlinesContent({ lang }: { lang: Lang }) {
  const { data: airlines } = await listAirlines();

  return <AirlineBoard lang={lang} airlines={airlines} />;
}

export default async function AirlinesPage({ params }: AirlinesPageProps) {
  const { lang } = await params;

  return (
    <Suspense fallback={<AirlineBoardSkeleton />}>
      <AirlinesContent lang={lang} />
    </Suspense>
  );
}
