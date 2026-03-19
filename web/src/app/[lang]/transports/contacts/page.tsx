import { Suspense } from "react";
import type { Metadata } from "next";
import type { Lang } from "@/types/language";
import { ContactsComponent } from "@/components/transports";
import { createContactsI18n } from "@/data/i18n/transport";

interface Props {
  params: Promise<{ lang: Lang }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const { t } = createContactsI18n(lang);

  return {
    title: t("title"),
    description: t("intro"),
  };
}

function ContactsSkeleton() {
  return (
    <div className="space-y-10">
      {/* Intro */}
      <div className="space-y-3">
        <div className="h-10 w-64 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-5 w-full max-w-xl animate-pulse rounded-lg bg-gray-200" />
      </div>
      {/* Emergency strip */}
      <div className="h-32 w-full animate-pulse rounded-2xl bg-gray-200" />
      {/* Cards rows */}
      {[4, 2, 3, 3].map((cols, i) => (
        <div key={i} className="space-y-3">
          <div className="h-6 w-40 animate-pulse rounded-lg bg-gray-200" />
          <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-${cols}`}>
            {Array.from({ length: cols }).map((_, j) => (
              <div key={j} className="h-28 animate-pulse rounded-2xl bg-gray-200" />
            ))}
          </div>
        </div>
      ))}
      {/* Connect */}
      <div className="h-36 w-full animate-pulse rounded-2xl bg-gray-200" />
    </div>
  );
}

async function ContactsContent({ lang }: { lang: Lang }) {
  return <ContactsComponent lang={lang} />;
}

export default async function ContactsPage({ params }: Props) {
  const { lang } = await params;

  return (
    <Suspense fallback={<ContactsSkeleton />}>
      <ContactsContent lang={lang} />
    </Suspense>
  );
}
