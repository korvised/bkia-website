import { Suspense } from "react";
import { Lang } from "@/types/language";
import { FlightBoard, FlightBoardSkeleton } from "@/components/flights";

interface ArrivalsPageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{
    terminal?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
    destination?: string;
    airline?: string;
    q?: string;
  }>;
}

export default async function ArrivalsPage({
  params,
  searchParams,
}: ArrivalsPageProps) {
  const { lang } = await params;
  const filters = await searchParams;

  return (
    <Suspense fallback={<FlightBoardSkeleton />}>
      <FlightBoard type="arrival" lang={lang as Lang} filters={filters} />
    </Suspense>
  );
}
