import { Lang } from "@/types/language";
import { AirportHomepage } from "@/components/homepage";
import { listHighlightNotices } from "@/services/notice";

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  const notices = await listHighlightNotices();

  return <AirportHomepage lang={lang as Lang} notices={notices} />;
}
