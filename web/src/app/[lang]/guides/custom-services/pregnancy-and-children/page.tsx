import { Suspense } from "react";
import type { Metadata } from "next";
import { Lang } from "@/types/language";
import { PregnancyAndChildrenComponent } from "@/components/guides/custom-services";
import { createCustomServicesI18n } from "@/data/i18n/guide";

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
    <div className="container space-y-8">
      {/* Breadcrumb */}
      <div className="h-5 w-64 animate-pulse rounded bg-gray-200" />

      {/* Header */}
      <div className="space-y-3">
        <div className="h-10 w-3/4 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-6 w-1/2 animate-pulse rounded-lg bg-gray-200" />
      </div>

      {/* Disclaimer */}
      <div className="h-16 w-full animate-pulse rounded-lg bg-gray-200" />

      {/* Table skeleton */}
      {[1, 2].map((s) => (
        <div key={s} className="space-y-3">
          <div className="h-7 w-48 animate-pulse rounded-lg bg-gray-200" />
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <div className="h-10 w-full animate-pulse bg-gray-100" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-t border-gray-100 px-5 py-4">
                <div className="grid grid-cols-[2fr_3fr] gap-4">
                  <div className="h-5 animate-pulse rounded bg-gray-200" />
                  <div className="h-5 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Nursery skeleton */}
      <div className="space-y-3">
        <div className="h-7 w-56 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-20 w-full animate-pulse rounded-lg bg-gray-200" />
      </div>

      {/* Tips skeleton */}
      <div className="space-y-3">
        <div className="h-7 w-36 animate-pulse rounded-lg bg-gray-200" />
        <div className="grid gap-3 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-lg bg-gray-200"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

async function PregnancyAndChildrenContent({ lang }: { lang: Lang }) {
  return <PregnancyAndChildrenComponent lang={lang} />;
}

export default async function PregnancyAndChildrenPage({ params }: Props) {
  const { lang } = await params;

  return (
    <Suspense fallback={<PregnancyAndChildrenSkeleton />}>
      <PregnancyAndChildrenContent lang={lang} />
    </Suspense>
  );
}
