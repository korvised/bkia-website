import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Lang } from "@/types/language";
import { getLostFound } from "@/services/lost-found";
import { LostFoundDetail } from "@/components/support";

interface Props {
  params: Promise<{ lang: string; id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, id } = await params;
  const item = await getLostFound(id, lang as Lang);
  if (!item) return {};
  return { title: item.itemName };
}

function DetailSkeleton() {
  return (
    <div className="container max-w-5xl space-y-6">
      <div className="h-5 w-32 animate-pulse rounded-lg bg-gray-200" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="h-96 animate-pulse rounded-2xl bg-gray-200" />
          <div className="h-48 animate-pulse rounded-2xl bg-gray-200" />
        </div>
        <div className="h-96 animate-pulse rounded-2xl bg-gray-200" />
      </div>
    </div>
  );
}

export default async function LostFoundDetailPage({ params }: Props) {
  const { lang, id } = await params;
  const item = await getLostFound(id, lang as Lang);

  if (!item) notFound();

  return <LostFoundDetail lang={lang as Lang} item={item} />;
}
