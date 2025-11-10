import { Suspense } from "react";
import { Lang } from "@/types/language";
import {
  FlightBoard,
  FlightBoardSkeleton,
  FlightTable,
} from "@/components/flights";
import { listFlights, toQuery } from "@/services/flights";
import type { FlightPageProps, QueryFlight } from "@/types/flight";
import { FlightDirection } from "@/types/enum";

async function DeparturesPageContent({
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
      variant="departure"
    />
  );
}

export default async function DeparturesPage({
  params,
  searchParams,
}: FlightPageProps) {
  const { lang } = await params;
  const filters = await searchParams;
  const query = toQuery(filters, FlightDirection.DEPARTURE);

  return (
    <Suspense fallback={<FlightBoardSkeleton />}>
      <DeparturesPageContent lang={lang} query={query} />
    </Suspense>
  );
}
