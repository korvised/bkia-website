import { Suspense } from "react";
import type { Metadata } from "next";
import { Lang } from "@/types/language";
import { CustomServicesComponent } from "@/components/guides/custom-services";
import { createCustomServicesI18n } from "@/data/i18n/guides";

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
    <>
      {/* Header */}
      <section className="bg-white py-10">
        <div className="container space-y-3">
          <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-9 w-64 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-5 w-80 animate-pulse rounded bg-gray-200" />
        </div>
      </section>

      {/* Service cards */}
      <section className="bg-gray-50 py-10">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-5 bg-white px-6 py-6">
                <div className="h-12 w-12 animate-pulse rounded-xl bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                </div>
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
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
