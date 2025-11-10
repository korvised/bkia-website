import { Suspense } from "react";
import { Lang } from "@/types/language";
import { currentDateISO } from "@/constants";
import {
  FlightBoard,
  FlightBoardSkeleton,
  FlightTable,
} from "@/components/flights";
import { listFlights } from "@/services/flights.service";
import { FlightDirection } from "@/types/enum";
import type { QueryFlight } from "@/types/flight";

interface DeparturesPageProps {
  params: Promise<{ lang: Lang }>;
  searchParams: Promise<{
    date?: string;
    destination?: string;
    airline?: string;
    q?: string;
    page?: string;
    limit?: string;
  }>;
}

function toQuery(
  filters: Awaited<DeparturesPageProps["searchParams"]>,
): QueryFlight {
  return {
    direction: FlightDirection.DEPARTURE,
    date: filters.date ?? currentDateISO,
    destination: filters.destination,
    airline: filters.airline,
    search: filters.q,
    page: filters.page ? Number(filters.page) : 1,
    limit: filters.limit ? Number(filters.limit) : 25,
    orderBy: "operationDate",
    order: "ASC",
  };
}

export default async function DeparturesPage({
  params,
  searchParams,
}: DeparturesPageProps) {
  const { lang } = await params;
  const filters = await searchParams;

  const query = toQuery(filters);
  const { data, lastUpdated } = await listFlights(query);

  return (
    <Suspense fallback={<FlightBoardSkeleton />}>
      <FlightBoard
        lang={lang}
        filters={query}
        lastUpdated={lastUpdated}
        table={
          <FlightTable
            lang={lang}
            direction={query.direction!}
            flights={data}
          />
        }
        variant="departure"
      />
    </Suspense>
  );
}
