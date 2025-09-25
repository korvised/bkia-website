import { Lang } from "@/types/language";
import { Suspense } from "react";
import FlightsPageContent from "./flights-content";
import { Metadata } from "next";

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
    lo: "ຂໍ້ມູນຖ້ຽວບິນອອກເດີນທາງ ແລະ ມາຮອດ ແບບເວລາຈິງ ທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
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

  return (
    <Suspense fallback={<FlightsPageSkeleton />}>
      <FlightsPageContent
        lang={lang}
        initialQuery={q}
        initialType={type as "departure" | "arrival" | undefined}
        initialAirline={airline}
      />
    </Suspense>
  );
}

function FlightsPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />
        <div className="h-10 w-24 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="space-y-4">
        <div className="h-12 animate-pulse rounded bg-gray-200" />
        <div className="flex space-x-4">
          <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
          <div className="h-10 w-48 animate-pulse rounded bg-gray-200" />
        </div>
      </div>

      <div className="flex space-x-8 border-b">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="mb-2 h-6 w-24 animate-pulse rounded bg-gray-200"
          />
        ))}
      </div>

      <div className="rounded-lg border bg-white">
        <div className="p-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex space-x-4 border-b border-gray-100 py-3 last:border-b-0"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((j) => (
                <div
                  key={j}
                  className="h-4 flex-1 animate-pulse rounded bg-gray-200"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
