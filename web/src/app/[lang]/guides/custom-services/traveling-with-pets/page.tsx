import { Suspense } from "react";
import type { Metadata } from "next";
import { Lang } from "@/types/language";
import { TravelingWithPetsComponent } from "@/components/guides/custom-services";
import { createCustomServicesI18n } from "@/data/i18n/guide";

interface Props {
  params: Promise<{ lang: Lang }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const { petsGuideline: t } = createCustomServicesI18n(lang);

  return {
    title: t.title,
    description: t.subtitle,
  };
}

function TravelingWithPetsSkeleton() {
  return (
    <>
      {/* Header */}
      <section className="bg-[#f0fbfc] py-10">
        <div className="container space-y-6">
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
          <div className="space-y-3">
            <div className="h-3 w-28 animate-pulse rounded bg-gray-200" />
            <div className="h-9 w-3/4 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-5 w-1/2 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="h-12 w-full animate-pulse rounded-r-lg bg-amber-100" />
        </div>
      </section>

      {/* General rules + AVIH — lg:grid-cols-[1.2fr_1fr] */}
      <section className="bg-white py-10">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            {/* General rules — 4 border-l-4 rows */}
            <div className="space-y-5">
              <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
              <div className="h-7 w-44 animate-pulse rounded-lg bg-gray-200" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex gap-3 rounded-r-lg border-l-4 border-[#b3e8e9] bg-[#f0fbfc] px-4 py-3"
                  >
                    <div className="h-4 w-4 shrink-0 animate-pulse rounded bg-[#b3e8e9]" />
                    <div className="h-5 flex-1 animate-pulse rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            </div>
            {/* AVIH — 3 numbered rows */}
            <div className="space-y-5">
              <div className="h-7 w-40 animate-pulse rounded-lg bg-gray-200" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-5 w-5 shrink-0 animate-pulse rounded-full bg-gray-200" />
                    <div className="h-10 flex-1 animate-pulse rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents + Carrier — lg:grid-cols-2 */}
      <section className="bg-gray-50 py-10">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Documents — 2 icon-tile items */}
            <div className="space-y-5">
              <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-7 w-44 animate-pulse rounded-lg bg-gray-200" />
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-9 w-9 shrink-0 animate-pulse rounded-xl bg-gray-200" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
                      <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Carrier — 2 icon rows */}
            <div className="space-y-5">
              <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
              <div className="h-7 w-44 animate-pulse rounded-lg bg-gray-200" />
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-4 w-4 shrink-0 animate-pulse rounded bg-gray-200" />
                    <div className="h-10 flex-1 animate-pulse rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips — sm:grid-cols-2 */}
      <section className="bg-white py-10">
        <div className="container space-y-5">
          <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-7 w-36 animate-pulse rounded-lg bg-gray-200" />
          <div className="grid gap-4 sm:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="h-5 w-5 shrink-0 animate-pulse rounded-full bg-gray-200" />
                <div className="h-10 flex-1 animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

async function TravelingWithPetsContent({ lang }: { lang: Lang }) {
  return <TravelingWithPetsComponent lang={lang} />;
}

export default async function TravelingWithPetsPage({ params }: Props) {
  const { lang } = await params;

  return (
    <Suspense fallback={<TravelingWithPetsSkeleton />}>
      <TravelingWithPetsContent lang={lang} />
    </Suspense>
  );
}
