import { Suspense } from "react";
import { Lang } from "@/types/language";
import { FlightBoard, FlightBoardSkeleton } from "@/components/flights";

interface DeparturesPageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{
    terminal?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
    destination?: string;
    airline?: string;
    flightNumber?: string;
  }>;
}

export default async function DeparturesPage({
  params,
  searchParams,
}: DeparturesPageProps) {
  const { lang } = await params;
  const filters = await searchParams;

  return (
    <Suspense fallback={<FlightBoardSkeleton />}>
      <FlightBoard type="departure" lang={lang as Lang} filters={filters} />
    </Suspense>
  );
}
