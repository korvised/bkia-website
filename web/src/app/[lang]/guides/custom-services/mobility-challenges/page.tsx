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
    <div className="container space-y-12">
      <div className="space-y-5">
        <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />
        <div className="space-y-3">
          <div className="h-10 w-3/4 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-6 w-1/2 animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>
      <div className="h-14 w-full animate-pulse rounded-lg bg-gray-200" />
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="space-y-4">
          <div className="h-7 w-48 animate-pulse rounded-lg bg-gray-200" />
          <div className="grid gap-3 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-xl bg-gray-200"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
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
