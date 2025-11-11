import { Suspense } from "react";
import type { Metadata } from "next";
import { Lang } from "@/types/language";
import {
  FlightBoard,
  FlightBoardSkeleton,
  FlightTable,
} from "@/components/flights";
import { listFlights, toQuery } from "@/services/flights";
import type { FlightPageProps, QueryFlight } from "@/types/flight";
import { FlightDirection } from "@/types/enum";

export async function generateMetadata({
  params,
}: FlightPageProps): Promise<Metadata> {
  const { lang } = await params;

  const metadata = {
    en: {
      title: "Departures Flights | Bokeo International Airport",
      description:
        "Check departing flights status, gate information, and scheduled departure times at Bokeo International Airport.",
    },
    lo: {
      title: "ຂາອອກ | ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
      description:
        "ກວດເບິ່ງສະຖານະການບິນຂາອອກ, ປະຕູຂຶ້ນເຄື່ອງ ແລະ ເວລາອອກຕາມກຳນົດ ທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ.",
    },
    zh: {
      title: "出发航班 | 博胶国际机场",
      description:
        "查看出发航班状态、登机口信息及计划起飞时间（博胶国际机场）。",
    },
  } as const;

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
  };
}

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
