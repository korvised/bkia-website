import { Suspense } from "react";
import type { Metadata } from "next";
import {
  FlightBoard,
  FlightBoardSkeleton,
  FlightScheduleTable,
} from "@/components/flights";
import { listFlights, toQuery } from "@/services/flights";
import type { FlightPageProps, QueryFlight } from "@/types/flight";
import { Lang } from "@/types/language";

export async function generateMetadata({
  params,
}: FlightPageProps): Promise<Metadata> {
  const { lang } = await params;

  const metadata = {
    en: {
      title: "Flight Schedules | Bokeo International Airport",
      description:
        "View full flight schedules by date and route at Bokeo International Airport. Check planned times for departures and arrivals.",
    },
    lo: {
      title: "ຕາຕະລາງການບິນ | ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
      description:
        "ເບິ່ງຕາຕະລາງການບິນຕາມວັນທີ ແລະ ເສັ້ນທາງ ທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ. ກວດເບິ່ງເວລາທີ່ກຳນົດສຳລັບຂາອອກ ແລະ ຂາເຂົ້າ.",
    },
    zh: {
      title: "航班时刻表 | 博胶国际机场",
      description:
        "按日期与航线查看博胶国际机场航班时刻表。查询计划出发与到达时间。",
    },
  } as const;

  return {
    title: metadata[lang].title,
    description: metadata[lang].description,
  };
}

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
