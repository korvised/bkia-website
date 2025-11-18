import { Suspense } from "react";
import type { Metadata } from "next";
import {
  FlightBoard,
  FlightBoardSkeleton,
  FlightTable,
} from "@/components/flights";
import type { FlightPageProps, QueryFlight } from "@/types/flight";
import { FlightDirection } from "@/types/enum";
import { listFlights, toQuery } from "@/services/flight";
import { Lang } from "@/types/language";

export async function generateMetadata({
  params,
}: FlightPageProps): Promise<Metadata> {
  const { lang } = await params;

  const metadata = {
    en: {
      title: "Arrival Flights | Bokeo International Airport",
      description:
        "Check arriving flights status, baggage belt information, and scheduled arrival times at Bokeo International Airport.",
    },
    lo: {
      title: "ຂາເຂົ້າ | ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
      description:
        "ກວດເບິ່ງສະຖານະການບິນຂາເຂົ້າ, ສາຍພານກະເປົາ ແລະ ເວລາມາຮອດຕາມກຳນົດ ທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ.",
    },
    zh: {
      title: "到达航班 | 博胶国际机场",
      description:
        "查看到达航班状态、行李提取传送带信息以及计划到达时间（博胶国际机场）。",
    },
  } as const;

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
  };
}

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
