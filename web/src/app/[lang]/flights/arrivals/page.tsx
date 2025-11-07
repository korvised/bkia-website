import { Suspense } from "react";
import { Lang } from "@/types/language";
import { currentDateISO } from "@/constants";
import {
  FlightBoard,
  FlightBoardSkeleton,
  FlightTable,
} from "@/components/flights";
import type { QueryFlight } from "@/types/flight";
import { FlightDirection } from "@/types/enum";
import { listFlights } from "@/services/flights.service";

interface ArrivalsPageProps {
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
  filters: Awaited<ArrivalsPageProps["searchParams"]>,
): QueryFlight {
  return {
    direction: FlightDirection.ARRIVAL,
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

export default async function ArrivalsPage({
  params,
  searchParams,
}: ArrivalsPageProps) {
  const { lang } = await params;
  const filters = await searchParams;

  const query = toQuery(filters);
  const { data } = await listFlights(query);

  return (
    <Suspense fallback={<FlightBoardSkeleton />}>
      <FlightBoard
        lang={lang}
        filters={query}
        table={
          <FlightTable
            lang={lang}
            direction={query.direction!}
            flights={data}
          />
        }
        variant="arrival"
      />
    </Suspense>
  );
}
