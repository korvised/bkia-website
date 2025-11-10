import { Suspense } from "react";
import {
  FlightBoard,
  FlightBoardSkeleton,
  FlightScheduleTable,
} from "@/components/flights";
import { listFlights, toQuery } from "@/services/flights";
import type { FlightPageProps, QueryFlight } from "@/types/flight";
import { Lang } from "@/types/language";

async function SchedulesPageContent({
  lang,
  query,
}: {
  lang: Lang;
  query: QueryFlight;
}) {
  const { data, lastUpdated } = await listFlights(query);

  return (
    <FlightBoard
      lang={lang}
      filters={query}
      lastUpdated={lastUpdated}
      table={<FlightScheduleTable lang={lang} flights={data} />}
      variant="schedule"
    />
  );
}

export default async function SchedulesPage({
  params,
  searchParams,
}: FlightPageProps) {
  const { lang } = await params;
  const filters = await searchParams;
  const query = toQuery(filters);

  return (
    <Suspense fallback={<FlightBoardSkeleton />}>
      <SchedulesPageContent lang={lang} query={query} />
    </Suspense>
  );
}
