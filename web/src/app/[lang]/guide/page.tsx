import { redirect } from "next/navigation";
import { Lang } from "@/types/language";

interface GuidePageProps {
  params: Promise<{ lang: Lang }>;
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { lang } = await params;

  // Redirect to departure as the default tab
  redirect(`/${lang}/guide/departure`);
}
