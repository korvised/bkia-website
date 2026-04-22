import { Suspense } from "react";
import type { Metadata } from "next";
import { Lang } from "@/types/language";
import { PregnancyAndInfantComponent } from "@/components/guides/custom-services";
import { createCustomServicesI18n } from "@/data/i18n/guides";

interface Props {
  params: Promise<{ lang: Lang }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const { pregnancyGuideline: t } = createCustomServicesI18n(lang);

  return {
    title: t.title,
    description: t.subtitle,
  };
}

function PregnancyAndChildrenSkeleton() {
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

      {/* Pregnant women + Additional requirements */}
      <section className="bg-white py-10">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            {/* Pregnancy rows */}
            <div className="space-y-4">
              <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-7 w-48 animate-pulse rounded-lg bg-gray-200" />
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-16 animate-pulse rounded bg-gray-100"
                  />
                ))}
              </div>
            </div>
            {/* Additional requirements */}
            <div className="space-y-4">
              <div className="h-7 w-40 animate-pulse rounded-lg bg-gray-200" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-5 w-5 shrink-0 animate-pulse rounded-full bg-gray-200" />
                    <div className="h-5 flex-1 animate-pulse rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infants */}
      <section className="bg-gray-50 py-10">
        <div className="container space-y-4">
          <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-7 w-48 animate-pulse rounded-lg bg-gray-200" />
          <div className="grid gap-3 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="h-4 w-4 shrink-0 animate-pulse rounded bg-gray-200" />
                <div className="h-10 flex-1 animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nursery */}
      <section className="bg-white py-10">
        <div className="container space-y-4">
          <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-7 w-48 animate-pulse rounded-lg bg-gray-200" />
          <div className="overflow-hidden lg:grid lg:grid-cols-2">
            <div className="min-h-56 animate-pulse bg-gray-200 lg:min-h-64" />
            <div className="space-y-4 bg-gray-100 p-6">
              <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-px bg-gray-300" />
              <div className="space-y-1.5">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Travel tips */}
      <section className="bg-gray-50 py-10">
        <div className="container space-y-4">
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

async function PregnancyAndChildrenContent({ lang }: { lang: Lang }) {
  return <PregnancyAndInfantComponent lang={lang} />;
}

export default async function PregnancyAndChildrenPage({ params }: Props) {
  const { lang } = await params;

  return (
    <Suspense fallback={<PregnancyAndChildrenSkeleton />}>
      <PregnancyAndChildrenContent lang={lang} />
    </Suspense>
  );
}
