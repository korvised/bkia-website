import { Suspense } from "react";
import {
  FlightBoard,
  FlightBoardSkeleton,
  FlightTable,
} from "@/components/flights";
import type { FlightPageProps, QueryFlight } from "@/types/flight";
import { FlightDirection } from "@/types/enum";
import { listFlights, toQuery } from "@/services/flights";
import { Lang } from "@/types/language";

async function ArrivalsPageContent({
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
      table={
        <FlightTable lang={lang} direction={query.direction!} flights={data} />
      }
      variant="arrival"
    />
  );
}

export default async function ArrivalsPage({
  params,
  searchParams,
}: FlightPageProps) {
  const { lang } = await params;
  const filters = await searchParams;
  const query = toQuery(filters, FlightDirection.ARRIVAL);

  return (
    <Suspense fallback={<FlightBoardSkeleton />}>
      <ArrivalsPageContent lang={lang} query={query} />
    </Suspense>
  );
}
