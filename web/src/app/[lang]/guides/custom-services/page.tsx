import { Suspense } from "react";
import type { Metadata } from "next";
import { Lang } from "@/types/language";
import { CustomServicesComponent } from "@/components/guides/custom-services";
import { createCustomServicesI18n } from "@/data/i18n/guide";

interface Props {
  params: Promise<{ lang: Lang }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const { customServices: t } = createCustomServicesI18n(lang);

  return {
    title: t.title,
    description: t.subtitle,
  };
}

function CustomServicesSkeleton() {
  return (
    <div className="container space-y-8">
      <div className="h-10 w-56 animate-pulse rounded-lg bg-gray-200" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-2">
                <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
                <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="h-14 w-14 shrink-0 animate-pulse rounded-full bg-gray-200" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}

async function CustomServicesContent({ lang }: { lang: Lang }) {
  return <CustomServicesComponent lang={lang} />;
}

export default async function CustomServicesPage({ params }: Props) {
  const { lang } = await params;

  return (
    <Suspense fallback={<CustomServicesSkeleton />}>
      <CustomServicesContent lang={lang} />
    </Suspense>
  );
}
