import { Suspense } from "react";
import type { Metadata } from "next";
import { Lang } from "@/types/language";
import { ToFromAirportComponent } from "@/components/transports";
import { createToFromAirportI18n } from "@/data/i18n/transport";

interface Props {
  params: Promise<{ lang: Lang }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const { toFromAirport: t } = createToFromAirportI18n(lang);

  return {
    title: t.title,
    description: t.intro,
  };
}

function ToFromAirportSkeleton() {
  return (
    <div className="container space-y-8">
      {/* Header skeleton */}
      <div className="space-y-3">
        <div className="h-10 w-72 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-6 w-full max-w-2xl animate-pulse rounded-lg bg-gray-200" />
      </div>

      {/* Image + Counter skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="aspect-video w-full animate-pulse rounded-lg bg-gray-200" />
        <div className="flex flex-col justify-center space-y-4">
          <div className="h-7 w-40 animate-pulse rounded-lg bg-gray-200" />
          <div className="space-y-3">
            <div className="h-5 w-full animate-pulse rounded-lg bg-gray-200" />
            <div className="h-5 w-3/4 animate-pulse rounded-lg bg-gray-200" />
          </div>
          <div className="space-y-3 pt-2">
            <div className="h-7 w-40 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-16 w-full animate-pulse rounded-lg bg-gray-200" />
            <div className="h-16 w-full animate-pulse rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Features skeleton */}
      <div className="space-y-3">
        <div className="h-7 w-48 animate-pulse rounded-lg bg-gray-200" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 animate-pulse rounded-lg bg-gray-200"
            />
          ))}
        </div>
      </div>

      {/* Rates + Payment skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="h-7 w-32 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-16 w-full animate-pulse rounded-lg bg-gray-200" />
        </div>
        <div className="space-y-3">
          <div className="h-7 w-44 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-5 w-full animate-pulse rounded-lg bg-gray-200" />
          <div className="h-5 w-3/4 animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>

      {/* Booking skeleton */}
      <div className="space-y-3 rounded-lg bg-gray-100 p-5">
        <div className="h-7 w-44 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-5 w-full max-w-lg animate-pulse rounded-lg bg-gray-200" />
        <div className="flex flex-col gap-3 pt-1 sm:flex-row">
          <div className="h-16 w-full animate-pulse rounded-lg bg-gray-200 sm:w-52" />
          <div className="h-16 w-full animate-pulse rounded-lg bg-gray-200 sm:w-52" />
        </div>
      </div>
    </div>
  );
}

async function ToFromAirportContent({ lang }: { lang: Lang }) {
  return <ToFromAirportComponent lang={lang} />;
}

export default async function ToFromAirportPage({ params }: Props) {
  const { lang } = await params;

  return (
    <Suspense fallback={<ToFromAirportSkeleton />}>
      <ToFromAirportContent lang={lang} />
    </Suspense>
  );
}
