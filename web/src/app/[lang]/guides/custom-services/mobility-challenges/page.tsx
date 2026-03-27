import { Suspense } from "react";
import type { Metadata } from "next";
import { Lang } from "@/types/language";
import { MobilityChallengesComponent } from "@/components/guides/custom-services";
import { createCustomServicesI18n } from "@/data/i18n/guide";

interface Props {
  params: Promise<{ lang: Lang }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const { mobilityGuideline: t } = createCustomServicesI18n(lang);

  return {
    title: `${t.title} | Bokeo International Airport`,
    description: t.subtitle,
  };
}

function MobilityChallengeSkeleton() {
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

      {/* Services — 4 icon-tile cards in sm:grid-cols-2 */}
      <section className="bg-white py-10">
        <div className="container space-y-5">
          <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-7 w-48 animate-pulse rounded-lg bg-gray-200" />
          <div className="grid gap-6 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements — 4 border-l-4 rows */}
      <section className="bg-gray-50 py-10">
        <div className="container space-y-5">
          <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-7 w-48 animate-pulse rounded-lg bg-gray-200" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex gap-3 rounded-r-lg border-l-4 border-[#b3e8e9] bg-[#f0fbfc] px-4 py-3"
              >
                <div className="h-5 w-5 shrink-0 animate-pulse rounded-full bg-[#b3e8e9]" />
                <div className="h-5 flex-1 animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities — sm:grid-cols-2 lg:grid-cols-3 */}
      <section className="bg-white py-10">
        <div className="container space-y-5">
          <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
          <div className="h-7 w-48 animate-pulse rounded-lg bg-gray-200" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="h-4 w-4 shrink-0 animate-pulse rounded bg-gray-200" />
                <div className="h-8 flex-1 animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips — sm:grid-cols-2 */}
      <section className="bg-gray-50 py-10">
        <div className="container space-y-5">
          <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-7 w-36 animate-pulse rounded-lg bg-gray-200" />
          <div className="grid gap-4 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
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

async function MobilityChallengesContent({ lang }: { lang: Lang }) {
  return <MobilityChallengesComponent lang={lang} />;
}

export default async function MobilityChallengePage({ params }: Props) {
  const { lang } = await params;

  return (
    <Suspense fallback={<MobilityChallengeSkeleton />}>
      <MobilityChallengesContent lang={lang} />
    </Suspense>
  );
}
