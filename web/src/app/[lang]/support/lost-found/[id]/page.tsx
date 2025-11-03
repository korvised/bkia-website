import { notFound } from "next/navigation";
import { Lang } from "@/types/language";
import { LostFoundItemDetail } from "@/components/notice";
import { lostFoundItems } from "@/data/notice/lost-found";

interface LostFoundDetailPageProps {
  params: Promise<{ lang: string; id: string }>;
}

export default async function LostFoundDetailPage({
  params,
}: LostFoundDetailPageProps) {
  const { lang, id } = await params;

  // Find the item by ID
  const item = lostFoundItems.find((i) => i.id === id);

  // If item not found, show 404
  if (!item) {
    notFound();
  }

  return <LostFoundItemDetail lang={lang as Lang} item={item} />;
}
