import { Lang } from "@/types/language";
import { Suspense } from "react";
import FlightsPageContent from "./flights-content";
import { Metadata } from "next";
import { flightApi } from "@/lib/api/flights";
import { FlightSkeleton } from "@/components/flights";

interface FlightsPageProps {
  params: Promise<{ lang: Lang }>;
  searchParams: Promise<{ q?: string; type?: string; airline?: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const titles = {
    en: "Flight Information - Bokeo International Airport",
    lo: "ຂໍ້ມູນຖ້ຽວບິນ - ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    zh: "航班信息 - 博胶国际机场",
  };

  const descriptions = {
    en: "Real-time flight departures, arrivals, and schedules at Bokeo International Airport",
    lo: "ຂໍ້ມູນຖ້ຽວບິນຂາອອກ ແລະ ຂາເຂົ້າ ແບບ Real-time ທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    zh: "博胶国际机场实时航班出发、到达和时刻表信息",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
  };
}

export default async function FlightsPage({
  params,
  searchParams,
}: FlightsPageProps) {
  const { lang } = await params;
  const { q, type, airline } = await searchParams;

  const flights = await flightApi.getSchedule();
  const airlines = await flightApi.getAirlines();

  return (
    <Suspense fallback={<FlightSkeleton />}>
      <FlightsPageContent
        lang={lang}
        initialQuery={q}
        initialType={type as "departure" | "arrival" | undefined}
        initialAirline={airline}
        flights={flights}
        airlines={airlines}
      />
    </Suspense>
  );
}
