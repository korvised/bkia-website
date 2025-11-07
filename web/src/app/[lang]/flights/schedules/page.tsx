import { Suspense } from "react";
import { Lang } from "@/types/language";
import { currentDateISO } from "@/constants";
import {
  FlightBoard,
  FlightBoardSkeleton,
  FlightScheduleTable,
} from "@/components/flights";
import { listFlights } from "@/services/flights.service";
import type { QueryFlight } from "@/types/flight";

interface SchedulesPageProps {
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
  filters: Awaited<SchedulesPageProps["searchParams"]>,
): QueryFlight {
  return {
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

export default async function SchedulesPage({
  params,
  searchParams,
}: SchedulesPageProps) {
  const { lang } = await params;
  const filters = await searchParams;

  const query = toQuery(filters);
  const { data } = await listFlights(query);

  return (
    <Suspense fallback={<FlightBoardSkeleton />}>
      <FlightBoard
        lang={lang}
        filters={query}
        table={<FlightScheduleTable lang={lang} flights={data} />}
        variant="schedule"
      />
    </Suspense>
  );
}
